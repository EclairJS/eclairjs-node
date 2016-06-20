/*
 * Copyright 2016 IBM Corp.
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

var DStream = require('./DStream')();

/**
 * @classdesc
 * This is the abstract base class for all input streams. This class provides methods
 * start() and stop() which is called by Spark Streaming system to start and stop receiving data.
 * Input streams that can generate RDDs from new data by running a service/thread only on
 * the driver node (that is, without running a receiver on worker nodes), can be
 * implemented by directly inheriting this InputDStream. For example,
 * FileInputDStream, a subclass of InputDStream, monitors a HDFS directory from the driver for
 * new files and generates RDDs with the new files. For implementing input streams
 * that requires running a receiver on the worker nodes, use
 * {@link ReceiverInputDStream} as the parent class.
 *
 * @param ssc_ Streaming context that will execute this input stream
 * @class
 * @memberof module:eclairjs/streaming/dstream
 * @extends module:eclairjs/streaming/dstream.DStream
 */

/**
 * @param {module:eclairjs/streaming.StreamingContext} ssc_
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 * @constructor
 */
function InputDStream(kernelP, refIdP, ssc_) {
  Utils.handleAbstractConstructor(this, arguments);
}

InputDStream.prototype = Object.create(DStream.prototype);

InputDStream.prototype.constructor = InputDStream;

/**
 * @returns {DStream[]}
 */
InputDStream.prototype.dependencies = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'dependencies',
//     returnType: [DStream]
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @returns {Duration}
 */
InputDStream.prototype.slideDuration = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'slideDuration',
//     returnType: Duration
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
InputDStream.prototype.start = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'start',
//     returnType: null
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
InputDStream.prototype.stop = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'stop',
//     returnType: null
//
//   };
//
//   return Utils.generate(args);
};


module.exports = InputDStream;