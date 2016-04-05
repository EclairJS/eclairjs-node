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

var Vector = require('./Vector.js');

var gKernelP;

/**
 * Represents singular value decomposition (SVD) factors.
 * @classdesc
 */

/**
 * @param {UType} U
 * @param {Vector} s
 * @param {VType} V
 * @returns {??}
 *  @class
 */
function SingularValueDecomposition() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: SingularValueDecomposition,
      kernelP: gKernelP,
      args: Utils.wrapArguments(arguments)
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

/**
 * @returns {Vector}
 */
SingularValueDecomposition.prototype.s = function() {
  var args = {
    target: this,
    method: 's',
    returnType: Vector
  };

  return Utils.generate(args);
};

/**
 * @returns {Promise.<UType>}
 */
SingularValueDecomposition.prototype.U = function() {
  var args = {
    target: this,
    method: 'U',
    stringify: true,
    returnType: [Object]
  };

  return Utils.generate(args);
};

/**
 * @returns {Promise.<VType>}
 */
SingularValueDecomposition.prototype.V = function() {
  var args = {
    target: this,
    method: 'V',
    stringify: true,
    returnType: [Object]
  };

  return Utils.generate(args);
};

module.exports = function(kP) {
  gKernelP = kP;

  return SingularValueDecomposition;
};