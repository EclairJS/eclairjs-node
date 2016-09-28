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

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('../../utils.js');

    var gKernelP = kernelP;

    /**
     * @constructor
     * @memberof module:eclairjs/mllib/regression
     * @classdesc Class that represents the features and labels of a data point.
     * @param {double} label
     * @param {module:eclairjs/mllib/linalg.Vector} features
     */
    function LabeledPoint() {
      Utils.handleConstructor(this, arguments, gKernelP);
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
     * @returns {module:eclairjs/mllib/regression.LabeledPoint}
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

    return LabeledPoint;
  })();
};