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

    var Matrix = require('../linalg/Matrix.js');

    var gKernelP = kernelP;

    /**
     * ::Experimental::
     * Evaluator for multiclass classification.
     *
     * @memberof module:eclairjs/mllib/evaluation
     * @classdesc
     * @param {module:eclairjs/rdd.RDD} predictionAndLabels an RDD of (prediction, label) pairs.
     * @class
     */
    function MulticlassMetrics() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Returns confusion matrix:
     * predicted classes are in columns,
     * they are ordered by class label ascending,
     * as in "labels"
     * @returns {module:eclairjs/mllib/linalg.Matrix}
     */
    MulticlassMetrics.prototype.confusionMatrix = function() {
      var args = {
        target: this,
        method: 'confusionMatrix',
        returnType: Matrix
      };

      return Utils.generate(args);
    };

    /**
     * Returns true positive rate for a given label (category)
     * @param {number} label  the label.
     * @returns {Promise.<number>}
     */
    MulticlassMetrics.prototype.truePositiveRate = function(label) {
      var args = {
        target: this,
        method: 'truePositiveRate',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns false positive rate for a given label (category)
     * @param {number} label  the label.
     * @returns {Promise.<number>}
     */
    MulticlassMetrics.prototype.falsePositiveRate = function(label) {
      var args ={
        target: this,
        method: 'falsePositiveRate',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns precision
     * @param {float} [label] Returns precision for a given label (category)
     * @returns {float}
     */
    MulticlassMetrics.prototype.precision = function(label) {
      var args ={
        target: this,
        method: 'precision',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns recall (equals to precision for multiclass classifier because sum of all false positives is equal to sum of all false negatives)
     * @param {float} [label] Returns recall for a given label (category)
     * @returns {float}
     */
    MulticlassMetrics.prototype.recall = function(label) {
      var args ={
        target: this,
        method: 'recall',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns f-measure for a given label (category)
     * @param {number} label  the label.
     * @param {number} [beta]  the beta parameter.
     * @returns {Promise.<number>}
     */
    MulticlassMetrics.prototype.fMeasure = function(label,beta) {
      var args ={
        target: this,
        method: 'fMeasure',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns weighted averaged f-measure
     * @param {number} [beta]  the beta parameter.
     * @returns {number}
     */
    MulticlassMetrics.prototype.weightedFMeasure = function(beta) {
      var args ={
        target: this,
        method: 'weightedFMeasure',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns the sequence of labels in ascending order
     * @returns {float[]}
     */
    MulticlassMetrics.prototype.labels = function () {
      var args = {
        target: this,
        method: 'labels',
        stringify: true,
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * Returns weighted averaged precision
     * @returns {float}
     */
    MulticlassMetrics.prototype.weightedPrecision = function () {
      var args = {
        target: this,
        method: 'weightedPrecision',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns weighted averaged recall (equals to precision, recall and f-measure)
     * @returns {float}
     */
    MulticlassMetrics.prototype.weightedRecall = function () {
      var args = {
        target: this,
        method: 'weightedRecall',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns weighted false positive rate
     * @returns {float}
     */
    MulticlassMetrics.prototype.weightedFalsePositiveRate = function () {
      var args = {
        target: this,
        method: 'weightedFalsePositiveRate',
        returnType: Number
      };

      return Utils.generate(args);
    };

    MulticlassMetrics.moduleLocation = '/mllib/evaluation#MulticlassMetrics';

    return MulticlassMetrics;
  })();
};