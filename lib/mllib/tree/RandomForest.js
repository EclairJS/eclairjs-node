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

    var RandomForestModel = require('./model/RandomForestModel.js')();

    var gKernelP = kernelP;

    /**
     * A class that implements a [[http://en.wikipedia.org/wiki/Random_forest  Random Forest]]
     * learning algorithm for classification and regression.
     * It supports both continuous and categorical features.
     * @constructor
     * @memberof module:eclairjs/mllib/tree
     * @classdesc
     * The settings for featureSubsetStrategy are based on the following references:
     *  - log2: tested in Breiman (2001)
     *  - sqrt: recommended by Breiman manual for random forests
     *  - The defaults of sqrt (classification) and onethird (regression) match the R randomForest
     *    package.
     * [[http://www.stat.berkeley.edu/~breiman/randomforest2001.pdf  Breiman (2001)]]
     * [[http://www.stat.berkeley.edu/~breiman/Using_random_forests_V3.1.pdf  Breiman manual for
     *     random forests]]
     *
     * @param {module:eclairjs/mllib/tree/configuration.Strategy} strategy The configuration parameters for the random forest algorithm which specify
     *                 the type of algorithm (classification, regression, etc.), feature type
     *                 (continuous, categorical), depth of the tree, quantile calculation strategy,
     *                 etc.
     * @param {Number} numTrees If 1, then no bootstrapping is used.  If > 1, then bootstrapping is done.
     * @param featureSubsetStrategy Number of features to consider for splits at each node.
     *                              Supported: "auto", "all", "sqrt", "log2", "onethird".
     *                              If "auto" is set, this parameter is set based on numTrees:
     *                                if numTrees == 1, set to "all";
     *                                if numTrees > 1 (forest) set to "sqrt" for classification and
     *                                  to "onethird" for regression.
     * @param seed Random seed for bootstrapping and choosing feature subsets.
     */
    function RandomForest() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    //
    // static methods
    //


    /**
     * Method to train a decision tree model for binary or multiclass classification.
     *
     * @param {module:eclairjs/rdd.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     *              Labels should take values {0, 1, ..., numClasses-1}.
     * @param {number} numClasses  number of classes for classification.
     * @param {Map} categoricalFeaturesInfo  Map storing arity of categorical features.
     *                                E.g., an entry (n -> k) indicates that feature n is categorical
     *                                with k categories indexed from 0: {0, 1, ..., k-1}.
     * @param {number} numTrees  Number of trees in the random forest.
     * @param {string} featureSubsetStrategy  Number of features to consider for splits at each node.
     *                              Supported: "auto", "all", "sqrt", "log2", "onethird".
     *                              If "auto" is set, this parameter is set based on numTrees:
     *                                if numTrees == 1, set to "all";
     *                                if numTrees > 1 (forest) set to "sqrt".
     * @param {string} impurity  Criterion used for information gain calculation.
     *                 Supported values: "gini" (recommended) or "entropy".
     * @param {number} maxDepth  Maximum depth of the tree.
     *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
     *                  (suggested value: 4)
     * @param {number} maxBins  maximum number of bins used for splitting features
     *                 (suggested value: 100)
     * @param {number} seed   Random seed for bootstrapping and choosing feature subsets.
     * @returns {RandomForestModel}  a random forest model  that can be used for prediction
     */
    RandomForest.trainClassifier = function(input,numClasses,categoricalFeaturesInfo,numTrees,featureSubsetStrategy,impurity,maxDepth,maxBins,seed) {
      var args = {
        target: RandomForest,
        method: 'trainClassifier',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: RandomForestModel
      };

      return Utils.generate(args);
    };

    /**
     * Method to train a decision tree model for regression.
     *
     * @param {module:eclairjs/rdd.RDD} input  Training dataset: RDD of {@link LabeledPoint}.
     *              Labels are real numbers.
     * @param {Map} categoricalFeaturesInfo  Map storing arity of categorical features.
     *                                E.g., an entry (n -> k) indicates that feature n is categorical
     *                                with k categories indexed from 0: {0, 1, ..., k-1}.
     * @param {number} numTrees  Number of trees in the random forest.
     * @param {string} featureSubsetStrategy  Number of features to consider for splits at each node.
     *                              Supported: "auto", "all", "sqrt", "log2", "onethird".
     *                              If "auto" is set, this parameter is set based on numTrees:
     *                                if numTrees == 1, set to "all";
     *                                if numTrees > 1 (forest) set to "onethird".
     * @param {string} impurity  Criterion used for information gain calculation.
     *                 Supported values: "variance".
     * @param {number} maxDepth  Maximum depth of the tree.
     *                 E.g., depth 0 means 1 leaf node; depth 1 means 1 internal node + 2 leaf nodes.
     *                  (suggested value: 4)
     * @param {number} maxBins  maximum number of bins used for splitting features
     *                 (suggested value: 100)
     * @param {number} seed   Random seed for bootstrapping and choosing feature subsets.
     * @returns {RandomForestModel}  a random forest model that can be used for prediction
     */
    RandomForest.trainRegressor = function(input,categoricalFeaturesInfo,numTrees,featureSubsetStrategy,impurity,maxDepth,maxBins,seed) {
      var args = {
        target: RandomForest,
        method: 'trainRegressor',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: RandomForestModel
      };

      return Utils.generate(args);
    };

    RandomForest.moduleLocation = '/mllib/tree/RandomForest';

    return RandomForest;
  })();
};