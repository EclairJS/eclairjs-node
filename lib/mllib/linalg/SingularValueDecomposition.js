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

    var Vector = require('./Vector.js');

    var gKernelP = kernelP;

    /**
     * Represents singular value decomposition (SVD) factors.
     * @classdesc
     * @param {UType} U
     * @param {module:eclairjs/mllib/linalg.Vector} s
     * @param {VType} V
     * @class
     * @memberof module:eclairjs/mllib/linalg
     */
    function SingularValueDecomposition() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @returns {module:eclairjs/mllib/linalg.Vector}
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

    return SingularValueDecomposition;
  })();
};