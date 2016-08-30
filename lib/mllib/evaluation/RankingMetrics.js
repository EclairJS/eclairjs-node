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
    var RDD = require('../../rdd/RDD.js');

    var gKernelP = kernelP;

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
     * @param {module:eclairjs/rdd.RDD} predictionAndLabels
     * @class
     * @memberof module:eclairjs/mllib/evaluation
     */
    function RankingMetrics() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    RankingMetrics.prototype.meanAveragePrecision = function() {
      var args = {
        target: this,
        method: 'meanAveragePrecision',
        returnType: Number
      };

      return Utils.generate(args);
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
      var args = {
        target: this,
        method: 'precisionAt',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
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
      var args = {
        target: this,
        method: 'ndcgAt',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * Creates a {@link RankingMetrics} instance (for Java users).
     * @param {module:eclairjs/rdd.RDD} predictionAndLabels  a RDD of (predicted ranking, ground truth set) pairs
     * @returns {module:eclairjs/mllib/evaluation.RankingMetrics}
     */
    RankingMetrics.of = function(predictionAndLabels) {
      var args = {
        target: RankingMetrics,
        method: 'of',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: RankingMetrics
      };

      return Utils.generate(args)
    };

    RankingMetrics.moduleLocation = '/mllib/evaluation#RankingMetrics';

    return RankingMetrics;
  })();
};