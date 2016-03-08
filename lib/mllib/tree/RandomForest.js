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


var Utils = require('../../utils.js');

var RandomForestModel = require('./model/RandomForestModel.js')();

var gKernelP;

function RandomForest() {
}

//
// static methods
//


/**
 * Method to train a decision tree model for binary or multiclass classification.
 *
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
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
  var templateStr = 'var {{refId}} = RandomForest.trainClassifier({{input}},{{numClasses}},{{categoricalFeaturesInfo}},{{numTrees}},{{featureSubsetStrategy}},{{impurity}},{{maxDepth}},{{maxBins}},{{seed}});';

  return Utils.evaluate(gKernelP, RandomForestModel, templateStr, {input: Utils.prepForReplacement(input), numClasses: numClasses, categoricalFeaturesInfo: JSON.stringify(categoricalFeaturesInfo), numTrees: numTrees, featureSubsetStrategy: Utils.prepForReplacement(featureSubsetStrategy), impurity: Utils.prepForReplacement(impurity), maxDepth: maxDepth, maxBins: maxBins, seed: seed});
};

/**
 * Method to train a decision tree model for regression.
 *
 * @param {RDD} input  Training dataset: RDD of {@link LabeledPoint}.
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
  var templateStr = 'var {{refId}} = RandomForest.trainRegressor({{input}},{{categoricalFeaturesInfo}},{{numTrees}},{{featureSubsetStrategy}},{{impurity}},{{maxDepth}},{{maxBins}},{{seed}});';

  return Utils.evaluate(gKernelP, RandomForestModel, templateStr, {input: Utils.prepForReplacement(input), categoricalFeaturesInfo: JSON.stringify(categoricalFeaturesInfo), numTrees: numTrees, featureSubsetStrategy: Utils.prepForReplacement(featureSubsetStrategy), impurity: Utils.prepForReplacement(impurity), maxDepth: maxDepth, maxBins: maxBins, seed: seed});
};

module.exports = function(kP) {
  gKernelP = kP;

  return RandomForest;
};