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
     * `Bucketizer` maps a column of continuous features to a column of feature buckets.
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @constructor
     */
    function Bucketizer() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @returns {Promise.<number[]>}
     */
    Bucketizer.prototype.getSplits = function() {
      var args = {
        target: this,
        method: 'getSplits',
        returnType: [Number]
      };

      return Utils.generate(args);
    };


    /**
     * @param {number[]} value
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.prototype.setSplits = function(value) {
      var args = {
        target: this,
        method: 'setSplits',
        args: Utils.wrapArguments(arguments),
        returnType: Bucketizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: Bucketizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: Bucketizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    Bucketizer.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset.js');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Bucketizer.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: Bucketizer
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.Bucketizer}
     */
    Bucketizer.load = function(path) {
      var args = {
        target: Bucketizer,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: Bucketizer
      };

      return Utils.generate(args);
    };

    Bucketizer.moduleLocation = '/ml/feature/Bucketizer';

    return Bucketizer;
  })();
};