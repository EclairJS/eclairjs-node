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
     * A parallel FP-growth algorithm to mine frequent itemsets. The algorithm is described in
     * [[http://dx.doi.org/10.1145/1454008.1454027 Li et al., PFP: Parallel FP-Growth for Query
     *  Recommendation]]. PFP distributes computation in such a way that each worker executes an
     * independent group of mining tasks. The FP-Growth algorithm is described in
     * [[http://dx.doi.org/10.1145/335191.335372 Han et al., Mining frequent patterns without candidate
     *  generation]].
     *
     * @param minSupport the minimal support level of the frequent pattern, any pattern appears
     *                   more than (minSupport * size-of-the-dataset) times will be output
     * @param numPartitions number of partitions used by parallel FP-growth
     *
     * @see [[http://en.wikipedia.org/wiki/Association_rule_learning Association rule learning
     *       (Wikipedia)]]
     *
     * @classdesc
     */

    /**
     * Constructs a default instance with default parameters {minSupport: `0.3`, numPartitions: same
         * as the input data}.
     *
     * @class
     * @memberof module:eclairjs/mllib/fpm
     */
    function FPGrowth() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Sets the minimal support level (default: `0.3`).
     *
     * @param {float} minSupport
     * @returns {module:eclairjs/mllib/fpm.FPGrowth}
     */
    FPGrowth.prototype.setMinSupport = function(minSupport) {
      var args = {
        target: this,
        method: 'setMinSupport',
        args: Utils.wrapArguments(arguments),
        returnType: FPGrowth
      };

      return Utils.generate(args);
    };

    /**
     * Sets the number of partitions used by parallel FP-growth (default: same as input data).
     *
     * @param {integer} numPartitions
     * @returns {module:eclairjs/mllib/fpm.FPGrowth}
     */
    FPGrowth.prototype.setNumPartitions = function(numPartitions) {
      var args = {
        target: this,
        method: 'setNumPartitions',
        args: Utils.wrapArguments(arguments),
        returnType: FPGrowth
      };

      return Utils.generate(args);
    };

    /**
     * Computes an FP-Growth model that contains frequent itemsets.
     * @param {module:eclairjs/rdd.RDD} data  input data set, each element contains a transaction
     *
     * @returns {module:eclairjs/mllib/fpm.FPGrowthModel}  an [[FPGrowthModel]]
     */
    FPGrowth.prototype.run = function(data) {
      var FPGrowthModel = require('./FPGrowthModel.js')(this.kernelP);

      var args = {
        target: this,
        method: 'run',
        args: Utils.wrapArguments(arguments),
        returnType: FPGrowthModel
      };

      return Utils.generate(args);
    };

    FPGrowth.moduleLocation = '/mllib/fpm/FPGrowth';

    /**
     * Frequent itemset. param: items items in this itemset. Java users should call javaItems() instead. param: freq frequency
     * @classdesc
     * @param {object} items
     * @param {integer} freq
     * @constructor
     */
    function FreqItemset() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    FreqItemset.prototype.items = function() {
      var args = {
        target: this,
        method: 'items',
        stringify: true,
        returnType: [String]
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {integer}
     */
    FreqItemset.prototype.freq = function() {
      var args = {
        target: this,
        method: 'freq',
        returnType: Number
      };

      return Utils.generate(args);
    };

    FreqItemset.moduleLocation = '/mllib/fpm/FreqItemset';

    FPGrowth.FreqItemset = FreqItemset;

    return FPGrowth;
  })();
};