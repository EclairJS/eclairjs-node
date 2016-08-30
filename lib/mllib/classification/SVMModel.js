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

    var gKernelP = kernelP;

    /**
     * Model for Support Vector Machines (SVMs).
     *
     * @param weights Weights computed for every feature.
     * @param intercept Intercept computed for this model.
     * @memberof module:eclairjs/mllib/classification
     * @classdesc
     * @param {module:eclairjs/mllib/linalg.Vector} weights
     * @param {float} intercept
     * @class
     */
    function SVMModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Sets the threshold that separates positive predictions from negative predictions. An example
     * with prediction score greater than or equal to this threshold is identified as an positive,
     * and negative otherwise. The default value is 0.0.
     * @param {number} threshold
     * @returns {}
     */
    SVMModel.prototype.setThreshold = function(threshold) {
      throw "not implemented by ElairJS";
    };

    /**
     * Returns the threshold (if any) used for converting raw prediction scores into 0/1 predictions.
     * @returns {Promise.<number>}
     */
    SVMModel.prototype.getThreshold = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Clears the threshold so that `predict` will output raw prediction scores.
     * @returns {module:eclairjs/mllib/classification.SVMModel}
     */
    SVMModel.prototype.clearThreshold = function() {
      var args = {
        target: this,
        method: 'clearThreshold',
        returnType: SVMModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SVMModel.prototype.save = function(sc,path) {
      throw "not implemented by ElairJS";
    };

    /**
     * @returns {Promise.<string>}
     */
    SVMModel.prototype.toString = function() {
      throw "not implemented by ElairJS";
    };

    SVMModel.moduleLocation = '/mllib/classification/SVMModel';

    return SVMModel;
  })();
};