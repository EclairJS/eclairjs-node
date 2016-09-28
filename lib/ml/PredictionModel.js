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
    var Utils = require('../utils.js');

    var Model = require('./Model')();

    /**
     * @classdesc
     * Abstraction for a model for prediction tasks (regression and classification).
     *
     *                       E.g., {@link VectorUDT} for vector features.
     *            parameter to specify the concrete type for the corresponding model.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.Model
     */
    function PredictionModel() {
      Utils.handleAbstractConstructor(this, arguments);
    }

    PredictionModel.prototype = Object.create(Model.prototype);

    PredictionModel.prototype.constructor = PredictionModel;

    /**
     * @param {string} value
     * @returns {object}
     */
    PredictionModel.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {object}
     */
    PredictionModel.prototype.setPredictionCol = function(value) {
      var args = {
        target: this,
        method: 'setPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     *  Returns the number of features the model was trained on. If unknown, returns -1
     * @returns {Promise.<number>}
     */
    PredictionModel.prototype.numFeatures = function() {
      var args = {
        target: this,
        method: 'numFeatures',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    PredictionModel.prototype.transformSchema = function(schema) {
      var StructType = require('../sql/types/StructType')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * Transforms dataset by reading from {@link featuresCol}, calling [[predict()]], and storing
     * the predictions as a new column {@link predictionCol}.
     *
     * @param {module:eclairjs/sql.Dataset} dataset  input dataset
     * @returns {module:eclairjs/sql.Dataset}  transformed dataset with [[predictionCol]] of type [[Double]]
     */
    PredictionModel.prototype.transform = function(dataset) {
      var Dataset = require('../sql/Dataset');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
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
    PredictionModel.prototype.validateAndTransformSchema = function(schema, fitting, featuresDataType) {
      var StructType = require('../sql/types/StructType')();

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
    PredictionModel.prototype.labelCol = function() {
      var Param = require('./param/Param')();

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
    PredictionModel.prototype.getLabelCol = function() {
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
    PredictionModel.prototype.featuresCol = function() {
      var Param = require('./param/Param')();

      var args = {
        target: this,
        method: 'featuresCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @returns {string}
     */
    PredictionModel.prototype.getFeaturesCol = function() {
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
    PredictionModel.prototype.predictionCol = function() {
      var Param = require('./param/Param')();

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
    PredictionModel.prototype.getPredictionCol = function() {
      var args = {
        target: this,
        method: 'getPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    return PredictionModel;
  })();
};