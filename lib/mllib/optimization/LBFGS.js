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


var Utils = require('../../utils.js');

var gKernelP;

/**
 * Class used to solve an optimization problem using Limited-memory BFGS.
 * Reference: http://en.wikipedia.org/wiki/Limited-memory_BFGS param: gradient
 * Gradient function to be used. param: updater Updater to be used to update weights after every iteration.
 * @class
 * @constructor
 * @param {Gradient} gradient
 * @param {Updater} updater
 */

function LBFGS() {
  if (arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = 'var {{refId}} = new LBFGS({{gradient}}, {{updater}});';

    this.refIdP = Utils.evaluate(gKernelP, LBFGS, templateStr, {gradient: Utils.prepForReplacement(arguments[0]), updater: Utils.prepForReplacement(arguments[1])}, true);
  }
}

/**
 * Run Limited-memory BFGS (L-BFGS) in parallel. Averaging the subgradients over different partitions is performed
 * using one standard spark map-reduce in each iteration.
 * @param {RDD} data - - Input data for L-BFGS. RDD of the set of data examples, each of the form (label, [feature values]).
 * @param {Gradient} gradient - - Gradient object (used to compute the gradient of the loss function of one single data example)
 * @param {Updater} updater - - Updater function to actually perform a gradient step in a given direction.
 * @param {integer} numCorrections - - The number of corrections used in the L-BFGS update.
 * @param {float} convergenceTol - - The convergence tolerance of iterations for L-BFGS which is must be nonnegative.
 * Lower values are less tolerant and therefore generally cause more iterations to be run.
 * @param {integer} maxNumIterations - - Maximal number of iterations that L-BFGS can be run.
 * @param {float} regParam - - Regularization parameter
 * @param {Vector} initialWeights - (undocumented)
 * @returns {Tuple} A tuple containing two elements. The first element is a column matrix containing weights for every feature,
 * and the second element is an array containing the loss computed for every iteration.
 */
LBFGS.runLBFGS = function (data,gradient,updater,numCorrections,convergenceTol,maxNumIterations,regParam,initialWeights) {
  function _resolve(result, resolve, reject) {
    try {
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = 'JSON.stringify(LBFGS.runLBFGS({{data}}, {{gradient}}, {{updater}}, {{numCorrections}}, {{convergenceTol}}, {{maxNumIterations}}, {{regParam}}, {{initialWeights}}));';

  return Utils.generateResultPromise({kernelP:gKernelP}, templateStr,
    {
      data: Utils.prepForReplacement(data),
      gradient: Utils.prepForReplacement(gradient),
      updater: Utils.prepForReplacement(updater),
      numCorrections: numCorrections,
      convergenceTol: convergenceTol,
      maxNumIterations: maxNumIterations,
      regParam: regParam,
      initialWeights: Utils.prepForReplacement(initialWeights)
    }, _resolve);
};


module.exports = function(kP) {
  gKernelP = kP;

  return LBFGS;
};