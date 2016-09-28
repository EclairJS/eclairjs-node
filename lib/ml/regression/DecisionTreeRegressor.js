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

    var Predictor = require('../Predictor')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * [Decision tree]{@link http://en.wikipedia.org/wiki/Decision_tree_learning} learning algorithm
     * for regression.
     * It supports both continuous and categorical features.
     * @class
     * @extends module:eclairjs/ml.Predictor
     * @memberof module:eclairjs/ml/regression
     * @param {string} [uid]
     */
    function DecisionTreeRegressor() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    DecisionTreeRegressor.prototype = Object.create(Predictor.prototype);

    DecisionTreeRegressor.prototype.constructor = DecisionTreeRegressor;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    DecisionTreeRegressor.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.setMaxDepth = function(value) {
      var args = {
        target: this,
        method: 'setMaxDepth',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.setMaxBins = function(value) {
      var args = {
        target: this,
        method: 'setMaxBins',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.setMinInstancesPerNode = function(value) {
      var args = {
        target: this,
        method: 'setMinInstancesPerNode',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.setMinInfoGain = function(value) {
      var args = {
        target: this,
        method: 'setMinInfoGain',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.setMaxMemoryInMB = function(value) {
      var args = {
        target: this,
        method: 'setMaxMemoryInMB',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.setCacheNodeIds = function(value) {
      var args = {
        target: this,
        method: 'setCacheNodeIds',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.setCheckpointInterval = function(value) {
      var args = {
        target: this,
        method: 'setCheckpointInterval',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.setImpurity = function(value) {
      var args = {
        target: this,
        method: 'setImpurity',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.DecisionTreeRegressor}
     */
    DecisionTreeRegressor.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {type}
     */
    DecisionTreeRegressor.prototype.setVarianceCol = function(value) {
      var args ={
        target: this,
        method: 'setVarianceCol',
        args: Utils.wrapArguments(arguments),
        returnType: DecisionTreeRegressor

      };

      return Utils.generate(args);
    };


    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {DecisionTreeRegressor}
     */
    DecisionTreeRegressor.load = function(path) {
      var args ={
        target: DecisionTreeRegressor,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: DecisionTreeRegressor

      };

      return Utils.generate(args);
    };


    DecisionTreeRegressor.moduleLocation = '/ml/regression/DecisionTreeRegressor';

    return DecisionTreeRegressor;
  })();
};