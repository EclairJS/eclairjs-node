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

var Utils = require('../../utils.js');

var RDD = require('../../rdd/RDD.js');

var kernelP;

function BinaryClassificationMetrics(scoreAndLabels, numBins) {
  this.kernelP = kernelP;

  var templateStr = numBins ? 'var {{refId}} = new BinaryClassificationMetrics({{scoreAndLabels}}, {{numBins}});' : 'var {{refId}} = new BinaryClassificationMetrics({{scoreAndLabels}});';
  this.refIdP = Utils.evaluate(kernelP, BinaryClassificationMetrics, templateStr, {scoreAndLabels: Utils.prepForReplacement(scoreAndLabels), numBins: numBins}, true);
}

/**
 * Computes the area under the receiver operating characteristic (ROC) curve.
 * @returns {number}
 */
BinaryClassificationMetrics.prototype.areaUnderROC = function() {
  function _resolve(result, resolve, reject) {
    resolve(parseFloat(result));
  }

  var templateStr = '{{inRefId}}.areaUnderROC();';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

BinaryClassificationMetrics.prototype.precisionByThreshold = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.precisionByThreshold();';

  return Utils.generateAssignment(this, RDD, templateStr);
};

BinaryClassificationMetrics.prototype.recallByThreshold = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.recallByThreshold();';

  return Utils.generateAssignment(this, RDD, templateStr);
};

BinaryClassificationMetrics.prototype.fMeasureByThreshold = function(beta) {
  var templateStr = beta ? 'var {{refId}} = {{inRefId}}.fMeasureByThreshold({{beta}});' : 'var {{refId}} = {{inRefId}}.fMeasureByThreshold();';

  return Utils.generateAssignment(this, RDD, templateStr, {beta: beta});
};

BinaryClassificationMetrics.prototype.pr = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.pr();';

  return Utils.generateAssignment(this, RDD, templateStr);
};

module.exports = function(kP) {
  kernelP = kP;

  return BinaryClassificationMetrics;
};

