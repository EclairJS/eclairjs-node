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

var Vector = require('../linalg/Vector.js');
var RDD = require('../../rdd/RDD.js');

/**
 * Clustering model produced by {@link BisectingKMeans}.
 * The prediction is done level-by-level from the root node to a leaf node, and at each node among
 * its children the closest to the input point is selected.
 *
 * @param root the root node of the clustering tree
 * @classdesc
 */

function BisectingKMeansModel(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Leaf cluster centers.
 * @returns {Promise.<Vector[]>}
 */
BisectingKMeansModel.prototype.clusterCenters = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.clusterCenters();';

  return Utils.generateResultArrayPromise(this, Vector, templateStr);
};

/**
 * Predicts the index of the cluster that the input point belongs to.
 * @param {Vector | RDD} point
 * @returns {Promise.<number>}
 */
BisectingKMeansModel.prototype.predict = function(point) {
  function _resolve(result, resolve, reject) {
  	var returnValue = parseFloat(result);
  	resolve(returnValue);
  }

  var templateStr = '{{inRefId}}.predict({{point}});';

  return Utils.generateResultPromise(this, templateStr, {point: Utils.prepForReplacement(point)}, _resolve);
};

/**
 * Computes the sum of squared distances between the input points and their corresponding cluster centers.
 * @param {Vector | RDD} point
 * @returns {Promise.<number>}
 */
BisectingKMeansModel.prototype.computeCost = function(point) {
  function _resolve(result, resolve, reject) {
   	var returnValue = parseFloat(result);
    resolve(returnValue);
  }

  var templateStr = '{{inRefId}}.computeCost({{point}});';
  return Utils.generateResultPromise(this, templateStr, {point: Utils.prepForReplacement(point)}, _resolve);
};

module.exports = BisectingKMeansModel;
