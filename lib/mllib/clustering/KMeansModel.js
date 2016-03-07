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

/**
 * A clustering model for K-means. Each point belongs to the cluster with the closest center.
 * @classdesc
 */

/**
 * A Java-friendly constructor that takes an Iterable of Vectors.
 * @param {Iterable} centers
 * @returns {??}
 *  @class
 */
function KMeansModel() {
  if (arguments.length == 2) {
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    // TODO: impl
  }
}



/**
 * Total number of clusters.
 * @returns {Promise.<number>}
 */
KMeansModel.prototype.k = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.k();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Returns the cluster index that a given point belongs to.
 * @param {Vector} point
 * @returns {Promise.<number>}
 */
KMeansModel.prototype.predict0 = function(point) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.predict({{point}});';
// return Utils.generateResultPromise(this, templateStr  , {point : point}, _resolve);
};


/**
 * Maps given points to their cluster indices.
 * @param {RDD} points
 * @returns {RDD}
 */
KMeansModel.prototype.predict1 = function(points) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.predict({{points}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {points : points});
};


/**
 * Maps given points to their cluster indices.
 * @param {JavaRDD} points
 * @returns {JavaRDD}
 */
KMeansModel.prototype.predict2 = function(points) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.predict({{points}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {points : points});
};


/**
 * Return the K-means cost (sum of squared distances of points to their nearest center) for this
 * model on the given data.
 * @param {RDD} data
 * @returns {Promise.<number>}
 */
KMeansModel.prototype.computeCost = function(data) {
  function _resolve(result, resolve, reject) {
    var returnValue=parseFloat(result)
    resolve(returnValue);
  }

  var templateStr = '{{inRefId}}.computeCost({{data}});';
  return Utils.generateResultPromise(this, templateStr, {data: Utils.prepForReplacement(data)}, _resolve);
};

/**
 * @returns {Promise.<Vector[]>}
 */
KMeansModel.prototype.clusterCenters = function () {
  function _resolve(result, resolve, reject) {
    var res = [];

    JSON.parse(result).forEach(function(item) {
      res.push(JSON.parse(item));
    });

    resolve(res);
  }

  var templateStr = 'JSON.stringify({{inRefId}}.clusterCenters());';
  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
KMeansModel.prototype.save = function(sc,path) {
  throw "not implemented by ElairJS";
//
// var templateStr = '{{inRefId}}.save({{sc}},{{path}});';
// return Utils.generateVoidPromise(this, templateStr , {sc : sc,path : path});
};

//
// static methods
//


/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {KMeansModel}
 */
KMeansModel.load = function(sc,path) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = KMeansModel.load({{sc}},{{path}});';
//
// return Utils.generateAssignment(this, KMeansModel, templateStr , {sc : sc,path : path});
};

module.exports = KMeansModel;