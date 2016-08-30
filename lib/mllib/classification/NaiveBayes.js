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

    var NaiveBayesModel = require('./NaiveBayesModel')();

    var gKernelP = kernelP;

    /**
     * Trains a Naive Bayes model given an RDD of `(label, features)` pairs.
     *
     * This is the Multinomial NB ([[http://tinyurl.com/lsdw6p]]) which can handle all kinds of
     * discrete data.  For example, by converting documents into TF-IDF vectors, it can be used for
     * document classification.  By making every vector a 0-1 vector, it can also be used as
     * Bernoulli NB ([[http://tinyurl.com/p7c96j6]]). The input feature values must be nonnegative.
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     * @param {number} lambda
     * @class
     */
    function NaiveBayes() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {number} lambda
     * @returns {module:eclairjs/mllib/classification.NaiveBayes}
     */
    NaiveBayes.prototype.setLambda = function(lambda) {
      var args = {
        target: this,
        method: 'setNumClasses',
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayes
      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<number>}
     */
    NaiveBayes.prototype.getLambda = function() {
      var args = {
        target: this,
        method: 'getLambda',
        returnType: Number
      };

      return Utils.generate(args);
    };


    /**
     * Set the model type using a string (case-sensitive).
     * Supported options: "multinomial" (default) and "bernoulli".
     * @param {string} modelType
     * @returns {module:eclairjs/mllib/classification.NaiveBayes}
     */
    NaiveBayes.prototype.setModelType = function(modelType) {
      var args = {
        target: this,
        method: 'setModelType',
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayes
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    NaiveBayes.prototype.getModelType = function() {
      var args = {
        target: this,
        method: 'getModelType',
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Run the algorithm with the configured parameters on an input RDD of LabeledPoint entries.
     *
     * @param {module:eclairjs/rdd.RDD} data  RDD of {@link LabeledPoint}.
     * @returns {module:eclairjs/mllib/classification.NaiveBayesModel}
     */
    NaiveBayes.prototype.run = function(data) {
      var args = {
        target: this,
        method: 'run',
        returnType: NaiveBayesModel
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * Trains a Naive Bayes model given an RDD of `(label, features)` pairs.
     *
     * The model type can be set to either Multinomial NB ([[http://tinyurl.com/lsdw6p]])
     * or Bernoulli NB ([[http://tinyurl.com/p7c96j6]]). The Multinomial NB can handle
     * discrete count data and can be called by setting the model type to "multinomial".
     * For example, it can be used with word counts or TF_IDF vectors of documents.
     * The Bernoulli model fits presence or absence (0-1) counts. By making every vector a
     * 0-1 vector and setting the model type to "bernoulli", the  fits and predicts as
     * Bernoulli NB.
     *
     * @param {module:eclairjs/rdd.RDD} input  RDD of `(label, array of features)` pairs.  Every vector should be a frequency
     *              vector or a count vector.
     * @param {float} [lambda]  The smoothing parameter
     *
     * @param {string} [modelType]  The type of NB model to fit from the enumeration NaiveBayesModels, can be
     *              multinomial or bernoulli
     * @returns {module:eclairjs/mllib/classification.NaiveBayesModel}
     */
    NaiveBayes.train = function(input, lambda, modelType) {
      var args = {
        target: NaiveBayes,
        method: 'train',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: NaiveBayesModel
      };

      return Utils.generate(args);
    };

    NaiveBayes.moduleLocation = '/mllib/classification#NaiveBayes';

    return NaiveBayes;
  })();
};