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

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Evaluator for multiclass classification, which expects two input columns: prediction and label.
     * @class
     * @memberof module:eclairjs/ml/evaluation
     * @param {string} [uid]
     */
    function MulticlassClassificationEvaluator() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @returns {Promise.<string>}
     */
    MulticlassClassificationEvaluator.prototype.getMetricName = function() {
      var args = {
        target: this,
        method: 'getMetricName',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator}
     */
    MulticlassClassificationEvaluator.prototype.setMetricName = function(value) {
      var args = {
        target: this,
        method: 'setMetricName',
        args: Utils.wrapArguments(arguments),
        returnType: MulticlassClassificationEvaluator
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator}
     */
    MulticlassClassificationEvaluator.prototype.setPredictionCol = function(value) {
      var args = {
        target: this,
        method: 'setPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: MulticlassClassificationEvaluator
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator}
     */
    MulticlassClassificationEvaluator.prototype.setLabelCol = function(value) {
      var args = {
        target: this,
        method: 'setLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: MulticlassClassificationEvaluator
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Promise.<number>}
     */
    MulticlassClassificationEvaluator.prototype.evaluate = function(dataset) {
      var args = {
        target: this,
        method: 'evaluate',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<boolean>}
     */
    MulticlassClassificationEvaluator.prototype.isLargerBetter = function() {
      var args = {
        target: this,
        method: 'isLargerBetter',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator}
     */
    MulticlassClassificationEvaluator.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: MulticlassClassificationEvaluator
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/evaluation.MulticlassClassificationEvaluator}
     */
    MulticlassClassificationEvaluator.load = function(path) {
      var args = {
        target: MulticlassClassificationEvaluator,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: MulticlassClassificationEvaluator
      };

      return Utils.generate(args);
    };

    MulticlassClassificationEvaluator.moduleLocation = '/ml/evaluation/MulticlassClassificationEvaluator';

    return MulticlassClassificationEvaluator;
  })();
};