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
     * Model trained by {@link FPGrowth}, which holds frequent itemsets.
     * @param freqItemsets frequent itemset, which is an RDD of {@link FreqItemset}
     * @classdesc
     */

    /**
     * @param {module:eclairjs/rdd.RDD} freqItemsets
     * @class
     * @memberof module:eclairjs/mllib/fpm
     */
    function FPGrowthModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Returns RDD of RDD FreqItemset
     * @returns {module:eclairjs/rdd.RDD}
     */
    FPGrowthModel.prototype.freqItemsets = function() {
      var args = {
        target: this,
        method: 'freqItemsets',
        returnType: RDD
      };

      return Utils.generate(args);
    };

    /**
     * Generates association rules for the [[Item]]s in {@link freqItemsets}.
     * @param {number} confidence  minimal confidence of the rules produced
     * @returns {module:eclairjs/rdd.RDD}
     */
    FPGrowthModel.prototype.generateAssociationRules = function(confidence) {
      var args = {
        target: this,
        method: 'freqItemsets',
        args: Utils.wrapArguments(arguments),
        returnType: RDD
      };

      return Utils.generate(args);
    };

    FPGrowthModel.moduleLocation = '/mllib/fpm/FPGrowthModel';

    return FPGrowthModel;
  })();
};