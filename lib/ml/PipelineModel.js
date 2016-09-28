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
    var Utils = require('../utils.js');

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Represents a fitted pipeline.
     * @class
     * @extends module:eclairjs/ml.Model
     * @memberof module:eclairjs/ml
     */
    function PipelineModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    PipelineModel.prototype.validateParams = function() {
      var args = {
        target: this,
        method: 'validateParams',
        args: Utils.wrapArguments(arguments),
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * Transforms the input dataset.
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    PipelineModel.prototype.transform = function(dataset) {
      var Dataset = require('../sql/Dataset.js');

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
    PipelineModel.prototype.transformSchema = function(schema) {
      var StructType = require('../sql/types/StructType')();

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
     * @returns {module:eclairjs/ml.PipelineModel}
     */
    PipelineModel.prototype.copy = function(extra) {
      var StructType = require('../sql/types/StructType')();

      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: PipelineModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {MLWriter}
     */
    PipelineModel.prototype.write = function() {
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
     * @returns {MLReader}
     */
    PipelineModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: PipelineModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml.PipelineModel}
     */
    PipelineModel.load = function(path) {
      var args = {
        target: PipelineModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: PipelineModel
      };

      return Utils.generate(args);
    };

    PipelineModel.moduleLocation = '/ml/PipelineModel';

    return PipelineModel;
  })();
};