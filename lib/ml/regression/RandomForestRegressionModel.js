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

    var PredictionModel = require('../PredictionModel')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * [Random Forest]{@link http://en.wikipedia.org/wiki/Random_forest}  model for regression.
     * It supports both continuous and categorical features.
     * @class
     * @extends module:eclairjs/ml.PredictionModel
     * @memberof module:eclairjs/ml/regression
     */
    function RandomForestRegressionModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    RandomForestRegressionModel.prototype = Object.create(PredictionModel.prototype);

    RandomForestRegressionModel.prototype.constructor = RandomForestRegressionModel;

    /**
     * @returns {module:eclairjs/ml/tree.DecisionTreeRegressionModel[]}
     */
    RandomForestRegressionModel.prototype.trees = function() {
      var DecisionTreeRegressionModel = require('../../mllib/tree/model/DecisionTreeRegressionModel')();

      var args = {
        target: this,
        method: 'trees',
        args: Utils.wrapArguments(arguments),
        returnType: [DecisionTreeRegressionModel]
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<number[]>}
     */
    RandomForestRegressionModel.prototype.treeWeights = function() {
      var args = {
        target: this,
        method: 'treeWeights',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.RandomForestRegressionModel}
     */
    RandomForestRegressionModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    RandomForestRegressionModel.prototype.toString = function() {
      var args = {
        target: this,
        method: 'toString',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Estimate of the importance of each feature.
     * This generalizes the idea of "Gini" importance to other losses, following the explanation of Gini importance
     * from "Random Forests" documentation by Leo Breiman and Adele Cutler, and following the implementation from scikit-learn.
     * This feature importance is calculated as follows: - Average over trees: - importance(feature j) = sum (over nodes which split on feature j)
     * of the gain, where gain is scaled by the number of instances passing through node - Normalize importances for
     * tree based on total number of training instances used to build tree. - Normalize feature importance vector to sum to 1.
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    RandomForestRegressionModel.prototype.featureImportances = function() {
      var Vector = require('../../mllib/linalg/Vector');

      var args = {
        target: this,
        method: 'featureImportances',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
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
    RandomForestRegressionModel.prototype.validateAndTransformSchema = function(schema, fitting, featuresDataType) {
      var StructType = require('../../sql/types/StructType')();

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
    RandomForestRegressionModel.prototype.labelCol = function() {
      var Param = require('../param/Param')();

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
    RandomForestRegressionModel.prototype.getLabelCol = function() {
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
    RandomForestRegressionModel.prototype.featuresCol = function() {
      var Param = require('../param/Param')();

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
    RandomForestRegressionModel.prototype.getFeaturesCol = function() {
      var args = {
        target: this,
        method: 'getFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestRegressionModel.prototype.predictionCol = function() {
      var Param = require('../param/Param')();

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
    RandomForestRegressionModel.prototype.getPredictionCol = function() {
      var args = {
        target: this,
        method: 'getPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {MLWriter}
     */
    RandomForestRegressionModel.prototype.write = function() {
      var MLWriter = require('../../ml/util/MLWriter.js');
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
    RandomForestRegressionModel.read = function() {
      var MLReader = require('../../ml/util/MLReader.js');
      var args ={
        target: RandomForestRegressionModel,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {RandomForestRegressionModel}
     */
    RandomForestRegressionModel.load = function(path) {
      var args ={
        target: RandomForestRegressionModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: RandomForestRegressionModel

      };

      return Utils.generate(args);
    };



    RandomForestRegressionModel.moduleLocation = '/ml/regression/RandomForestRegressionModel';

    return RandomForestRegressionModel;
  })();
};