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

    var LogisticRegressionSummary = require('./LogisticRegressionSummary')();

    /**
     * @classdesc
     * Abstraction for multinomial Logistic Regression Training results.
     * Currently, the training summary ignores the training weights except
     * for the objective trace.
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.LogisticRegressionSummary
     */
    function LogisticRegressionTrainingSummary() {
      Utils.handleAbstractConstructor(this, arguments);
    }

    LogisticRegressionTrainingSummary.prototype = Object.create(LogisticRegressionSummary.prototype);

    LogisticRegressionTrainingSummary.prototype.constructor = LogisticRegressionTrainingSummary;

    /**
     *  objective function (scaled loss + regularization) at each iteration.
     * @returns {Promise.<float[]>}
     */
    LogisticRegressionTrainingSummary.prototype.objectiveHistory = function() {
      var args = {
        target: this,
        method: 'objectiveHistory',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     *  Number of training iterations until termination
     * @returns {Promise.<integer>}
     */
    LogisticRegressionTrainingSummary.prototype.totalIterations = function() {
      var args = {
        target: this,
        method: 'totalIterations',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    LogisticRegressionTrainingSummary.moduleLocation = '/ml/classification/LogisticRegressionTrainingSummary';

    return LogisticRegressionTrainingSummary;
  })();
};