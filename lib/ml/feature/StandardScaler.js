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
    var Estimator = require('../Estimator.js');

    var gKernelP = kernelP;


    /**
     * @classdesc
     * Standardizes features by removing the mean and scaling to unit variance using column summary
     * statistics on the samples in the training set.
     *
     * The "unit std" is computed using the
     * [[https://en.wikipedia.org/wiki/Standard_deviation#Corrected_sample_standard_deviation
     *   corrected sample standard deviation]],
     * which is computed as the square root of the unbiased sample variance.
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function StandardScaler() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }
    StandardScaler.prototype = Object.create(Estimator.prototype);

    StandardScaler.prototype.constructor = StandardScaler;



    /**
     * @param {string} value
     * @returns {type}
     */
    StandardScaler.prototype.setInputCol = function(value) {
      var args ={
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StandardScaler

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type}
     */
    StandardScaler.prototype.setOutputCol = function(value) {
      var args ={
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StandardScaler

      };

      return Utils.generate(args);
    };


    /**
     * @param {boolean} value
     * @returns {type}
     */
    StandardScaler.prototype.setWithMean = function(value) {
      var args ={
        target: this,
        method: 'setWithMean',
        args: Utils.wrapArguments(arguments),
        returnType: StandardScaler

      };

      return Utils.generate(args);
    };


    /**
     * @param {boolean} value
     * @returns {type}
     */
    StandardScaler.prototype.setWithStd = function(value) {
      var args ={
        target: this,
        method: 'setWithStd',
        args: Utils.wrapArguments(arguments),
        returnType: StandardScaler

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {StandardScalerModel}
     */
    StandardScaler.prototype.fit = function(dataset) {
      var StandardScalerModel = require('./StandardScalerModel.js')();
      var args ={
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: StandardScalerModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    StandardScaler.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js')();

      var args ={
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {StandardScaler}
     */
    StandardScaler.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: StandardScaler

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {StandardScaler}
     */
    StandardScaler.load = function(path) {
      var args ={
        target: StandardScaler,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: StandardScaler

      };

      return Utils.generate(args);
    };


    StandardScaler.moduleLocation = '/ml/feature/StandardScaler';

    return StandardScaler;
  })();
};