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

    var PowerIterationClusteringModel = require('./PowerIterationClusteringModel.js')();

    var gKernelP = kernelP;

    /**
     * @memberof module:eclairjs/mllib/clustering
     * @classdesc
     * Constructs a PIC instance with default parameters: {k: 2, maxIterations: 100,
         * initMode: "random"}.
     * @class
     */
    function PowerIterationClustering() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Set the number of clusters.
     * @param {number} k
     * @returns {module:eclairjs/mllib/clustering.PowerIterationClustering}
     */
    PowerIterationClustering.prototype.setK = function(k) {
      var args = {
        target: this,
        method: 'setK',
        args: Utils.wrapArguments(arguments),
        returnType: PowerIterationClustering
      };

      return Utils.generate(args);
    };

    /**
     * Set maximum number of iterations of the power iteration loop
     * @param {number} maxIterations
     * @returns {module:eclairjs/mllib/clustering.PowerIterationClustering}
     */
    PowerIterationClustering.prototype.setMaxIterations = function(maxIterations) {
      var args = {
        target: this,
        method: 'setMaxIterations',
        args: Utils.wrapArguments(arguments),
        returnType: PowerIterationClustering
      };

      return Utils.generate(args);
    };

    /**
     * Set the initialization mode. This can be either "random" to use a random vector
     * as vertex properties, or "degree" to use normalized sum similarities. Default: random.
     * @param {string} mode
     * @returns {}
     */
    PowerIterationClustering.prototype.setInitializationMode = function(mode) {
      throw "not implemented by ElairJS";
    };

    /**
     * Run the PIC algorithm on Graph.
     *
     * @param {module:eclairjs/rdd.RDD | Graph} similaritiesOrGraph  an RDD of (i, j, s,,ij,,) tuples representing the affinity matrix, which is
     *                     the matrix A in the PIC paper. The similarity s,,ij,, must be nonnegative.
     *                     This is a symmetric matrix and hence s,,ij,, = s,,ji,,. For any (i, j) with
     *                     nonzero similarity, there should be either (i, j, s,,ij,,) or
     *                     (j, i, s,,ji,,) in the input. Tuples with i = j are ignored, because we
     *                     assume s,,ij,, = 0.0. Or a graph an affinity matrix represented as graph, which is the matrix A in the PIC paper.
     *              The similarity s,,ij,, represented as the edge between vertices (i, j) must
     *              be nonnegative. This is a symmetric matrix and hence s,,ij,, = s,,ji,,. For
     *              any (i, j) with nonzero similarity, there should be either (i, j, s,,ij,,)
     *              or (j, i, s,,ji,,) in the input. Tuples with i = j are ignored, because we
     *              assume s,,ij,, = 0.0.
     *
     * @returns {module:eclairjs/mllib/clustering.PowerIterationClusteringModel}  a [[PowerIterationClusteringModel]] that contains the clustering result
     */
    PowerIterationClustering.prototype.run = function(similaritiesOrGraph) {
      var args = {
        target: this,
        method: 'run',
        args: Utils.wrapArguments(arguments),
        returnType: PowerIterationClusteringModel
      };

      return Utils.generate(args);
    };

    /**
     * A Java-friendly version of {@link run}.
     * @param {JavaRDD} similarities
     * @returns {module:eclairjs/mllib/clustering.PowerIterationClusteringModel}
     */
    PowerIterationClustering.prototype.run2 = function(similarities) {
      throw "not implemented by ElairJS";
    };

    PowerIterationClustering.moduleLocation = '/mllib/clustering#PowerIterationClustering';

    return PowerIterationClustering;
  })();
};