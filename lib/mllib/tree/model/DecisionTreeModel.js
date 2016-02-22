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

/**
 * Decision tree model for classification or regression.
 * This model stores the decision tree structure and parameters.
 * @param topNode root node
 * @param algo algorithm type -- classification or regression
 * @classdesc
 */

/**
 * @param {Node} topNode
 * @param {Algo} algo
 * @returns {??}
 *  @class
 */
function DecisionTreeModel(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Predict values for a single data point using the model trained.
 *
 * @param {Vector} features  array representing a single data point
 * @returns {Promise.<number>}  Double prediction from the trained model
 */
DecisionTreeModel.prototype.predict0 = function(features) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.predict({{features}});';
// return Utils.generateResultPromise(this, templateStr  , {features : features}, _resolve);
};


/**
 * Predict values for the given data set using the model trained.
 *
 * @param {RDD} features  RDD representing data points to be predicted
 * @returns {RDD}  RDD of predictions for each of the given data points
 */
DecisionTreeModel.prototype.predict1 = function(features) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.predict({{features}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {features : features});
};


/**
 * Predict values for the given data set using the model trained.
 *
 * @param {JavaRDD} features  JavaRDD representing data points to be predicted
 * @returns {JavaRDD}  JavaRDD of predictions for each of the given data points
 */
DecisionTreeModel.prototype.predict2 = function(features) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.predict({{features}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {features : features});
};


/**
 * Get number of nodes in tree, including leaf nodes.
 * @returns {Promise.<number>}
 */
DecisionTreeModel.prototype.numNodes = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.numNodes();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Get depth of tree.
 * E.g.: Depth 0 means 1 leaf node.  Depth 1 means 1 internal node and 2 leaf nodes.
 * @returns {Promise.<number>}
 */
DecisionTreeModel.prototype.depth = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.depth();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Print a summary of the model.
 * @returns {Promise.<string>}
 */
DecisionTreeModel.prototype.toString = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.toString();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Print the full model to a string.
 * @returns {Promise.<string>}
 */
DecisionTreeModel.prototype.toDebugString = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.toDebugString();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * @param {SparkContext} sc   Spark context used to save model data.
 * @param {string} path   Path specifying the directory in which to save this model.
 *              If the directory already exists, this method throws an exception.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DecisionTreeModel.prototype.save = function(sc,path) {
  throw "not implemented by ElairJS";
//
// var templateStr = '{{inRefId}}.save({{sc}},{{path}});';
// return Utils.generateVoidPromise(this, templateStr , {sc : sc,path : path});
};

module.exports = DecisionTreeModel;
//
// static methods
//


/**
 *
 * @param {SparkContext} sc   Spark context used for loading model files.
 * @param {string} path   Path specifying the directory to which the model was saved.
 * @returns {DecisionTreeModel}   Model instance
 */
DecisionTreeModel.load = function(sc,path) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = DecisionTreeModel.load({{sc}},{{path}});';
//
// return Utils.generateAssignment(this, DecisionTreeModel, templateStr , {sc : sc,path : path});
};
