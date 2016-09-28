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
var FloatRDD = require('../../rdd/FloatRDD.js')();

/**
 * Regression model for isotonic regression.
 *
 * @param boundaries Array of boundaries for which predictions are known.
 *                   Boundaries must be sorted in increasing order.
 * @param predictions Array of predictions associated to the boundaries at the same index.
 *                    Results of isotonic regression and therefore monotone.
 * @param isotonic indicates whether this is isotonic or antitonic.
 *
 * @memberof module:eclairjs/mllib/regression
 * @classdesc
 */

/**
 * A Java-friendly constructor that takes two Iterable parameters and one Boolean parameter.
 * @param {Iterable} boundaries
 * @param {Iterable} predictions
 * @param {boolean} isotonic
 * @class
 */
function IsotonicRegressionModel(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Predict labels for provided features, or single label..
 * Using a piecewise linear function.
 *
 * @param {module:eclairjs/rdd.RDD | DoubleRDD | float} testData  Features to be labeled, if float.
 *          1) If testData exactly matches a boundary then associated prediction is returned.
 *           In case there are multiple predictions with the same boundary then one of them
 *           is returned. Which one is undefined (same as java.util.Arrays.binarySearch).
 *         2) If testData is lower or higher than all boundaries then first or last prediction
 *           is returned respectively. In case there are multiple predictions with the same
 *           boundary then the lowest or highest is returned respectively.
 *         3) If testData falls between two values in boundary array then prediction is treated
 *           as piecewise linear function and interpolated value is returned. In case there are
 *           multiple values with the same boundary then the same rules as in 2) are used.
 *
 * @returns {module:eclairjs/rdd.RDD | Promise.<number>}  Predicted labels or label.
 */
IsotonicRegressionModel.prototype.predict = function(testData) {
  var args = {
    target: this,
    method: 'predict',
    args: Utils.wrapArguments(arguments),
    returnType: testData instanceof RDD ? RDD : testData instanceof FloatRDD ? FloatRDD : Number
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs.SparkContext} sc
 * @param {string} path
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
IsotonicRegressionModel.prototype.save = function(sc, path) {
  var args = {
    target: this,
    method: 'save',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

IsotonicRegressionModel.moduleLocation = '/mllib/regression/IsotonicRegressionModel';

module.exports = IsotonicRegressionModel;