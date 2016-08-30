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

    var BisectingKMeansModel = require('./BisectingKMeansModel.js');

    var gKernelP = kernelP;

    /**
     * A bisecting k-means algorithm based on the paper "A comparison of document clustering techniques"
     * by Steinbach, Karypis, and Kumar, with modification to fit Spark.
     * The algorithm starts from a single cluster that contains all points.
     * Iteratively it finds divisible clusters on the bottom level and bisects each of them using
     * k-means, until there are `k` leaf clusters in total or no leaf clusters are divisible.
     * The bisecting steps of clusters on the same level are grouped together to increase parallelism.
     * If bisecting all divisible clusters on the bottom level would result more than `k` leaf clusters,
     * larger clusters get higher priority.
     *
     * @param k the desired number of leaf clusters (default: 4). The actual number could be smaller if
     *          there are no divisible leaf clusters.
     * @param maxIterations the max number of k-means iterations to split clusters (default: 20)
     * @param minDivisibleClusterSize the minimum number of points (if >= 1.0) or the minimum proportion
     *                                of points (if < 1.0) of a divisible cluster (default: 1)
     * @param seed a random seed (default: hash value of the class name)
     *
     * @see [[http://glaros.dtc.umn.edu/gkhome/fetch/papers/docclusterKDDTMW00.pdf
     *     Steinbach, Karypis, and Kumar, A comparison of document clustering techniques,
     *     KDD Workshop on Text Mining, 2000.]]
     * @classdesc
     */

    /**
     * Constructs with the default configuration
     * @class
     * @memberof module:eclairjs/mllib/clustering
     */
    function BisectingKMeans(kernelP, refIdP) {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Sets the desired number of leaf clusters (default: 4).
     * The actual number could be smaller if there are no divisible leaf clusters.
     * @param {number} k
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeans}
     */
    BisectingKMeans.prototype.setK = function(k) {
      var args = {
        target: this,
        method: 'setK',
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeans
      };

      return Utils.generate(args);
    };

    /**
     * Gets the desired number of leaf clusters.
     * @returns {Promise.<number>}
     */
    BisectingKMeans.prototype.getK = function() {
      throw "not implemented by ElairJS";
    };


    /**
     * Sets the max number of k-means iterations to split clusters (default: 20).
     * @param {number} maxIterations
     * @returns {}
     */
    BisectingKMeans.prototype.setMaxIterations = function(maxIterations) {
      throw "not implemented by ElairJS";
    };

    /**
     * Gets the max number of k-means iterations to split clusters.
     * @returns {Promise.<number>}
     */
    BisectingKMeans.prototype.getMaxIterations = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Sets the minimum number of points (if >= `1.0`) or the minimum proportion of points
     * (if < `1.0`) of a divisible cluster (default: 1).
     * @param {number} minDivisibleClusterSize
     * @returns {}
     */
    BisectingKMeans.prototype.setMinDivisibleClusterSize = function(minDivisibleClusterSize) {
      throw "not implemented by ElairJS";
    };

    /**
     * Gets the minimum number of points (if >= `1.0`) or the minimum proportion of points
     * (if < `1.0`) of a divisible cluster.
     * @returns {Promise.<number>}
     */
    BisectingKMeans.prototype.getMinDivisibleClusterSize = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Sets the random seed (default: hash value of the class name).
     * @param {number} seed
     * @returns {}
     */
    BisectingKMeans.prototype.setSeed = function(seed) {
      throw "not implemented by ElairJS";
    };

    /**
     * Gets the random seed.
     * @returns {Promise.<number>}
     */
    BisectingKMeans.prototype.getSeed = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Runs the bisecting k-means algorithm.
     * @param {module:eclairjs/rdd.RDD} input  RDD of vectors
     * @returns {module:eclairjs/mllib/clustering.BisectingKMeansModel}  model for the bisecting kmeans
     */
    BisectingKMeans.prototype.run = function(input) {
      var args = {
        target: this,
        method: 'run',
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeansModel
      };

      return Utils.generate(args);
    };

    BisectingKMeans.moduleLocation = '/mllib/clustering/BisectingKMeans';

    return BisectingKMeans;
  })();
};