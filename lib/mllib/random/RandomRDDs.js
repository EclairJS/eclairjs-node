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
     *
     *
     * @constructor
     * @memberof module:eclairjs/mllib/random
     */
    function RandomRDDs() {
    }

    //
    // static methods
    //

    /**
     * Generates an RDD comprised of `i.i.d.` samples from the standard normal distribution.
     *
     * To transform the distribution in the generated RDD from standard normal to some other normal
     * `N(mean, sigma^2^)`, use `RandomRDDs.normalRDD(sc, n, p, seed).map(v => mean + sigma * v)`.
     *
     * @param {module:eclairjs.SparkContext} sc  SparkContext used to create the RDD.
     * @param {number} size  Size of the RDD.
     * @param {number} [numPartitions] Number of partitions in the RDD (default: `sc.defaultParallelism`).
     * @param {number} [seed] Random seed (default: a random long integer).
     * @returns {module:eclairjs/rdd.RDD}  RDD[Double] Optional comprised of `i.i.d.` samples ~ N(0.0, 1.0).
     */
    RandomRDDs.normalRDD = function(sc,size,numPartitions,seed) {
      var args = {
        target: RandomRDDs,
        method: 'normalRDD',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: RDD
      };

      return Utils.generate(args);
    };

    /**
     * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
     * standard normal distribution.
     *
     * @param {module:eclairjs.SparkContext} sc  SparkContext used to create the RDD.
     * @param {number} numRows  Number of Vectors in the RDD.
     * @param {number} numCols  Number of elements in each Vector.
     * @param {number} [numPartitions] Number of partitions in the RDD (default: `sc.defaultParallelism`).
     * @param {number} [seed] Random seed (default: a random long integer).
     * @returns {module:eclairjs/rdd.RDD}  RDD[Vector] with vectors containing `i.i.d.` samples ~ `N(0.0, 1.0)`.
     */
    RandomRDDs.normalVectorRDD = function(sc,numRows,numCols,numPartitions,seed) {
      var args = {
        target: RandomRDDs,
        method: 'normalVectorRDD',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: RDD
      };

      return Utils.generate(args);
    };

    RandomRDDs.moduleLocation = '/mllib/random/RandomRDDs';

    return RandomRDDs;
  })();
};