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

    var PredictionModel = require('../PredictionModel')();

    var gKernelP = kernelP;

    var ParamMap = require('../../ml/param/ParamMap.js')();
    var Param = require('../../ml/param/Param.js')();
    var Vector = require('../../mllib/linalg/Vector.js');
    var DataFrame = require('../../sql/DataFrame.js');
    var StructType = require('../../sql/types/StructType.js')();

    /**
     * @classdesc
     * Classification model based on the Multilayer Perceptron.
     * Each layer has sigmoid activation function, output layer has softmax.
     * @class
     * @extends module:eclairjs/ml.PredictionModel
     * @memberof module:eclairjs/ml/classification
     */
    function MultilayerPerceptronClassificationModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    MultilayerPerceptronClassificationModel.prototype = Object.create(PredictionModel.prototype);

    MultilayerPerceptronClassificationModel.prototype.constructor = MultilayerPerceptronClassificationModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    MultilayerPerceptronClassificationModel.prototype.uid = function() {
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
     * @returns {Promise.<number>}
     */
    MultilayerPerceptronClassificationModel.prototype.layers = function() {
      var args = {
        target: this,
        method: 'layers',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    MultilayerPerceptronClassificationModel.prototype.weights = function() {
      var args = {
        target: this,
        method: 'weights',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassificationModel}
     */
    MultilayerPerceptronClassificationModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassificationModel
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
    MultilayerPerceptronClassificationModel.prototype.validateAndTransformSchema = function(schema, fitting, featuresDataType) {
      var args = {
        target: this,
        method: 'validateAndTransformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * Param for label column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    MultilayerPerceptronClassificationModel.prototype.labelCol = function() {
      var args = {
        target: this,
        method: 'labelCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    MultilayerPerceptronClassificationModel.prototype.getLabelCol = function() {
      var args = {
        target: this,
        method: 'getLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Param for features column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    MultilayerPerceptronClassificationModel.prototype.featuresCol = function() {
      var args = {
        target: this,
        method: 'featuresCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    MultilayerPerceptronClassificationModel.prototype.getFeaturesCol = function() {
      var args = {
        target: this,
        method: 'getFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Param for prediction column name.
     * @returns {module:eclairjs/ml/param.Param}
     */
    MultilayerPerceptronClassificationModel.prototype.predictionCol = function() {
      var args = {
        target: this,
        method: 'predictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    MultilayerPerceptronClassificationModel.prototype.getPredictionCol = function() {
      var args = {
        target: this,
        method: 'getPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {MLWriter}
     */
    MultilayerPerceptronClassificationModel.prototype.write = function() {
    var MLWriter = require('../../ml/util/MLWriter.js');
      var args ={
        target: this,
        method: 'write',
        returnType: MLWriter

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @returns {MLReader}
     */
    MultilayerPerceptronClassificationModel.read = function() {
    var MLReader = require('../../ml/util/MLReader.js');
      var args ={
        target: MultilayerPerceptronClassificationModel,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {MultilayerPerceptronClassificationModel}
     */
    MultilayerPerceptronClassificationModel.load = function(path) {
    var MultilayerPerceptronClassificationModel = require('../../ml/classification/MultilayerPerceptronClassificationModel.js');
      var args ={
        target: MultilayerPerceptronClassificationModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: MultilayerPerceptronClassificationModel

      };

      return Utils.generate(args);
    };


    MultilayerPerceptronClassificationModel.moduleLocation = '/ml/classification/MultilayerPerceptronClassificationModel';

    return MultilayerPerceptronClassificationModel;
  })();
};