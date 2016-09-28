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

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Gradient-Boosted Trees (GBTs) (http://en.wikipedia.org/wiki/Gradient_boosting)
     * learning algorithm for classification.
     * It supports binary labels, as well as both continuous and categorical features.
     * Note: Multiclass labels are not currently supported.
     *
     * The implementation is based upon: J.H. Friedman. "Stochastic Gradient Boosting." 1999.
     *
     * Notes on Gradient Boosting vs. TreeBoost:
     *  - This implementation is for Stochastic Gradient Boosting, not for TreeBoost.
     *  - Both algorithms learn tree ensembles by minimizing loss functions.
     *  - TreeBoost (Friedman, 1999) additionally modifies the outputs at tree leaf nodes
     *    based on the loss function, whereas the original gradient boosting method does not.
     *  - We expect to implement TreeBoost in the future:
     *    [https://issues.apache.org/jira/browse/SPARK-4240]
     * @class
     * @extends module:eclairjs/ml.Predictor
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    function GBTClassifier() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    GBTClassifier.prototype = Object.create(Predictor.prototype);

    GBTClassifier.prototype.constructor = GBTClassifier;

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMaxDepth = function(value) {
      var args = {
        target: this,
        method: 'setMaxDepth',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMaxBins = function(value) {
      var args = {
        target: this,
        method: 'setMaxBins',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMinInstancesPerNode = function(value) {
      var args = {
        target: this,
        method: 'setMinInstancesPerNode',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMinInfoGain = function(value) {
      var args = {
        target: this,
        method: 'setMinInfoGain',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMaxMemoryInMB = function(value) {
      var args = {
        target: this,
        method: 'setMaxMemoryInMB',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setCacheNodeIds = function(value) {
      var args = {
        target: this,
        method: 'setCacheNodeIds',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setCheckpointInterval = function(value) {
      var args = {
        target: this,
        method: 'setCheckpointInterval',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * The impurity setting is ignored for GBT models.
     * Individual trees are built using impurity "Variance."
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setImpurity = function(value) {
      var args = {
        target: this,
        method: 'setImpurity',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setSubsamplingRate = function(value) {
      var args = {
        target: this,
        method: 'setSubsamplingRate',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setMaxIter = function(value) {
      var args = {
        target: this,
        method: 'setMaxIter',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setStepSize = function(value) {
      var args = {
        target: this,
        method: 'setStepSize',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.setLossType = function(value) {
      var args = {
        target: this,
        method: 'setLossType',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.GBTClassifier}
     */
    GBTClassifier.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: GBTClassifier
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {GBTClassifier}
     */
    GBTClassifier.load = function(path) {
      var args ={
        target: GBTClassifier,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: GBTClassifier

      };

      return Utils.generate(args);
    };

    GBTClassifier.moduleLocation = '/ml/classification/GBTClassifier';

    return GBTClassifier;
  })();
};