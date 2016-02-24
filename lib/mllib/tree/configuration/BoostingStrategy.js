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

var Utils = require('../../../utils.js');

var Strategy = require('./Strategy.js');
var Loss = require('../loss/Loss.js');

var gKernelP;

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
 * @param {Strategy} treeStrategy
 * @param {Loss} loss
 * @param {number} numIterations
 * @param {number} learningRate
 * @param {number} validationTol
 * @class
 */
function BoostingStrategy() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = 'var {{refId}} = new BoostingStrategy({{treeStrategy}}, {{loss}}, {{numIterations}}, {{learningRate}}, {{validationTol}});';

    this.refIdP = Utils.evaluate(gKernelP, BoostingStrategy, templateStr, {treeStrategy: Utils.prepForReplacement(arguments[0]), loss: Utils.prepForReplacement(arguments[1]), numIterations: arguments[2], learningRate: arguments[3], validationTol: arguments[4]}, true);
  }
}

/**
 *
 * @returns {Strategy}
 */
BoostingStrategy.prototype.getTreeStrategy = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.getTreeStrategy();';

  return Utils.generateAssignment(this, Strategy, templateStr);
};

/**
 *
 * @param {Strategy} strategy
 * @returns {Promise.<void>}
 */
BoostingStrategy.prototype.setTreeStrategy = function(strategy) {
  var templateStr = '{{inRefId}}.setTreeStrategy({{strategy}});';

  return Utils.generateVoidPromise(this, templateStr, {strategy: Utils.prepForReplacement(strategy)});
};

/**
 *
 * @returns {Loss}
 */
BoostingStrategy.prototype.getLoss = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.getLoss();';

  return Utils.generateAssignment(this, Loss, templateStr);
};

/**
 *
 * @param {Loss} loss
 * @returns {Promise.<void>}
 */
BoostingStrategy.prototype.setLoss = function(loss) {
  var templateStr = '{{inRefId}}.setLoss({{loss}});';

  return Utils.generateVoidPromise(this, templateStr, {loss: Utils.prepForReplacement(loss)});
};

/**
 *
 * @returns {Promise.<Number>}
 */
BoostingStrategy.prototype.getNumIterations = function() {
  function _resolve(result, resolve, reject) {
    resolve(parseInt(result));
  }

  var templateStr = '{{inRefId}}.getNumIterations();';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 *
 * @param {integer} num
 * @returns {Promise.<void>}
 */
BoostingStrategy.prototype.setNumIterations = function(num) {
  var templateStr = '{{inRefId}}.setNumIterations({{num}});';

  return Utils.generateVoidPromise(this, templateStr, {num: Utils.prepForReplacement(num)});
};

/**
 * @returns {Promise.<Number>}
 */
BoostingStrategy.prototype.getLearningRate = function() {
  function _resolve(result, resolve, reject) {
    resolve(parseFloat(result));
  }

  var templateStr = '{{inRefId}}.getLearningRate();';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};
/**
 *
 * @param {float} rate
 * @returns {Promise.<void>}
 */
BoostingStrategy.prototype.setLearningRate = function(rate) {
  var templateStr = '{{inRefId}}.setLearningRate({{rate}});';

  return Utils.generateVoidPromise(this, templateStr, {rate: Utils.prepForReplacement(rate)});
};

/**
 * @returns {Promise.<Number>}
 */
BoostingStrategy.prototype.getValidationTol = function() {
  function _resolve(result, resolve, reject) {
    resolve(parseFloat(result));
  }

  var templateStr = '{{inRefId}}.getValidationTol();';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 *
 * @param {float} tol
 * @returns {Promise.<void>}
 */
BoostingStrategy.prototype.setValidationTol = function(tol) {
  var templateStr = '{{inRefId}}.setValidationTol({{tol}});';

  return Utils.generateVoidPromise(this, templateStr, {tol: Utils.prepForReplacement(tol)});
};

//
// static methods
//


/**
 * Returns default configuration for the boosting algorithm
 * @param {string} algo  Learning goal.  Supported: "Classification" or "Regression"
 * @returns {BoostingStrategy}  Configuration for boosting algorithm
 */
BoostingStrategy.defaultParams = function(algo) {
  var templateStr = 'var {{refId}} = BoostingStrategy.defaultParams({{algo}});';

  return Utils.evaluate(gKernelP, BoostingStrategy, templateStr, {algo: Utils.prepForReplacement(algo)});
};

module.exports = function(kP) {
  gKernelP = kP;

  return BoostingStrategy;
};