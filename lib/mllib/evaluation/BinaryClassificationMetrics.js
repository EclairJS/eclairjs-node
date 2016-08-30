/*
 * Copyright 2015 IBM Corp.
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
     * Evaluator for binary classification.
     *
     * @param scoreAndLabels an RDD of (score, label) pairs.
     * @param numBins if greater than 0, then the curves (ROC curve, PR curve) computed internally
     *                will be down-sampled to this many "bins". If 0, no down-sampling will occur.
     *                This is useful because the curve contains a point for each distinct score
     *                in the input, and this could be as large as the input itself -- millions of
     *                points or more, when thousands may be entirely sufficient to summarize
     *                the curve. After down-sampling, the curves will instead be made of approximately
     *                `numBins` points instead. Points are made from bins of equal numbers of
     *                consecutive points. The size of each bin is
     *                `floor(scoreAndLabels.count() / numBins)`, which means the resulting number
     *                of bins may not exactly equal numBins. The last bin in each partition may
     *                be smaller as a result, meaning there may be an extra sample at
     *                partition boundaries.
     *
     * @classdesc
     */

    /**
     * @param {module:eclairjs/rdd.RDD} scoreAndLabels
     * @param {number} numBins
     * @class
     * @memberof module:eclairjs/mllib/evaluation
     */
    function BinaryClassificationMetrics() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Computes the area under the receiver operating characteristic (ROC) curve.
     * @returns {number}
     */
    BinaryClassificationMetrics.prototype.areaUnderROC = function() {
      var args = {
        target: this,
        method: 'areaUnderROC',
        returnType: Number
      };

      return Utils.generate(args);
    };

    BinaryClassificationMetrics.prototype.precisionByThreshold = function() {
      var args = {
        target: this,
        method: 'precisionByThreshold',
        returnType: RDD
      };

      return Utils.generate(args);
    };

    BinaryClassificationMetrics.prototype.recallByThreshold = function() {
      var args = {
        target: this,
        method: 'recallByThreshold',
        returnType: RDD
      };

      return Utils.generate(args);
    };

    BinaryClassificationMetrics.prototype.fMeasureByThreshold = function(beta) {
      var args = {
        target: this,
        method: 'fMeasureByThreshold',
        args: Utils.wrapArguments(arguments),
        returnType: RDD
      };

      return Utils.generate(args);
    };

    BinaryClassificationMetrics.prototype.pr = function() {
      var args = {
        target: this,
        method: 'pr',
        returnType: RDD
      };

      return Utils.generate(args);
    };

    BinaryClassificationMetrics.moduleLocation = '/mllib/evaluation/BinaryClassificationMetrics';

    return BinaryClassificationMetrics;
  })();
};