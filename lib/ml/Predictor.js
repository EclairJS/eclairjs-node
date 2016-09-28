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
    var Utils = require('../utils.js');

    var Estimator = require('./Estimator')();

    /**
     * @classdesc
     * Abstraction for prediction problems (regression and classification).
     *
     *                       E.g., {@link VectorUDT} for vector features.
     *                  parameter to specify the concrete type.
     *            parameter to specify the concrete type for the corresponding model.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.Estimator
     */
    function Predictor() {
      Utils.handleAbstractConstructor(this, arguments);
    }

    Predictor.prototype = Object.create(Estimator.prototype);

    Predictor.prototype.constructor = Predictor;

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.Predictor}
     */
    Predictor.prototype.setLabelCol = function(value) {
      var args = {
        target: this,
        method: 'setLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.Predictor}
     */
    Predictor.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.Predictor}
     */
    Predictor.prototype.setPredictionCol = function(value) {
      var args = {
        target: this,
        method: 'setPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.Predictor}
     */
    Predictor.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Predictor.prototype.transformSchema = function(schema) {
      var StructType = require('../sql/types/StructType.js')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    return Predictor;
  })();
};