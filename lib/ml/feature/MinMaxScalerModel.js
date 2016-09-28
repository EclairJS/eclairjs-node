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

    var Model = require('../Model')();

    var Vector = require('../../mllib/linalg/Vector')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Model fitted by {@link module:eclairjs/ml.MinMaxScaler}.
     *
     *
     * TODO: The transformer does not yet set the metadata in the output column (SPARK-8529).
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Model
     */
    function MinMaxScalerModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    MinMaxScalerModel.prototype = Object.create(Model.prototype);

    MinMaxScalerModel.prototype.constructor = MinMaxScalerModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    MinMaxScalerModel.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    MinMaxScalerModel.prototype.originalMin = function() {
      var args = {
        target: this,
        method: 'originalMin',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    MinMaxScalerModel.prototype.originalMax = function () {
      var args = {
        target: this,
        method: 'originalMax',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScalerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScalerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.setMin = function(value) {
      var args = {
        target: this,
        method: 'setMin',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScalerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.setMax = function(value) {
      var args = {
        target: this,
        method: 'setMax',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScalerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    MinMaxScalerModel.prototype.transform = function(dataset) {
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
    MinMaxScalerModel.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScalerModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {MLWriter}
     */
    MinMaxScalerModel.prototype.write = function() {
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


    /**
     * lower bound after transformation, shared by all features Default: 0.0
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    MinMaxScalerModel.prototype.min = function() {
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
    MinMaxScalerModel.prototype.getMin = function () {
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
    MinMaxScalerModel.prototype.max = function() {
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
    MinMaxScalerModel.prototype.getMax = function () {
      return this.getJavaObject().getMax();
    };

    //
    // static methods
    //

    /**
     * @returns {MLReader}
     */
    MinMaxScalerModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: MinMaxScalerModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.MinMaxScalerModel}
     */
    MinMaxScalerModel.load = function(path) {
      var args = {
        target: MinMaxScalerModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: MinMaxScalerModel
      };

      return Utils.generate(args);
    };

    MinMaxScalerModel.moduleLocation = '/ml/feature/MinMaxScalerModel';

    return MinMaxScalerModel;
  })();
};