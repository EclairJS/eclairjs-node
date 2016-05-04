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

var Utils = require('../../utils.js');
var RDD = require('../../rdd/RDD.js');

var gKernelP;

/**
 * @constructor
 * @memberof module:eclairjs/streaming/dstream
 * @classdec Represents a Discretized Stream (DStream), the basic abstraction in Spark Streaming, 
 * is a continuous sequence of RDDs (of the same type) representing a continuous stream of data.
 */
function DStream() {
  if (arguments.length == 2 && arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: DStream,
      args: Utils.wrapArguments(arguments),
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
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
    method: 'flatMap',
    args: [
      {value: duration.millis, type: 'number'},
    ],
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
 * @param {function} preprocessFunc - lambda function that runs on the Spark side.  The returned result from the lambda
 *    will be passed into func as an argument
 * @param {Object[]} bindArgs array whose values will be added to preprocessLambda's argument list.
 * @param {function} func - lambda function that runs on the Node side.
 * @returns {Promise.<void>}
 */
DStream.prototype.foreachRDD = function(preprocessFunc, bindArgs, func) {
  var args = {
    target: this,
    method: 'foreachRDD',
    args: [
      {value: generateForeachRDDFunc(preprocessFunc, 'foo'), type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs)}
    ]
  };

  this.kernelP.then(function(kernel) {
    var comm = kernel.connectToComm('foreachrdd', 'foo');

    comm.onMsg = (msg) => {
      var response = msg.content.data.response;

      func(response);
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

module.exports = function(kP) {
  gKernelP = kP;

  return DStream;
};
