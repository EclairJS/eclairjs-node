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

var gKernelP;

/**
 * Class that represents the features and labels of a data point.
 *
 * @param label Label for this data point.
 * @param features List of features for this data point.
 * @classdesc
 */

/**
 * @param {number} label
 * @param {Vector} features
 * @returns {??}
 *  @class
 */
function LabeledPoint() {
  if (arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: LabeledPoint,
      args: Utils.wrapArguments(arguments),
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

/**
 * @returns {Promise.<string>}
 */
LabeledPoint.prototype.toString = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//   var args ={
//     target: this,
//     method: 'toString',
//     resolver: _resolve,
//     returnType: String
//
//   };
//
//   return Utils.generate(args);
};

//
// static methods
//


/**
 * Parses a string resulted from `LabeledPoint#toString` into
 * an {@link LabeledPoint}.
 *
 * @param {string} s
 * @returns {LabeledPoint}
 */
LabeledPoint.parse = function(s) {
  throw "not implemented by ElairJS";
//   var args ={
//     target: LabeledPoint,
//     method: 'parse',
//     args: [
//       { value: s, type: 'string' }
//     ],
//     returnType: LabeledPoint
//
//   };
//
//   return Utils.generate(args);
};

LabeledPoint.moduleLocation = '/mllib/regression/LabeledPoint';

module.exports = function(kP) {
  gKernelP = kP;

  return LabeledPoint;
};