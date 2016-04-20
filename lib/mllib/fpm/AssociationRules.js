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
 * :: Experimental ::
 *
 * Generates association rules from a [[RDD[FreqItemset[Item]]]. This method only generates
 * association rules which have a single item as the consequent.
 *
 * @classdesc
 */

/**
 * Constructs a default instance with default parameters {minConfidence = 0.8}.
 * @class
 * @memberof module:eclairjs/mllib/fpm
 */
function AssociationRules() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: AssociationRules,
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

/**
 * Sets the minimal confidence (default: `0.8`).
 * @param {number} minConfidence
 * @returns {AssociationRules}
 */
AssociationRules.prototype.setMinConfidence = function(minConfidence) {
  var args = {
    target: this,
    method: 'setMinConfidence',
    args: Utils.wrapArguments(arguments),
    returnType: AssociationRules
  };

  return Utils.generate(args);
};

/**
 * Computes the association rules with confidence above {@link minConfidence}.
 * @param {RDD} freqItemsets  frequent itemset model obtained from {@link FPGrowth}
 *
 * @returns {RDD}  a [[Set[Rule[Item]]] containing the assocation rules.
 */
AssociationRules.prototype.run = function(freqItemsets) {
  var args = {
    target: this,
    method: 'run',
    args: Utils.wrapArguments(arguments),
    returnType: RDD
  };

  return Utils.generate(args);
};

AssociationRules.moduleLocation = '/mllib/fpm/AssociationRules';

module.exports = function(kP) {
  gKernelP = kP;

  return AssociationRules;
};