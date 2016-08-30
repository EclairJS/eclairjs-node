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
    var SVMModel = require('./SVMModel.js')();

    var gKernelP = kernelP;

    /**
     * Train a Support Vector Machine (SVM) using Stochastic Gradient Descent. By default L2
     * regularization is used, which can be changed via {@link optimizer}.
     * NOTE: Labels used in SVM should be {0, 1}.
     * @classdesc
     */

    /**
     * Construct a SVM object with default parameters: {stepSize: 1.0, numIterations: 100,
     * regParm: 0.01, miniBatchFraction: 1.0}.
     * @class
     * @memberof module:eclairjs/mllib/classification
     */
    function SVMWithSGD() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Train a SVM model given an RDD of (label, features) pairs. We run a fixed number
     * of iterations of gradient descent using the specified step size. Each iteration uses
     * `miniBatchFraction` fraction of the data to calculate the gradient. The weights used in
     * gradient descent are initialized using the initial weights provided.
     *
     * NOTE: Labels used in SVM should be {0, 1}.
     *
     * @param {module:eclairjs/rdd.RDD} input  RDD of (label, array of features) pairs.
     * @param {number} numIterations  Number of iterations of gradient descent to run.
     * @param {number} [stepSize]  Step size to be used for each iteration of gradient descent.
     * @param {number} [regParam]  Regularization parameter.
     * @param {number} [miniBatchFraction]  Fraction of data to be used per iteration.
     * @param {module:eclairjs/mllib/linalg.Vector} [initialWeights]  Initial set of weights to be used. Array should be equal in size to
     *        the number of features in the data.
     * @returns {module:eclairjs/mllib/classification.SVMModel}
     */
    SVMWithSGD.train = function (input, numIterations, stepSize, regParam, miniBatchFraction, initialWeights) {
      var args = {
        target: SVMWithSGD,
        method: 'train',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: SVMModel
      };

      return Utils.generate(args);
    };

    SVMWithSGD.moduleLocation = '/mllib/classification#SVMWithSGD';

    return SVMWithSGD;
  })();
};