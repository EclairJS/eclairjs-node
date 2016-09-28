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
     * Converts a text document to a sparse vector of token counts.
     * @param vocabulary An Array over terms. Only the terms in the vocabulary will be counted.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml/util.MLWritable
     */

    /**
     * @param {string[]} vocabulary  An Array over terms. Only the terms in the vocabulary will be counted.
     * @param {string} [uid]
     * @constructor
     */
    function CountVectorizerModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.prototype.setMinTF = function(value) {
      var args = {
        target: this,
        method: 'setMinTF',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizerModel
      };

      return Utils.generate(args);
    };

    /**
      * @param {boolean} value
      * @returns {type}
      */
     CountVectorizerModel.prototype.setBinary = function(value) {
       var args ={
         target: this,
         method: 'setBinary',
         args: Utils.wrapArguments(arguments),
         returnType: CountVectorizerModel

       };

       return Utils.generate(args);
     };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    CountVectorizerModel.prototype.transform = function(dataset) {
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
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    CountVectorizerModel.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizerModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/ml/util.MLWriter}
     */
    CountVectorizerModel.prototype.write = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'write',
    //     returnType: MLWriter
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @returns {module:eclairjs/ml/util.MLReader}
     */
    CountVectorizerModel.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: CountVectorizerModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizerModel.load = function(path) {
      var args = {
        target: CountVectorizerModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizerModel
      };

      return Utils.generate(args);
    };

    CountVectorizerModel.moduleLocation = '/ml/feature/CountVectorizerModel';

    return CountVectorizerModel;
  })();
};