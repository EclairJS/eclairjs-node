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

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Linear regression results evaluated on a dataset.
     * @class
     * @memberof module:eclairjs/ml/regression
     */
    function LinearRegressionSummary() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     *
     * @returns {module:eclairjs/sql.DataFrame}
     */
    LinearRegressionSummary.prototype.predictions = function () {
      var DataFrame = require('../../sql/DataFrame');

      var args = {
        target: this,
        method: 'predictions',
        args: Utils.wrapArguments(arguments),
        returnType: DataFrame
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<string>}
     */
    LinearRegressionSummary.prototype.predictionCol = function () {
      var args = {
        target: this,
        method: 'predictions',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<string>}
     */
    LinearRegressionSummary.prototype.labelCol = function () {
      var args = {
        target: this,
        method: 'labelCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/ml/regression.LinearRegressionModel}
     */
    LinearRegressionSummary.prototype.model = function () {
      var LinearRegressionModel = require('./LinearRegressionModel');

      var args = {
        target: this,
        method: 'model',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<number>}
     */
    LinearRegressionSummary.prototype.explainedVariance = function () {
      var args = {
        target: this,
        method: 'explainedVariance',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns the mean absolute error, which is a risk function corresponding to the expected value of the absolute error loss or l1-norm loss.
     * Note: This ignores instance weights (setting all to 1.0) from LinearRegression.weightCol. This will change in later Spark versions.
     * @returns {Promise.<number>}
     */
    LinearRegressionSummary.prototype.meanAbsoluteError = function () {
      var args = {
        target: this,
        method: 'meanAbsoluteError',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns the mean squared error, which is a risk function corresponding to the expected value of the squared error loss or quadratic loss.
     * Note: This ignores instance weights (setting all to 1.0) from LinearRegression.weightCol. This will change in later Spark versions.
     * @returns {Promise.<number>}
     */
    LinearRegressionSummary.prototype.meanSquaredError = function () {
      var args = {
        target: this,
        method: 'meanSquaredError',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns the root mean squared error, which is defined as the square root of the mean squared error.
     * Note: This ignores instance weights (setting all to 1.0) from LinearRegression.weightCol. This will change in later Spark versions.
     * @returns {Promise.<number>}
     */
    LinearRegressionSummary.prototype.rootMeanSquaredError = function () {
      var args = {
        target: this,
        method: 'rootMeanSquaredError',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns R^2^, the coefficient of determination. Reference: http://en.wikipedia.org/wiki/Coefficient_of_determination
     * Note: This ignores instance weights (setting all to 1.0) from LinearRegression.weightCol. This will change in later Spark versions.
     * @returns {Promise.<number>}
     */
    LinearRegressionSummary.prototype.r2 = function () {
      var args = {
        target: this,
        method: 'r2',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Residuals (label - predicted value)
     * @returns {module:eclairjs/sql.DataFrame}
     */
    LinearRegressionSummary.prototype.residuals = function () {
      var DataFrame = require('../../sql/DataFrame');

      var args = {
        target: this,
        method: 'residuals',
        args: Utils.wrapArguments(arguments),
        returnType: DataFrame
      };

      return Utils.generate(args);
    };

    /**
     * Number of instances in DataFrame predictions
     * @returns {Promise.<number>}
     */
    LinearRegressionSummary.prototype.numInstances = function () {
      var args = {
        target: this,
        method: 'numInstances',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * The weighted residuals, the usual residuals rescaled by the square root of the instance weights.
     * @returns {Promise.<number[]>}
     */
    LinearRegressionSummary.prototype.devianceResiduals = function () {
      var args = {
        target: this,
        method: 'devianceResiduals',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * Standard error of estimated coefficients and intercept.
     * @returns {Promise.<number[]>}
     */
    LinearRegressionSummary.prototype.coefficientStandardErrors = function () {
      var args = {
        target: this,
        method: 'coefficientStandardErrors',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * T-statistic of estimated coefficients and intercept.
     * @returns {Promise.<number[]>}
     */
    LinearRegressionSummary.prototype.tValues = function () {
      var args = {
        target: this,
        method: 'tValues',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * Two-sided p-value of estimated coefficients and intercept.
     * @returns {Promise.<number[]>}
     */
    LinearRegressionSummary.prototype.pValues = function () {
      var args = {
        target: this,
        method: 'pValues',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    return LinearRegressionSummary;
  })();
};