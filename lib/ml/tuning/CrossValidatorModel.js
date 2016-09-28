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
     * Model from k-fold cross validation.
     *
     * @param bestModel The best model selected from k-fold cross validation.
     * @param avgMetrics Average cross-validation metrics for each paramMap in
     *                   {@link estimatorParamMaps}, in the corresponding order.
     * @class
     * @memberof module:eclairjs/ml/tuning
     * @extends module:eclairjs/ml.Model
     */


    function CrossValidatorModel() {
      Utils.handleConstructor(this, arguments, gKernelP);

    };



    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Dataset}
     */
    CrossValidatorModel.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset.js');
      var args ={
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {StructType}
     */
    CrossValidatorModel.prototype.transformSchema = function(schema) {
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
     * @returns {CrossValidatorModel}
     */
    CrossValidatorModel.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: CrossValidatorModel

      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter}
     */
    CrossValidatorModel.prototype.write = function() {
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
    CrossValidatorModel.read = function() {
      var MLReader = require('../../ml/util/MLReader.js')();
      var args ={
        target: CrossValidatorModel,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {CrossValidatorModel}
     */
    CrossValidatorModel.load = function(path) {
      var args ={
        target: CrossValidatorModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: CrossValidatorModel

      };

      return Utils.generate(args);
    };

    CrossValidatorModel.moduleLocation = '/ml/tuning/CrossValidatorModel';

    return CrossValidatorModel;
  })();
};