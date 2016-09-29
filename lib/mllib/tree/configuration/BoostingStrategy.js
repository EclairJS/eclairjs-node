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
    var Utils = require('../../../utils.js');

    var Loss = require('../loss/Loss.js');

    var gKernelP = kernelP;

    /**
     * Configuration options for {@link GradientBoostedTrees}.
     *
     * @param treeStrategy Parameters for the tree algorithm. We support regression and binary
     *                     classification for boosting. Impurity setting will be ignored.
     * @param loss Loss function used for minimization during gradient boosting.
     * @param numIterations Number of iterations of boosting.  In other words, the number of
     *                      weak hypotheses used in the final model.
     * @param learningRate Learning rate for shrinking the contribution of each estimator. The
     *                     learning rate should be between in the interval (0, 1]
     * @param validationTol validationTol is a condition which decides iteration termination when
     *                      runWithValidation is used.
     *                      The end of iteration is decided based on below logic:
     *                      If the current loss on the validation set is > 0.01, the diff
     *                      of validation error is compared to relative tolerance which is
     *                      validationTol * (current loss on the validation set).
     *                      If the current loss on the validation set is <= 0.01, the diff
     *                      of validation error is compared to absolute tolerance which is
     *                      validationTol * 0.01.
     *                      Ignored when
     *                      [[org.apache.spark.mllib.tree.GradientBoostedTrees.run()]] is used.
     * @classdesc
     */

    /**
     * @param {module:eclairjs/mllib/tree/configuration.Strategy} treeStrategy
     * @param {module:eclairjs/mllib/tree/loss.Loss} loss
     * @param {number} numIterations
     * @param {number} learningRate
     * @param {number} validationTol
     * @class
     * @memberof module:eclairjs/mllib/tree/configuration
     */
    function BoostingStrategy() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     *
     * @returns {module:eclairjs/mllib/tree/configuration.Strategy}
     */
    BoostingStrategy.prototype.getTreeStrategy = function() {
      var Strategy = require('./Strategy.js')();

      var args = {
        target: this,
        method: 'getTreeStrategy',
        returnType: Strategy
      };

      return Utils.generate(args);
    };

    /**
     *
     * @param {module:eclairjs/mllib/tree/configuration.Strategy} strategy
     * @returns {Promise.<void>}
     */
    BoostingStrategy.prototype.setTreeStrategy = function(strategy) {
      var args = {
        target: this,
        method: 'setTreeStrategy',
        args: Utils.wrapArguments(arguments)
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/mllib/tree/loss.Loss}
     */
    BoostingStrategy.prototype.getLoss = function() {
      var args = {
        target: this,
        method: 'getLoss',
        returnType: Loss
      };

      return Utils.generate(args);
    };

    /**
     *
     * @param {module:eclairjs/mllib/tree/loss.Loss} loss
     * @returns {Promise.<void>}
     */
    BoostingStrategy.prototype.setLoss = function(loss) {
      var args = {
        target: this,
        method: 'setLoss',
        args: Utils.wrapArguments(arguments)
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<Number>}
     */
    BoostingStrategy.prototype.getNumIterations = function() {
      var args = {
        target: this,
        method: 'getNumIterations',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     *
     * @param {integer} num
     * @returns {Promise.<void>}
     */
    BoostingStrategy.prototype.setNumIterations = function(num) {
      var args = {
        target: this,
        method: 'setNumIterations',
        args: Utils.wrapArguments(arguments)
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<Number>}
     */
    BoostingStrategy.prototype.getLearningRate = function() {
      var args = {
        target: this,
        method: 'getLearningRate',
        returnType: Number
      };

      return Utils.generate(args);
    };
    /**
     *
     * @param {float} rate
     * @returns {Promise.<void>}
     */
    BoostingStrategy.prototype.setLearningRate = function(rate) {
      var args = {
        target: this,
        method: 'setLearningRate',
        args: Utils.wrapArguments(arguments)
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<Number>}
     */
    BoostingStrategy.prototype.getValidationTol = function() {
      var args = {
        target: this,
        method: '*/',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     *
     * @param {float} tol
     * @returns {Promise.<void>}
     */
    BoostingStrategy.prototype.setValidationTol = function(tol) {
      var args = {
        target: this,
        method: 'setLearningRate',
        args: Utils.wrapArguments(arguments)
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * Returns default configuration for the boosting algorithm
     * @param {string} algo  Learning goal.  Supported: "Classification" or "Regression"
     * @returns {module:eclairjs/mllib/tree/configuration.BoostingStrategy}  Configuration for boosting algorithm
     */
    BoostingStrategy.defaultParams = function(algo) {
      var args = {
        target: BoostingStrategy,
        method: 'defaultParams',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: BoostingStrategy
      };

      return Utils.generate(args);
    };

    BoostingStrategy.moduleLocation = '/mllib/tree/configuration/BoostingStrategy';

    return BoostingStrategy;
  })();
};