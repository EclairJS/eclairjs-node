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
    var RDD = require('../../rdd/RDD.js');
    var GradientBoostedTreesModel = require('./model/GradientBoostedTreesModel.js')();

    var gKernelP = kernelP;

    /**
     * A class that implements
     * [[http://en.wikipedia.org/wiki/Gradient_boosting  Stochastic Gradient Boosting]]
     * for regression and binary classification.
     *
     * The implementation is based upon:
     *   J.H. Friedman.  "Stochastic Gradient Boosting."  1999.
     *
     * Notes on Gradient Boosting vs. TreeBoost:
     *  - This implementation is for Stochastic Gradient Boosting, not for TreeBoost.
     *  - Both algorithms learn tree ensembles by minimizing loss functions.
     *  - TreeBoost (Friedman, 1999) additionally modifies the outputs at tree leaf nodes
     *    based on the loss function, whereas the original gradient boosting method does not.
     *     - When the loss is SquaredError, these methods give the same result, but they could differ
     *       for other loss functions.
     *
     * @param boostingStrategy Parameters for the gradient boosting algorithm.
     * @classdesc
     */

    /**
     * @param {module:eclairjs/mllib/tree/configuration.BoostingStrategy} boostingStrategy
     * @class
     * @memberof module:eclairjs/mllib/tree
     */
    function GradientBoostedTrees() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Method to train a gradient boosting model
     * @param {module:eclairjs/rdd.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     * @returns {GradientBoostedTreesModel}  a gradient boosted trees model that can be used for prediction
     */
    GradientBoostedTrees.prototype.run = function(input) {
      var args = {
        target: this,
        method: 'run',
        args: Utils.wrapArguments(arguments),
        returnType: GradientBoostedTreesModel
      };

      return Utils.generate(args);
    };


    /**
     * Method to validate a gradient boosting model
     * @param {module:eclairjs/rdd.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     * @param {module:eclairjs/rdd.RDD} validationInput  Validation dataset.
     *                        This dataset should be different from the training dataset,
     *                        but it should follow the same distribution.
     *                        E.g., these two datasets could be created from an original dataset
     *                        by using [[org.apache.spark.rdd.RDD.randomSplit()]]
     * @returns {GradientBoostedTreesModel}  a gradient boosted trees model that can be used for prediction
     */
    GradientBoostedTrees.prototype.runWithValidation = function(input,validationInput) {
      var args = {
        target: this,
        method: 'runWithValidation',
        args: Utils.wrapArguments(arguments),
        returnType: GradientBoostedTreesModel
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * Method to train a gradient boosting model.
     *
     * @param {module:eclairjs/rdd.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     *              For classification, labels should take values {0, 1, ..., numClasses-1}.
     *              For regression, labels are real numbers.
     * @param {module:eclairjs/mllib/tree/configuration.BoostingStrategy} boostingStrategy  Configuration options for the boosting algorithm.
     * @returns {GradientBoostedTreesModel}  a gradient boosted trees model that can be used for prediction
     */
    GradientBoostedTrees.train = function(input, boostingStrategy) {
      var args = {
        target: GradientBoostedTrees,
        method: 'train',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: GradientBoostedTreesModel
      };

      return Utils.generate(args);
    };

    GradientBoostedTrees.moduleLocation = '/mllib/tree/GradientBoostedTrees';

    return GradientBoostedTrees;
  })();
};