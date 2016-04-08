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

var DStream = require('./DStream.js');

/**
 * @constructor
 * @classdesc Main entry point for Spark Streaming functionality. It provides methods used to create DStreams from various input sources.
 *  It can be either created by providing a Spark master URL and an appName, or from a org.apache.spark.SparkConf configuration 
 *  (see core Spark documentation), or from an existing org.apache.spark.SparkContext. The associated SparkContext can be accessed 
 *  using context.sparkContext. After creating and transforming DStreams, the streaming computation can be started and stopped using 
 *  context.start() and context.stop(), respectively. context.awaitTermination() allows the current thread to wait for the termination 
 *  of the context by stop() or by an exception.
 *  @param {SparkContex} sparkContext
 *  @param {Duration} duration
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

/**
 * Create a input stream from TCP source hostname:port.
 * @param {string} host
 * @param {string} port
 * @returns {DStream}
 */
StreamingContext.prototype.socketTextStream = function(host, port) {
  var args = {
    target: this,
    method: 'socketTextStream',
    args: Utils.wrapArguments(arguments),
    returnType: DStream
  };

  return Utils.generate(args);
};

module.exports = StreamingContext;