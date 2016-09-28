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
     * :: Experimental ::
     *
     * Fit a Generalized Linear Model ([[https://en.wikipedia.org/wiki/Generalized_linear_model]])
     * specified by giving a symbolic description of the linear predictor (link function) and
     * a description of the error distribution (family).
     * It supports "gaussian", "binomial", "poisson" and "gamma" as family.
     * Valid link functions for each family is listed below. The first link function of each family
     * is the default one.
     *  - "gaussian" -> "identity", "log", "inverse"
     *  - "binomial" -> "logit", "probit", "cloglog"
     *  - "poisson"  -> "log", "identity", "sqrt"
     *  - "gamma"    -> "inverse", "identity", "log"
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml.Predictor
     * @param {string} uid
     */
    function GeneralizedLinearRegression() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    GeneralizedLinearRegression.prototype = Object.create(Predictor.prototype);

    GeneralizedLinearRegression.prototype.constructor = GeneralizedLinearRegression;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    GeneralizedLinearRegression.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Sets the value of param {@link family}.
     * Default is "gaussian".
     *
     * @param {string} value
     * @returns {type}
     */
    GeneralizedLinearRegression.prototype.setFamily = function(value) {
      var args ={
        target: this,
        method: 'setFamily',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegression

      };

      return Utils.generate(args);
    };

    /**
     * Sets the value of param {@link link}.
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.prototype.setLink = function(value) {
       var args ={
         target: this,
         method: 'setLink',
         args: Utils.wrapArguments(arguments),
         returnType: GeneralizedLinearRegression

       };

       return Utils.generate(args);
    };

    /**
     * Set if we should fit the intercept
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.prototype.setFitIntercept = function(value) {
      var args = {
        target: this,
        method: 'setFitIntercept',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Sets the maximum number of iterations (applicable for solver "irls").
     * Default is 25.
     *
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.prototype.setMaxIter = function(value) {
      var args = {
        target: this,
        method: 'setMaxIter',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Sets the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-6.
     *
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.prototype.setTol = function(value) {
       var args ={
         target: this,
         method: 'setTol',
         args: Utils.wrapArguments(arguments),
         returnType: GeneralizedLinearRegression

       };

       return Utils.generate(args);
    };


    /**
     * Sets the regularization parameter for L2 regularization.
     * The regularization term is
     * @example
     *   0.5 * regParam * L2norm(coefficients)^2
     *
     * Default is 0.0.
     *
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.prototype.setRegParam = function(value) {
      var args = {
        target: this,
        method: 'setRegParam',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Sets the value of param {@link weightCol}.
     * If this is not set or empty, we treat all instance weights as 1.0.
     * Default is not set, so all instances have weight one.
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.prototype.setWeightCol = function(value) {
      var args = {
        target: this,
        method: 'setWeightCol',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Sets the solver algorithm used for optimization.
     * Currently only supports "irls" which is also the default solver.
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.prototype.setSolver = function(value) {
      var args = {
        target: this,
        method: 'setSolver',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Sets the link prediction (linear predictor) column name.
     *
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.prototype.setLinkPredictionCol = function(value) {
       var args ={
         target: this,
         method: 'setLinkPredictionCol',
         args: Utils.wrapArguments(arguments),
         returnType: GeneralizedLinearRegression

       };

       return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml/regression.LinearRegressionModel}
     */
    GeneralizedLinearRegression.prototype.fit = function(dataset) {
      var GeneralizedLinearRegressionModel = require('./GeneralizedLinearRegressionModel.js')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegression
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegression}
     */
    GeneralizedLinearRegression.load = function(path) {
      var args = {
        target: GeneralizedLinearRegression,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: GeneralizedLinearRegression
      };

      return Utils.generate(args);
    };

    GeneralizedLinearRegression.moduleLocation = '/ml/regression/GeneralizedLinearRegression';

    return GeneralizedLinearRegression;
  })();
};