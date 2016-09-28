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
     * [Decision tree]{@link http://en.wikipedia.org/wiki/Decision_tree_learning} learning algorithm
     * for classification.
     * It supports both binary and multiclass labels, as well as both continuous and categorical
     * features.
     * @class
     * @extends module:eclairjs/ml.PipelineStage
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    function DecisionTreeClassifier() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    DecisionTreeClassifier.prototype = Object.create(PipelineStage.prototype);

    DecisionTreeClassifier.prototype.constructor = DecisionTreeClassifier;

    /**
     * Accessor for supported impurities: entropy, gini
     * @returns {Promise.<string[]>}
     */
    DecisionTreeClassifier.prototype.supportedImpurities = function() {
      var args = {
        target: this,
        method: 'supportedImpurities',
        args: Utils.wrapArguments(arguments),
        returnType: [String]
      };

      return Utils.generate(args);
    };

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string[]>}
     */
    DecisionTreeClassifier.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.setMaxDepth = function(value) {
      var args = {
        target: this,
        method: 'setMaxDepth',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.setMaxBins = function(value) {
      var args = {
        target: this,
        method: 'setMaxBins',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.setMinInstancesPerNode = function(value) {
      var args = {
        target: this,
        method: 'setMinInstancesPerNode',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.setMinInfoGain = function(value) {
      var args = {
        target: this,
        method: 'setMinInfoGain',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.setMaxMemoryInMB = function(value) {
      var args = {
        target: this,
        method: 'setMaxMemoryInMB',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.setCacheNodeIds = function(value) {
      var args = {
        target: this,
        method: 'setCacheNodeIds',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.setCheckpointInterval = function(value) {
      var args = {
        target: this,
        method: 'setCheckpointInterval',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.setImpurity = function(value) {
      var args = {
        target: this,
        method: 'setImpurity',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier} value
     */
    DecisionTreeClassifier.prototype.setLabelCol = function(value) {
      var args = {
        target: this,
        method: 'setLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier} value
     */
    DecisionTreeClassifier.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.DecisionTreeClassifier}
     */
    DecisionTreeClassifier.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeClassifier
      };

      return Utils.generate(args);
    };

    DecisionTreeClassifier.moduleLocation = '/ml/classification/DecisionTreeClassifier';

    return DecisionTreeClassifier;
  })();
};