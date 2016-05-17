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

var InputDStream = require('./InputDStream');

/**
 * @classdesc
 * Abstract class for defining any {@link InputDStream}
 * that has to start a receiver on worker nodes to receive external data.
 * Specific implementations of ReceiverInputDStream must
 * define `the getReceiver()` function that gets the receiver object of type
 * {@link Receiver} that will be sent
 * to the workers to receive data.
 * @param ssc_ Streaming context that will execute this input stream
 * @class
 * @memberof module:eclairjs/streaming/dstream
 * @extends module:eclairjs/streaming/dstream.InputDStream
 */

/**
 * @param {module:eclairjs/streaming.StreamingContext} ssc_
 * @constructor
 */
function ReceiverInputDStream() {
  Utils.handleAbstractConstructor(this, arguments);
}

ReceiverInputDStream.prototype = Object.create(InputDStream.prototype);

ReceiverInputDStream.prototype.constructor = ReceiverInputDStream;

/**
 * Gets the receiver object that will be sent to the worker nodes
 * to receive data. This method needs to defined by any specific implementation
 * of a ReceiverInputDStream.
 * @returns {Receiver}
 */
ReceiverInputDStream.prototype.getReceiver = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'getReceiver',
//     returnType: Receiver
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
ReceiverInputDStream.prototype.start = function() {
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
ReceiverInputDStream.prototype.stop = function() {
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


/**
 * @param {module:eclairjs/streaming.Time} validTime
 * @returns {RDD}
 */
ReceiverInputDStream.prototype.compute = function(validTime) {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'compute',
//     args: [
//       { value: validTime, type: 'Time' }
//     ],
//     returnType: RDD
//
//   };
//
//   return Utils.generate(args);
};

module.exports = ReceiverInputDStream;