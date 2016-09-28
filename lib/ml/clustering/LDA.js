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

    var Estimator = require('../Estimator')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     *
     * Latent Dirichlet Allocation (LDA), a topic model designed for text documents.
     *
     * Terminology:
     *  - "term" = "word": an element of the vocabulary
     *  - "token": instance of a term appearing in a document
     *  - "topic": multinomial distribution over terms representing some concept
     *  - "document": one piece of text, corresponding to one row in the input data
     *
     *  Original LDA paper (journal version):
     *    Blei, Ng, and Jordan.  "Latent Dirichlet Allocation."  JMLR, 2003.
     *
     * Input data (featuresCol):
     *  LDA is given a collection of documents as input data, via the featuresCol parameter.
     *  Each document is specified as a {@link Vector} of length vocabSize, where each entry is the
     *  count for the corresponding term (word) in the document.  Feature transformers such as
     *  [[org.apache.spark.ml.feature.Tokenizer]] and {@link CountVectorizer}
     *  can be useful for converting text to word count vectors.
     *
     * @see [Latent Dirichlet allocation(Wikipedia)]{@link http://en.wikipedia.org/wiki/Latent_Dirichlet_allocation}
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/clustering
     * @param {string} [uid]
     */
    function LDA() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    LDA.prototype = Object.create(Estimator.prototype);

    LDA.prototype.constructor = LDA;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    LDA.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * The features for LDA should be a {@link Vector} representing the word counts in a document.
     * The vector should be of length vocabSize, with counts for each term (word).
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setMaxIter = function(value) {
      var args = {
        target: this,
        method: 'setMaxIter',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setCheckpointInterval = function(value) {
      var args = {
        target: this,
        method: 'setCheckpointInterval',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setK = function(value) {
      var args = {
        target: this,
        method: 'setK',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number[]|number} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setDocConcentration = function(value) {
      var args = {
        target: this,
        method: 'setDocConcentration',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setTopicConcentration = function(value) {
      var args = {
        target: this,
        method: 'setTopicConcentration',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setOptimizer = function(value) {
      var args = {
        target: this,
        method: 'setOptimizer',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setTopicDistributionCol = function(value) {
      var args = {
        target: this,
        method: 'setTopicDistributionCol',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setLearningOffset = function(value) {
      var args = {
        target: this,
        method: 'setLearningOffset',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setLearningDecay = function(value) {
      var args = {
        target: this,
        method: 'setLearningDecay',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setSubsamplingRate = function(value) {
      var args = {
        target: this,
        method: 'setSubsamplingRate',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setOptimizeDocConcentration = function(value) {
      var args = {
        target: this,
        method: 'setOptimizeDocConcentration',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {type}
     */
    LDA.prototype.setKeepLastCheckpoint = function(value) {
      var args ={
        target: this,
        method: 'setKeepLastCheckpoint',
        args: Utils.wrapArguments(arguments),
        returnType: LDA

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/mllib/clustering.LDAModel}
     */
    LDA.prototype.fit = function(dataset) {
      var LDAModel = require('./LDAModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: LDAModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    LDA.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {LDA}
     */
    LDA.load = function(path) {
      var LDA = require('../../mllib/clustering/LDA.js');
      var args ={
        target: LDA,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: LDA

      };

      return Utils.generate(args);
    };

    LDA.moduleLocation = '/ml/clustering/LDA';

    return LDA;
  })();
};