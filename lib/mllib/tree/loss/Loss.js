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

/**
 * Trait for adding "pluggable" loss functions for the gradient boosting algorithm.
 * @classdesc
 */

/**
 *  @class
 *  @memberof module:eclairjs/mllib/tree/loss
 */
function Loss(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Method to calculate the gradients for the gradient boosting calculation.
 * @param {float} prediction
 * @param {float} label
 * @returns {Promise.<Number>}
 */
Loss.prototype.gradient = function(prediction, label) {
  var args = {
    target: this,
    method: 'gradient',
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * If TreeEnsembleModel, RDD parameters are supplied:
 * Method to calculate error of the base learner for the gradient boosting calculation or
 * Note: This method is not used by the gradient boosting algorithm but is useful for debugging purposes.
 * If float, float parameters are supplied:
 * Method to calculate loss when the predictions are already known.
 * Note: This method is used in the method evaluateEachIteration to avoid recomputing the predicted values from previously fit trees.
 * @param {TreeEnsembleModel | float} modelOrPrediction Model of the weak learner or predicted label (predict only valid with label param).
 * @param {module:eclairjs/rdd.RDD | float} dataOrLabel Training dataset: RDD of LabeledPoint or true label (use of label only valid with prediction param).
 * @returns {Promise.<Number>}
 */
Loss.prototype.computeError = function (modelOrPrediction, dataOrLabel) {
  var args = {
    target: this,
    method: 'computeError',
    returnType: Number
  };

  return Utils.generate(args);
};

Loss.moduleLocation = '/mllib/tree/loss/Loss';

module.exports = Loss;