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

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('../../utils.js');

    var RDD = require('../../rdd/RDD.js');

    var gKernelP = kernelP;

    /**
     * Evaluator for regression.
     *
     * @param predictionAndObservations an RDD of (prediction, observation) pairs.
     * @memberof module:eclairjs/mllib/evaluation
     * @classdesc
     * @param {module:eclairjs/rdd.RDD} predictionAndObservations
     * @class
     */
    function RegressionMetrics() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Returns the mean squared error, which is a risk function corresponding to the
     * expected value of the squared error loss or quadratic loss.
     *
     * @returns {Promise.<Number>} A Promise that resolves to the mean squared error.
     */
    RegressionMetrics.prototype.meanSquaredError = function() {
      var args = {
        target: this,
        method: 'meanSquaredError',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns the root mean squared error, which is defined as the square root of
     * the mean squared error.
     *
     * @returns {Promise.<Number>} A Promise that resolves to the root mean squared error.
     */
    RegressionMetrics.prototype.rootMeanSquaredError = function() {
      var args = {
        target: this,
        method: 'rootMeanSquaredError',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns R^2^, the unadjusted coefficient of determination.
     * @see [[http://en.wikipedia.org/wiki/Coefficient_of_determination]]
     * In case of regression through the origin, the definition of R^2^ is to be modified.
     * @see J. G. Eisenhauer, Regression through the Origin. Teaching Statistics 25, 76-80 (2003)
     * [[https://online.stat.psu.edu/~ajw13/stat501/SpecialTopics/Reg_thru_origin.pdf]]
     *
     * @returns {Promise.<Number>} A Promise that resolves to the result.
     */
    RegressionMetrics.prototype.r2 = function() {
      var args = {
        target: this,
        method: 'r2',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns the mean absolute error, which is a risk function corresponding to the
     * expected value of the absolute error loss or l1-norm loss.
     *
     * @returns {Promise.<Number>} A Promise that resolves to the absolute mean.
     */
    RegressionMetrics.prototype.meanAbsoluteError = function() {
      var args = {
        target: this,
        method: 'meanAbsoluteError',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns the variance explained by regression.
     * explainedVariance = \sum_i (\hat{y_i} - \bar{y})^2 / n
     * @see [[https://en.wikipedia.org/wiki/Fraction_of_variance_unexplained]]
     *
     * @returns {Promise.<Number>} A Promise that resolves to the variance explained by regression.
     */
    RegressionMetrics.prototype.explainedVariance = function() {
      var args = {
        target: this,
        method: 'explainedVariance',
        returnType: Number
      };

      return Utils.generate(args);
    };

    RegressionMetrics.moduleLocation = '/mllib/evaluation#RegressionMetrics';

    return RegressionMetrics;
  })();
};