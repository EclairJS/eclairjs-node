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

    var ClassificationModel = require('./ClassificationModel');

    /**
     * @classdesc
     *
     * Model produced by a {@link ProbabilisticClassifier}.
     * Classes are indexed {0, 1, ..., numClasses - 1}.
     *
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.ClassificationModel
     */
    function ProbabilisticClassificationModel(kernelP, refIdP) {
      Utils.handleAbstractConstructor(this, arguments);
    }

    ProbabilisticClassificationModel.prototype = Object.create(ClassificationModel.prototype);

    ProbabilisticClassificationModel.prototype.constructor = ProbabilisticClassificationModel;

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.ProbabilisticClassificationModel}
     */
    ProbabilisticClassificationModel.prototype.setProbabilityCol = function(value) {
      var args = {
        target: this,
        method: 'setProbabilityCol',
        args: Utils.wrapArguments(arguments),
        returnType: ProbabilisticClassificationModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {number[]} value
     * @returns {module:eclairjs/ml/classification.ProbabilisticClassificationModel}
     */
    ProbabilisticClassificationModel.prototype.setThresholds = function(value) {
      var args = {
        target: this,
        method: 'setThresholds',
        args: Utils.wrapArguments(arguments),
        returnType: ProbabilisticClassificationModel
      };

      return Utils.generate(args);
    };

    /**
     * Transforms dataset by reading from {@link featuresCol}, and appending new columns as specified by
     * parameters:
     *  - predicted labels as [[predictionCol]] of type {@link Double}
     *  - raw predictions (confidences) as [[rawPredictionCol]] of type {@link Vector}
     *  - probability of each class as [[probabilityCol]] of type {@link Vector}.
     *
     * @param {module:eclairjs/sql.Dataset} dataset  input dataset
     * @returns {module:eclairjs/sql.Dataset}  transformed dataset
     */
    ProbabilisticClassificationModel.prototype.transform = function(dataset) {
      var DataFrane = require('../../sql/Dataset');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: DataFrane
      };

      return Utils.generate(args);
    };

    return ProbabilisticClassificationModel;
  })();
};