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
     * Construct a LogisticRegression object with default parameters: {stepSize: 1.0,
         * numIterations: 100, regParm: 0.01, miniBatchFraction: 1.0}.
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     * @class
     */
    function LogisticRegressionWithSGD() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Train a logistic regression model given an RDD of (label, features) pairs. We run a fixed
     * number of iterations of gradient descent using the specified step size. Each iteration uses
     * `miniBatchFraction` fraction of the data to calculate the gradient. The weights used in
     * gradient descent are initialized using the initial weights provided.
     * NOTE: Labels used in Logistic Regression should be {0, 1}
     *
     * @param {module:eclairjs/rdd.RDD} input  RDD of (label, array of features) pairs.
     * @param {number} numIterations  Number of iterations of gradient descent to run.
     * @param {number} [stepSize]  step size to be used for each iteration of gradient descent, defaults to 1.0.
     * @param {number} [miniBatchFraction]  fraction of data to be used per iteration.
     * @param {module:eclairjs/mllib/linalg.Vector} [initialWeights] initial set of weights to be used. Array should be equal in size to
     *        the number of features in the data.
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel}
     */
    LogisticRegressionWithSGD.train = function(input, numIterations, stepSize, miniBatchFraction, initialWeights) {
      var args = {
        target: LogisticRegressionWithSGD,
        method: 'train',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args);
    };

    LogisticRegressionWithSGD.moduleLocation = '/mllib/classification#LogisticRegressionWithSGD';

    return LogisticRegressionWithSGD;
  })();
};