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

    var ProbabilisticClassificationModel = require('./ProbabilisticClassificationModel')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Model produced by {@link module:eclairjs/ml/classification.LogisticRegression}.
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.ProbabilisticClassificationModel
     */
    function LogisticRegressionModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    LogisticRegressionModel.prototype = Object.create(ProbabilisticClassificationModel.prototype);

    LogisticRegressionModel.prototype.constructor = LogisticRegressionModel;

    /**
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LogisticRegressionModel.prototype.coefficients = function () {
      var Vector = require('../../mllib/linalg/Vector');

      var args = {
        target: this,
        method: 'coefficients',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<number>}
     */
    LogisticRegressionModel.prototype.intercept = function () {
      var args = {
        target: this,
        method: 'intercept',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel}
     */
    LogisticRegressionModel.prototype.setThreshold = function(value) {
      var args = {
        target: this,
        method: 'setThreshold',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<number>}
     */
    LogisticRegressionModel.prototype.getThreshold = function() {
      var args = {
        target: this,
        method: 'getThreshold',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @param {number[]} value
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel}
     */
    LogisticRegressionModel.prototype.setThresholds = function(value) {
      var args = {
        target: this,
        method: 'setThresholds',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<number[]>}
     */
    LogisticRegressionModel.prototype.getThresholds = function() {
      var args = {
        target: this,
        method: 'getThresholds',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * Gets summary of model on training set. An exception is
     * thrown if `trainingSummary == None`.
     * @returns {module:eclairjs/ml/classification.LogisticRegressionTrainingSummary}
     */
    LogisticRegressionModel.prototype.summary = function() {
      var LogisticRegressionTrainingSummary = require('./LogisticRegressionTrainingSummary')();

      var args = {
        target: this,
        method: 'summary',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionTrainingSummary
      };

      return Utils.generate(args);
    };

    /**
     *  Indicates whether a training summary exists for this model instance.
     * @returns {Promise.<boolean>}
     */
    LogisticRegressionModel.prototype.hasSummary = function() {
      var args = {
        target: this,
        method: 'hasSummary',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Evaluates the model on a test dataset.
     * @param {module:eclairjs/sql.Dataset} dataset  Test dataset to evaluate model on.
     * @returns {LogisticRegressionSummary}
     */
    LogisticRegressionModel.prototype.evaluate = function(dataset) {
      var LogisticRegressionSummary = require('../../ml/classification/LogisticRegressionSummary.js');
      var args ={
        target: this,
        method: 'evaluate',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionSummary

      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel}
     */
    LogisticRegressionModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'hasSummary',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args);
    };


    /**
     * Returns a {@link MLWriter} instance for this ML instance.
     *
     * For [[LogisticRegressionModel]], this does NOT currently save the training {@link summary}.
     * An option to save {@link summary} may be added in the future.
     *
     * This also does not save the {@link parent} currently.
     * @returns {MLWriter}
     */
    LogisticRegressionModel.prototype.write = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'write',
    //     returnType: MLWriter
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/mllib/classification.LogisticRegression}
     */
    LogisticRegressionModel.prototype.parent = function() {
      var LogisticRegression = require('./LogisticRegression')();

      var args = {
        target: this,
        method: 'parent',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegression
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @returns {MLReader}
     */
    LogisticRegressionModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: LogisticRegressionModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/classification.LogisticRegressionModel}
     */
    LogisticRegressionModel.load = function(path) {
      var args = {
        target: LogisticRegressionModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args)
    };

    LogisticRegressionModel.moduleLocation = '/ml/classification/LogisticRegressionModel';

    return LogisticRegressionModel;
  })();
};