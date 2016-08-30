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
     * Linear regression.
     *
     * The learning objective is to minimize the squared error, with regularization.
     * The specific squared error loss function used is:
     *   L = 1/2n ||A coefficients - y||^2^
     *
     * This support multiple types of regularization:
     *  - none (a.k.a. ordinary least squares)
     *  - L2 (ridge regression)
     *  - L1 (Lasso)
     *  - L2 + L1 (elastic net)
     * @class
     * @extends module:eclairjs/ml.Predictor
     * @memberof module:eclairjs/ml/regression
     * @param {string} [uid]
     */
    function LinearRegression() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    LinearRegression.prototype = Object.create(Predictor.prototype);

    LinearRegression.prototype.constructor = LinearRegression;

    /**
     * Set the regularization parameter.
     * Default is 0.0.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.prototype.setRegParam = function(value) {
      var args = {
        target: this,
        method: 'setRegParam',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Set if we should fit the intercept
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.prototype.setFitIntercept = function(value) {
      var args = {
        target: this,
        method: 'setFitIntercept',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Param for regularization parameter (>= 0).
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    LinearRegression.prototype.regParam = function() {
      var DoubleParam = require('../param/DoubleParam')();

      var args = {
        target: this,
        method: 'regParam',
        args: Utils.wrapArguments(arguments),
        returnType: DoubleParam
      };

      return Utils.generate(args);
    };

    /**
     * Param for whether to fit an intercept term.
     * @returns {module:eclairjs/ml/param.BooleanParam}
     */
    LinearRegression.prototype.fitIntercept = function() {
      var BooleanParam = require('../param/BooleanParam')();

      var args = {
        target: this,
        method: 'fitIntercept',
        args: Utils.wrapArguments(arguments),
        returnType: BooleanParam
      };

      return Utils.generate(args);
    };

    /**
     * Param for the ElasticNet mixing parameter, in range [0, 1]. For alpha = 0, the penalty is an L2 penalty. For alpha = 1,
     * it is an L1 penalty.
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    LinearRegression.prototype.elasticNetParam = function() {
      var DoubleParam = require('../param/DoubleParam')();

      var args = {
        target: this,
        method: 'elasticNetParam',
        args: Utils.wrapArguments(arguments),
        returnType: DoubleParam
      };

      return Utils.generate(args);
    };


    /**
     * Whether to standardize the training features before fitting the model.
     * The coefficients of models will be always returned on the original scale,
     * so it will be transparent for users. Note that with/without standardization,
     * the models should be always converged to the same solution when no regularization
     * is applied. In R's GLMNET package, the default behavior is true as well.
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.prototype.setStandardization = function(value) {
      var args = {
        target: this,
        method: 'setStandardization',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Set the ElasticNet mixing parameter.
     * For alpha = 0, the penalty is an L2 penalty. For alpha = 1, it is an L1 penalty.
     * For 0 < alpha < 1, the penalty is a combination of L1 and L2.
     * Default is 0.0 which is an L2 penalty.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.prototype.setElasticNetParam = function(value) {
      var args = {
        target: this,
        method: 'setElasticNetParam',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Set the maximum number of iterations.
     * Default is 100.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.prototype.setMaxIter = function(value) {
      var args = {
        target: this,
        method: 'setMaxIter',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Set the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-6.
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.prototype.setTol = function(value) {
      var args = {
        target: this,
        method: 'setTol',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Whether to over-/under-sample training instances according to the given weights in weightCol.
     * If empty, all instances are treated equally (weight 1.0).
     * Default is empty, so all instances have weight one.
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.prototype.setWeightCol = function(value) {
      var args = {
        target: this,
        method: 'setWeightCol',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * Set the solver algorithm used for optimization.
     * In case of linear regression, this can be "l-bfgs", "normal" and "auto".
     * "l-bfgs" denotes Limited-memory BFGS which is a limited-memory quasi-Newton
     * optimization method. "normal" denotes using Normal Equation as an analytical
     * solution to the linear regression problem.
     * The default value is "auto" which means that the solver algorithm is
     * selected automatically.
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.prototype.setSolver = function(value) {
      var args = {
        target: this,
        method: 'setSolver',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml/regression.LinearRegressionModel}
     */
    LinearRegression.prototype.fit = function(dataset) {
      var LinearRegressionModel = require('./LinearRegressionModel.js')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegressionModel
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/regression.LinearRegression}
     */
    LinearRegression.load = function(path) {
      var args = {
        target: LinearRegression,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: LinearRegression
      };

      return Utils.generate(args);
    };

    LinearRegression.moduleLocation = '/ml/regression/LinearRegression';

    return LinearRegression;
  })();
};