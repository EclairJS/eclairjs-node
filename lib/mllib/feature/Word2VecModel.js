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

var kernelP;

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
 *  @class
 */
function Word2VecModel(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Word2VecModel.prototype.save = function(sc,path) {
  throw "not implemented by ElairJS";
//
// var templateStr = '{{inRefId}}.save({{sc}},{{path}});';
// return Utils.generateVoidPromise(this, templateStr , {sc : sc,path : path});
};

/**
 * Transforms a word to its vector representation
 * @param {string} word  a word
 * @returns {Vector}  vector representation of word
 */
Word2VecModel.prototype.transform = function(word) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.transform({{word}});';
//
// return Utils.generateAssignment(this, Vector, templateStr , {word : word});
};

/**
 * Find synonyms of a word
 * @param {string | Vector} word  a word
 * @param {number} num  number of synonyms to find
 * @returns {Promise.<Array>} A Promise that resolves to an array containing (word, cosineSimilarity).
 */
Word2VecModel.prototype.findSynonyms = function(word, num) {
  function _resolve(result, resolve, reject) {
    try {
      var res = JSON.parse(result);
      resolve(res);
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = 'JSON.stringify({{inRefId}}.findSynonyms({{word}},{{num}}));';

  return Utils.generateResultPromise(this, templateStr, {word: Utils.prepForReplacement(word), num: num}, _resolve);
};

/**
 * Returns a map of words to their vector representations.
 * @returns {Map}
 */
Word2VecModel.prototype.getVectors = function() {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.getVectors();';
//
// return Utils.generateAssignment(this, Map, templateStr );
};

//
// static methods
//

/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {Word2VecModel}
 */
Word2VecModel.load = function(sc,path) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = Word2VecModel.load({{sc}},{{path}});';
//
// return Utils.generateAssignment(this, Word2VecModel, templateStr , {sc : sc,path : path});
};

module.exports = Word2VecModel;
