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

    var LDAModel = require('./LDAModel.js');

    var gKernelP = kernelP;

    /**
     * Latent Dirichlet Allocation (LDA), a topic model designed for text documents.
     *
     * Terminology:
     *  - "word" = "term": an element of the vocabulary
     *  - "token": instance of a term appearing in a document
     *  - "topic": multinomial distribution over words representing some concept
     *
     * References:
     *  - Original LDA paper (journal version):
     *    Blei, Ng, and Jordan.  "Latent Dirichlet Allocation."  JMLR, 2003.
     *
     * @see [[http://en.wikipedia.org/wiki/Latent_Dirichlet_allocation Latent Dirichlet allocation
     *       (Wikipedia)]]
     * @classdesc
     */

    /**
     * Constructs a LDA instance with default parameters.
     * @returns {??}
     * @class
     * @memberof module:eclairjs/mllib/clustering
     */
    function LDA() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Number of topics to infer.  I.e., the number of soft cluster centers.
     *
     * @returns {Promise.<number>}
     */
    LDA.prototype.getK = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Number of topics to infer.  I.e., the number of soft cluster centers.
     * (default = 10)
     * @param {number} k
     * @returns {module:eclairjs/mllib/clustering.LDA}
     */
    LDA.prototype.setK = function(k) {
      var args = {
        target: this,
        method: 'setK',
        args: Utils.wrapArguments(arguments),
        returnType: LDA
      };

      return Utils.generate(args);
    };

    /**
     * Concentration parameter (commonly named "alpha") for the prior placed on documents'
     * distributions over topics ("theta").
     *
     * This is the parameter to a Dirichlet distribution.
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LDA.prototype.getAsymmetricDocConcentration = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Concentration parameter (commonly named "alpha") for the prior placed on documents'
     * distributions over topics ("theta").
     *
     * This method assumes the Dirichlet distribution is symmetric and can be described by a single
     * {@link Double} parameter. It should fail if docConcentration is asymmetric.
     * @returns {Promise.<number>}
     */
    LDA.prototype.getDocConcentration = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Concentration parameter (commonly named "alpha") for the prior placed on documents'
     * distributions over topics ("theta").
     *
     * This is the parameter to a Dirichlet distribution, where larger values mean more smoothing
     * (more regularization).
     *
     * If set to a singleton vector Vector(-1), then docConcentration is set automatically. If set to
     * singleton vector Vector(t) where t != -1, then t is replicated to a vector of length k during
     * [[LDAOptimizer.initialize()]]. Otherwise, the {@link docConcentration} vector must be length k.
     * (default = Vector(-1) = automatic)
     *
     * Optimizer-specific parameter settings:
     *  - EM
     *     - Currently only supports symmetric distributions, so all values in the vector should be
     *       the same.
     *     - Values should be > 1.0
     *     - default = uniformly (50 / k) + 1, where 50/k is common in LDA libraries and +1 follows
     *       from Asuncion et al. (2009), who recommend a +1 adjustment for EM.
     *  - Online
     *     - Values should be >= 0
     *     - default = uniformly (1.0 / k), following the implementation from
     *       [[https://github.com/Blei-Lab/onlineldavb]].
     * @param {module:eclairjs/mllib/linalg.Vector} docConcentration
     * @returns {}
     */
    LDA.prototype.setDocConcentrationwithVector = function(docConcentration) {
      throw "not implemented by ElairJS";
    };

    /**
     * Replicates a {@link Double} docConcentration to create a symmetric prior.
     * @param {number} docConcentration
     * @returns {}
     */
    LDA.prototype.setDocConcentrationwithnumber = function(docConcentration) {
      throw "not implemented by ElairJS";
    };

    /**
     * Alias for {@link getAsymmetricDocConcentration}
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    LDA.prototype.getAsymmetricAlpha = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Alias for {@link getDocConcentration}
     * @returns {Promise.<number>}
     */
    LDA.prototype.getAlpha = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Alias for [[setDocConcentration()]]
     * @param {module:eclairjs/mllib/linalg.Vector} alpha
     * @returns {}
     */
    LDA.prototype.setAlphawithVector = function(alpha) {
      throw "not implemented by ElairJS";
    };

    /**
     * Alias for [[setDocConcentration()]]
     * @param {number} alpha
     * @returns {}
     */
    LDA.prototype.setAlphawithnumber = function(alpha) {
      throw "not implemented by ElairJS";
    };

    /**
     * Concentration parameter (commonly named "beta" or "eta") for the prior placed on topics'
     * distributions over terms.
     *
     * This is the parameter to a symmetric Dirichlet distribution.
     *
     * Note: The topics' distributions over terms are called "beta" in the original LDA paper
     * by Blei et al., but are called "phi" in many later papers such as Asuncion et al., 2009.
     * @returns {Promise.<number>}
     */
    LDA.prototype.getTopicConcentration = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Concentration parameter (commonly named "beta" or "eta") for the prior placed on topics'
     * distributions over terms.
     *
     * This is the parameter to a symmetric Dirichlet distribution.
     *
     * Note: The topics' distributions over terms are called "beta" in the original LDA paper
     * by Blei et al., but are called "phi" in many later papers such as Asuncion et al., 2009.
     *
     * If set to -1, then topicConcentration is set automatically.
     *  (default = -1 = automatic)
     *
     * Optimizer-specific parameter settings:
     *  - EM
     *     - Value should be > 1.0
     *     - default = 0.1 + 1, where 0.1 gives a small amount of smoothing and +1 follows
     *       Asuncion et al. (2009), who recommend a +1 adjustment for EM.
     *  - Online
     *     - Value should be >= 0
     *     - default = (1.0 / k), following the implementation from
     *       [[https://github.com/Blei-Lab/onlineldavb]].
     * @param {number} topicConcentration
     * @returns {}
     */
    LDA.prototype.setTopicConcentration = function(topicConcentration) {
      throw "not implemented by ElairJS";
    };

    /**
     * Alias for {@link getTopicConcentration}
     * @returns {Promise.<number>}
     */
    LDA.prototype.getBeta = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Alias for [[setTopicConcentration()]]
     * @param {number} beta
     * @returns {}
     */
    LDA.prototype.setBeta = function(beta) {
      throw "not implemented by ElairJS";
    };

    /**
     * Maximum number of iterations for learning.
     * @returns {Promise.<number>}
     */
    LDA.prototype.getMaxIterations = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Maximum number of iterations for learning.
     * (default = 20)
     * @param {number} maxIterations
     * @returns {}
     */
    LDA.prototype.setMaxIterations = function(maxIterations) {
      throw "not implemented by ElairJS";
    };

    /**
     * Random seed
     * @returns {Promise.<number>}
     */
    LDA.prototype.getSeed = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Random seed
     * @param {number} seed
     * @returns {}
     */
    LDA.prototype.setSeed = function(seed) {
      throw "not implemented by ElairJS";
    };

    /**
     * Period (in iterations) between checkpoints.
     * @returns {Promise.<number>}
     */
    LDA.prototype.getCheckpointInterval = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Period (in iterations) between checkpoints (default = 10). Checkpointing helps with recovery
     * (when nodes fail). It also helps with eliminating temporary shuffle files on disk, which can be
     * important when LDA is run for many iterations. If the checkpoint directory is not set in
     * {@link SparkContext}, this setting is ignored.
     *
     * @see [[org.apache.spark.SparkContext#setCheckpointDir]]
     * @param {number} checkpointInterval
     * @returns {}
     */
    LDA.prototype.setCheckpointInterval = function(checkpointInterval) {
      throw "not implemented by ElairJS";
    };

    /**
     * Set the LDAOptimizer used to perform the actual calculation by algorithm name.
     * Currently "em", "online" are supported.
     * @param {string} optimizerName
     * @returns {}
     */
    LDA.prototype.setOptimizer = function(optimizerName) {
      throw "not implemented by ElairJS";
    };

    /**
     * Learn an LDA model using the given dataset.
     *
     * @param {module:eclairjs/rdd.RDD} documents   RDD of documents, which are term (word) count vectors paired with IDs.
     *                   The term count vectors are "bags of words" with a fixed-size vocabulary
     *                   (where the vocabulary size is the length of the vector).
     *                   Document IDs must be unique and >= 0.
     * @returns {module:eclairjs/mllib/clustering.LDAModel}   Inferred LDA model
     */
    LDA.prototype.run = function(documents) {
      var args = {
        target: this,
        method: 'run',
        args: Utils.wrapArguments(arguments),
        returnType: LDAModel
      };

      return Utils.generate(args);
    };

    LDA.moduleLocation = '/mllib/clustering/LDA';

    return LDA;
  })();
};