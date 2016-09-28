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
     * Model fitted by {@link ChiSqSelector}.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml/util.MLWritable
     */

    function ChiSqSelectorModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelectorModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelectorModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.prototype.setLabelCol = function(value) {
      var args = {
        target: this,
        method: 'setLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelectorModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    ChiSqSelectorModel.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset.js');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    ChiSqSelectorModel.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelectorModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    ChiSqSelectorModel.prototype.write = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'write',
    //     returnType: MLWriter
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    ChiSqSelectorModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: ChiSqSelectorModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelectorModel.load = function(path) {
      var args = {
        target: Bucketizer,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelectorModel
      };

      return Utils.generate(args);
    };

    ChiSqSelectorModel.moduleLocation = '/ml/feature/ChiSqSelectorModel';

    return ChiSqSelectorModel;
  })();
};