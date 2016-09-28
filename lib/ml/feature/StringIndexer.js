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
     * A label indexer that maps a string column of labels to an ML column of label indices.
     * If the input column is numeric, we cast it to string and index the string values.
     * The indices are in [0, numLabels), ordered by label frequencies.
     * So the most frequent label gets index 0.
     *
     * @see {@link module:eclairjs/ml/feature.IndexToString} for the inverse transformation
     * @class
     * @extends module:eclairjs/ml.PipelineStage
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    function StringIndexer() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    StringIndexer.prototype.uid = function () {
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
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.prototype.setHandleInvalid = function(value) {
      var args = {
        target: this,
        method: 'setHandleInvalid',
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexer
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexer
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexer
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexer.prototype.fit = function(dataset) {
      var StringIndexerModel = require('./StringIndexerModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    StringIndexer.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexer
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.StringIndexer}
     */
    StringIndexer.load = function(path) {
      var args = {
        target: StringIndexer,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexer
      };

      return Utils.generate(args);
    };

    StringIndexer.moduleLocation = '/ml/feature/StringIndexer';

    return StringIndexer;
  })();
};