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
     * :: Experimental ::
     * Model produced by {@link module:eclairjs/ml/regression.GeneralizedLinearRegression}.
     * @class
     * @extends module:eclairjs/mllib/regression.RegressionModel
     * @memberof module:eclairjs/ml/regression
     */
    function GeneralizedLinearRegressionModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    GeneralizedLinearRegressionModel.prototype = Object.create(RegressionModel.prototype);

    GeneralizedLinearRegressionModel.prototype.constructor = GeneralizedLinearRegressionModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    GeneralizedLinearRegressionModel.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Sets the link prediction (linear predictor) column name.
     *
     * @param {string} value
     * @returns  * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegressionModel}
     */
    GeneralizedLinearRegressionModel.prototype.setLinkPredictionCol = function(value) {
       var args ={
         target: this,
         method: 'setLinkPredictionCol',
         args: Utils.wrapArguments(arguments),
         returnType: GeneralizedLinearRegressionModel

       };

       return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    GeneralizedLinearRegressionModel.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset');

       var args ={
         target: this,
         method: 'transform',
         args: Utils.wrapArguments(arguments),
         returnType: Dataset

       };

       return Utils.generate(args);
    };

    /**
     * Gets R-like summary of model on training set. An exception is
     * thrown if there is no summary available.
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegressionTrainingSummary}
     */
    GeneralizedLinearRegressionModel.prototype.summary = function() {
      var GeneralizedLinearRegressionTrainingSummary = require('./GeneralizedLinearRegressionTrainingSummary')();

      var args = {
        target: this,
        method: 'summary',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegressionTrainingSummary
      };

      return Utils.generate(args);
    };

    /**
     * Indicates if {@link module:eclairjs/ml/regression.GeneralizedLinearRegressionTrainingSummary} is available.
     * @returns {Promise.<boolean>}
     */
    GeneralizedLinearRegressionModel.prototype.hasSummary = function() {
      var args = {
        target: this,
        method: 'hasSummary',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Evaluate the model on the given dataset, returning a summary of the results.
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/regression.GeneralizedLinearRegressionSummary} 
     */
    GeneralizedLinearRegressionModel.prototype.evaluate = function(dataset) {
     var GeneralizedLinearRegressionSummary = require('./GeneralizedLinearRegressionSummary')();
       var args ={
         target: this,
         method: 'evaluate',
         args: Utils.wrapArguments(arguments),
         returnType: GeneralizedLinearRegressionSummary

       };

       return Utils.generate(args);
    };


    /**
     * @returns {module:eclairjs/ml/linalg.Vector}
     */
    GeneralizedLinearRegressionModel.prototype.coefficients = function () {
      var Vector = require('../linalg/Vector')();

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
    GeneralizedLinearRegressionModel.prototype.intercept = function () {
      var args = {
        target: this,
        method: 'intercept',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/regression.GeneralizedLinearRegressionModel}
     */
    GeneralizedLinearRegressionModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: GeneralizedLinearRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * Returns a {@link MLWriter} instance for this ML instance.
     *
     * For [[GeneralizedLinearRegressionModel]], this does NOT currently save the training {@link summary}.
     * An option to save {@link summary} may be added in the future.
     *
     * This also does not save the {@link parent} currently.
     * @returns {MLWriter}
     */
    GeneralizedLinearRegressionModel.prototype.write = function() {
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
    GeneralizedLinearRegressionModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: GeneralizedLinearRegressionModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/regression.GeneralizedLinearRegressionModel}
     */
    GeneralizedLinearRegressionModel.load = function(path) {
      var args = {
        target: GeneralizedLinearRegressionModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: GeneralizedLinearRegressionModel
      };

      return Utils.generate(args);
    };

    GeneralizedLinearRegressionModel.moduleLocation = '/ml/regression/GeneralizedLinearRegressionModel';

    return GeneralizedLinearRegressionModel;
  })();
};