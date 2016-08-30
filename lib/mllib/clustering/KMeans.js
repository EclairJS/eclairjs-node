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

    var KMeansModel = require('./KMeansModel.js')();

    var gKernelP = kernelP;

    /**
     * K-means clustering with support for multiple parallel runs and a k-means++ like initialization
     * mode (the k-means|| algorithm by Bahmani et al). When multiple concurrent runs are requested,
     * they are executed together with joint passes over the data for efficiency.
     *
     * This is an iterative algorithm that will make multiple passes over the data, so any RDDs given
     * to it should be cached by the user.
     * @classdesc
     */

    /**
     * Constructs a KMeans instance with default parameters: {k: 2, maxIterations: 20, runs: 1,
         * initializationMode: "k-means||", initializationSteps: 5, epsilon: 1e-4, seed: random}.
     * @class
     * @memberof module:eclairjs/mllib/clustering
     */
    function KMeans(kernelP, refIdP) {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Number of clusters to create (k).
     * @returns {Promise.<number>}
     */
    KMeans.prototype.getK = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Set the number of clusters to create (k). Default: 2.
     * @param {number} k
     * @returns {}
     */
    KMeans.prototype.setK = function(k) {
      throw "not implemented by ElairJS";
    };

    /**
     * Maximum number of iterations to run.
     * @returns {Promise.<number>}
     */
    KMeans.prototype.getMaxIterations = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Set maximum number of iterations to run. Default: 20.
     * @param {number} maxIterations
     * @returns {}
     */
    KMeans.prototype.setMaxIterations = function(maxIterations) {
      throw "not implemented by ElairJS";
    };

    /**
     * The initialization algorithm. This can be either "random" or "k-means||".
     * @returns {Promise.<string>}
     */
    KMeans.prototype.getInitializationMode = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Set the initialization algorithm. This can be either "random" to choose random points as
     * initial cluster centers, or "k-means||" to use a parallel variant of k-means++
     * (Bahmani et al., Scalable K-Means++, VLDB 2012). Default: k-means||.
     * @param {string} initializationMode
     * @returns {}
     */
    KMeans.prototype.setInitializationMode = function(initializationMode) {
      throw "not implemented by ElairJS";
    };

    /**
     * :: Experimental ::
     * Number of runs of the algorithm to execute in parallel.
     * @returns {Promise.<number>}
     */
    KMeans.prototype.getRuns = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * :: Experimental ::
     * Set the number of runs of the algorithm to execute in parallel. We initialize the algorithm
     * this many times with random starting conditions (configured by the initialization mode), then
     * return the best clustering found over any run. Default: 1.
     * @param {number} runs
     * @returns {}
     */
    KMeans.prototype.setRuns = function(runs) {
      throw "not implemented by ElairJS";
    };

    /**
     * Number of steps for the k-means|| initialization mode
     * @returns {Promise.<number>}
     */
    KMeans.prototype.getInitializationSteps = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Set the number of steps for the k-means|| initialization mode. This is an advanced
     * setting -- the default of 5 is almost always enough. Default: 5.
     * @param {number} initializationSteps
     * @returns {}
     */
    KMeans.prototype.setInitializationSteps = function(initializationSteps) {
      throw "not implemented by ElairJS";
    };

    /**
     * The distance threshold within which we've consider centers to have converged.
     * @returns {Promise.<number>}
     */
    KMeans.prototype.getEpsilon = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Set the distance threshold within which we've consider centers to have converged.
     * If all centers move less than this Euclidean distance, we stop iterating one run.
     * @param {number} epsilon
     * @returns {}
     */
    KMeans.prototype.setEpsilon = function(epsilon) {
      throw "not implemented by ElairJS";
    };

    /**
     * The random seed for cluster initialization.
     * @returns {Promise.<number>}
     */
    KMeans.prototype.getSeed = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Set the random seed for cluster initialization.
     * @param {number} seed
     * @returns {}
     */
    KMeans.prototype.setSeed = function(seed) {
      throw "not implemented by ElairJS";
    };

    /**
     * Set the initial starting point, bypassing the random initialization or k-means||
     * The condition model.k == this.k must be met, failure results
     * in an IllegalArgumentException.
     * @param {module:eclairjs/mllib/clustering.KMeansModel} model
     * @returns {}
     */
    KMeans.prototype.setInitialModel = function(model) {
      throw "not implemented by ElairJS";
    };

    /**
     * Train a K-means model on the given set of points; `data` should be cached for high
     * performance, because this is an iterative algorithm.
     * @param {module:eclairjs/rdd.RDD} data
     * @returns {module:eclairjs/mllib/clustering.KMeansModel}
     */
    KMeans.prototype.run = function(data) {
      throw "not implemented by ElairJS";
    };

    //
    // static methods
    //

    /**
     * Trains a k-means model using the given set of parameters.
     *
     * @param {module:eclairjs/rdd.RDD} data  training points stored as `RDD[Vector]`
     * @param {number} k  number of clusters
     * @param {number} maxIterations  max number of iterations
     * @param {number} [runs] number of parallel runs, defaults to 1. The best model is returned.
     * @param {string} [initializationMode] initialization model, either "random" or "k-means||" (default).
     * @param {number} [seed] random seed value for cluster initialization
     * @returns {module:eclairjs/mllib/clustering.KMeansModel}
     */
    KMeans.train = function(data,k,maxIterations,runs,initializationMode,seed) {
      var args = [{value: data}, {value: k, type: 'number'}, {value: maxIterations, type: 'number'}];

      if (runs) {
        args.push({value: runs, type: 'number'})
      }

      if (initializationMode) {
        args.push({value: initializationMode})
      }

      if (seed) {
        args.push({value: seed})
      }

      var gargs = {
        target: KMeans,
        method: 'train',
        kernelP: gKernelP,
        static: true,
        args: args,
        returnType: KMeansModel
      };

      return Utils.generate(gargs);
    };

    KMeans.K_MEANS_PARALLEL = 'KMeans.K_MEANS_PARALLEL';
    KMeans.RANDOM = 'KMeans.RANDOM';

    KMeans.moduleLocation = '/mllib/clustering/KMeans';

    return KMeans;
  })();
};