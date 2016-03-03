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
var RDD = require('../../rdd/RDD.js');

var gKernelP;

/**
 * ::Experimental::
 * Evaluator for ranking algorithms.
 *
 * Java users should use [[RankingMetrics$.of]] to create a {@link RankingMetrics} instance.
 *
 * @param predictionAndLabels an RDD of (predicted ranking, ground truth set) pairs.
 * @classdesc
 */

/**
 * @param {RDD} predictionAndLabels
 * @returns {??}
 *  @class
 */
function RankingMetrics() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = 'var {{refId}} = new RankingMetrics({{predictionAndLabels}});';

    this.refIdP = Utils.evaluate(gKernelP, RankingMetrics, templateStr, {predictionAndLabels: Utils.prepForReplacement(arguments[0])}, true);
  }
}

RankingMetrics.prototype.meanAveragePrecision = function() {
  function _resolve(result, resolve, reject) {
    var returnValue = parseFloat(result);
    resolve(returnValue);
  }

  var templateStr = '{{inRefId}}.meanAveragePrecision();';
  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * Compute the average precision of all the queries, truncated at ranking position k.
 *
 * If for a query, the ranking algorithm returns n (n < k) results, the precision value will be
 * computed as #(relevant items retrieved) / k. This formula also applies when the size of the
 * ground truth set is less than k.
 *
 * If a query has an empty ground truth set, zero will be used as precision together with
 * a log warning.
 *
 * See the following paper for detail:
 *
 * IR evaluation methods for retrieving highly relevant documents. K. Jarvelin and J. Kekalainen
 *
 * @param {number} k  the position to compute the truncated precision, must be positive
 * @returns {Promise.<number>}  the average precision at the first k ranking positions
 */
RankingMetrics.prototype.precisionAt = function(k) {
  function _resolve(result, resolve, reject) {
    var returnValue = parseFloat(result);
    resolve(returnValue);
 }

  var templateStr = '{{inRefId}}.precisionAt({{k}});';
  return Utils.generateResultPromise(this, templateStr, {k: k}, _resolve);
};

/**
 * Compute the average NDCG value of all the queries, truncated at ranking position k.
 * The discounted cumulative gain at position k is computed as:
 *    sum,,i=1,,^k^ (2^{relevance of ''i''th item}^ - 1) / log(i + 1),
 * and the NDCG is obtained by dividing the DCG value on the ground truth set. In the current
 * implementation, the relevance value is binary.

 * If a query has an empty ground truth set, zero will be used as ndcg together with
 * a log warning.
 *
 * See the following paper for detail:
 *
 * IR evaluation methods for retrieving highly relevant documents. K. Jarvelin and J. Kekalainen
 *
 * @param {number} k  the position to compute the truncated ndcg, must be positive
 * @returns {Promise.<number>}  the average ndcg at the first k ranking positions
 */
RankingMetrics.prototype.ndcgAt = function(k) {
  function _resolve(result, resolve, reject) {
    var returnValue = parseFloat(result);
    resolve(returnValue);
  }

  var templateStr = '{{inRefId}}.ndcgAt({{k}});';
  return Utils.generateResultPromise(this, templateStr, {k: k}, _resolve);
};

//
// static methods
//

/**
 * Creates a {@link RankingMetrics} instance (for Java users).
 * @param {RDD} predictionAndLabels  a RDD of (predicted ranking, ground truth set) pairs
 * @returns {RankingMetrics}
 */
RankingMetrics.of = function(predictionAndLabels) {
  var templateStr = 'var {{refId}} = RankingMetrics.of({{predictionAndLabels}});';

  return Utils.evaluate(gKernelP, RankingMetrics, templateStr, {predictionAndLabels: Utils.prepForReplacement(predictionAndLabels)});
};

module.exports = function(kP) {
  gKernelP = kP;

  return RankingMetrics;
};