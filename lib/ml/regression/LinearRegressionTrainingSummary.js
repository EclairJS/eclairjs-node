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

    var LinearRegressionSummary = require('./LinearRegressionSummary')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Linear regression training results. Currently, the training summary ignores the
     * training coefficients except for the objective trace.
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml/regression.LinearRegressionSummary
     */
    function LinearRegressionTrainingSummary() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    LinearRegressionTrainingSummary.prototype = Object.create(LinearRegressionSummary.prototype);

    LinearRegressionTrainingSummary.prototype.constructor = LinearRegressionTrainingSummary;

    /**
     *
     * @returns {Promise.<string>}
     */
    LinearRegressionTrainingSummary.prototype.featuresCol = function() {
      var args = {
        target: this,
        method: 'featuresCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<number[]>}
     */
    LinearRegressionTrainingSummary.prototype.objectiveHistory = function() {
      var args = {
        target: this,
        method: 'objectiveHistory',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<number>}
     */
    LinearRegressionTrainingSummary.prototype.totalIterations = function() {
      var args = {
        target: this,
        method: 'totalIterations',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    LinearRegressionTrainingSummary.moduleLocation = '/ml/regression/LinearRegressionTrainingSummary';

    return LinearRegressionTrainingSummary;
  })();
};