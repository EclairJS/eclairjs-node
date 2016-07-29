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

/**
 * @constructor
 * @memberof module:eclairjs/mllib/regression
 * @classdesc Model produced by LinearRegression.
 */
function LinearRegressionModel(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Predict label for the given features.
 * @param {module:eclairjs/mllib/linalg.Vector} features
 * @returns {Promise.<float>} A Promise that resolves to the prediction.
 */
LinearRegressionModel.prototype.predict = function(features) {
  var args = {
    target: this,
    method: 'predict',
    args: Utils.wrapArguments(arguments),
    returnType: Number
  };

  return Utils.generate(args);
};

LinearRegressionModel.prototype.toString = function() {
  var args = {
    target: this,
    method: 'toString',
    returnType: String
  };

  return Utils.generate(args);
};

LinearRegressionModel.moduleLocation = '/mllib/regression/LinearRegressionModel';

module.exports = LinearRegressionModel;