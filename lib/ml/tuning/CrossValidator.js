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
     * @classdesc
     * K-fold cross validation.
     * @class
     * @memberof module:eclairjs/ml/tuning
     * @extends module:eclairjs/ml.Estimator
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function CrossValidator() {
      Utils.handleConstructor(this, arguments, gKernelP);

    };



    /**
     * @param {module:eclairjs/ml.Estimator} value
     * @returns {type}
     */
    CrossValidator.prototype.setEstimator = function(value) {
      var args ={
        target: this,
        method: 'setEstimator',
        args: Utils.wrapArguments(arguments),
        returnType: CrossValidator

      };

      return Utils.generate(args);
    };


    /**
     * @param {ParamMap[]} value
     * @returns {type}
     */
    CrossValidator.prototype.setEstimatorParamMaps = function(value) {
      var args ={
        target: this,
        method: 'setEstimatorParamMaps',
        args: Utils.wrapArguments(arguments),
        returnType: CrossValidator

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/evaluation.Evaluator} value
     * @returns {type}
     */
    CrossValidator.prototype.setEvaluator = function(value) {
      var args ={
        target: this,
        method: 'setEvaluator',
        args: Utils.wrapArguments(arguments),
        returnType: CrossValidator

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type}
     */
    CrossValidator.prototype.setNumFolds = function(value) {
      var args ={
        target: this,
        method: 'setNumFolds',
        args: Utils.wrapArguments(arguments),
        returnType: CrossValidator

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type}
     */
    CrossValidator.prototype.setSeed = function(value) {
      var args ={
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: CrossValidator

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {CrossValidatorModel}
     */
    CrossValidator.prototype.fit = function(dataset) {
      var CrossValidatorModel = require('../../ml/tuning/CrossValidatorModel.js')();
      var args ={
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: CrossValidatorModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {StructType}
     */
    CrossValidator.prototype.transformSchema = function(schema) {
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
     * @returns {CrossValidator}
     */
    CrossValidator.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: CrossValidator

      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter}
     */
    CrossValidator.prototype.write = function() {
      var MLWriter = require('../../ml/util/MLWriter.js')();
      var args ={
        target: this,
        method: 'write',
        returnType: MLWriter

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @returns {MLReader}
     */
    CrossValidator.read = function() {
      var MLReader = require('../../ml/util/MLReader.js')();
      var args ={
        target: CrossValidator,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {CrossValidator}
     */
    CrossValidator.load = function(path) {
      var args ={
        target: CrossValidator,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: CrossValidator

      };

      return Utils.generate(args);
    };


    CrossValidator.moduleLocation = '/ml/tuning/CrossValidator';

    return CrossValidator;
  })();
};