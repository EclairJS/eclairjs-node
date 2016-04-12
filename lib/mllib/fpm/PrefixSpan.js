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

var PrefixSpanModel = require('./PrefixSpanModel.js')();

var gKernelP;

/**
 * :: Experimental ::
 *
 * A parallel PrefixSpan algorithm to mine frequent sequential patterns.
 * The PrefixSpan algorithm is described in J. Pei, et al., PrefixSpan: Mining Sequential Patterns
 * Efficiently by Prefix-Projected Pattern Growth ([[http://doi.org/10.1109/ICDE.2001.914830]]).
 *
 * @param minSupport the minimal support level of the sequential pattern, any pattern appears
 *                   more than  (minSupport * size-of-the-dataset) times will be output
 * @param maxPatternLength the maximal length of the sequential pattern, any pattern appears
 *                         less than maxPatternLength will be output
 * @param maxLocalProjDBSize The maximum number of items (including delimiters used in the internal
 *                           storage format) allowed in a projected database before local
 *                           processing. If a projected database exceeds this size, another
 *                           iteration of distributed prefix growth is run.
 *
 * @see [[https://en.wikipedia.org/wiki/Sequential_Pattern_Mining Sequential Pattern Mining
 *       (Wikipedia)]]
 * @classdesc
 */

/**
 * Constructs a default instance with default parameters
 * {minSupport: `0.1`, maxPatternLength: `10`, maxLocalProjDBSize: `32000000L`}.
 * @returns {PrefixSpan}
 *  @class
 */
function PrefixSpan() {
  if (arguments.length == 2) {
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: PrefixSpan,
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

/**
 * Get the minimal support (i.e. the frequency of occurrence before a pattern is considered
 * frequent).
 * @returns {Promise.<number>}
 */
PrefixSpan.prototype.getMinSupport = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//   var args ={
//     target: this,
//     method: 'getMinSupport',
//     resolver: _resolve,
//     returnType: Number
//
//   };
//
//   return Utils.generate(args);
};

/**
 * Sets the minimal support level (default: `0.1`).
 * @param {number} minSupport
 * @returns {PrefixSpan}
 */
PrefixSpan.prototype.setMinSupport = function(minSupport) {
  var args = {
    target: this,
    method: 'setMinSupport',
    args: Utils.wrapArguments(arguments),
    returnType: PrefixSpan
  };

  return Utils.generate(args);
};

/**
 * Gets the maximal pattern length (i.e. the length of the longest sequential pattern to consider.
 * @returns {Promise.<number>}
 */
PrefixSpan.prototype.getMaxPatternLength = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//   var args ={
//     target: this,
//     method: 'getMaxPatternLength',
//     resolver: _resolve,
//     returnType: Number
//
//   };
//
//   return Utils.generate(args);
};


/**
 * Sets maximal pattern length (default: `10`).
 * @param {number} maxPatternLength
 * @returns {}
 */
PrefixSpan.prototype.setMaxPatternLength = function(maxPatternLength) {
  var args = {
    target: this,
    method: 'setMaxPatternLength',
    args: Utils.wrapArguments(arguments),
    returnType: PrefixSpan
  };

  return Utils.generate(args);
};


/**
 * Gets the maximum number of items allowed in a projected database before local processing.
 * @returns {Promise.<number>}
 */
PrefixSpan.prototype.getMaxLocalProjDBSize = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//   var args ={
//     target: this,
//     method: 'getMaxLocalProjDBSize',
//     resolver: _resolve,
//     returnType: Number
//
//   };
//
//   return Utils.generate(args);
};


/**
 * Sets the maximum number of items (including delimiters used in the internal storage format)
 * allowed in a projected database before local processing (default: `32000000L`).
 * @param {number} maxLocalProjDBSize
 * @returns {}
 */
PrefixSpan.prototype.setMaxLocalProjDBSize = function(maxLocalProjDBSize) {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'setMaxLocalProjDBSize',
//     args: [
//       { value: maxLocalProjDBSize, type: 'number' }
//     ],
//     returnType:
//
//   };
//
//   return Utils.generate(args);
};


/**
 * Finds the complete set of frequent sequential patterns in the input sequences of itemsets.
 * @param {RDD} data  sequences of itemsets.
 * @returns {PrefixSpanModel}  a [[PrefixSpanModel]] that contains the frequent patterns
 */
PrefixSpan.prototype.run = function(data) {
  var args = {
    target: this,
    method: 'run',
    args: Utils.wrapArguments(arguments),
    returnType: PrefixSpanModel
  };

  return Utils.generate(args);
};

PrefixSpan.moduleLocation = '/mllib/fpm/PrefixSpan';

module.exports = function(kP) {
  gKernelP = kP;

  return PrefixSpan;
};