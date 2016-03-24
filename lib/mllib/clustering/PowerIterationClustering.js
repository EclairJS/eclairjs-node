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
var RDD = require('../../rdd/RDD.js');

var PowerIterationClusteringModel = require('./PowerIterationClusteringModel.js')();

/**
 * Power Iteration Clustering (PIC), a scalable graph clustering algorithm developed by
 * [[http://www.icml2010.org/papers/387.pdf Lin and Cohen]]. From the abstract: PIC finds a very
 * low-dimensional embedding of a dataset using truncated power iteration on a normalized pair-wise
 * similarity matrix of the data.
 *
 * @param k Number of clusters.
 * @param maxIterations Maximum number of iterations of the PIC algorithm.
 * @param initMode Initialization mode.
 *
 * @see [[http://en.wikipedia.org/wiki/Spectral_clustering Spectral clustering (Wikipedia)]]
 * @classdesc
 */

/**
 * Constructs a PIC instance with default parameters: {k: 2, maxIterations: 100,
 * initMode: "random"}.
 * @returns {PowerIterationClustering}
 *  @class
 */
function PowerIterationClustering() {
  if (arguments.length == 2 && arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = 'var {{refId}} = new PowerIterationClustering();';

    this.refIdP = Utils.evaluate(gKernelP, PowerIterationClustering, templateStr, null, true);
  }
}

/**
 * Set the number of clusters.
 * @param {number} k
 * @returns {PowerIterationClustering}
 */
PowerIterationClustering.prototype.setK = function(k) {
  var templateStr = 'var {{refId}} = {{inRefId}}.setK({{k}});';

  return Utils.generateAssignment(this, PowerIterationClustering, templateStr, {k: k});
};


/**
 * Set maximum number of iterations of the power iteration loop
 * @param {number} maxIterations
 * @returns {PowerIterationClustering}
 */
PowerIterationClustering.prototype.setMaxIterations = function(maxIterations) {
  var templateStr = 'var {{refId}} = {{inRefId}}.setMaxIterations({{maxIterations}});';

  return Utils.generateAssignment(this, PowerIterationClustering, templateStr, {maxIterations: maxIterations});
};


/**
 * Set the initialization mode. This can be either "random" to use a random vector
 * as vertex properties, or "degree" to use normalized sum similarities. Default: random.
 * @param {string} mode
 * @returns {}
 */
PowerIterationClustering.prototype.setInitializationMode = function(mode) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setInitializationMode({{mode}});';
//
// return Utils.generateAssignment(this, , templateStr , {mode : mode});
};


/**
 * Run the PIC algorithm on Graph.
 *
 * @param {RDD | Graph} similaritiesOrGraph  an RDD of (i, j, s,,ij,,) tuples representing the affinity matrix, which is
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
 * @returns {PowerIterationClusteringModel}  a [[PowerIterationClusteringModel]] that contains the clustering result
 */
PowerIterationClustering.prototype.run = function(similaritiesOrGraph) {
  var templateStr = 'var {{refId}} = {{inRefId}}.run({{similaritiesOrGraph}});';

  return Utils.generateAssignment(this, PowerIterationClusteringModel, templateStr, {similaritiesOrGraph: Utils.prepForReplacement(similaritiesOrGraph)});
};

/**
 * A Java-friendly version of {@link run}.
 * @param {JavaRDD} similarities
 * @returns {PowerIterationClusteringModel}
 */
PowerIterationClustering.prototype.run2 = function(similarities) {
  throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'similarities'
//
// var templateStr = 'var {{refId}} = {{inRefId}}.run({{similarities}});';
//
// return Utils.generateAssignment(this, PowerIterationClusteringModel, templateStr , {similarities : similarities});
};

//
// static methods
//


/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {PowerIterationClusteringModel}
 */
PowerIterationClusteringModel.load = function(sc,path) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = PowerIterationClusteringModel.load({{sc}},{{path}});';
//
// return Utils.generateAssignment(this, PowerIterationClusteringModel, templateStr , {sc : sc,path : path});
};

module.exports = function(kP) {
  gKernelP = kP;

  return PowerIterationClustering;
};