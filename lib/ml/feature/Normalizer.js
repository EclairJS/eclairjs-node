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
     * Normalize a vector to have unit norm using the given p-norm.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.UnaryTransformer
     * @param {string} [uid]
     */
    function Normalizer() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    Normalizer.prototype = Object.create(UnaryTransformer.prototype);

    Normalizer.prototype.constructor = Normalizer;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    Normalizer.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Normalization in L^p^ space. Must be >= 1. (default: p = 2)
     * @returns {module:eclairjs/ml/param.DoubleParam}
     */
    Normalizer.prototype.p = function () {
      var DoubleParam = require('../param/DoubleParam')();

      var args = {
        target: this,
        method: 'p',
        args: Utils.wrapArguments(arguments),
        returnType: DoubleParam
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<number>}
     */
    Normalizer.prototype.getP = function() {
      var args = {
        target: this,
        method: 'getP',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.Normalizer}
     */
    Normalizer.prototype.setP = function(value) {
      var args = {
        target: this,
        method: 'setP',
        args: Utils.wrapArguments(arguments),
        returnType: Normalizer
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.Normalizer}
     */
    Normalizer.load = function(path) {
      var args = {
        target: Normalizer,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: Normalizer
      };

      return Utils.generate(args);
    };

    Normalizer.moduleLocation = '/ml/feature/Normalizer';

    return Normalizer;
  })();
};