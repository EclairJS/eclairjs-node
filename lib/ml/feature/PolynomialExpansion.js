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
     * Perform feature expansion in a polynomial space. As said in wikipedia of Polynomial Expansion,
     * which is available at {@link http://en.wikipedia.org/wiki/Polynomial_expansion}, "In mathematics, an
     * expansion of a product of sums expresses it as a sum of products by using the fact that
     * multiplication distributes over addition". Take a 2-variable feature vector as an example:
     * `(x, y)`, if we want to expand it with degree 2, then we get `(x, x * x, y, x * y, y * y)`.
     * @class
     * @extends module:eclairjs/ml.UnaryTransformer
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    function PolynomialExpansion() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    PolynomialExpansion.prototype = Object.create(UnaryTransformer.prototype);

    PolynomialExpansion.prototype.constructor = PolynomialExpansion;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    PolynomialExpansion.prototype.uid = function() {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * The polynomial degree to expand, which should be >= 1. A value of 1 means no expansion. Default: 2
     * @returns {module:eclairjs/ml/param.IntParam}
     */
    PolynomialExpansion.prototype.degree = function() {
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
     * @returns {Promise.<number>}
     */
    PolynomialExpansion.prototype.getDegree = function() {
      var args = {
        target: this,
        method: 'getDegree',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @param {integer} value
     * @returns {module:eclairjs/ml/feature.PolynomialExpansion}
     */
    PolynomialExpansion.prototype.setDegree = function(value) {
      var args = {
        target: this,
        method: 'setDegree',
        args: Utils.wrapArguments(arguments),
        returnType: PolynomialExpansion
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.PolynomialExpansion}
     */
    PolynomialExpansion.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: PolynomialExpansion
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.PolynomialExpansion}
     */
    PolynomialExpansion.load = function(path) {
      var args = {
        target: PolynomialExpansion,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: PolynomialExpansion
      };

      return Utils.generate(args);
    };

    PolynomialExpansion.moduleLocation = '/ml/feature/PolynomialExpansion';

    return PolynomialExpansion;
  })();
};