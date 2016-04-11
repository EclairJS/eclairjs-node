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
 *
 * @constructor
 */
function Vectors() {
}

/**
 * Creates a dense vector from its values.
 * @param {number[] | number} value
 * @param {...number} Optional otherValues (if value is not an array)
 * @returns {Vector}
 */
Vectors.dense = function(value) {
  var args = {
    target: Vectors,
    method: 'dense',
    args: Utils.wrapArguments(arguments),
    static: true,
    kernelP: gKernelP,
    returnType: Vector
  };

  return Utils.generate(args);
};

Vectors.moduleLocation = '/mllib/linalg/Vectors#Vectors';

module.exports = function(kP) {
  gKernelP = kP;

  return Vectors;
};