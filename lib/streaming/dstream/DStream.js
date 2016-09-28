/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('../../utils.js');
    var RDD = require('../../rdd/RDD.js');

    var gKernelP = kernelP;

    /**
     * @constructor
     * @memberof module:eclairjs/streaming/dstream
     * @classdec Represents a Discretized Stream (DStream), the basic abstraction in Spark Streaming, 
     * is a continuous sequence of RDDs (of the same type) representing a continuous stream of data.
     */
    function DStream() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Return a new DStream by first applying a function to all elements of this DStream, and then flattening the results.
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {module:eclairjs/streaming/dstream.DStream}
     */
    DStream.prototype.flatMap = function(func, bindArgs) {
      var args = {
        target: this,
        method: 'flatMap',
        args: [
          {value: func, type: 'lambda'},
          {value: Utils.wrapBindArgs(bindArgs), optional: true}
        ],
        returnType: DStream
      };

      return Utils.generate(args);
    };

    /**
     * Return a new DStream by applying a function to all elements of this DStream.
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {module:eclairjs/streaming/dstream.DStream}
     */
    DStream.prototype.map = function(func, bindArgs) {
      var args = {
        target: this,
        method: 'map',
        args: [
          {value: func, type: 'lambda'},
          {value: Utils.wrapBindArgs(bindArgs), optional: true}
        ],
        returnType: DStream
      };

      return Utils.generate(args);
    };

    /**
     * Return a new DStream in which each RDD contains all the elements in seen in a sliding window of time over this DStream. 
     * The new DStream generates RDDs with the same interval as this DStream.
     * @param duration - width of the window; must be a multiple of this DStream's interval.
     * @returns {module:eclairjs/streaming/dstream.DStream}
     */
    DStream.prototype.window = function(duration) {
      var args = {
        target: this,
        method: 'window',
        args: Utils.wrapArguments(arguments),
        returnType: DStream
      };

      return Utils.generate(args);
    };

    /**
     * Print the first ten elements of each RDD generated in this DStream. This is an output operator, so this DStream will be 
     * registered as an output stream and there materialized.
     * @returns {void}
     */
    DStream.prototype.print = function() {
      var args = {
        target: this,
        method: 'print'
      };

      return Utils.generate(args);
    };

    var foreachRDDCounter = 0;

    function generateForeachRDDFunc(lambda, id) {
      // TODO: consider using template literals
      var func = "function() {\
        var res = {{lambda}}.apply(this, arguments);\
        var comm = commMap.get('foreachrdd:{{id}}');\
        comm.send('foreachrdd', JSON.stringify({response: res}));\
      }";

      return func.replace('{{id}}', id).replace('{{lambda}}', lambda.toString());
    }

    /**
     * Apply a function to each RDD in this DStream.
     *
     * foreachRDD works slightly different in EclairJS-node compared to regular Spark due to the fact that it executes the
     * code remotely in EclairJS-nashorn running in Apache Toree.  Instead of just one lambda function, EclairJS-node's
     * foreachRDD takes in two.
     *
     * The first argument is a function which is run remotely on EclairJS-nashorn in Apache Toree and has several
     * restrictions:
     *   - Need to use the EclairJS-nashorn API (https://github.com/EclairJS/eclairjs-nashorn/wiki/API-Documentation).  The
     *     main difference is that methods calls are always synchronous - so for example count() will return the number
     *     directly (while in EclairJS-node it would return a Promise).
     *   - The code in the remote function must return a JSON serializable value.  This means no asynchronous calls can
     *     happen.
     *
     * The second argument in foreachRDD is a bindArgs - an array of values that will be added to the remote function's
     * argument list.  Set it to null if none are needed.
     *
     * The third argument is function that runs on the Node side.  The remote function's return value (which has already
     * been JSON parsed) will be passed into the local function as an argument.
     *
     * You will need to run all Spark computations in the remote function and use the local function to send the result to
     * its final destination (your datastore of choice for example).
     *
     * Example:
     *
     * var dStream = ...;
     *
     * dStream.foreachRDD(
     *   function(rdd) {
     *     // runs remotely
     *     return rdd.collect();
     *   },
     *   null,
     *   function(res) {
     *     // runs locally in Node
     *     console.log('Results: ', res)
     *   }
     * )
     *
     * The remote function collects the contents of the RDD and returns the array, which then gets passed as an argument
     * into the local function.
     *
     * @param {function} remoteFunc - lambda function that runs on the Spark side.  The returned result from the lambda
     *    will be passed into localFunc as an argument
     * @param {Object[]} bindArgs array whose values will be added to remoteFunc's argument list.
     * @param {function} [localFunc] - lambda function that runs on the Node side.
     * @returns {Promise.<void>}
     */
    DStream.prototype.foreachRDD = function(remoteFunc, bindArgs, localFunc) {
      var id = 'foreachrdd-' + ++foreachRDDCounter;

      var args = {
        target: this,
        method: 'foreachRDD',
        args: [
          {value: generateForeachRDDFunc(remoteFunc, id), type: 'lambda'},
          {value: Utils.wrapBindArgs(bindArgs)}
        ]
      };

      this.kernelP.then(function(kernel) {
        var comm = kernel.connectToComm('foreachrdd', id);

        comm.onMsg = (msg) => {
          var response = msg.content.data.response;

          if (localFunc) {
            localFunc(response);
          }
        };

        comm.open('');
      });

      return Utils.generate(args);
    };

    /**
     * Return a new DStream containing only the elements that satisfy a predicate.
     * @param {function} func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {module:eclairjs/streaming/dstream.DStream}
     */
    DStream.prototype.filter = function(func, bindArgs) {
      var args = {
        target: this,
        method: 'filter',
        args: [
          {value: func, type: 'lambda'},
          {value: Utils.wrapBindArgs(bindArgs), optional: true}
        ],
        returnType: DStream
      };

      return Utils.generate(args)
    };

    /**
     * Return a new DStream by applying a function to all elements of this DStream.
     * @param func
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {module:eclairjs/streaming/dstream.PairDStream} 
     */
    DStream.prototype.mapToPair = function(func, bindArgs) {
      var PairDStream = require('./PairDStream')(this.kernelP);

      var args = {
        target: this,
        method: 'mapToPair',
        args: [
          {value: func, type: 'lambda'},
          {value: Utils.wrapBindArgs(bindArgs), optional: true}
        ],
        returnType: PairDStream
      };

      return Utils.generate(args);

    };


    /**
     * Persist RDDs of this DStream with the storage level
     * @param {module:eclairjs/storage.StorageLevel} [level] (MEMORY_ONLY_SER) by default
     * @return {module:eclairjs/streaming/dstream.DStream}
     */
    DStream.prototype.persist = function() {
      var args = {
        target: this,
        method: 'persist',
        returnType: DStream
      };

      if(arguments.length  == 1) {
        args.args  = Utils.wrapArguments(arguments);
      }

      return Utils.generate(args);
    };


    /**
     * Return a new DStream in which each RDD is generated by applying a function
     * on each RDD of 'this' DStream.
     * @param {func} transformFunc
     * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
     * @returns {module:eclairjs/streaming/dstream.PairDStream}
     */
    DStream.prototype.transformToPair = function (transformFunc, bindArgs) {
      var PairDStream = require('./PairDStream')(this.kernelP);

      var args = {
        target: this,
        method: 'transformToPair',
        args: [
          {value: transformFunc, type: 'lambda'},
          {value: Utils.wrapBindArgs(bindArgs), optional: true}
        ],
        returnType: PairDStream
      };

      return Utils.generate(args);
    };

    DStream.moduleLocation = '/streaming/dstream/DStream';

    return DStream;
  })();
};