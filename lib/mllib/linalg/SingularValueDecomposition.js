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
    var templateStr ='var {{refId}} = new SingularValueDecomposition({{U}}, {{s}}, {{v}});';

    return Utils.evaluate(gKernelP, SingularValueDecomposition, templateStr, {U: Utils.prepForReplacement(arguments[0]), s: Utils.prepForReplacement(arguments[1]), v: Utils.prepForReplacement(arguments[2])});
  }
}

/**
 * @returns {Vector}
 */
SingularValueDecomposition.prototype.s = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.s();';

  return Utils.generateAssignment(this, Vector, templateStr);
};

/**
 * @returns {Promise.<UType>}
 */
SingularValueDecomposition.prototype.U = function() {
  function _resolve(result, resolve, reject) {
    try {
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = 'JSON.stringify({{inRefId}}.U());';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * @returns {Promise.<VType>}
 */
SingularValueDecomposition.prototype.V = function() {
  function _resolve(result, resolve, reject) {
    try {
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = 'JSON.stringify({{inRefId}}.V());';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};


module.exports = function(kP) {
  gKernelP = kP;

  return SingularValueDecomposition;
};