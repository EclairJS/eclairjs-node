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

    var PipelineStage = require('../PipelineStage.js')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Model fitted by {@link VectorIndexer}. Transform categorical features to use 0-based indices
     * instead of their original values.
     *  - Categorical features are mapped to indices.
     *  - Continuous features (columns) are left unchanged.
     * This also appends metadata to the output column, marking features as Numeric (continuous),
     * Nominal (categorical), or Binary (either continuous or categorical).
     * Non-ML metadata is not carried over from the input to the output column.
     *
     * This maintains vector sparsity.
     *
     * @param numFeatures  Number of features, i.e., length of Vectors which this transforms
     * @param categoryMaps  Feature value index.  Keys are categorical feature indices (column indices).
     *                      Values are maps from original features values to 0-based category indices.
     *                      If a feature is not in this map, it is treated as continuous.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.PipelineStage
     */
    function VectorIndexerModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    VectorIndexerModel.prototype = Object.create(PipelineStage.prototype);

    VectorIndexerModel.prototype.constructor = VectorIndexerModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    VectorIndexerModel.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<integer>}
     */
    VectorIndexerModel.prototype.numFeatures = function () {
      var args = {
        target: this,
        method: 'numFeatures',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<object>} Map object<integer,object<float,integer>>
     */
    VectorIndexerModel.prototype.categoryMaps = function () {
      var args = {
        target: this,
        method: 'categoryMaps',
        args: Utils.wrapArguments(arguments),
        stringify: true,
        returnType: Object
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexerModel.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexerModel.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    VectorIndexerModel.prototype.transform = function(dataset) {
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
    VectorIndexerModel.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexerModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexerModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {MLWriter}
     */
    VectorIndexerModel.prototype.write = function() {
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
    VectorIndexerModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: VectorIndexerModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexerModel.load = function(path) {
      var args = {
        target: VectorIndexerModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexerModel
      };

      return Utils.generate(args);
    };

    VectorIndexerModel.moduleLocation = '/ml/feature/VectorIndexerModel';

    return VectorIndexerModel;
  })();
};