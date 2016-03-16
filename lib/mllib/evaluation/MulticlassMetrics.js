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

var Matrix = require('../linalg/Matrix.js');

/**
 * ::Experimental::
 * Evaluator for multiclass classification.
 *
 * @param predictionAndLabels an RDD of (prediction, label) pairs.
 * @classdesc
 */

/**
 * @param {RDD} predictionAndLabels
 * @returns {MulticlassMetrics}
 *  @class
 */
function MulticlassMetrics() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = 'var {{refId}} = new MulticlassMetrics({{predictionAndLabels}});';

    this.refIdP = Utils.evaluate(gKernelP, MulticlassMetrics, templateStr, {predictionAndLabels: Utils.prepForReplacement(arguments[0])}, true);
  }
}

/**
 * Returns confusion matrix:
 * predicted classes are in columns,
 * they are ordered by class label ascending,
 * as in "labels"
 * @returns {Matrix}
 */
MulticlassMetrics.prototype.confusionMatrix = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.confusionMatrix();';

  return Utils.generateAssignment(this, Matrix, templateStr);
};

/**
 * Returns true positive rate for a given label (category)
 * @param {number} label  the label.
 * @returns {Promise.<number>}
 */
MulticlassMetrics.prototype.truePositiveRate = function(label) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.truePositiveRate({{label}});';
// return Utils.generateResultPromise(this, templateStr  , {label : label}, _resolve);
};


/**
 * Returns false positive rate for a given label (category)
 * @param {number} label  the label.
 * @returns {Promise.<number>}
 */
MulticlassMetrics.prototype.falsePositiveRate = function(label) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.falsePositiveRate({{label}});';
// return Utils.generateResultPromise(this, templateStr  , {label : label}, _resolve);
};


/**
 * Returns precision for a given label (category)
 * @param {number} label  the label.
 * @returns {Promise.<number>}
 */
MulticlassMetrics.prototype.precision = function(label) {
  function _resolve(result, resolve, reject) {
    var returnValue=parseFloat(result)
    resolve(returnValue);
  }

  var templateStr = label ? '{{inRefId}}.precision({{label}});' : '{{inRefId}}.precision();';

  return Utils.generateResultPromise(this, templateStr, {label: label}, _resolve);
};

/**
 * Returns recall for a given label (category)
 * @param {number} label  the label.
 * @returns {Promise.<number>}
 */
MulticlassMetrics.prototype.recall = function(label) {
  function _resolve(result, resolve, reject) {
    var returnValue=parseFloat(result);
    resolve(returnValue);
  }

  var templateStr = label ? '{{inRefId}}.recall({{label}});' : '{{inRefId}}.recall();';

  return Utils.generateResultPromise(this, templateStr, {label: label}, _resolve);
};

/**
 * Returns f-measure for a given label (category)
 * @param {number} label   Optional the label.
 * @param {number} [beta]  Optional the beta parameter.
 * @returns {Promise.<number>}
 */
MulticlassMetrics.prototype.fMeasure = function(label, beta) {
  function _resolve(result, resolve, reject) {
    var returnValue=parseFloat(result);
    resolve(returnValue);
  }

  var templateStr;
  if (beta) {
    templateStr = '{{inRefId}}.fMeasure({{label}}, {{beta}});';
  } else if (label) {
    templateStr = '{{inRefId}}.fMeasure({{label}});';
  } else {
    templateStr = '{{inRefId}}.fMeasure();';
  }

  return Utils.generateResultPromise(this, templateStr, {label: label, beta: beta}, _resolve);
};


/**
 * Returns weighted averaged f-measure
 * @param {number} beta  the beta parameter.
 * @returns {Promise.<number>}
 */
MulticlassMetrics.prototype.weightedFMeasure = function(beta) {
  function _resolve(result, resolve, reject) {
    var returnValue=parseFloat(result)
   resolve(returnValue);
  }

  var templateStr = beta ? '{{inRefId}}.weightedFMeasure({{beta}});' : '{{inRefId}}.weightedFMeasure();';
  return Utils.generateResultPromise(this, templateStr, {beta: beta}, _resolve);
};

/**
 * Returns weighted averaged precision
 * @returns {Promise.<number>}
 */
MulticlassMetrics.prototype.weightedPrecision = function () {
  function _resolve(result, resolve, reject) {
    var returnValue=parseFloat(result);
    resolve(returnValue);
  }

  var templateStr = '{{inRefId}}.weightedPrecision();';
  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * Returns weighted averaged recall (equals to precision, recall and f-measure)
 * @returns {Promise.<number>}
 */
MulticlassMetrics.prototype.weightedRecall = function () {
  function _resolve(result, resolve, reject) {
    var returnValue=parseFloat(result)
    resolve(returnValue);
  }

  var templateStr = '{{inRefId}}.weightedRecall();';
  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * Returns weighted false positive rate
 * @returns {Promise.<number>}
 */
MulticlassMetrics.prototype.weightedFalsePositiveRate = function () {
  function _resolve(result, resolve, reject) {
    var returnValue=parseFloat(result)
    resolve(returnValue);
  }

  var templateStr = '{{inRefId}}.weightedFalsePositiveRate();';
  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * Returns the sequence of labels in ascending order
 * @returns {Promise.<float[]>}
 */
MulticlassMetrics.prototype.labels = function () {
  function _resolve(result, resolve, reject) {
 	  resolve(JSON.parse(result));
  }

  var templateStr = 'JSON.stringify({{inRefId}}.labels());';
  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

module.exports = function(kP) {
  gKernelP = kP;

  return MulticlassMetrics;
};