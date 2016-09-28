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

    var Model = require('../Model')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Model fitted by {@link module:eclairjs/ml/clustering.LDA}.
     *
     * @class
     * @extends module:eclairjs/ml.Model
     * @memberof module:eclairjs/ml/clustering
     */
    function LDAModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    LDAModel.prototype = Object.create(Model.prototype);

    LDAModel.prototype.constructor = LDAModel;

    /**
     * The features for LDA should be a {@link Vector} representing the word counts in a document.
     * The vector should be of length vocabSize, with counts for each term (word).
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.LDAModel}
     */
    LDAModel.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: LDAModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDAModel}
     */
    LDAModel.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: LDAModel
      };

      return Utils.generate(args);
    };

    /**
     * Transforms the input dataset.
     *
     * WARNING: If this model is an instance of [[DistributedLDAModel]] (produced when {@link optimizer}
     *          is set to "em"), this involves collecting a large {@link topicsMatrix} to the driver.
     *          This implementation may be changed in the future.
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    LDAModel.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    LDAModel.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * Value for {@link docConcentration} estimated from data.
     * If Online LDA was used and {@link optimizeDocConcentration} was set to false,
     * then this returns the fixed (given) value for the {@link docConcentration} parameter.
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LDAModel.prototype.estimatedDocConcentration = function() {
      var Vector = require('../../mllib/linalg/Vector');

      var args = {
        target: this,
        method: 'estimatedDocConcentration',
        args: Utils.wrapArguments(arguments),
        returnType: Vector
      };

      return Utils.generate(args);
    };

    /**
     * Inferred topics, where each topic is represented by a distribution over terms.
     * This is a matrix of size vocabSize x k, where each column is a topic.
     * No guarantees are given about the ordering of the topics.
     *
     * WARNING: If this model is actually a {@link DistributedLDAModel} instance produced by
     *          the Expectation-Maximization ("em") {@link optimizer}, then this method could involve
     *          collecting a large amount of data to the driver (on the order of vocabSize x k).
     * @returns {module:eclairjs/mllib/linalg.Matrix}
     */
    LDAModel.prototype.topicsMatrix = function() {
      var Matrix = require('../../mllib/linalg/Matrix');

      var args = {
        target: this,
        method: 'topicsMatrix',
        args: Utils.wrapArguments(arguments),
        returnType: Matrix
      };

      return Utils.generate(args);
    };

    /**
     *  Indicates whether this instance is of type {@link DistributedLDAModel}
     * @returns {Promise.<boolean>}
     */
    LDAModel.prototype.isDistributed = function() {
      var args = {
        target: this,
        method: 'isDistributed',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Calculates a lower bound on the log likelihood of the entire corpus.
     *
     * See Equation (16) in the Online LDA paper (Hoffman et al., 2010).
     *
     * WARNING: If this model is an instance of [[DistributedLDAModel]] (produced when {@link optimizer}
     *          is set to "em"), this involves collecting a large {@link topicsMatrix} to the driver.
     *          This implementation may be changed in the future.
     *
     * @param {module:eclairjs/sql.Dataset} dataset   test corpus to use for calculating log likelihood
     * @returns {Promise.<number>}  variational lower bound on the log likelihood of the entire corpus
     */
    LDAModel.prototype.logLikelihood = function(dataset) {
      var args = {
        target: this,
        method: 'logLikelihood',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Calculate an upper bound bound on perplexity.  (Lower is better.)
     * See Equation (16) in the Online LDA paper (Hoffman et al., 2010).
     *
     * WARNING: If this model is an instance of [[DistributedLDAModel]] (produced when {@link optimizer}
     *          is set to "em"), this involves collecting a large {@link topicsMatrix} to the driver.
     *          This implementation may be changed in the future.
     *
     * @param {module:eclairjs/sql.Dataset} dataset  test corpus to use for calculating perplexity
     * @returns {Promise.<number>}  Variational upper bound on log perplexity per token.
     */
    LDAModel.prototype.logPerplexity = function(dataset) {
      var args = {
        target: this,
        method: 'logPerplexity',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Return the topics described by their top-weighted terms.
     *
     * @param {number} [maxTermsPerTopic]   Maximum number of terms to collect for each topic.
     *                          Default value of 10.
     *           - "topic": IntegerType: topic index
     *           - "termIndices": ArrayType(IntegerType): term indices, sorted in order of decreasing
     *                            term importance
     *           - "termWeights": ArrayType(DoubleType): corresponding sorted term weights
     * @returns {module:eclairjs/sql.Dataset}   Local Dataset with one topic per Row, with columns:
     */
    LDAModel.prototype.describeTopics = function(maxTermsPerTopic) {
      var Dataset = require('../../sql/Dataset');

      var args = {
        target: this,
        method: 'describeTopics',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    LDAModel.moduleLocation = '/ml/clustering/LDAModel';

    return LDAModel;
  })();
};