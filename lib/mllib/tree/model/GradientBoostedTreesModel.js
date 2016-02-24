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

var Utils = require('../../../utils.js');

var gKernelP;

/**
 * Represents a gradient boosted trees model.
 *
 * @param algo algorithm for the ensemble model, either Classification or Regression
 * @param trees tree ensembles
 * @param treeWeights tree ensemble weights
 * @classdesc
 */

/**
 * @param {Algo} algo
 * @param {DecisionTreeModel[]} trees
 * @param {number[]} treeWeights
 * @class
 */
function GradientBoostedTreesModel() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = 'var {{refId}} = new GradientBoostedTreesModel({{algo}}, [{{trees}}], [{{treeWeights}}]);';

    this.refIdP = Utils.evaluate(gKernelP, GradientBoostedTreesModel, templateStr, {algo: Utils.prepForReplacement(arguments[0]), trees: Utils.prepForReplacement(arguments[1]), treeWeights: Utils.prepForReplacement(arguments[2])}, true);
  }
}

/**
 * @param {SparkContext} sc   Spark context used to save model data.
 * @param {string} path   Path specifying the directory in which to save this model.
 *              If the directory already exists, this method throws an exception.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
GradientBoostedTreesModel.prototype.save = function(sc,path) {
  var templateStr = '{{inRefId}}.save({{sc}},{{path}});';

  return Utils.generateVoidPromise(this, templateStr, {sc: Utils.prepForReplacement(sc), path: Utils.prepForReplacement(path)});
};

/**
 * Method to compute error or loss for every iteration of gradient boosting.
 * @param {RDD} data  RDD of {@link LabeledPoint}
 * @param {Loss} loss  evaluation metric.
 *         containing the first i+1 trees
 * @returns {Promise.<number[]>}  an array with index i having the losses or errors for the ensemble
 */
GradientBoostedTreesModel.prototype.evaluateEachIteration = function(data,loss) {
  function _resolve(result, resolve, reject) {
    var returnValue=JSON.parse(result)
    resolve(returnValue);
  }

  var templateStr = 'JSON.stringify({{inRefId}}.{{inRefId}}(evaluateEachIteration));';
  return Utils.generateResultPromise(this, templateStr, {data: Utils.prepForReplacement(data), loss: Utils.prepForReplacement(loss)}, _resolve);
};

//
// static methods
//

/**
 * @param {SparkContext} sc   Spark context used for loading model files.
 * @param {string} path   Path specifying the directory to which the model was saved.
 * @returns {GradientBoostedTreesModel}   Model instance
 */
GradientBoostedTreesModel.load = function(sc,path) {
  var templateStr = 'var {{refId}} = GradientBoostedTreesModel.load({{sc}},{{path}});';

  return Utils.evaluate(gKernelP, GradientBoostedTreesModel, templateStr, {sc: Utils.prepForReplacement(sc), path: Utils.prepForReplacement(path)});
};

module.exports = function(kP) {
  gKernelP = kP;

  return GradientBoostedTreesModel;
};