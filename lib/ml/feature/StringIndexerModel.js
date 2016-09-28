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
     * Model fitted by {@link module:eclairjs/ml/feature.StringIndexer}.
     *
     * NOTE: During transformation, if the input column does not exist,
     * {@link module:eclairjs/ml.Transformer#transform} would return the input dataset unmodified.
     * This is a temporary fix for the case when target labels do not exist during prediction.
     *
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string[]} labels Ordered list of labels, corresponding to indices to be assigned.
     * @param {string} [uid]
     */
    function StringIndexerModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    StringIndexerModel.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {Promise.<string[]>}
     */
    StringIndexerModel.prototype.labels = function () {
      var args = {
        target: this,
        method: 'labels',
        args: Utils.wrapArguments(arguments),
        returnType: [String]
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.prototype.setHandleInvalid = function(value) {
      var args = {
        target: this,
        method: 'setHandleInvalid',
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    StringIndexerModel.prototype.transform = function(dataset) {
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
     * Validates and transforms the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    StringIndexerModel.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexerModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {StringIndexModelWriter}
     */
    StringIndexerModel.prototype.write = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=result;
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'write',
    //     resolver: _resolve,
    //     returnType: StringIndexModelWriter
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @returns {MLReader}
     */
    StringIndexerModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: StringIndexerModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.StringIndexerModel}
     */
    StringIndexerModel.load = function(path) {
      var args = {
        target: StringIndexerModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: StringIndexerModel
      };

      return Utils.generate(args);
    };

    StringIndexerModel.moduleLocation = '/ml/feature/StringIndexerModel';

    return StringIndexerModel;
  })();
};