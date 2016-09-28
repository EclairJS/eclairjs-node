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

    var gKernelP = kernelP;

    /**
     * @classdesc
     * A feature transformer that takes the 1D discrete cosine transform of a real vector. No zero
     * padding is performed on the input vector.
     * It returns a real vector of the same length representing the DCT. The return vector is scaled
     * such that the transform matrix is unitary (aka scaled DCT-II).
     *
     * More information on [[https://en.wikipedia.org/wiki/Discrete_cosine_transform#DCT-II Wikipedia]].
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @constructor
     */
    function DCT() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Indicates whether to perform the inverse DCT (true) or forward DCT (false).
     * Default: false
     * @returns {Promise.<BooleanParam>}
     */
    DCT.prototype.inverse = function() {
      var args = {
        target: this,
        method: 'inverse',
        args: Utils.wrapArguments(arguments),
        returnType: DCT
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.prototype.setInverse = function(value) {
      var args = {
        target: this,
        method: 'setInverse',
        args: Utils.wrapArguments(arguments),
        returnType: DCT
      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<boolean>}
     */
    DCT.prototype.getInverse = function() {
      var args = {
        target: this,
        method: 'getInverse',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    DCT.prototype.uid = function() {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    DCT.prototype.transform = function(dataset) {
      var DataFrame = require('../../sql/DataFrame.js');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: DataFrame
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    DCT.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: DCT
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: DCT
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: DCT
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.DCT}
     */
    DCT.load = function(path) {
      var args = {
        target: DCT,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: DCT
      };

      return Utils.generate(args);
    };

    DCT.moduleLocation = '/ml/feature/DCT';

    return DCT;
  })();
};