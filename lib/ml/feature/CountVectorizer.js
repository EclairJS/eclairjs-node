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
     * Extracts a vocabulary from document collections and generates a {@link CountVectorizerModel}.
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @constructor
     */
    function CountVectorizer() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setVocabSize = function(value) {
      var args = {
        target: this,
        method: 'setVocabSize',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setMinDF = function(value) {
      var args = {
        target: this,
        method: 'setMinDF',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.setMinTF = function(value) {
      var args = {
        target: this,
        method: 'setMinTF',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizer
      };

      return Utils.generate(args);
    };

    /**
      * @param {boolean} value
      * @returns {type}
      */
     CountVectorizer.prototype.setBinary = function(value) {
       var args ={
         target: this,
         method: 'setBinary',
         args: Utils.wrapArguments(arguments),
         returnType: CountVectorizer

       };

       return Utils.generate(args);
     };



    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.CountVectorizerModel}
     */
    CountVectorizer.prototype.fit = function(dataset) {
      var CountVectorizerModel = require('./CountVectorizerModel')();
      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizerModel
      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    CountVectorizer.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizer
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.CountVectorizer}
     */
    CountVectorizer.load = function(path) {
      var args = {
        target: CountVectorizer,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: CountVectorizer
      };

      return Utils.generate(args);
    };

    CountVectorizer.moduleLocation = '/ml/feature/CountVectorizer';

    return CountVectorizer;
  })();
};