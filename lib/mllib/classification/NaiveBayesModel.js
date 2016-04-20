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

var gKernelP;

/**
 * Model for Naive Bayes Classifiers.
 *
 * @memberof module:eclairjs/mllib/classification
 * @classdesc
 *
 * @constructor
 * @implements {ClassificationModel}
 */
function NaiveBayesModel() {
  if (arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: NaiveBayesModel,
      args: Utils.wrapArguments(arguments),
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

/**
 * Predict values for the given data set using the model trained.
 *
 * @param {RDD | Vector} testData  RDD representing data points to be predicted or Vector array representing a single data point
 * @returns {RDD | float}  an RDD[Double] where each entry contains the corresponding prediction or float predicted category from the trained model
 */
NaiveBayesModel.prototype.predict = function(testData) {
  throw "not implemented by ElairJS";
};

/**
 * Predict values for the given data set using the model trained.
 *
 * @param {RDD | Vector} testData  RDD representing data points to be predicted
 *         in the same order as class labels
 * @returns {RDD | Vector}  an RDD[Vector] where each entry contains the predicted posterior class probabilities,
 */
NaiveBayesModel.prototype.predictProbabilities = function(testData) {
  throw "not implemented by ElairJS";
};


/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
NaiveBayesModel.prototype.save = function(sc,path) {
  throw "not implemented by ElairJS";
};

NaiveBayesModel.moduleLocation = '/mllib/classification#NaiveBayesModel';

module.exports = function(kP) {
  gKernelP = kP;

  return NaiveBayesModel;
};