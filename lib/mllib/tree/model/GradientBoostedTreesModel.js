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
    var Utils = require('../../../utils.js');

    var gKernelP = kernelP;

    /**
     * Represents a gradient boosted trees model.
     *
     * @param algo algorithm for the ensemble model, either Classification or Regression
     * @param trees tree ensembles
     * @param treeWeights tree ensemble weights
     * @classdesc
     * @class
     * @memberof module:eclairjs/mllib/tree/model
     */
    function GradientBoostedTreesModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {module:eclairjs.SparkContext} sc   Spark context used to save model data.
     * @param {string} path   Path specifying the directory in which to save this model.
     *              If the directory already exists, this method throws an exception.
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    GradientBoostedTreesModel.prototype.save = function(sc,path) {
      var args = {
        target: this,
        method: 'save',
        args: Utils.wrapArguments(arguments)
      };

      return Utils.generate(args);
    };

    /**
     * Method to compute error or loss for every iteration of gradient boosting.
     * @param {module:eclairjs/rdd.RDD} data  RDD of {@link LabeledPoint}
     * @param {module:eclairjs/mllib/tree/loss.Loss} loss  evaluation metric.
     *         containing the first i+1 trees
     * @returns {Promise.<number[]>}  an array with index i having the losses or errors for the ensemble
     */
    GradientBoostedTreesModel.prototype.evaluateEachIteration = function(data,loss) {
      var args = {
        target: this,
        method: 'evaluateEachIteration',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {module:eclairjs.SparkContext} sc   Spark context used for loading model files.
     * @param {string} path   Path specifying the directory to which the model was saved.
     * @returns {GradientBoostedTreesModel}   Model instance
     */
    GradientBoostedTreesModel.load = function(sc,path) {
      var args = {
        target: GradientBoostedTreesModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: GradientBoostedTreesModel
      };

      return Utils.generate(args);
    };

    GradientBoostedTreesModel.moduleLocation = '/mllib/tree/model/GradientBoostedTreesModel';

    return GradientBoostedTreesModel;
  })();
};