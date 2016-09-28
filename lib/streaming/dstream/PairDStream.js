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
    var PairRDD = require('../../rdd/PairRDD.js');
    var DStream = require('./DStream')();

    var gKernelP = kernelP;

    /**
     * @constructor
     * @classdec Represents a Discretized Stream (DStream), the basic abstraction in Spark Streaming,
     * is a continuous sequence of RDDs (of the same type) representing a continuous stream of data.
     * @memberof module:eclairjs/streaming/dstream
     */
    function PairDStream(kernelP, refIdP) {
      this.kernelP = kernelP;
      this.refIdP = refIdP;
    }

    PairDStream.prototype = Object.create(DStream.prototype);

    PairDStream.prototype.constructor = PairDStream;

    /**
     * Return a new DStream by applying `reduceByKey` to each RDD. The values for each key are
     * merged using the associative reduce function. Hash partitioning is used to generate the RDDs
     * with Spark's default number of partitions.
     * @param {func} func
     * @returns {module:eclairjs/streaming/dstream.PairDStream} 
     */
    PairDStream.prototype.reduceByKey = function (func, bindArgs) {
      var args = {
        target: this,
        method: 'reduceByKey',
        args: [
          {value: func, type: 'lambda'},
          {value: Utils.wrapBindArgs(bindArgs), optional: true}
        ],
        returnType: PairDStream
      };

      return Utils.generate(args);
    };


    /**
     * Create a new DStream by applying `reduceByKey` over a sliding window on `this` DStream.
     * Similar to `DStream.reduceByKey()`, but applies it over a sliding window. The new DStream
     * generates RDDs with the same interval as this DStream. Hash partitioning is used to generate
     * the RDDs with Spark's default number of partitions.
     * @param {func} reduceFunc  associative reduce function
     * @param {module:eclairjs/streaming.Duration} windowDuration  width of the window; must be a multiple of this DStream's
     *                       batching interval
     * @returns {module:eclairjs/streaming/dstream.PairDStream}
     */
    PairDStream.prototype.reduceByKeyAndWindow = function (reduceFunc, windowDuration, bindArgs) {
      var args = {
        target: this,
        method: 'reduceByKeyAndWindow',
        args: [
          {value: reduceFunc, type: 'lambda'},
          {value: windowDuration},
          {value: Utils.wrapBindArgs(bindArgs), optional: true}
        ],
        returnType: PairDStream
      };

      return Utils.generate(args);
    };

    PairDStream.moduleLocation = '/streaming/dstream/PairDStream';

    return PairDStream;
  })();
};