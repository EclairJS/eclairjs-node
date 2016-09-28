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
    var Transformer = require('../Transformer.js');

    var gKernelP = kernelP;


    /**
     * @classdesc
     * A feature transformer that filters out stop words from input.
     * Note: null values from input array are preserved unless adding null to stopWords explicitly.
     * @see [[http://en.wikipedia.org/wiki/Stop_words]]
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function StopWordsRemover() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    StopWordsRemover.prototype = Object.create(Transformer.prototype);

    StopWordsRemover.prototype.constructor = StopWordsRemover;


    /**
     * @param {string} value
     * @returns {StopWordsRemover}
     */
    StopWordsRemover.prototype.setInputCol = function(value) {
      var args ={
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StopWordsRemover

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {StopWordsRemover}
     */
    StopWordsRemover.prototype.setOutputCol = function(value) {
      var args ={
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StopWordsRemover

      };

      return Utils.generate(args);
    };


    /**
     * @param {string[]} value
     * @returns {StopWordsRemover}
     */
    StopWordsRemover.prototype.setStopWords = function(value) {
      var args ={
        target: this,
        method: 'setStopWords',
        args: Utils.wrapArguments(arguments),
        returnType: StopWordsRemover

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string[]>}
     */
    StopWordsRemover.prototype.getStopWords = function() {
      var args ={
        target: this,
        method: 'getStopWords',
        stringify: true,
        returnType: [String]

      };

      return Utils.generate(args);
    };


    /**
     * @param {boolean} value
     * @returns {StopWordsRemover}
     */
    StopWordsRemover.prototype.setCaseSensitive = function(value) {
      var args ={
        target: this,
        method: 'setCaseSensitive',
        args: Utils.wrapArguments(arguments),
        returnType: StopWordsRemover

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<boolean>}
     */
    StopWordsRemover.prototype.getCaseSensitive = function() {
      var args ={
        target: this,
        method: 'getCaseSensitive',
        resolver: _resolve,
        returnType: boolean

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Dataset}
     */
    StopWordsRemover.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset.js');

      var args ={
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset

      };

      return Utils.generate(args);
    };


    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    StopWordsRemover.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js')();

      var args ={
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {StopWordsRemover}
     */
    StopWordsRemover.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: StopWordsRemover

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {StopWordsRemover}
     */
    StopWordsRemover.load = function(path) {
      var args ={
        target: StopWordsRemover,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: StopWordsRemover

      };

      return Utils.generate(args);
    };


    /**
     * Loads the default stop words for the given language.
     * Supported languages: danish, dutch, english, finnish, french, german, hungarian,
     * italian, norwegian, portuguese, russian, spanish, swedish, turkish
     * @see [[http://anoncvs.postgresql.org/cvsweb.cgi/pgsql/src/backend/snowball/stopwords/]]
     * @param {string} language
     * @returns {Promise.<string[]>}
     */
    StopWordsRemover.loadDefaultStopWords = function(language) {

    function _resolve(result, resolve, reject) {
     try {
       var returnValue=JSON.parse(result);
       resolve(returnValue);
     } catch (e) {
       var err = new Error("Parse Error: "+ e.message);
       reject(err);
     }
    };
      var args ={
        target: StopWordsRemover,
        method: 'loadDefaultStopWords',
        args: Utils.wrapArguments(arguments),
        static: true,
        stringify: true,
        resolver: _resolve,
        returnType: [String]

      };

      return Utils.generate(args);
    };


    StopWordsRemover.moduleLocation = '/ml/feature/StopWordsRemover';

    return StopWordsRemover;
  })();
};