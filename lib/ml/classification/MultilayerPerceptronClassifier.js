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

    var Predictor = require('../Predictor')();
    var Param = require('../../ml/param/Param.js')();
    var StructType = require('../../sql/types/StructType.js')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * :: Experimental ::
     * Classifier trainer based on the Multilayer Perceptron.
     * Each layer has sigmoid activation function, output layer has softmax.
     * Number of inputs has to be equal to the size of feature vectors.
     * Number of outputs has to be equal to the total number of labels.
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml.Predictor
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function MultilayerPerceptronClassifier() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    MultilayerPerceptronClassifier.prototype = Object.create(Predictor.prototype);

    MultilayerPerceptronClassifier.prototype.constructor = MultilayerPerceptronClassifier;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    MultilayerPerceptronClassifier.prototype.uid = function() {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {integer[]} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setLayers = function(value) {
      var args = {
        target: this,
        method: 'setLayers',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier
      };

      return Utils.generate(args);
    };

    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setBlockSize = function(value) {
      var args = {
        target: this,
        method: 'setBlockSize',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier
      };

      return Utils.generate(args);
    };

    /**
     * Sets the value of param {@link solver}.
     * Default is "l-bfgs".
     *
     * @param {string} value
     * @returns {type}
     */
    MultilayerPerceptronClassifier.prototype.setSolver = function(value) {
      var args ={
        target: this,
        method: 'setSolver',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier

      };

      return Utils.generate(args);
    };

    /**
     * Set the maximum number of iterations.
     * Default is 100.
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setMaxIter = function(value) {
      var args = {
        target: this,
        method: 'setMaxIter',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier
      };

      return Utils.generate(args);
    };

    /**
     * Set the convergence tolerance of iterations.
     * Smaller value will lead to higher accuracy with the cost of more iterations.
     * Default is 1E-4.
     * @param {float} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setTol = function(value) {
      var args = {
        target: this,
        method: 'setTol',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier
      };

      return Utils.generate(args);
    };

    /**
     * Set the seed for weights initialization if weights are not set
     * @param {integer} value
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier
      };

      return Utils.generate(args);
    };

    /**
     * Sets the value of param {@link initialWeights}.
     *
     * @param {module:eclairjs/mllib/linalg.Vector} value
     * @returns {type}
     */
    MultilayerPerceptronClassifier.prototype.setInitialWeights = function(value) {
      var args ={
        target: this,
        method: 'setInitialWeights',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier

      };

      return Utils.generate(args);
    };


    /**
     * Sets the value of param {@link stepSize} (applicable only for solver "gd").
     * Default is 0.03.
     *
     * @param {number} value
     * @returns {type}
     */
    MultilayerPerceptronClassifier.prototype.setStepSize = function(value) {
      var args ={
        target: this,
        method: 'setStepSize',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier

      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/classification.MultilayerPerceptronClassiIntArrayParamfier}
     */
    MultilayerPerceptronClassifier.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier
      };

      return Utils.generate(args);
    };

    /**
     * Layer sizes including input size and output size. Default: Array(1, 1)
     * @returns {module:eclairjs/ml/param.IntArrayParam}
     */
    MultilayerPerceptronClassifier.prototype.layers = function() {
      var args = {
        target: this,
        method: 'layers',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<Number[]>}
     */
    MultilayerPerceptronClassifier.prototype.getLayers = function() {
      var args = {
        target: this,
        method: 'getLayers',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * Block size for stacking input data in matrices to speed up the computation.
     * Data is stacked within partitions. If block size is more than remaining data in
     * a partition then it is adjusted to the size of this data. Recommended size is between 10 and 1000. Default: 128
     * @returns {module:eclairjs/ml/param.IntArrayParam}
     */
    MultilayerPerceptronClassifier.prototype.blockSize = function() {
      var args = {
        target: this,
        method: 'blockSize',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassifier
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<Number>}
     */
    MultilayerPerceptronClassifier.prototype.getBlockSize = function() {
      var args = {
        target: this,
        method: 'getBlockSize',
        args: Utils.wrapArguments(arguments),
        returnType: Number
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
    MultilayerPerceptronClassifier.prototype.validateAndTransformSchema = function(schema, fitting, featuresDataType) {
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
    MultilayerPerceptronClassifier.prototype.labelCol = function() {
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
    MultilayerPerceptronClassifier.prototype.getLabelCol = function() {
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
    MultilayerPerceptronClassifier.prototype.featuresCol = function() {
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
    MultilayerPerceptronClassifier.prototype.getFeaturesCol = function() {
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
    MultilayerPerceptronClassifier.prototype.predictionCol = function() {
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
    MultilayerPerceptronClassifier.prototype.getPredictionCol = function() {
      var args = {
        target: this,
        method: 'getPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/ml/regression.MultilayerPerceptronClassificationModel}
     */
    MultilayerPerceptronClassifier.prototype.fit = function(dataset) {
      var MultilayerPerceptronClassificationModel = require('./MultilayerPerceptronClassificationModel.js')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: MultilayerPerceptronClassificationModel
      };

      return Utils.generate(args);
    };


    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {MultilayerPerceptronClassifier}
     */
    MultilayerPerceptronClassifier.load = function(path) {
    var MultilayerPerceptronClassifier = require('../../ml/classification/MultilayerPerceptronClassifier.js');
      var args ={
        target: MultilayerPerceptronClassifier,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: MultilayerPerceptronClassifier

      };

      return Utils.generate(args);
    };

    MultilayerPerceptronClassifier.moduleLocation = '/ml/classification/MultilayerPerceptronClassifier';

    return MultilayerPerceptronClassifier;
  })();
};