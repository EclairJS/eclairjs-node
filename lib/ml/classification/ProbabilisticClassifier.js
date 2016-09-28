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

    var Classifier = require('./Classifier')();

    /**
     * @classdesc
     *
     * Single-label binary or multiclass classifier which can output class conditional probabilities.
     *
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.Classifier
     */
    function ProbabilisticClassifier() {
      Utils.handleAbstractConstructor(this, arguments);
    }

    ProbabilisticClassifier.prototype = Object.create(Classifier.prototype);

    ProbabilisticClassifier.prototype.constructor = ProbabilisticClassifier;

    /**
     * @param {string} value
     * @returns {object}
     */
    ProbabilisticClassifier.prototype.setProbabilityCol = function(value) {
      var args = {
        target: this,
        method: 'setProbabilityCol',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    ProbabilisticClassifier.prototype.probabilityCol = function() {
      var Param = require('../param/Param')();

      var args = {
        target: this,
        method: 'probabilityCol',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    /**
     * @param {float[]} value
     * @returns {object}
     */
    ProbabilisticClassifier.prototype.setThresholds = function(value) {
      var args = {
        target: this,
        method: 'setThresholds',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/ml/param.Param}
     */
    ProbabilisticClassifier.prototype.thresholds = function() {
      var Param = require('../param/Param')();

      var args = {
        target: this,
        method: 'thresholds',
        args: Utils.wrapArguments(arguments),
        returnType: Param
      };

      return Utils.generate(args);
    };

    return ProbabilisticClassifier;
  })();
};