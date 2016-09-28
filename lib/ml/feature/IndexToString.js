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

    var PipelineStage = require('../PipelineStage.js')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * A {@link module:eclairjs/ml/Transformer} that maps a column of indices back to a new column of corresponding
     * string values.
     * The index-string mapping is either from the ML attributes of the input column,
     * or from user-supplied labels (which take precedence over ML attributes).
     *
     * @see {@link module:eclairjs/ml/feature.StringIndexer} for converting strings into indices
     * @class
     * @extends module:eclairjs/ml.PipelineStage
     * @memberof module:eclairjs/ml/feature
     */
    function IndexToString() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    IndexToString.prototype = Object.create(PipelineStage.prototype);

    IndexToString.prototype.constructor = IndexToString;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    IndexToString.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: IndexToString
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: IndexToString
      };

      return Utils.generate(args);
    };

    /**
     * @param {string[]} value
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.prototype.setLabels = function(value) {
      var args = {
        target: this,
        method: 'setLabels',
        args: Utils.wrapArguments(arguments),
        returnType: IndexToString
      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string[]>}
     */
    IndexToString.prototype.getLabels = function() {
      var args = {
        target: this,
        method: 'getLabels',
        args: Utils.wrapArguments(arguments),
        returnType: [String]
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    IndexToString.prototype.transformSchema = function(schema) {
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
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    IndexToString.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset.js');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: IndexToString
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.IndexToString}
     */
    IndexToString.load = function(path) {
      var args = {
        target: IndexToString,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: IndexToString
      };

      return Utils.generate(args);
    };

    IndexToString.moduleLocation = '/ml/feature/IndexToString';

    return IndexToString;
  })();
};