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

    var ProbabilisticClassificationModel = require('./ProbabilisticClassificationModel')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * [Random Forest]{@link http://en.wikipedia.org/wiki/Random_forest} model for classification.
     * It supports both binary and multiclass labels, as well as both continuous and categorical
     * features.
     * @class
     * @extends module:eclairjs/ml/classification.ProbabilisticClassificationModel
     * @memberof module:eclairjs/ml/classification
     */
    function RandomForestClassificationModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    RandomForestClassificationModel.prototype = Object.create(ProbabilisticClassificationModel.prototype);

    RandomForestClassificationModel.prototype.constructor = RandomForestClassificationModel;

    /**
     * @returns {module:eclairjs/ml/tree.DecisionTreeModel[]}
     */
    RandomForestClassificationModel.prototype.trees = function() {
      var DecisionTreeModel = require('../../mllib/tree/model/DecisionTreeModel')();

      var args = {
        target: this,
        method: 'trees',
        args: Utils.wrapArguments(arguments),
        returnType: [DecisionTreeModel]
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<number[]>}
     */
    RandomForestClassificationModel.prototype.treeWeights = function() {
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
     * @returns {module:eclairjs/ml/classification.RandomForestClassificationModel}
     */
    RandomForestClassificationModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassificationModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    RandomForestClassificationModel.prototype.toString = function() {
      var args = {
        target: this,
        method: 'toString',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    RandomForestClassificationModel.prototype.toDebugString = function () {
      return this.getJavaObject().toDebugString();
    };

    /**
     * Estimate of the importance of each feature.
     * This generalizes the idea of "Gini" importance to other losses, following the explanation of Gini importance
     * from "Random Forests" documentation by Leo Breiman and Adele Cutler, and following the implementation from scikit-learn.
     * This feature importance is calculated as follows: - Average over trees: - importance(feature j) = sum
     * (over nodes which split on feature j) of the gain, where gain is scaled by the number of instances passing
     * through node - Normalize importances for tree based on total number of training instances used to build tree. -
     * Normalize feature importance vector to sum to 1.
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    RandomForestClassificationModel.prototype.featureImportances = function () {
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
     * Param for raw prediction (a.k.a. confidence) column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassificationModel.prototype.rawPredictionCol = function () {
      var Param = require('../param/Param')();

      var args = {
        target: this,
        method: 'rawPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    RandomForestClassificationModel.prototype.getRawPredictionCol = function () {
      var args = {
        target: this,
        method: 'getRawPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassificationModel.prototype.labelCol = function () {
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
    RandomForestClassificationModel.prototype.getLabelCol = function () {
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
    RandomForestClassificationModel.prototype.featuresCol = function () {
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
    RandomForestClassificationModel.prototype.getFeaturesCol = function () {
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
    RandomForestClassificationModel.prototype.predictionCol = function () {
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
    RandomForestClassificationModel.prototype.getPredictionCol = function () {
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
    RandomForestClassificationModel.prototype.write = function() {
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
    RandomForestClassificationModel.read = function() {
      var MLReader = require('../../ml/util/MLReader.js');
      var args ={
        target: RandomForestClassificationModel,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {RandomForestClassificationModel}
     */
    RandomForestClassificationModel.load = function(path) {
      var RandomForestClassificationModel = require('../../ml/classification/RandomForestClassificationModel.js');
      var args ={
        target: RandomForestClassificationModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: RandomForestClassificationModel

      };

      return Utils.generate(args);
    };

    RandomForestClassificationModel.moduleLocation = '/ml/classification/RandomForestClassificationModel';

    return RandomForestClassificationModel;
  })();
};