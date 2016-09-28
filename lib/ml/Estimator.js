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

    var PipelineStage = require('./PipelineStage')();

    /**
     * @classdesc
     * Abstract class for estimators that fit models to data.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.PipelineStage
     */
    function Estimator() {
      Utils.handleAbstractConstructor(this, arguments);
    }

    Estimator.prototype = Object.create(PipelineStage.prototype);

    Estimator.prototype.constructor = Estimator;

    /**
     * Fits a model to the input data.
     * @param {module:eclairjs/sql.Dataset} dataset
     * @param {module:eclairjs/ml/param.ParamMap} [paramMap]  Parameter map.
     *                 These values override any specified in this Estimator's embedded ParamMap.
     * @returns {module:eclairjs/ml.Model} fitted model
     */
    Estimator.prototype.fit = function(dataset, paramMap) {
      var Model = require('./Model')();
      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: Model
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.Estimator}
     * @abstract
     */
    Estimator.prototype.copy = function(extra) {
      throw "Abstract class must be implemented in extending class";
    };

    /**
     *
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    Estimator.prototype.extractParamMap = function() {
      var ParamMap = require('./param/ParamMap')();

      var args = {
        target: this,
        method: 'extractParamMap',
        args: Utils.wrapArguments(arguments),
        returnType: ParamMap
      };

      return Utils.generate(args);
    };

    return Estimator;
  })();
};