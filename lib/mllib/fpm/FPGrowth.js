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

var FPGrowthModel = require('./FPGrowthModel.js');

var gKernelP;

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
 * @returns {??}
 *  @class
 */
function FPGrowth(kernelP, refIdP) {
  if (kernelP && refIdP) {
    this.kernelP = kernelP;
    this.refIdP = refIdP;
  } else {
    this.kernelP = gKernelP;

    var templateStr = 'var {{refId}} = new FPGrowth();';

    this.refIdP = Utils.evaluate(gKernelP, FPGrowth, templateStr, null, true);
  }
}

/**
 * Sets the minimal support level (default: `0.3`).
 *
 * @param {float} minSupport
 * @returns {FPGrowth}
 */
FPGrowth.prototype.setMinSupport = function(minSupport) {
  var templateStr = 'var {{refId}} = {{inRefId}}.setMinSupport({{minSupport}});';

  return Utils.generateAssignment(this, FPGrowth, templateStr, {minSupport: minSupport});
};

/**
 * Sets the number of partitions used by parallel FP-growth (default: same as input data).
 *
 * @param {integer} numPartitions
 * @returns {FPGrowth}
 */
FPGrowth.prototype.setNumPartitions = function(numPartitions) {
 var templateStr = 'var {{refId}} = {{inRefId}}.setNumPartitions({{numPartitions}});';

 return Utils.generateAssignment(this, FPGrowth, templateStr, {numPartitions: numPartitions});
};

/**
 * Computes an FP-Growth model that contains frequent itemsets.
 * @param {RDD} data  input data set, each element contains a transaction
 *
 * @returns {FPGrowthModel}  an [[FPGrowthModel]]
 */
FPGrowth.prototype.run = function(data) {
  var templateStr = 'var {{refId}} = {{inRefId}}.run({{data}});';

  return Utils.generateAssignment(this, FPGrowthModel, templateStr, {data: Utils.prepForReplacement(data)});
};


/**
 * Frequent itemset. param: items items in this itemset. Java users should call javaItems() instead. param: freq frequency
 * @classdesc
 * @param {object} items
 * @param {integer} freq
 * @constructor
 */
function FreqItemset(items, freq) {
  this.kernelP = gKernelP;

  var templateStr = freq ? 'var {{refId}} = new FreqItemset({{items}}, {{freq}});' : 'var {{refId}} = new FreqItemset({{items}});';

  this.refIdP = Utils.evaluate(gKernelP, FreqItemset, templateStr, {items: Utils.prepForReplacement(items), freq: freq}, true);
}

FreqItemset.prototype.items = function() {
  function _resolve(result, resolve, reject) {
    try {
      // take returns a stringified json result so parse it here
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = 'JSON.stringify({{inRefId}}.items());';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 *
 * @returns {integer}
 */
FreqItemset.prototype.freq = function() {
  function _resolve(result, resolve, reject) {
    try {
      resolve(parseFloat(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = '{{inRefId}}.freq();';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};


FPGrowth.FreqItemset = FreqItemset;

module.exports = function(kP) {
  gKernelP = kP;

  return FPGrowth;
};
