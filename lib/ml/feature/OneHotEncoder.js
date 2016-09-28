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

    var Transformer = require('../Transformer')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * A one-hot encoder that maps a column of category indices to a column of binary vectors, with
     * at most a single one-value per row that indicates the input category index.
     * For example with 5 categories, an input value of 2.0 would map to an output vector of
     * `[0.0, 0.0, 1.0, 0.0]`.
     * The last category is not included by default (configurable via OneHotEncoder!.dropLast
     * because it makes the vector entries sum up to one, and hence linearly dependent.
     * So an input value of 4.0 maps to `[0.0, 0.0, 0.0, 0.0]`.
     * Note that this is different from scikit-learn's OneHotEncoder, which keeps all categories.
     * The output vectors are sparse.
     *
     * @see {@link module:eclairjs/ml/feature.StringIndexer} for converting categorical values into category indices
     * @class
     * @extends module:eclairjs/ml.Transformer
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    function OneHotEncoder() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    OneHotEncoder.prototype = Object.create(Transformer.prototype);

    OneHotEncoder.prototype.constructor = OneHotEncoder;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    OneHotEncoder.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/ml/param.BooleanParam}
     */
    OneHotEncoder.prototype.dropLast = function() {
      var BooleanParam = require('../param/BooleanParam')();

      var args = {
        target: this,
        method: 'dropLast',
        args: Utils.wrapArguments(arguments),
        returnType: BooleanParam
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.prototype.setDropLast = function(value) {
      var args = {
        target: this,
        method: 'setDropLast',
        args: Utils.wrapArguments(arguments),
        returnType: OneHotEncoder
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: OneHotEncoder
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: OneHotEncoder
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<boolean>}
     */
    OneHotEncoder.prototype.getDropLast = function() {

    function _resolve(result, resolve, reject) {
     try {
       var returnValue=result === 'true';
       resolve(returnValue);
     } catch (e) {
       var err = new Error("Parse Error: "+ e.message);
       reject(err);
     }
    };
      var args ={
        target: this,
        method: 'getDropLast',
        resolver: _resolve,
        returnType: boolean

      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: OneHotEncoder
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.OneHotEncoder}
     */
    OneHotEncoder.load = function(path) {
      var args = {
        target: OneHotEncoder,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: OneHotEncoder
      };

      return Utils.generate(args);
    };

    OneHotEncoder.moduleLocation = '/ml/feature/OneHotEncoder';

    return OneHotEncoder;
  })();
};