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
     * Word2Vec model
     * @param wordIndex maps each word to an index, which can retrieve the corresponding
     *                  vector from wordVectors
     * @param wordVectors array of length numWords * vectorSize, vector corresponding
     *                    to the word mapped with index i can be retrieved by the slice
     *                    (i * vectorSize, i * vectorSize + vectorSize)
     * @classdesc
     */

    /**
     * @param {Map} model
     * @returns {??}
     * @class
     * @memberof module:eclairjs/mllib/feature
     */
    function Word2VecModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    Word2VecModel.prototype.save = function(sc,path) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'save',
    //     args: [
    //       { value: sc, type: 'SparkContext' },
    //       { value: path, type: 'string' }
    //     ],
    //     returnType: null
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Transforms a word to its vector representation
     * @param {string} word  a word
     * @returns {module:eclairjs/mllib/linalg.Vector}  vector representation of word
     */
    Word2VecModel.prototype.transform = function(word) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'transform',
    //     args: [
    //       { value: word, type: 'string' }
    //     ],
    //     returnType: Vector
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Find synonyms of a word
     * @param {Vector|string} word  a word
     * @param {number} num  number of synonyms to find
     * @returns {Tuple2[]}  array of (word, cosineSimilarity)
     */
    Word2VecModel.prototype.findSynonyms = function(word,num) {
      var args ={
        target: this,
        method: 'findSynonyms',
        args: Utils.wrapArguments(arguments),
        stringify: true,
        returnType: [String]
      };

      return Utils.generate(args);
    };

    /**
     * Returns a map of words to their vector representations.
     * @returns {Map}
     */
    Word2VecModel.prototype.getVectors = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'getVectors',
    //     returnType: Map
    //
    //   };
    //
    //   return Utils.generate(args);
    };
    //
    // static methods
    //


    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.Word2VecModel}
     */
    Word2VecModel.load = function(sc,path) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: Word2VecModel,
    //     method: 'load',
    //     args: [
    //       { value: sc, type: 'SparkContext' },
    //       { value: path, type: 'string' }
    //     ],
    //     returnType: Word2VecModel
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    Word2VecModel.moduleLocation = '/mllib/feature/Word2VecModel';


    return Word2VecModel;
  })();
};