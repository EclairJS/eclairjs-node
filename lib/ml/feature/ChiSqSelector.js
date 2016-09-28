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
     * @classdesc
     * Chi-Squared feature selection, which selects categorical features to use for predicting a
     * categorical label.
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @constructor
     */
    function ChiSqSelector() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.setNumTopFeatures = function(value) {
      var args = {
        target: this,
        method: 'setNumTopFeatures',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelector
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelector
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelector
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.setLabelCol = function(value) {
      var args = {
        target: this,
        method: 'setLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelector
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.ChiSqSelectorModel}
     */
    ChiSqSelector.prototype.fit = function(dataset) {
      var ChiSqSelectorModel = require('./ChiSqSelectorModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelectorModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    ChiSqSelector.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelector
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.ChiSqSelector}
     */
    ChiSqSelector.load = function(path) {
      var args = {
        target: ChiSqSelector,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: ChiSqSelector
      };

      return Utils.generate(args);
    };

    ChiSqSelector.moduleLocation = '/ml/feature/ChiSqSelector';

    return ChiSqSelector;
  })();
};