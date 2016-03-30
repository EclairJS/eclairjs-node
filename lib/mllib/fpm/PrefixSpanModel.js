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
 * Model fitted by {@link PrefixSpan}
 * @param freqSequences frequent sequences
 * @classdesc
 */

/**
 * @param {RDD} freqSequences
 * @returns {??}
 *  @class
 */
function PrefixSpanModel() {
  if (arguments.length == 2) {
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: PrefixSpanModel,
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

PrefixSpanModel.prototype.freqSequences = function() {
  var args = {
    target: this,
    method: 'freqSequences',
    returnType: RDD
  };

  return Utils.generate(args);
};

module.exports = function(kP) {
  gKernelP = kP;

  return PrefixSpanModel;
};