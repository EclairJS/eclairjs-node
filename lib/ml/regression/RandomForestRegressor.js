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

    var Predictor = require('../Predictor')();
    var StructType = require('../../sql/types/StructType')();
    var Param = require('../param/Param')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * [Random Forest]{@link http://en.wikipedia.org/wiki/Random_forest} learning algorithm for regression.
     * It supports both continuous and categorical features.
     * @class
     * @extends module:eclairjs/ml.Predictor
     * @memberof module:eclairjs/ml/regression
     * @param {string} [uid]
     */
    function RandomForestRegressor() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    RandomForestRegressor.prototype = Object.create(Predictor.prototype);

    RandomForestRegressor.prototype.constructor = RandomForestRegressor;

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setMaxDepth = function(value) {
      var args = {
        target: this,
        method: 'setMaxDepth',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setMaxBins = function(value) {
      var args = {
        target: this,
        method: 'setMaxBins',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setMinInstancesPerNode = function(value) {
      var args = {
        target: this,
        method: 'setMinInstancesPerNode',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setMinInfoGain = function(value) {
      var args = {
        target: this,
        method: 'setMinInfoGain',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setMaxMemoryInMB = function(value) {
      var args = {
        target: this,
        method: 'setMaxMemoryInMB',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setCacheNodeIds = function(value) {
      var args = {
        target: this,
        method: 'setCacheNodeIds',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setCheckpointInterval = function(value) {
      var args = {
        target: this,
        method: 'setCheckpointInterval',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setImpurity = function(value) {
      var args = {
        target: this,
        method: 'setImpurity',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setSubsamplingRate = function(value) {
      var args = {
        target: this,
        method: 'setSubsamplingRate',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setNumTrees = function(value) {
      var args = {
        target: this,
        method: 'setNumTrees',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.setFeatureSubsetStrategy = function(value) {
      var args = {
        target: this,
        method: 'setFeatureSubsetStrategy',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.RandomForestRegressor}
     */
    RandomForestRegressor.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressor
      };

      return Utils.generate(args);
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    RandomForestRegressor.prototype.validateAndTransformSchema = function(schema, fitting, featuresDataType) {
      var args = {
        target: this,
        method: 'validateAndTransformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressor.prototype.labelCol = function() {
      var args = {
        target: this,
        method: 'labelCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    RandomForestRegressor.prototype.getLabelCol = function() {
      var args = {
        target: this,
        method: 'getLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressor.prototype.featuresCol = function() {
      var args = {
        target: this,
        method: 'featuresCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    RandomForestRegressor.prototype.getFeaturesCol = function() {
      var args = {
        target: this,
        method: 'getFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);};

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressor.prototype.predictionCol = function() {
      var args = {
        target: this,
        method: 'predictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    RandomForestRegressor.prototype.getPredictionCol = function() {
      var args = {
        target: this,
        method: 'getPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml/regression.RandomForestRegressionModel}
     */
    RandomForestRegressor.prototype.fit = function(dataset) {
      var RandomForestRegressionModel = require('./RandomForestRegressionModel.js')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressionModel
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {RandomForestRegressor}
     */
    RandomForestRegressor.load = function(path) {
      var args ={
        target: RandomForestRegressor,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: RandomForestRegressor

      };

      return Utils.generate(args);
    };



    /**
     * Accessor for supported impurity settings: entropy, gini
     * @returns {Promise.<string[]>}
     */
    RandomForestRegressor.supportedImpurities = function() {
      var args = {
        target: RandomForestRegressor,
        method: 'supportedImpurities',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: [String]
      };

      return Utils.generate(args);
    };

    /**
     * Accessor for supported featureSubsetStrategy settings: auto, all, onethird, sqrt, log2
     * @returns {Promise.<string[]>}
     */
    RandomForestRegressor.supportedFeatureSubsetStrategies = function() {
      var args = {
        target: RandomForestRegressor,
        method: 'supportedFeatureSubsetStrategies',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: [String]
      };

      return Utils.generate(args);
    };

    RandomForestRegressor.moduleLocation = '/ml/regression/RandomForestRegressor';

    return RandomForestRegressor;
  })();
};