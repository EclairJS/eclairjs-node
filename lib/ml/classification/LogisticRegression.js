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

    var ProbabilisticClassifier = require('./ProbabilisticClassifier')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Logistic regression.
     * Currently, this class only supports binary classification.  It will support multiclass
     * in the future.
     * @class
     * @extends module:eclairjs/ml/classification.ProbabilisticClassifier
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    function LogisticRegression() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    LogisticRegression.prototype = Object.create(ProbabilisticClassifier.prototype);

    LogisticRegression.prototype.constructor = LogisticRegression;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    LogisticRegression.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Set the regularization parameter.
     * Default is 0.0.
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.setRegParam = function(value) {
      var args = {
        target: this,
        method: 'setRegParam',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    LogisticRegression.prototype.regParam = function() {
      var Param = require('../param/Param')();

      var args = {
        target: this,
        method: 'regParam',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * Set the ElasticNet mixing parameter.
     * For alpha = 0, the penalty is an L2 penalty. For alpha = 1, it is an L1 penalty.
     * For 0 < alpha < 1, the penalty is a combination of L1 and L2.
     * Default is 0.0 which is an L2 penalty.
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.setElasticNetParam = function(value) {
      var args = {
        target: this,
        method: 'setElasticNetParam',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };

    /**
     * Set the maximum number of iterations.
     * Default is 100.
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.setMaxIter = function(value) {
      var args = {
        target: this,
        method: 'setMaxIter',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    LogisticRegression.prototype.maxIter = function() {
      var Param = require('../param/Param')();

      var args = {
        target: this,
        method: 'maxIter',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * Set the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-6.
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.setTol = function(value) {
      var args = {
        target: this,
        method: 'setTol',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };


    /**
     * Whether to fit an intercept term.
     * Default is true.
     * @param {boolean} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.setFitIntercept = function(value) {
      var args = {
        target: this,
        method: 'setFitIntercept',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
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
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.setStandardization = function(value) {
      var args = {
        target: this,
        method: 'setStandardization',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.setThreshold = function(value) {
      var args = {
        target: this,
        method: 'setThreshold',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<float>}
     */
    LogisticRegression.prototype.getThreshold = function() {
      var args = {
        target: this,
        method: 'getThreshold',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    LogisticRegression.prototype.threshold = function() {
      var Param = require('../param/Param')();

      var args = {
        target: this,
        method: 'threshold',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * Whether to over-/under-sample training instances according to the given weights in weightCol.
     * If not set or empty String, all instances are treated equally (weight 1.0).
     * Default is not set, so all instances have weight one.
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.setWeightCol = function(value) {
      var args = {
        target: this,
        method: 'setWeightCol',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };

    /**
     * @param {float[]} value
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.setThresholds = function(value) {
      var args = {
        target: this,
        method: 'setThresholds',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<float[]>}
     */
    LogisticRegression.prototype.getThresholds = function() {
      var args = {
        target: this,
        method: 'getThresholds',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };

    /**
     * FIXME from Param
     * @returns {Promise.<string>}
     */
    LogisticRegression.prototype.explainParams = function() {
      var args = {
        target: this,
        method: 'explainParams',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Fits a model to the input data.
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @param {module:eclairjs/ml/param.ParamMap} [paramMap]  Parameter map.
     *                 These values override any specified in this Estimator's embedded ParamMap.
     * @returns {module:eclairjs/ml/classification.LogisticRegressionModel} fitted model
     */
    LogisticRegression.prototype.fit = function(dataset, paramMap) {
      var LogisticRegressionModel = require('./LogisticRegressionModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/classification.LogisticRegression}
     */
    LogisticRegression.load = function(path) {
      var args = {
        target: LogisticRegression,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args)
    };

    LogisticRegression.moduleLocation = '/ml/classification/LogisticRegression';

    return LogisticRegression;
  })();
};