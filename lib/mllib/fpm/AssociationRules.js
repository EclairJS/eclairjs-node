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
var RDD = require('../../RDD.js');

var kernelP;

/**
 * :: Experimental ::
 *
 * Generates association rules from a [[RDD[FreqItemset[Item]]]. This method only generates
 * association rules which have a single item as the consequent.
 *
 * @classdesc
 */

/**
 * Constructs a default instance with default parameters {minConfidence = 0.8}.
 * @returns {??}
 *  @class
 */
function AssociationRules() {
  this.kernelP = kernelP;

  var templateStr = 'var {{refId}} = new AssociationRules();';

  this.refIdP = Utils.evaluate(kernelP, AssociationRules, templateStr, null, true);
}

/**
 * Sets the minimal confidence (default: `0.8`).
 * @param {number} minConfidence
 * @returns {AssociationRules}
 */
AssociationRules.prototype.setMinConfidence = function(minConfidence) {
  var templateStr = 'var {{refId}} = {{inRefId}}.setMinConfidence({{minConfidence}});';

  return Utils.generateAssignment(this, AssociationRules, templateStr, {minConfidence: minConfidence});
};

/**
 * Computes the association rules with confidence above {@link minConfidence}.
 * @param {RDD} freqItemsets  frequent itemset model obtained from {@link FPGrowth}
 *
 * @returns {RDD}  a [[Set[Rule[Item]]] containing the assocation rules.
 */
AssociationRules.prototype.run = function(freqItemsets) {
  var templateStr = 'var {{refId}} = {{inRefId}}.run({{freqItemsets}});';

  return Utils.generateAssignment(this, RDD, templateStr, {freqItemsets: Utils.prepForReplacement(freqItemsets)});
};

module.exports = function(kP) {
  kernelP = kP;

  return AssociationRules;
};
