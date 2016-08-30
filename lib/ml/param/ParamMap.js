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
     * A param to value map.
     * @classdesc
     * Creates an empty param map.
     *  @class
     *  @memberof module:eclairjs/ml/param
     */
    function ParamMap() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Puts a list of param pairs (overwrites if the input params exists).
     * @param {...module:eclairjs/ml/param.ParamPair | module:eclairjs/ml/param.Param} paramPairs
     * @param {object} value
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.prototype.put = function() {
      var args = {
        target: this,
        method: 'put',
        args: Utils.wrapArguments(arguments),
        returnType: ParamMap
      };

      return Utils.generate(args);
    };

    /**
     * Optionally returns the value associated with a param.
     * @param {module:eclairjs/ml/param.Param} param
     * @returns {object}
     */
    ParamMap.prototype.get = function(param) {
      var args = {
        target: this,
        method: 'get',
        args: Utils.wrapArguments(arguments),
        returnType: Object
      };

      return Utils.generate(args);
    };

    /**
     * Returns the value associated with a param or a default value.
     * @param {module:eclairjs/ml/param.Param} param
     * @param {object} default
     * @returns {object}
     */
    ParamMap.prototype.getOrElse = function() {
      var args = {
        target: this,
        method: 'getOrElse',
        args: Utils.wrapArguments(arguments),
        returnType: Object
      };

      return Utils.generate(args);
    };

    /**
     * Gets the value of the input param or its default value if it does not exist.
     * Raises a NoSuchElementException if there is no value associated with the input param.
     * @param {module:eclairjs/ml/param.Param} param
     * @returns {object}
     */
    ParamMap.prototype.apply = function(param) {
      var args = {
        target: this,
        method: 'apply',
        args: Utils.wrapArguments(arguments),
        returnType: Object
      };

      return Utils.generate(args);
    };

    /**
     * Checks whether a parameter is explicitly specified.
     * @param {module:eclairjs/ml/param.Param} param
     * @returns {Promise.<boolean>}
     */
    ParamMap.prototype.contains = function(param) {
      var args = {
        target: this,
        method: 'contains',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Removes a key from this map and returns its value associated previously as an option.
     * @param {module:eclairjs/ml/param.Param} param
     * @returns {object}
     */
    ParamMap.prototype.remove = function(param) {
      var args = {
        target: this,
        method: 'remove',
        args: Utils.wrapArguments(arguments),
        returnType: Object
      };

      return Utils.generate(args);
    };

    /**
     * Filters this param map for the given parent.
     * @param {module:eclairjs/ml/param.Params} parent
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.prototype.filter = function(parent) {
      var args = {
        target: this,
        method: 'filter',
        args: Utils.wrapArguments(arguments),
        returnType: ParamMap
      };

      return Utils.generate(args);
    };

    /**
     * Creates a copy of this param map.
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.prototype.copy = function() {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: ParamMap
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    ParamMap.prototype.toString = function() {
      var args = {
        target: this,
        method: 'toString',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Converts this param map to a array of param pairs.
     * @returns {module:eclairjs/ml/param.ParamMap[]}
     */
    ParamMap.prototype.toArray = function () {
      var args = {
        target: this,
        method: 'toArray',
        args: Utils.wrapArguments(arguments),
        returnType: [ParamMap]
      };

      return Utils.generate(args);
    };

    /**
     * Number of param pairs in this map.
     * @returns {Promise.<number>}
     */
    ParamMap.prototype.size = function() {
      var args = {
        target: this,
        method: 'size',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };


    /**
     * Returns a new param map that contains parameters in this map and the given map,
     * where the latter overwrites this if there exist conflicts.
     * @param {module:eclairjs/ml/param.ParamMap} other
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.prototype.$plus$plus = function (other) {
      var args = {
        target: this,
        method: '$plus$plus',
        args: Utils.wrapArguments(arguments),
        returnType: ParamMap
      };

      return Utils.generate(args);
    };
    //
    // static methods
    //

    /**
     * Returns an empty param map.
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.empty = function() {
      var args = {
        target: ParamMap,
        method: 'empty',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: ParamMap
      };

      return Utils.generate(args);
    };

    /**
     * Constructs a param map by specifying its entries.
     * @param {...module:eclairjs/ml/param.ParamPair} paramPairs
     * @returns {module:eclairjs/ml/param.ParamMap}
     */
    ParamMap.apply = function(paramPairs) {
      var args = {
        target: ParamMap,
        method: 'apply',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: ParamMap
      };

      return Utils.generate(args);
    };

    ParamMap.moduleLocation = '/ml/param/ParamMap';

    return ParamMap;
  })();
};