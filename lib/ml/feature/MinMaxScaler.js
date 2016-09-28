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

    var Estimator = require('../Estimator')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Rescale each feature individually to a common range [min, max] linearly using column summary
     * statistics, which is also known as min-max normalization or Rescaling. The rescaled value for
     * feature E is calculated as,
     *
     * Rescaled(e_i) = \frac{e_i - E_{min}}{E_{max} - E_{min}} * (max - min) + min
     *
     * For the case E_{max} == E_{min}, Rescaled(e_i) = 0.5 * (max + min)
     * Note that since zero values will probably be transformed to non-zero values, output of the
     * transformer will be DenseVector even for sparse input.
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    function MinMaxScaler() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    MinMaxScaler.prototype = Object.create(Estimator.prototype);

    MinMaxScaler.prototype.constructor = MinMaxScaler;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    MinMaxScaler.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScaler
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScaler
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.setMin = function(value) {
      var args = {
        target: this,
        method: 'setMin',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScaler
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.setMax = function(value) {
      var args = {
        target: this,
        method: 'setMax',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScaler
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScaler.prototype.fit = function(dataset) {
      var MinMaxScalerModel = require('./MinMaxScalerModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScalerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    MinMaxScaler.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScaler
      };

      return Utils.generate(args);
    };

    /**
     * lower bound after transformation, shared by all features Default: 0.0
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    MinMaxScaler.prototype.min = function() {
      var DoubleParam = require('../param/DoubleParam')();

      var args = {
        target: this,
        method: 'min',
        args: Utils.wrapArguments(arguments),
        returnType: DoubleParam
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<number>}
     */
    MinMaxScaler.prototype.getMin = function () {
      var args = {
        target: this,
        method: 'getMin',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * upper bound after transformation, shared by all features Default: 1.0
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    MinMaxScaler.prototype.max = function() {
      var DoubleParam = require('../param/DoubleParam')();

      var args = {
        target: this,
        method: 'max',
        args: Utils.wrapArguments(arguments),
        returnType: DoubleParam
      };

      return Utils.generate(args);
    };

    /**
     * @returns {float}
     */
    MinMaxScaler.prototype.getMax = function () {
      return this.getJavaObject().getMax();
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.MinMaxScaler}
     */
    MinMaxScaler.load = function(path) {
      var args = {
        target: MinMaxScaler,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScaler
      };

      return Utils.generate(args);
    };

    MinMaxScaler.moduleLocation = '/ml/feature/MinMaxScaler';

    return MinMaxScaler;
  })();
};