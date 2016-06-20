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

var Utils = require('../utils.js');

/**
 * @constructor
 * @memberof module:eclairjs/streaming
 * @classdesc Main entry point for Spark Streaming functionality. It provides methods used to create DStreams from various input sources.
 *  It can be either created by providing a Spark master URL and an appName, or from a org.apache.spark.SparkConf configuration
 *  (see core Spark documentation), or from an existing org.apache.spark.SparkContext. The associated SparkContext can be accessed
 *  using context.sparkContext. After creating and transforming DStreams, the streaming computation can be started and stopped using
 *  context.start() and context.stop(), respectively. context.awaitTermination() allows the current thread to wait for the termination
 *  of the context by stop() or by an exception.
 *  @param {SparkContex} sparkContext
 *  @param {module:eclairjs/streaming.Duration} duration
 */
function StreamingContext(sparkContext, duration) {
  this.kernelP = sparkContext.kernelP;

  var args = {
    target: StreamingContext,
    args: Utils.wrapArguments(arguments),
    kernelP: this.kernelP
  };

  this.refIdP = Utils.generateConstructor(args);
}

/**
 * The underlying SparkContext
 * @returns {module:eclairjs.SparkContext}
 */
StreamingContext.prototype.sparkContext = function () {
  var SparkContext = require('../SparkContext.js')()[1];

  var args = {
    target: this,
    method: 'sparkContext',
    args: Utils.wrapArguments(arguments),
    returnType: SparkContext
  };

  return Utils.generate(args);
};

/**
 * Wait for the execution to stop
 */
StreamingContext.prototype.awaitTermination = function() {
  var args = {
    target: this,
    method: 'awaitTermination'
  };

  return Utils.generate(args);
};

/**
 * Wait for the execution to stop, or timeout
 * @param {long} millis
 * @returns {boolean}
 */
StreamingContext.prototype.awaitTerminationOrTimeout = function(millis) {
  var args = {
    target: this,
    method: 'awaitTerminationOrTimeout',
    args: Utils.wrapArguments(arguments),
    returnType: Boolean
  };

  return Utils.generate(args);
};

/**
 * Start the execution of the streams.
 */
StreamingContext.prototype.start = function() {
  var args = {
    target: this,
    method: 'start'
  };

  return Utils.generate(args);
};

/**
 * Stops the execution of the streams.
 */
StreamingContext.prototype.stop = function() {
  var args = {
    target: this,
    method: 'stop',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

StreamingContext.prototype.close = function () {
  var args = {
    target: this,
    method: 'close'
  };

  return Utils.generate(args);
};

/**
 * Create a input stream from TCP source hostname:port.
 * @param {string} host
 * @param {string} port
 * @returns {module:eclairjs/streaming/dstream.DStream}
 */
StreamingContext.prototype.socketTextStream = function(host, port) {
  var DStream = require('./dstream/DStream.js')(this.kernelP);

  var args = {
    target: this,
    method: 'socketTextStream',
    args: Utils.wrapArguments(arguments),
    returnType: DStream
  };

  return Utils.generate(args);
};

/**
 * Create an input stream from an queue of RDDs. In each batch,
 * it will process either one or all of the RDDs returned by the queue.
 *
 * NOTE:
 * 1. Changes to the queue after the stream is created will not be recognized.
 * 2. Arbitrary RDDs can be added to `queueStream`, there is no way to recover data of
 * those RDDs, so `queueStream` doesn't support checkpointing.
 *
 * @param {module:eclairjs.RDD[]} queue       Queue of RDDs
 * @param {boolean}  [oneAtATime=true]   Whether only one RDD should be consumed from the queue in every interval
 * @param {module:eclairjs.RDD} [defaultRDD]  Default RDD is returned by the DStream when the queue is empty
 * @returns {module:eclairjs/streaming/dstream.DStream}
 */
StreamingContext.prototype.queueStream = function (queue) {
  var DStream = require('./dstream/DStream.js')(this.kernelP);
  
  var args = {
    target: this,
    method: 'queueStream',
    args: Utils.wrapArguments(arguments),
    returnType: DStream
  };

  return Utils.generate(args);
};

StreamingContext.moduleLocation = '/streaming/StreamingContext';

module.exports = StreamingContext;