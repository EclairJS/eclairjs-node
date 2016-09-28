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
  return (function() {    var Utils = require('../../utils.js');

    /**
     * @classdesc
     * Abstraction for Logistic Regression Results for a given model.
     * @class
     * @memberof module:eclairjs/ml/classification
     */
    function LogisticRegressionSummary(kernelP, refIdP) {
      Utils.handleAbstractConstructor(this, arguments);
    }

    /**
     *  Dataframe output by the model's `transform` method.
     * @returns {module:eclairjs/sql.DataFrame}
     */
    LogisticRegressionSummary.prototype.predictions = function() {
      var DataFrame = require('../../sql/DataFrame');

      var args = {
        target: this,
        method: 'predictions',
        args: Utils.wrapArguments(arguments),
        returnType: DataFrame
      };

      return Utils.generate(args);
    };

    /**
     *  Field in "predictions" which gives the probability of each class as a vector.
     * @returns {Promise.<string>}
     */
    LogisticRegressionSummary.prototype.probabilityCol = function() {
      var args = {
        target: this,
        method: 'probabilityCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *  Field in "predictions" which gives the true label of each instance (if available).
     * @returns {Promise.<string>}
     */
    LogisticRegressionSummary.prototype.labelCol = function() {
      var args = {
        target: this,
        method: 'labelCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *  Field in "predictions" which gives the features of each instance as a vector.
     * @returns {Promise.<string>}
     */
    LogisticRegressionSummary.prototype.featuresCol = function() {
      var args = {
        target: this,
        method: 'featuresCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    return LogisticRegressionSummary;
  })();
};