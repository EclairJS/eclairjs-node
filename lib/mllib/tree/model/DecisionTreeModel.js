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
     * Decision tree model for classification or regression.
     * This model stores the decision tree structure and parameters.
     * @param topNode root node
     * @param algo algorithm type -- classification or regression
     * @classdesc
     * @class
     * @memberof module:eclairjs/mllib/tree/model
     */

    function DecisionTreeModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Predict values for a single data point using the model trained.
     *
     * @param {module:eclairjs/mllib/linalg.Vector} features  array representing a single data point
     * @returns {Promise.<number>}  Double prediction from the trained model
     */
    DecisionTreeModel.prototype.predict0 = function(features) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'predict',
    //     args: [
    //       { value: features, type: 'Vector' }
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Predict values for the given data set using the model trained.
     *
     * @param {module:eclairjs/rdd.RDD} features  RDD representing data points to be predicted
     * @returns {module:eclairjs/rdd.RDD}  RDD of predictions for each of the given data points
     */
    DecisionTreeModel.prototype.predict1 = function(features) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'predict',
    //     args: [
    //       { value: features, type: 'RDD' }
    //     ],
    //     returnType: RDD
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Predict values for the given data set using the model trained.
     *
     * @param {JavaRDD} features  JavaRDD representing data points to be predicted
     * @returns {JavaRDD}  JavaRDD of predictions for each of the given data points
     */
    DecisionTreeModel.prototype.predict2 = function(features) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'predict',
    //     args: [
    //       { value: features, type: 'JavaRDD' }
    //     ],
    //     returnType: JavaRDD
    //
    //   };
    //
    //   return Utils.generate(args);
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
    //   var args ={
    //     target: this,
    //     method: 'numNodes',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
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
    //   var args ={
    //     target: this,
    //     method: 'depth',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
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
    //   var args ={
    //     target: this,
    //     method: 'toString',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
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
    //   var args ={
    //     target: this,
    //     method: 'toDebugString',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs.SparkContext} sc   Spark context used to save model data.
     * @param {string} path   Path specifying the directory in which to save this model.
     *              If the directory already exists, this method throws an exception.
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    DecisionTreeModel.prototype.save = function(sc,path) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'save',
    //     args: [
    //       { value: sc, type: 'SparkContext' },
    //       { value: path, type: 'string' }
    //     ],
    //     returnType: null
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     *
     * @param {module:eclairjs.SparkContext} sc   Spark context used for loading model files.
     * @param {string} path   Path specifying the directory to which the model was saved.
     * @returns {module:eclairjs/mllib/tree/model.DecisionTreeModel}   Model instance
     */
    DecisionTreeModel.load = function(sc,path) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: DecisionTreeModel,
    //     method: 'load',
    //     args: [
    //       { value: sc, type: 'SparkContext' },
    //       { value: path, type: 'string' }
    //     ],
    //     returnType: DecisionTreeModel
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    DecisionTreeModel.moduleLocation = '/mllib/tree/model/DecisionTreeModel';

    return DecisionTreeModel;
  })();
};