/*
 * Copyright 2015 IBM Corp.
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

var Utils = require('../../utils.js');

var gKernelP;

/**
 * Classification model trained using Multinomial/Binary Logistic Regression.
 * @classdesc
 * @param {Vector} weights Weights computed for every feature. param: intercept Intercept computed for this model.
 * (Only used in Binary Logistic Regression. In Multinomial Logistic Regression, the intercepts will not be a single value,
 * so the intercepts will be part of the weights.)
 * @param {float} intercept
 * @parma {integer} numFeatures the dimension of the features.
 * @param {integer} numClasses the number of possible outcomes for k classes classification problem in Multinomial Logistic Regression.
 * By default, it is binary logistic regression so numClasses will be set to 2.
 * @constructor
 */
function LogisticRegressionModel() {
  if (arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = arguments.length == 4 ? 'var {{refId}} = new LogisticRegressionModel({{weights}}, {{intercept}}, {{numFeatures}}, {{numClasses}});' : 'var {{refId}} = new LogisticRegressionModel({{weights}}, {{intercept}});';

    this.refIdP = Utils.evaluate(gKernelP, LogisticRegressionModel, templateStr, {weights: Utils.prepForReplacement(arguments[0]), intercept: arguments[1], numFeatures: arguments[2], numClasses: arguments[3]}, true);
  }
}

module.exports = function(kP) {
  gKernelP = kP;

  return LogisticRegressionModel;
};