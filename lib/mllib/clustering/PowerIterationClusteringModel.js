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

var gKernelP;

/**
 * Model produced by {@link PowerIterationClustering}.
 *
 * @param k number of clusters
 * @param assignments an RDD of clustering [[PowerIterationClustering#Assignment]]s
 * @classdesc
 */

/**
 * @param {number} k
 * @param {RDD} assignments
 * @returns {PowerIterationClusteringModel}
 * @class
 */
function PowerIterationClusteringModel() {
  if (arguments.length == 2 && arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: PowerIterationClusteringModel,
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

/**
 * @returns {RDD}
 */
PowerIterationClusteringModel.prototype.assignments = function() {
  var args = {
    target: this,
    method: 'assignments',
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * @param {SparkContext} sc
 * @param {string} path
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
PowerIterationClusteringModel.prototype.save = function(sc,path) {
  throw "not implemented by ElairJS";
};

PowerIterationClusteringModel.moduleLocation = '/mllib/clustering#PowerIterationClusteringModel';

module.exports = function(kP) {
  gKernelP = kP;

  return PowerIterationClusteringModel;
};