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
    var Utils = require('./utils.js');

    var gKernelP = kernelP;

    /**
     * Helper object defining how to accumulate values of a particular type. An implicit
     * AccumulableParam needs to be available when you create {@link Accumulable}s of a specific type.
     *
     * @classdesc
     * @constructor
     * @memberof module:eclairjs
     */
    function AccumulableParam() {
    }

    /**
     * Add additional data to the accumulator value. Is allowed to modify and return `r`
     * for efficiency (to avoid allocating objects).
     *
     * @param {object} r  the current value of the accumulator
     * @param {object} t  the data to be added to the accumulator
     * @returns {object}  the new value of the accumulator
     * @returns {Promise.<object>} Promise that resolves to the new value of the accumulator
     */
    AccumulableParam.prototype.addAccumulator = function(r, t) {
      throw 'Not implemented in EclairJS';
    };

    /**
     * Merge two accumulated values together. Is allowed to modify and return the first value
     * for efficiency (to avoid allocating objects).
     *
     * @param {object} r1  one set of accumulated data
     * @param {object} r2  another set of accumulated data
     * @returns {Promise.<object>} Promise that resolves to a value that has both data sets merged together
     */
    AccumulableParam.prototype.addInPlace = function(r1,r2) {
      throw 'Not implemented in EclairJS';
    };

    /**
     * Return the "zero" (identity) value for an accumulator type, given its initial value. For
     * example, if R was a vector of N dimensions, this would return a vector of N zeroes.
     * @param {object}
     * @returns {Promise.<object>}
     */
    AccumulableParam.prototype.zero = function(initialValue) {
       throw 'Not implemented in EclairJS';
    };

    /**
     * @constructor
     * @memberof module:eclairjs
     * @augments AccumulableParam
     */
    function FloatAccumulatorParam() {
      this.kernelP = gKernelP;

      var args = {
        target: FloatAccumulatorParam,
        kernelP: gKernelP
      };

      this.refIdP = Utils.generateConstructor(args);
    }

    FloatAccumulatorParam.prototype = AccumulableParam.prototype;

    FloatAccumulatorParam.moduleLocation = '/FloatAccumulatorParam';

    /**
     * @constructor
     * @memberof module:eclairjs
     * @augments AccumulableParam
     */
    function IntAccumulatorParam() {
      this.kernelP = gKernelP;

      var args = {
        target: IntAccumulatorParam,
        kernelP: gKernelP
      };

      this.refIdP = Utils.generateConstructor(args);
    }

    IntAccumulatorParam.prototype = AccumulableParam.prototype;

    IntAccumulatorParam.moduleLocation = '/IntAccumulatorParam';

    return {
      IntAccumulatorParam: IntAccumulatorParam,
      FloatAccumulatorParam: FloatAccumulatorParam
    };
  })();
};