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

    var PredictionModel = require('../PredictionModel')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     *
     * [Gradient-Boosted Trees (GBTs)]{@link http://en.wikipedia.org/wiki/Gradient_boosting}
     * model for regression.
     * It supports both continuous and categorical features.
     * @class
     * @extends module:eclairjs/ml.PredictionModel
     * @memberof module:eclairjs/ml/regression
     * @oaram {string} uid
     * @param {DecisionTreeRegressionModel[]} trees   Decision trees in the ensemble.
     * @param {float[]} treeWeights   Weights for the decision trees in the ensemble.
     */
    function GBTRegressionModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    GBTRegressionModel.prototype = Object.create(PredictionModel.prototype);

    GBTRegressionModel.prototype.constructor = GBTRegressionModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    GBTRegressionModel.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {DecisionTreeRegressionModel[]}
     */
    GBTRegressionModel.prototype.trees = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'trees',
    //     returnType: [DecisionTreeRegressionModel]
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @returns {Promise.<number[]>}
     */
    GBTRegressionModel.prototype.treeWeights = function() {
      var args = {
        target: this,
        method: 'treeWeights',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/regression.GBTRegressionModel}
     */
    GBTRegressionModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: GBTRegressionModel
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    GBTRegressionModel.prototype.toString = function() {
      var args = {
        target: this,
        method: 'toString',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter}
     */
    GBTRegressionModel.prototype.write = function() {
      var MLWriter = require('../../ml/util/MLWriter.js');
      var args ={
        target: this,
        method: 'write',
        returnType: MLWriter

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @returns {MLReader}
     */
    GBTRegressionModel.read = function() {
      var MLReader = require('../../ml/util/MLReader.js');
      var args ={
        target: GBTRegressionModel,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {GBTRegressionModel}
     */
    GBTRegressionModel.load = function(path) {
      var args ={
        target: GBTRegressionModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: GBTRegressionModel

      };

      return Utils.generate(args);
    };


    GBTRegressionModel.moduleLocation = '/ml/regression/GBTRegressionModel';

    return GBTRegressionModel;
  })();
};