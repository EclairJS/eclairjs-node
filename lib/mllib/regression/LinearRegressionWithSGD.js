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

    var LinearRegressionModel = require('./LinearRegressionModel.js');

    var gKernelP = kernelP;

    /**
     * Construct a LinearRegression object with default parameters: {stepSize: 1.0, numIterations: 100, miniBatchFraction: 1.0}.
     * @constructor
     * @memberof module:eclairjs/mllib/regression
     * @classdesc Train a linear regression model with no regularization using Stochastic Gradient Descent.
     * This solves the least squares regression formulation f(weights) = 1/n ||A weights-y||^2^ (which is the mean squared error).
     * Here the data matrix has n rows, and the input RDD holds the set of rows of A, each with its corresponding right hand side label y.
     * See also the documentation for the precise formulation.
     */
    function LinearRegressionWithSGD() {
    }

    LinearRegressionWithSGD.DEFAULT_NUM_ITERATIONS = 100;

    /**
     * Train a Linear Regression model given an RDD of (label, features) pairs.
     * We run a fixed number of iterations of gradient descent using the specified step size.
     * Each iteration uses miniBatchFraction fraction of the data to calculate a stochastic gradient.
     * The weights used in gradient descent are initialized using the initial weights provided.
     *
     * @param {module:eclairjs/rdd.RDD} rdd of LabeledPoints1
     * @param {integer} numIterations
     * @param {float} [stepSize] - step size to be used for each iteration of gradient descent, defaults to 1.0
     * @param {floar} [miniBatchFraction] - fraction of data to be used per iteration, defaults to 1.0
     * @param {Vactor} [initialWeights] - initial set of weights to be used. Array should be equal in size to the number of features in the data.
     * @returns {module:eclairjs/mllib/regression.LinearRegressionModel}
     */
    LinearRegressionWithSGD.train = function(rdd, numIterations, miniBatchFraction, initialWeights) {
      var args = {
        target: LinearRegressionWithSGD,
        method: 'train',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: LinearRegressionModel
      };

      return Utils.generate(args);
    };

    LinearRegressionWithSGD.moduleLocation = '/mllib/regression/LinearRegressionWithSGD';

    return LinearRegressionWithSGD;
  })();
};