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

    var gKernelP = kernelP;

    /**
     * Classification model trained using Multinomial/Binary Logistic Regression.
     *
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     *
     * @param {module:eclairjs/mllib/linalg.Vector} weights Weights computed for every feature.
     * @param {float} intercept Intercept computed for this model. (Only used in Binary Logistic Regression.
     * In Multinomial Logistic Regression, the intercepts will not be a single value,
     * so the intercepts will be part of the weights.)
     * @param {int} [numFeatures] the dimension of the features.
     * @param {int} [numClasses] the number of possible outcomes for k classes classification problem in
     * Multinomial Logistic Regression. By default, it is binary logistic regression
     * so numClasses will be set to 2.
     * @class
     * @extends GeneralizedLinearModel
     */
    function LogisticRegressionModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Sets the threshold that separates positive predictions from negative predictions
     * in Binary Logistic Regression. An example with prediction score greater than or equal to
     * this threshold is identified as an positive, and negative otherwise. The default value is 0.5.
     * It is only used for binary classification.
     * @param {number} threshold
     * @returns {}
     */
    LogisticRegressionModel.prototype.setThreshold = function(threshold) {
      throw "not implemented by ElairJS";
    };

    /**
     * Returns the threshold (if any) used for converting raw prediction scores into 0/1 predictions.
     * It is only used for binary classification.
     * @returns {number}
     */
    LogisticRegressionModel.prototype.getThreshold = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Clears the threshold so that `predict` will output raw prediction scores.
     * It is only used for binary classification.
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel}
     */
    LogisticRegressionModel.prototype.clearThreshold = function() {
      var args = {
        target: this,
        method: 'clearThreshold',
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    LogisticRegressionModel.prototype.save = function(sc, path) {
      var args = {
        target: this,
        method: 'save',
        args: Utils.wrapArguments(arguments),
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<Vector>}
     */
    LogisticRegressionModel.prototype.weights = function() {
      var args = {
        target: this,
        method: 'weights',
        stringify: true,
        returnType: [Number]  // A vector essentially
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel}
     */
    LogisticRegressionModel.load = function(sc, path) {
      var args = {
        target: LogisticRegressionModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args);
    };

    LogisticRegressionModel.moduleLocation = '/mllib/classification#LogisticRegressionModel';

    return LogisticRegressionModel;
  })();
};