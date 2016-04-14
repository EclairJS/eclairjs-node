/**
 * Train a classification model for Binary Logistic Regression
 * using Stochastic Gradient Descent. By default L2 regularization is used,
 * which can be changed via {@link optimizer}.
 * NOTE: Labels used in Logistic Regression should be {0, 1, ..., k - 1}
 * for k classes multi-label classification problem.
 * Using {@link LogisticRegressionWithLBFGS} is recommended over this.
 * @classdesc
 */

var Utils = require('../../utils.js');

var LogisticRegressionModel = require('./LogisticRegressionModel.js')();

var gKernelP;

/**
 * Construct a LogisticRegression object with default parameters: {stepSize: 1.0,
 * numIterations: 100, regParm: 0.01, miniBatchFraction: 1.0}.
 * @returns {??}
 *  @class
 */
function LogisticRegressionWithSGD() {
  if (arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: LogisticRegressionWithSGD,
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

/**
 * Train a logistic regression model given an RDD of (label, features) pairs. We run a fixed
 * number of iterations of gradient descent using the specified step size. Each iteration uses
 * `miniBatchFraction` fraction of the data to calculate the gradient. The weights used in
 * gradient descent are initialized using the initial weights provided.
 * NOTE: Labels used in Logistic Regression should be {0, 1}
 *
 * @param {RDD} input  RDD of (label, array of features) pairs.
 * @param {number} numIterations  Number of iterations of gradient descent to run.
 * @param {number} stepSize  Optional step size to be used for each iteration of gradient descent, defaults to 1.0.
 * @param {number} miniBatchFraction  Optional fraction of data to be used per iteration.
 * @param {Vector} initialWeights  Optional: initial set of weights to be used. Array should be equal in size to
 *        the number of features in the data.
 * @returns {LogisticRegressionModel}
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

module.exports = function(kP) {
  gKernelP = kP;

  return LogisticRegressionWithSGD;
};