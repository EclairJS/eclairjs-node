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

    var gKernelP = kernelP;

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
     * @memberof module:eclairjs/mllib/feature
     * @classdesc
     * @class
     */
    function Word2Vec() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }


    /**
     * Sets vector size (default: 100).
     * @param {number} vectorSize
     * @returns {}
     */
    Word2Vec.prototype.setVectorSize = function(vectorSize) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setVectorSize',
    //     args: [
    //       { value: vectorSize, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Sets initial learning rate (default: 0.025).
     * @param {number} learningRate
     * @returns {}
     */
    Word2Vec.prototype.setLearningRate = function(learningRate) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setLearningRate',
    //     args: [
    //       { value: learningRate, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Sets number of partitions (default: 1). Use a small number for accuracy.
     * @param {number} numPartitions
     * @returns {}
     */
    Word2Vec.prototype.setNumPartitions = function(numPartitions) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setNumPartitions',
    //     args: [
    //       { value: numPartitions, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Sets number of iterations (default: 1), which should be smaller than or equal to number of
     * partitions.
     * @param {number} numIterations
     * @returns {}
     */
    Word2Vec.prototype.setNumIterations = function(numIterations) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setNumIterations',
    //     args: [
    //       { value: numIterations, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Sets random seed (default: a random long integer).
     * @param {number} seed
     * @returns {}
     */
    Word2Vec.prototype.setSeed = function(seed) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setSeed',
    //     args: [
    //       { value: seed, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Sets the window of words (default: 5)
     * @param {number} window
     * @returns {}
     */
    Word2Vec.prototype.setWindowSize = function(window) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setWindowSize',
    //     args: [
    //       { value: window, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Sets minCount, the minimum number of times a token must appear to be included in the word2vec
     * model's vocabulary (default: 5).
     * @param {number} minCount
     * @returns {}
     */
    Word2Vec.prototype.setMinCount = function(minCount) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setMinCount',
    //     args: [
    //       { value: minCount, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Computes the vector representation of each word in vocabulary.
     * @param {module:eclairjs/rdd.RDD} dataset  an RDD of words
     * @returns {module:eclairjs/mllib/feature.Word2VecModel}  a Word2VecModel
     */
    Word2Vec.prototype.fit = function(dataset) {
      var Word2VecModel = require('./Word2VecModel.js')(this.kernelP);

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: Word2VecModel
       };

      return Utils.generate(args);
    };

    Word2Vec.moduleLocation = '/mllib/feature/Word2Vec';

    return Word2Vec;
  })();
};