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
     * :: Experimental ::
     * Fit a parametric survival regression model named accelerated failure time (AFT) model
     * ([[https://en.wikipedia.org/wiki/Accelerated_failure_time_model]])
     * based on the Weibull distribution of the survival time.
     * @class
     * @memberof module:eclairjs/ml/regression
     */

    /**
     * @param {Promise.<string> uid
     * @constructor
     */
    function AFTSurvivalRegression() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {Promise.<string> value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {Promise.<string> value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setLabelCol = function(value) {
      var args = {
        target: this,
        method: 'setLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {Promise.<string> value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setCensorCol = function(value) {
      var args = {
        target: this,
        method: 'setCensorCol',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {Promise.<string> value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setPredictionCol = function(value) {
      var args = {
        target: this,
        method: 'setPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {number[]} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setQuantileProbabilities = function(value) {
      var args = {
        target: this,
        method: 'setQuantileProbabilities',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {Promise.<string> value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setQuantilesCol = function(value) {
      var args = {
        target: this,
        method: 'setQuantilesCol',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    /**
     * Set if we should fit the intercept
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setFitIntercept = function(value) {
      var args = {
        target: this,
        method: 'setFitIntercept',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    /**
     * Set the maximum number of iterations.
     * Default is 100.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setMaxIter = function(value) {
      var args = {
        target: this,
        method: 'setMaxIter',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    /**
     * Set the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-6.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.setTol = function(value) {
      var args = {
        target: this,
        method: 'setTol',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegressionModel}
     */
    AFTSurvivalRegression.prototype.fit = function(dataset) {
      var AFTSurvivalRegressionModel = require('./AFTSurvivalRegressionModel.js')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    AFTSurvivalRegression.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {Promise.<string> path
     * @returns {module:eclairjs/ml/regression.AFTSurvivalRegression}
     */
    AFTSurvivalRegression.load = function(path) {
      var args = {
        target: AFTSurvivalRegression,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: AFTSurvivalRegression
      };

      return Utils.generate(args);
    };

    AFTSurvivalRegression.moduleLocation = '/ml/regression/AFTSurvivalRegression';

    return AFTSurvivalRegression;
  })();
};