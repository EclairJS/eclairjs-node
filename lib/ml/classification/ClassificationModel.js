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

    var PredictionModel = require('../PredictionModel')();

    /**
     * @classdesc
     *
     * Model produced by a {@link module:eclairjs/ml/classification.Classifier}.
     * Classes are indexed {0, 1, ..., numClasses - 1}.
     *
     * @class
     * @extends module:eclairjs/ml.PredictionModel
     * @memberof module:eclairjs/ml/classification
     *
     */
    function ClassificationModel() {
      Utils.handleAbstractConstructor(this, arguments);
    }

    ClassificationModel.prototype = Object.create(PredictionModel.prototype);

    ClassificationModel.prototype.constructor = ClassificationModel;

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.ClassificationModel}
     */
    ClassificationModel.prototype.setRawPredictionCol = function(value) {
      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: LogisticRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     *  Number of classes (values which the label can take).
     * @returns {Promise.<number>}
     */
    ClassificationModel.prototype.numClasses = function() {
      var args = {
        target: this,
        method: 'numClasses',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Transforms dataset by reading from {@link featuresCol}, and appending new columns as specified by
     * parameters:
     *  - predicted labels as [[predictionCol]] of type {@link Double}
     *  - raw predictions (confidences) as [[rawPredictionCol]] of type {@link Vector}.
     *
     * @param {module:eclairjs/sql.Dataset} dataset  input dataset
     * @returns {module:eclairjs/sql.Dataset}  transformed dataset
     */
    ClassificationModel.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    return ClassificationModel;
  })();
};