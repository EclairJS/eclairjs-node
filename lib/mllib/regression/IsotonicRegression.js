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
    var RDD = require('../../rdd/RDD.js');
    var IsotonicRegressionModel = require('./IsotonicRegressionModel.js');

    var gKernelP = kernelP;

    /**
     * Isotonic regression.
     * Currently implemented using parallelized pool adjacent violators algorithm.
     * Only univariate (single feature) algorithm supported.
     *
     * Sequential PAV implementation based on:
     * Tibshirani, Ryan J., Holger Hoefling, and Robert Tibshirani.
     *   "Nearly-isotonic regression." Technometrics 53.1 (2011): 54-61.
     *   Available from [[http://www.stat.cmu.edu/~ryantibs/papers/neariso.pdf]]
     *
     * Sequential PAV parallelization based on:
     * Kearsley, Anthony J., Richard A. Tapia, and Michael W. Trosset.
     *   "An approach to parallelizing isotonic regression."
     *   Applied Mathematics and Parallel Computing. Physica-Verlag HD, 1996. 141-147.
     *   Available from [[http://softlib.rice.edu/pub/CRPC-TRs/reports/CRPC-TR96640.pdf]]
     *
     * @see [[http://en.wikipedia.org/wiki/Isotonic_regression Isotonic regression (Wikipedia)]]
     * @memberof module:eclairjs/mllib/regression
     * @classdesc
     */

    /**
     * Constructs IsotonicRegression instance with default parameter isotonic = true.
     *
     * @returns {??}  New instance of IsotonicRegression.
     *  @class
     */
    function IsotonicRegression() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Sets the isotonic parameter.
     *
     * @param {boolean} isotonic  Isotonic (increasing) or antitonic (decreasing) sequence.
     * @returns {module:eclairjs/mllib/regression.IsotonicRegression}  This instance of IsotonicRegression.
     */
    IsotonicRegression.prototype.setIsotonic = function(isotonic) {
      var args = {
        target: this,
        method: 'setIsotonic',
        args: Utils.wrapArguments(arguments),
        returnType: IsotonicRegression
      };

      return Utils.generate(args);
    };

    /**
     * Run IsotonicRegression algorithm to obtain isotonic regression model.
     *
     * @param {module:eclairjs/rdd.RDD} input  RDD of tuples (label, feature, weight) where label is dependent variable
     *              for which we calculate isotonic regression, feature is independent variable
     *              and weight represents number of measures with default 1.
     *              If multiple labels share the same feature value then they are ordered before
     *              the algorithm is executed.
     * @returns {module:eclairjs/mllib/regression.IsotonicRegressionModel}  Isotonic regression model.
     */
    IsotonicRegression.prototype.run = function(input) {
      var args = {
        target: this,
        method: 'run',
        args: Utils.wrapArguments(arguments),
        returnType: IsotonicRegressionModel
      };

      return Utils.generate(args);
    };

    IsotonicRegression.moduleLocation = '/mllib/regression/IsotonicRegression';

    return IsotonicRegression;
  })();
};