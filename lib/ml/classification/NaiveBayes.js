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

    var Param = require('../../ml/param/Param')();
    var DoubleParam = require('../param/DoubleParam')();
    var StructType = require('../../sql/types/StructType')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Naive Bayes Classifiers.
     * It supports both Multinomial NB
     * {@link http://nlp.stanford.edu/IR-book/html/htmledition/naive-bayes-text-classification-1.html}
     * which can handle finitely supported discrete data. For example, by converting documents into
     * TF-IDF vectors, it can be used for document classification. By making every vector a
     * binary (0/1) data, it can also be used as Bernoulli NB
     * {@link http://nlp.stanford.edu/IR-book/html/htmledition/the-bernoulli-model-1.html}.
     * The input feature values must be nonnegative.
     * @class
     * @extends module:eclairjs/ml/classification.ProbabilisticClassifier
     * @memberof module:eclairjs/ml/classification
     * @param {string} [uid]
     */
    function NaiveBayes() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Set the smoothing parameter.
     * Default is 1.0.
     * @param {number} value
     * @returns {module:eclairjs/mllib/classification.NaiveBayes}
     */
    NaiveBayes.prototype.setSmoothing = function(value) {
      var args = {
        target: this,
        method: 'setSmoothing',
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayes
      };

      return Utils.generate(args);
    };

    /**
     * Set the model type using a string (case-sensitive).
     * Supported options: "multinomial" and "bernoulli".
     * Default is "multinomial"
     * @param {string} value
     * @returns {module:eclairjs/mllib/classification.NaiveBayes}
     */
    NaiveBayes.prototype.setModelType = function(value) {
      var args = {
        target: this,
        method: 'setModelType',
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayes
      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/classification.NaiveBayes}
     */
    NaiveBayes.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayes
      };

      return Utils.generate(args);
    };

    /**
     * The smoothing parameter. (default = 1.0).
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    NaiveBayes.prototype.smoothing = function () {
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
    NaiveBayes.prototype.getSmoothing = function () {
      var args = {
        target: this,
        method: 'getSmoothing',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);};

    /**
     * The model type which is a string (case-sensitive). Supported options: "multinomial" and "bernoulli". (default = multinomial)
     * @returns {module:eclairjs/ml/param.Param}
     */
    NaiveBayes.prototype.modelType = function () {
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
    NaiveBayes.prototype.getModelType = function () {
      var args = {
        target: this,
        method: 'getModelType',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    NaiveBayes.prototype.write = function () {
      throw "not implemented by ElairJS";
    };

    /**
     * Validates and transforms the input schema with the provided param map.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @param {boolean} fitting  whether this is in fitting
     * @param {module:eclairjs/sql/types.DataType} featuresDataType SQL DataType for FeaturesType.
     * E.g., {@link module:eclairjs/sql/types.VectorUDT}for vector features
     * @returns {module:eclairjs/sql/types.StructType}
     */
    NaiveBayes.prototype.validateAndTransformSchema = function (schema, fitting, featuresDataType) {
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
    NaiveBayes.prototype.labelCol = function () {
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
    NaiveBayes.prototype.getLabelCol = function () {
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
    NaiveBayes.prototype.featuresCol = function () {
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
    NaiveBayes.prototype.getFeaturesCol = function () {
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
    NaiveBayes.prototype.predictionCol = function () {
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
    NaiveBayes.prototype.getPredictionCol = function () {
      return this.getJavaObject().getPredictionCol();
    };

    /**
     * Fits a model to the input data.
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @param {module:eclairjs/ml/param.ParamMap} [paramMap]  Parameter map.
     *                 These values override any specified in this Estimator's embedded ParamMap.
     * @returns {module:eclairjs/ml/classification.LogisticRegressionModel} fitted model
     */
    NaiveBayes.prototype.fit = function(dataset, paramMap) {
      var NaiveBayesModel = require('./NaiveBayesModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayesModel
      };

      return Utils.generate(args);
    };


    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {NaiveBayes}
     */
    NaiveBayes.load = function(path) {
      var args = {
        target: NaiveBayes,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayes
      };

      return Utils.generate(args)
    };

    NaiveBayes.moduleLocation = '/ml/classification/NaiveBayes';

    return NaiveBayes;
  })();
};