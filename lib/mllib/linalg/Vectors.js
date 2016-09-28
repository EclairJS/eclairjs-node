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
     *
     * @constructor
     * @memberof module:eclairjs/mllib/linalg
     */
    function Vectors() {
    }

    /**
     * Creates a dense vector from its values.
     * @param {number[] | number} value
     * @param {...number} Optional otherValues (if value is not an array)
     * @returns {module:eclairjs/mllib/linalg.Vector}
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


    /**
     * Creates a sparse vector providing its index array and value array.
     *
     * @param {integer} size  vector size.
     * @param {integer[]} indices  index array, must be strictly increasing.
     * @param {float[]} values  value array, must have the same length as indices.
     * @returns {module:eclairjs/mllib/linalg.Vector}
     */
    Vectors.sparse = function(size,indices,values) {
      var args ={
        target: Vectors,
        method: 'sparse',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: Vector
      };

      return Utils.generate(args);
    };

    Vectors.moduleLocation = '/mllib/linalg/Vectors';

    return Vectors;
  })();
};