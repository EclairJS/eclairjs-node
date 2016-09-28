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

    var RegressionModel = require('./RegressionModel')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Model produced by {@link module:eclairjs/ml/regression.LinearRegression}.
     * @class
     * @extends module:eclairjs/mllib/regression.RegressionModel
     * @memberof module:eclairjs/ml/regression
     */
    function LinearRegressionModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    LinearRegressionModel.prototype = Object.create(RegressionModel.prototype);

    LinearRegressionModel.prototype.constructor = LinearRegressionModel;

    /**
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LinearRegressionModel.prototype.weights = function() {
      var Vector = require('../../mllib/linalg/Vector');

      var args = {
        hotbo: this,
        method: 'weights',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    LinearRegressionModel.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LinearRegressionModel.prototype.coefficients = function () {
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
    LinearRegressionModel.prototype.intercept = function () {
      var args = {
        target: this,
        method: 'intercept',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LinearRegressionModel.prototype.weights = function () {
      var Vector = require('../../mllib/linalg/Vector');

      var args = {
        target: this,
        method: 'weights',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };

    /**
     * Gets summary (e.g. residuals, mse, r-squared ) of model on training set. An exception is
     * thrown if `trainingSummary == None`.
     * @returns {module:eclairjs/ml/regression.LinearRegressionTrainingSummary}
     */
    LinearRegressionModel.prototype.summary = function() {
      var LinearRegressionTrainingSummary = require('./LinearRegressionTrainingSummary')();

      var args = {
        target: this,
        method: 'summary',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegressionTrainingSummary
      };

      return Utils.generate(args);
    };

    /**
     *  Indicates whether a training summary exists for this model instance.
     * @returns {Promise.<boolean>}
     */
    LinearRegressionModel.prototype.hasSummary = function() {
      var args = {
        target: this,
        method: 'hasSummary',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/regression.LinearRegressionModel}
     */
    LinearRegressionModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: LinearRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * Returns a {@link MLWriter} instance for this ML instance.
     *
     * For [[LinearRegressionModel]], this does NOT currently save the training {@link summary}.
     * An option to save {@link summary} may be added in the future.
     *
     * This also does not save the {@link parent} currently.
     * @returns {MLWriter}
     */
    LinearRegressionModel.prototype.write = function() {
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

    //
    // static methods
    //

    /**
     * @returns {MLReader}
     */
    LinearRegressionModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: LinearRegressionModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/regression.LinearRegressionModel}
     */
    LinearRegressionModel.load = function(path) {
      var args = {
        target: LinearRegressionModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: LinearRegressionModel
      };

      return Utils.generate(args);
    };

    LinearRegressionModel.moduleLocation = '/ml/regression/LinearRegressionModel';

    return LinearRegressionModel;
  })();
};