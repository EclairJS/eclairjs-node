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

    var ProbabilisticClassifier = require('../classification/ProbabilisticClassifier')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * {@link http://en.wikipedia.org/wiki/Random_forest  Random Forest} learning algorithm for
     * classification.
     * It supports both binary and multiclass labels, as well as both continuous and categorical
     * features.
     * @class
     * @extends module:eclairjs/ml/classification.ProbabilisticClassifier
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    function RandomForestClassifier() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    RandomForestClassifier.prototype = Object.create(ProbabilisticClassifier.prototype);

    RandomForestClassifier.prototype.constructor = RandomForestClassifier;

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMaxDepth = function(value) {
      var args = {
        target: this,
        method: 'setMaxDepth',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMaxBins = function(value) {
      var args = {
        target: this,
        method: 'setMaxBins',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMinInstancesPerNode = function(value) {
      var args = {
        target: this,
        method: 'setMinInstancesPerNode',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMinInfoGain = function(value) {
      var args = {
        target: this,
        method: 'setMinInfoGain',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setMaxMemoryInMB = function(value) {
      var args = {
        target: this,
        method: 'setMaxMemoryInMB',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setCacheNodeIds = function(value) {
      var args = {
        target: this,
        method: 'setCacheNodeIds',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setCheckpointInterval = function(value) {
      var args = {
        target: this,
        method: 'setCheckpointInterval',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setImpurity = function(value) {
      var args = {
        target: this,
        method: 'setImpurity',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setSubsamplingRate = function(value) {
      var args = {
        target: this,
        method: 'setSubsamplingRate',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setNumTrees = function(value) {
      var args = {
        target: this,
        method: 'setNumTrees',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.setFeatureSubsetStrategy = function(value) {
      var args = {
        target: this,
        method: 'setFeatureSubsetStrategy',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.RandomForestClassifier}
     */
    RandomForestClassifier.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: RandomForestClassifier
      };

      return Utils.generate(args);
    };


    /**
     * Param for raw prediction (a.k.a. confidence) column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    RandomForestClassifier.prototype.rawPredictionCol = function () {
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
    RandomForestClassifier.prototype.getRawPredictionCol = function () {
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
    RandomForestClassifier.prototype.labelCol = function () {
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
    RandomForestClassifier.prototype.getLabelCol = function () {
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
    RandomForestClassifier.prototype.featuresCol = function () {
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
    RandomForestClassifier.prototype.getFeaturesCol = function () {
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
    RandomForestClassifier.prototype.predictionCol = function () {
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
    RandomForestClassifier.prototype.getPredictionCol = function () {
      var args = {
        target: this,
        method: 'getPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {RandomForestClassifier}
     */
    RandomForestClassifier.load = function(path) {
      var RandomForestClassifier = require('../../ml/classification/RandomForestClassifier.js');
      var args ={
        target: RandomForestClassifier,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: RandomForestClassifier

      };

      return Utils.generate(args);
    };

    RandomForestClassifier.moduleLocation = '/ml/classification/RandomForestClassifier';

    return RandomForestClassifier;
  })();
};