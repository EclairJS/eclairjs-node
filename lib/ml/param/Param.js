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
     * :: Experimental ::
     * A param with self-contained documentation and optionally default value. Primitive-typed param should use the specialized versions,
     * which are more friendly to Java users.param: parent parent object param: name param name param: doc documentation param: isValid
     * optional validation method which indicates if a value is valid. See ParamValidators for factory methods for common validation functions.
     * @classdesc
     * @param {string} parent
     * @param {string} name
     * @param {string} doc
     *  @class
     *  @memberof module:eclairjs/ml/param
     */
    function Param () {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @returns {Promise.<string>}
     */
    Param.prototype.parent = function() {
      var args = {
        target: this,
        method: 'parent',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    Param.prototype.name = function() {
      var args = {
        target: this,
        method: 'name',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    Param.prototype.doc = function() {
      var args = {
        target: this,
        method: 'doc',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Creates a param pair with the given value
     * @param {object} value
     * @returns {module:eclairjs/ml/param.ParamPair}
     */
    Param.prototype.w = function(value) {
      var ParamPair = require('./ParamPair')();

      var args = {
        target: this,
        method: 'w',
        args: Utils.wrapArguments(arguments),
        returnType: ParamPair
      };

      return Utils.generate(args);
    };

    /**
     * Encodes a param value into JSON, which can be decoded by jsonDecode().
     * @param {object} value
     * @returns {Promise.<string>}
     */
    Param.prototype.jsonEncode = function(value) {
      var args = {
        target: this,
        method: 'jsonEncode',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Decodes a param value from JSON.
     * @param {string} json
     * @returns {Promise.<object>}
     */
    Param.prototype.jsonDecode = function(json) {
      var args = {
        target: this,
        method: 'jsonDecode',
        args: Utils.wrapArguments(arguments),
        returnType: Object
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    Param.prototype.toString = function() {
      var args = {
        target: this,
        method: 'toString',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<Number>}
     */
    Param.prototype.hashCode = function() {
      var args = {
        target: this,
        method: 'hashCode',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };
    }

    /**
     * @param {module:eclairjs/ml/param.Param} obj
     * @returns {Promise.<boolean>}
     */
    Param.prototype.equals = function(obj) {
      var args = {
        target: this,
        method: 'equals',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };
    };

    Param.moduleLocation = '/ml/param/Param';

    return Param;
  })();
};