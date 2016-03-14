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

/**
 * Latent Dirichlet Allocation (LDA) model.
 *
 * This abstraction permits for different underlying representations,
 * including local and distributed data structures.
 * @classdesc
 */
function LDAModel(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * @returns {Promise.<number>}
 */
LDAModel.prototype.k = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.k();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * @returns {Promise.<number>}
 */
LDAModel.prototype.vocabSize = function() {
  function _resolve(result, resolve, reject) {
    var returnValue=parseInt(result);

    resolve(returnValue);
  }

 var templateStr = '{{inRefId}}.vocabSize();';
 return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * Concentration parameter (commonly named "alpha") for the prior placed on documents'
 * distributions over topics ("theta").
 *
 * This is the parameter to a Dirichlet distribution.
 * @returns {Vector}
 */
LDAModel.prototype.docConcentration = function() {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {f{inRefId}}.docConcentration();';
//
// return Utils.generateAssignment(this, Vector, templateStr );
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
LDAModel.prototype.topicConcentration = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.topicConcentration();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Inferred topics, where each topic is represented by a distribution over terms.
 * This is a matrix of size vocabSize x k, where each column is a topic.
 * No guarantees are given about the ordering of the topics.
 * @returns {Matrix}
 */
LDAModel.prototype.topicsMatrix = function() {
  var Matrix = require('../linalg/Matrix.js');

  var templateStr = 'var {{refId}} = {{inRefId}}.topicsMatrix();';

  return Utils.generateAssignment(this, Matrix, templateStr);
};


/**
 * Return the topics described by weighted terms.
 *
 * @param {number} [maxTermsPerTopic]   Maximum number of terms to collect for each topic.
 *          (term indices, term weights in topic).
 *          Each topic's terms are sorted in order of decreasing weight.
 * @returns {Tuple2[]}   Array over topics.  Each topic is represented as a pair of matching arrays:
 */
LDAModel.prototype.describeTopics = function(maxTermsPerTopic) {
  throw "not implemented by ElairJS";
// // TODO: handle optional parms 'maxTermsPerTopic'
//
// var templateStr = 'var {{refId}} = {{inRefId}}.describeTopics({{maxTermsPerTopic}});';
//
// return Utils.generateAssignment(this, Tuple2[], templateStr , {maxTermsPerTopic : maxTermsPerTopic});
};

module.exports = LDAModel;