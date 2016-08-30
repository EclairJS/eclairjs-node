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

    var gKernelP = kernelP;

    /**
     * A clustering model for K-means. Each point belongs to the cluster with the closest center.
     * @classdesc
     */

    /**
     * A Java-friendly constructor that takes an Iterable of Vectors.
     * @param {Vector[]} clusterCenters
     * @memberof module:eclairjs/mllib/clustering
     * @class
     */
    function KMeansModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Total number of clusters.
     * @returns {Promise.<number>}
     */
    KMeansModel.prototype.k = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Returns the cluster index that a given point belongs to.
     * @param {module:eclairjs/mllib/linalg.Vector} point
     * @returns {Promise.<number>}
     */
    KMeansModel.prototype.predict0 = function(point) {
      throw "not implemented by ElairJS";
    };

    /**
     * Maps given points to their cluster indices.
     * @param {module:eclairjs/rdd.RDD} points
     * @returns {module:eclairjs/rdd.RDD}
     */
    KMeansModel.prototype.predict1 = function(points) {
      throw "not implemented by ElairJS";
    };

    /**
     * Maps given points to their cluster indices.
     * @param {JavaRDD} points
     * @returns {JavaRDD}
     */
    KMeansModel.prototype.predict2 = function(points) {
      throw "not implemented by ElairJS";
    };

    /**
     * Return the K-means cost (sum of squared distances of points to their nearest center) for this
     * model on the given data.
     * @param {module:eclairjs/rdd.RDD} data
     * @returns {Promise.<number>}
     */
    KMeansModel.prototype.computeCost = function(data) {
      var args = {
        target: this,
        method: 'computeCost',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<Vector[]>}
     */
    KMeansModel.prototype.clusterCenters = function () {
      var args = {
        target: this,
        method: 'clusterCenters',
        returnType: [Number],
        stringify: true
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    KMeansModel.prototype.save = function(sc,path) {
      throw "not implemented by ElairJS";
    };

    //
    // static methods
    //

    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.KMeansModel}
     */
    KMeansModel.load = function(sc,path) {
      throw "not implemented by ElairJS";
    };

    return KMeansModel;
  })();
};