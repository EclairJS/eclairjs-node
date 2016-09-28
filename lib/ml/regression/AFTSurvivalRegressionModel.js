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
     * :: Experimental ::
     * Model produced by {@link AFTSurvivalRegression}.
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml/util.MLWritable
     */
    function AFTSurvivalRegressionModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.setPredictionCol = function(value) {
      var args = {
        target: this,
        method: 'setPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {number[]} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.setQuantileProbabilities = function(value) {
      var args = {
        target: this,
        method: 'setQuantileProbabilities',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegressionModel
      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.setQuantilesCol = function(value) {
      var args = {
        target: this,
        method: 'setQuantilesCol',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegressionModel
      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/mllib/linalg.Vector} features
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    AFTSurvivalRegressionModel.prototype.predictQuantiles = function(features) {
      var Vector = require('../../mllib/linalg/Vector.js');

      var args = {
        target: this,
        method: 'predictQuantiles',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/mllib/linalg.Vector} features
     * @returns {Promise.<number>}
     */
    AFTSurvivalRegressionModel.prototype.predict = function(features) {
      var args = {
        target: this,
        method: 'predict',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    AFTSurvivalRegressionModel.prototype.transform = function(dataset) {
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
    AFTSurvivalRegressionModel.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {MLWriter}
     */
    AFTSurvivalRegressionModel.prototype.write = function() {
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
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>
     */
    AFTSurvivalRegressionModel.prototype.uid = function() {
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
    AFTSurvivalRegressionModel.prototype.coefficients = function() {
      var Vector = require('../../mllib/linalg/Vector.js');

      var args = {
        target: this,
        method: 'coefficients',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<Number>
     */
    AFTSurvivalRegressionModel.prototype.intercept = function() {
      var args = {
        target: this,
        method: 'intercept',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<Number>
     */
    AFTSurvivalRegressionModel.prototype.scale = function() {
      var args = {
        target: this,
        method: 'scale',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Param for censor column name. The value of this column could be 0 or 1.
     * If the value is 1, it means the event has occurred i.e. uncensored; otherwise censored.
     * @returns {module:eclairjs/ml/param.Param}
     */
    AFTSurvivalRegressionModel.prototype.censorCol = function() {
      var Param = require('../param/Param')();

      var args = {
        target: this,
        method: 'censorCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>
     */
    AFTSurvivalRegressionModel.prototype.getCensorCol = function() {
      var args = {
        target: this,
        method: 'getCensorCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Param for quantile probabilities array. Values of the quantile probabilities array should be in the range (0, 1) and the array should be non-empty.
     * @returns {DoubleArrayParam}
     */
    AFTSurvivalRegressionModel.prototype.quantileProbabilities = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * @returns {Promise.<Number[]>
     */
    AFTSurvivalRegressionModel.prototype.getQuantileProbabilities = function() {
      var args = {
        target: this,
        method: 'getQuantileProbabilities',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * Param for quantiles column name. This column will output quantiles of corresponding quantileProbabilities if it is set.
     * @returns {module:eclairjs/ml/param.Param}
     */
    AFTSurvivalRegressionModel.prototype.quantilesCol = function() {
      var Param = require('../param/Param')();

      var args = {
        target: this,
        method: 'quantilesCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>
     */
    AFTSurvivalRegressionModel.prototype.getQuantilesCol = function() {
      var args = {
        target: this,
        method: 'getQuantilesCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Checks whether the input has quantiles column name.
     * @returns {Promise.<boolean>
     */
    AFTSurvivalRegressionModel.prototype.hasQuantilesCol = function() {
      var args = {
        target: this,
        method: 'hasQuantilesCol',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema  input schema
     * @param {boolean} fitting whether this is in fitting or prediction
     * @returns {module:eclairjs/sql/types.StructType}
     */
    AFTSurvivalRegressionModel.prototype.validateAndTransformSchema = function (schema, fitting) {
      var StructType = require('../../sql/types/StructType.js')();

      var args = {
        target: this,
        method: 'validateAndTransformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @returns {MLReader}
     */
    AFTSurvivalRegressionModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: AFTSurvivalRegressionModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegressionModel.load = function(path) {
      var args = {
        target: AFTSurvivalRegressionModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: AFTSurvivalRegressionModel
      };

      return Utils.generate(args);
    };

    AFTSurvivalRegressionModel.moduleLocation = '/ml/regression/AFTSurvivalRegressionModel';

    return AFTSurvivalRegressionModel;
  })();
};