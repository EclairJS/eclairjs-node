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

    var gKernelP = kernelP;

    /**
     * Model produced by {@link PowerIterationClustering}.
     *
     * @memberof module:eclairjs/mllib/clustering
     * @classdesc
     * @param {number} k number of clusters
     * @param {module:eclairjs/rdd.RDD} assignments  an RDD of clustering [[PowerIterationClustering#Assignment]]s
     * @class
     */
    function PowerIterationClusteringModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @returns {module:eclairjs/rdd.RDD}
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
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    PowerIterationClusteringModel.prototype.save = function(sc,path) {
      throw "not implemented by ElairJS";
    };

    PowerIterationClusteringModel.moduleLocation = '/mllib/clustering#PowerIterationClusteringModel';

    return PowerIterationClusteringModel;
  })();
};