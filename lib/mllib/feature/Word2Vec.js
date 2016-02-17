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

var Utils = require('../../utils.js');
var Word2VecModel = require('./Word2VecModel.js');

var kernelP;

/**
 * Word2Vec creates vector representation of words in a text corpus.
 * The algorithm first constructs a vocabulary from the corpus
 * and then learns vector representation of words in the vocabulary.
 * The vector representation can be used as features in
 * natural language processing and machine learning algorithms.
 *
 * We used skip-gram model in our implementation and hierarchical softmax
 * method to train the model. The variable names in the implementation
 * matches the original C implementation.
 *
 * For original C implementation, see https://code.google.com/p/word2vec/
 * For research papers, see
 * Efficient Estimation of Word Representations in Vector Space
 * and
 * Distributed Representations of Words and Phrases and their Compositionality.
 * @classdesc
 */

/**
 * @returns {??}
 *  @class
 */
function Word2Vec() {
  this.kernelP = kernelP;

  var templateStr = 'var {{refId}} = new Word2Vec();';

  this.refIdP = Utils.evaluate(kernelP, Word2Vec, templateStr, null, true);
}

/**
 * Sets vector size (default: 100).
 * @param {number} vectorSize
 * @returns {}
 */
Word2Vec.prototype.setVectorSize = function(vectorSize) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setVectorSize({{vectorSize}});';
//
// return Utils.generateAssignment(this, , templateStr , {vectorSize : vectorSize});
};

/**
 * Sets initial learning rate (default: 0.025).
 * @param {number} learningRate
 * @returns {}
 */
Word2Vec.prototype.setLearningRate = function(learningRate) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setLearningRate({{learningRate}});';
//
// return Utils.generateAssignment(this, , templateStr , {learningRate : learningRate});
};

/**
 * Sets number of partitions (default: 1). Use a small number for accuracy.
 * @param {number} numPartitions
 * @returns {}
 */
Word2Vec.prototype.setNumPartitions = function(numPartitions) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setNumPartitions({{numPartitions}});';
//
// return Utils.generateAssignment(this, , templateStr , {numPartitions : numPartitions});
};

/**
 * Sets number of iterations (default: 1), which should be smaller than or equal to number of
 * partitions.
 * @param {number} numIterations
 * @returns {}
 */
Word2Vec.prototype.setNumIterations = function(numIterations) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setNumIterations({{numIterations}});';
//
// return Utils.generateAssignment(this, , templateStr , {numIterations : numIterations});
};

/**
 * Sets random seed (default: a random long integer).
 * @param {number} seed
 * @returns {}
 */
Word2Vec.prototype.setSeed = function(seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setSeed({{seed}});';
//
// return Utils.generateAssignment(this, , templateStr , {seed : seed});
};

/**
 * Sets the window of words (default: 5)
 * @param {number} window
 * @returns {}
 */
Word2Vec.prototype.setWindowSize = function(window) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setWindowSize({{window}});';
//
// return Utils.generateAssignment(this, , templateStr , {window : window});
};

/**
 * Sets minCount, the minimum number of times a token must appear to be included in the word2vec
 * model's vocabulary (default: 5).
 * @param {number} minCount
 * @returns {}
 */
Word2Vec.prototype.setMinCount = function(minCount) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setMinCount({{minCount}});';
//
// return Utils.generateAssignment(this, , templateStr , {minCount : minCount});
};

/**
 * Computes the vector representation of each word in vocabulary.
 * @param {RDD} dataset  an RDD of words
 * @returns {Word2VecModel}  a Word2VecModel
 */
Word2Vec.prototype.fit = function(dataset) {
  var templateStr = 'var {{refId}} = {{inRefId}}.fit({{dataset}});';

  return Utils.generateAssignment(this, Word2VecModel, templateStr, {dataset: Utils.prepForReplacement(dataset)});
};


module.exports = function(kP) {
  kernelP = kP;

  return Word2Vec;
};
