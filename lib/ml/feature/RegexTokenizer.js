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
    var UnaryTransformer = require('../UnaryTransformer')();

    var gKernelP = kernelP;


    /**
     * @classdesc
     * A regex based tokenizer that extracts tokens either by using the provided regex pattern to split
     * the text (default) or repeatedly matching the regex (if `gaps` is false).
     * Optional parameters also allow filtering tokens using a minimal length.
     * It returns an array of strings that can be empty.
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function RegexTokenizer() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    RegexTokenizer.prototype = Object.create(UnaryTransformer.prototype);

    RegexTokenizer.prototype.constructor = RegexTokenizer;




    /**
     * @param {number} value
     * @returns {RegexTokenizer}
     */
    RegexTokenizer.prototype.setMinTokenLength = function(value) {
      var args ={
        target: this,
        method: 'setMinTokenLength',
        args: Utils.wrapArguments(arguments),
        returnType: RegexTokenizer

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<number>}
     */
    RegexTokenizer.prototype.getMinTokenLength = function() {

      var args ={
        target: this,
        method: 'getMinTokenLength',
        returnType: Number

      };

      return Utils.generate(args);
    };


    /**
     * @param {boolean} value
     * @returns {RegexTokenizer}
     */
    RegexTokenizer.prototype.setGaps = function(value) {
      var args ={
        target: this,
        method: 'setGaps',
        args: Utils.wrapArguments(arguments),
        returnType: RegexTokenizer

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<boolean>}
     */
    RegexTokenizer.prototype.getGaps = function() {
      var args ={
        target: this,
        method: 'getGaps',
        returnType: boolean

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type}
     */
    RegexTokenizer.prototype.setPattern = function(value) {
      var args ={
        target: this,
        method: 'setPattern',
        args: Utils.wrapArguments(arguments),
        returnType: RegexTokenizer

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string>}
     */
    RegexTokenizer.prototype.getPattern = function() {
      var args ={
        target: this,
        method: 'getPattern',
        returnType: String

      };

      return Utils.generate(args);
    };


    /**
     * @param {boolean} value
     * @returns {type}
     */
    RegexTokenizer.prototype.setToLowercase = function(value) {
      var args ={
        target: this,
        method: 'setToLowercase',
        args: Utils.wrapArguments(arguments),
        returnType: RegexTokenizer

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<boolean>}
     */
    RegexTokenizer.prototype.getToLowercase = function() {
      var args ={
        target: this,
        method: 'getToLowercase',
        returnType: boolean

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {RegexTokenizer}
     */
    RegexTokenizer.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: RegexTokenizer

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {RegexTokenizer}
     */
    RegexTokenizer.load = function(path) {
      var args ={
        target: RegexTokenizer,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        kernelP: gKernelP,
        static: true,
        returnType: RegexTokenizer

      };

      return Utils.generate(args);
    };


    RegexTokenizer.moduleLocation = '/ml/feature/RegexTokenizer';

    return RegexTokenizer;
  })();
};