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
    var ParamMap = require('../../ml/param/ParamMap')();
    var Param = require('../../ml/param/Param')();
    var Vector = require('../../mllib/linalg/Vector');
    var Matrix = require('../../mllib/linalg/Matrix');
    var DoubleParam = require('../param/DoubleParam')();
    var StructType = require('../../sql/types/StructType')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Model produced by {@link module:eclairjs/ml/classification.NaiveBayes}
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.ProbabilisticClassificationModel
     */
    function NaiveBayesModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    NaiveBayesModel.prototype = Object.create(ProbabilisticClassificationModel.prototype);

    NaiveBayesModel.prototype.constructor = NaiveBayesModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    NaiveBayesModel.prototype.uid = function() {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    NaiveBayesModel.prototype.pi = function() {
      var args = {
        target: this,
        method: 'pi',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Matrix}
     */
    NaiveBayesModel.prototype.theta = function() {
      var args = {
        target: this,
        method: 'theta',
        args: Utils.wrapArguments(arguments),
        returnType: Matrix
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/classification.NaiveBayesModel}
     */
    NaiveBayesModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayesModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    NaiveBayesModel.prototype.toString = function() {
      var args = {
        target: this,
        method: 'toString',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    NaiveBayesModel.prototype.write = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * The smoothing parameter. (default = 1.0).
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    NaiveBayesModel.prototype.smoothing = function() {
      var args = {
        target: this,
        method: 'smoothing',
        args: Utils.wrapArguments(arguments),
        returnType: DoubleParam
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<Number>}
     */
    NaiveBayesModel.prototype.getSmoothing = function() {
      var args = {
        target: this,
        method: 'getSmoothing',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * The model type which is a string (case-sensitive). Supported options: "multinomial" and "bernoulli". (default = multinomial)
     * @returns {module:eclairjs/ml/param.Param}
     */
    NaiveBayesModel.prototype.modelType = function() {
      var args = {
        target: this,
        method: 'modelType',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<string>}
     */
    NaiveBayesModel.prototype.getModelType = function() {
      var args = {
        target: this,
        method: 'getModelType',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    NaiveBayesModel.prototype.validateAndTransformSchema = function(schema, fitting, featuresDataType) {
      var args = {
        target: this,
        method: 'validateAndTransformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * Param for raw prediction (a.k.a. confidence) column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    NaiveBayesModel.prototype.rawPredictionCol = function() {
      var args = {
        target: this,
        method: 'rawPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<string>}
     */
    NaiveBayesModel.prototype.getRawPredictionCol = function() {
      var args = {
        target: this,
        method: 'getRawPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    NaiveBayesModel.read = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * @param {Promise.<string>} path
     * @returns {module:eclairjs/mllib/classification.NaiveBayesModel}
     */
    NaiveBayesModel.load = function(path) {
      var args = {
        target: NaiveBayesModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayesModel
      };

      return Utils.generate(args)
    };

    NaiveBayesModel.moduleLocation = '/ml/classification/NaiveBayesModel';

    return NaiveBayesModel;
  })();
};