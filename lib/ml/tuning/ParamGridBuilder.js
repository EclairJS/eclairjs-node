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
     * Builder for a param grid used in grid search-based model selection.
     * @class
     * @memberof module:eclairjs/ml/tuning
     */
    function ParamGridBuilder() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Sets the given parameters in this grid to fixed values.
     * @param {...module:eclairjs/ml/param.ParamPair | module:eclairjs/ml/param.ParamMap} paramPairs or paramMap
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder}
     */
    ParamGridBuilder.prototype.baseOn = function(paramMap) {
      var args = {
        target: this,
        method: 'baseOn',
        args: Utils.wrapArguments(arguments),
        returnType: ParamGridBuilder
      };

      return Utils.generate(args);
    };

    /**
     * Adds a param with multiple values (overwrites if the input param exists).
     * @param {module:eclairjs/ml/param.Param} param
     * @param {number[]} [values] Optional only if argument one is {@link module:eclairjs/ml/param.BooleanParam}
     * @returns {module:eclairjs/ml/tuning.ParamGridBuilder}
     */
    ParamGridBuilder.prototype.addGrid = function(param, values) {
      var args = {
        target: this,
        method: 'addGrid',
        args: Utils.wrapArguments(arguments),
        returnType: ParamGridBuilder
      };

      return Utils.generate(args);
    };
    /**
     * Builds and returns all combinations of parameters specified by the param grid.
     * @returns {module:eclairjs/ml/param.ParamMap[]}
     */
    ParamGridBuilder.prototype.build = function () {
      var ParamMap = require('../param/ParamMap')();

      var args = {
        target: this,
        method: 'build',
        args: Utils.wrapArguments(arguments),
        returnType: [ParamMap]
      };

      return Utils.generate(args);
    };

    ParamGridBuilder.moduleLocation = '/ml/tuning/ParamGridBuilder';

    return ParamGridBuilder;
  })();
};