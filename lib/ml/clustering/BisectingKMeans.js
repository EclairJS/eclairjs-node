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
  return (function() {    var Utils = require('../../utils.js');

    var Estimator = require('../Estimator')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * :: Experimental ::
     *
     * A bisecting k-means algorithm based on the paper "A comparison of document clustering techniques"
     * by Steinbach, Karypis, and Kumar, with modification to fit Spark.
     * The algorithm starts from a single cluster that contains all points.
     * Iteratively it finds divisible clusters on the bottom level and bisects each of them using
     * k-means, until there are `k` leaf clusters in total or no leaf clusters are divisible.
     * The bisecting steps of clusters on the same level are grouped together to increase parallelism.
     * If bisecting all divisible clusters on the bottom level would result more than `k` leaf clusters,
     * larger clusters get higher priority.
     *
     * @see [[http://glaros.dtc.umn.edu/gkhome/fetch/papers/docclusterKDDTMW00.pdf
     *     Steinbach, Karypis, and Kumar, A comparison of document clustering techniques,
     *     KDD Workshop on Text Mining, 2000.]]
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/clustering
     * @param {string} uid
     * @constructor
     */
    function BisectingKMeans() {
        Utils.handleConstructor(this, arguments, gKernelP);
    };

    BisectingKMeans.prototype = Object.create(Estimator.prototype);

    BisectingKMeans.prototype.constructor = BisectingKMeans;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    BisectingKMeans.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {BisectingKMeans} 
     */
    BisectingKMeans.prototype.copy = function(extra) {
      var args ={
        target: this, 
        method: 'copy', 
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeans

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type} 
     */
    BisectingKMeans.prototype.setFeaturesCol = function(value) {
      var args ={
        target: this, 
        method: 'setFeaturesCol', 
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeans

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type} 
     */
    BisectingKMeans.prototype.setPredictionCol = function(value) {
      var args ={
        target: this, 
        method: 'setPredictionCol', 
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeans

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type} 
     */
    BisectingKMeans.prototype.setK = function(value) {
      var args ={
        target: this, 
        method: 'setK', 
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeans

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type} 
     */
    BisectingKMeans.prototype.setMaxIter = function(value) {
      var args ={
        target: this, 
        method: 'setMaxIter', 
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeans

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type} 
     */
    BisectingKMeans.prototype.setSeed = function(value) {
      var args ={
        target: this, 
        method: 'setSeed', 
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeans

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type} 
     */
    BisectingKMeans.prototype.setMinDivisibleClusterSize = function(value) {
      var args ={
        target: this, 
        method: 'setMinDivisibleClusterSize', 
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeans

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {BisectingKMeansModel} 
     */
    BisectingKMeans.prototype.fit = function(dataset) {
      var BisectingKMeansModel = require('./BisectingKMeansModel')();

      var args ={
        target: this, 
        method: 'fit', 
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeansModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {StructType} 
     */
    BisectingKMeans.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js');

      var args ={
        target: this, 
        method: 'transformSchema', 
        args: Utils.wrapArguments(arguments),
        returnType: StructType

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {BisectingKMeans} 
     */
    BisectingKMeans.load = function(path) {
      var args ={
        target: BisectingKMeans, 
        method: 'load', 
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: BisectingKMeans

      };

      return Utils.generate(args);
    };

    BisectingKMeans.moduleLocation = '/ml/clustering/BisectingKMeans';

    return BisectingKMeans;
  })();
};