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

    var LogisticRegressionModel = require('./LogisticRegressionModel.js')();

    var gKernelP = kernelP;

    /**
     * Train a classification model for Multinomial/Binary Logistic Regression using
     * Limited-memory BFGS. Standard feature scaling and L2 regularization are used by default.
     * NOTE: Labels used in Logistic Regression should be {0, 1, ..., k - 1}
     * for k classes multi-label classification problem.
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     * @class
     */
    function LogisticRegressionWithLBFGS() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Set the number of possible outcomes for k classes classification problem in
     * Multinomial Logistic Regression.
     * By default, it is binary logistic regression so k will be set to 2.
     * @param {number} numClasses
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionWithLBFGS}
     */
    LogisticRegressionWithLBFGS.prototype.setNumClasses = function(numClasses) {
      var args = {
        target: this,
        method: 'setNumClasses',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionWithLBFGS
      };

      return Utils.generate(args);
    };

    /**
     *
     * @param {module:eclairjs/rdd.RDD} input
     * @param {module:eclairjs/mllib/linalg.Vector} [initialWeights]
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel}
     */
    LogisticRegressionWithLBFGS.prototype.run = function(input, initialWeights) {
      var args = {
        target: this,
        method: 'run',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args);
    };

    LogisticRegressionWithLBFGS.moduleLocation = '/mllib/classification#LogisticRegressionWithLBFGS';

    return LogisticRegressionWithLBFGS;
  })();
};