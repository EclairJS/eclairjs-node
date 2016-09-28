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
     * A feature transformer that converts the input array of strings into an array of n-grams. Null
     * values in the input array are ignored.
     * It returns an array of n-grams where each n-gram is represented by a space-separated string of
     * words.
     *
     * When the input is empty, an empty array is returned.
     * When the input array length is less than n (number of elements per n-gram), no n-grams are
     * returned.
     * @class
     * @extends module:eclairjs/ml.UnaryTransformer
     * @memberof module:eclairjs/ml/feature
     * @param {string} uid
     */
    function NGram() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    NGram.prototype = Object.create(UnaryTransformer.prototype);

    NGram.prototype.constructor = NGram;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    NGram.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Minimum n-gram length, >= 1. Default: 2, bigram features
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    NGram.prototype.n = function () {
      var IntParam = require('../param/IntParam')();

      var args = {
        target: this,
        method: 'n',
        args: Utils.wrapArguments(arguments),
        returnType: IntParam
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.NGram}
     */
    NGram.prototype.setN = function(value) {
      var args = {
        target: this,
        method: 'setN',
        args: Utils.wrapArguments(arguments),
        returnType: NGram
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<number>}
     */
    NGram.prototype.getN = function() {
      var args = {
        target: this,
        method: 'getN',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {NGram}
     */
    NGram.load = function(path) {
      var args = {
        target: NGram,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: NGram
      };

      return Utils.generate(args);
    };

    NGram.moduleLocation = '/ml/feature/NGram';

    return NGram;
  })();
};