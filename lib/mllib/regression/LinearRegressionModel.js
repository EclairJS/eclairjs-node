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
 * @classdesc Model produced by LinearRegression.
 */
function LinearRegressionModel(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Predict label for the given features.
 * @param {Vector} features
 * @returns {Promise.<float>} A Promise that resolves to the prediction.
 */
LinearRegressionModel.prototype.predict = function(features) {
  function _resolve(result, resolve, reject) {
    resolve(parseFloat(result));
  }

  var templateStr = '{{inRefId}}.predict({{features}});';

  return Utils.generateResultPromise(this, templateStr, {features: Utils.prepForReplacement(features)}, _resolve);
};

module.exports = LinearRegressionModel;
