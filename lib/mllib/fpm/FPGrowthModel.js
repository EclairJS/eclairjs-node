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

/**
 * Model trained by {@link FPGrowth}, which holds frequent itemsets.
 * @param freqItemsets frequent itemset, which is an RDD of {@link FreqItemset}
 * @classdesc
 */

/**
 * @param {RDD} freqItemsets
 * @class
 */
function FPGrowthModel(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Returns RDD of RDD FreqItemset
 * @returns {RDD}
 */
FPGrowthModel.prototype.freqItemsets = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.freqItemsets();';

  return Utils.generateAssignment(this, RDD, templateStr);
};

/**
 * Generates association rules for the [[Item]]s in {@link freqItemsets}.
 * @param {number} confidence  minimal confidence of the rules produced
 * @returns {RDD}
 */
FPGrowthModel.prototype.generateAssociationRules = function(confidence) {
  var templateStr = 'var {{refId}} = {{inRefId}}.generateAssociationRules({{confidence}});';

  return Utils.generateAssignment(this, RDD, templateStr, {confidence: confidence});
};

module.exports = FPGrowthModel;