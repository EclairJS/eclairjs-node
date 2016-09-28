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
    var Estimator = require('../Estimator')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * `QuantileDiscretizer` takes a column with continuous features and outputs a column with binned
     * categorical features. The number of bins can be set using the `numBuckets` parameter.
     * The bin ranges are chosen using an approximate algorithm (see the documentation for
     * [[org.apache.spark.sql.DatasetStatFunctions.approxQuantile approxQuantile]]
     * for a detailed description). The precision of the approximation can be controlled with the
     * `relativeError` parameter. The lower and upper bin bounds will be `-Infinity` and `+Infinity`,
     * covering all real values.
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    function QuantileDiscretizer() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    QuantileDiscretizer.prototype = Object.create(Estimator.prototype);

    QuantileDiscretizer.prototype.constructor = QuantileDiscretizer;


    /**
     * @param {number} value
     * @returns {type}
     */
    QuantileDiscretizer.prototype.setRelativeError = function(value) {
      var args ={
        target: this,
        method: 'setRelativeError',
        args: Utils.wrapArguments(arguments),
        returnType: QuantileDiscretizer

      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.prototype.setNumBuckets = function(value) {
      var args = {
        target: this,
        method: 'setNumBuckets',
        args: Utils.wrapArguments(arguments),
        returnType: QuantileDiscretizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: QuantileDiscretizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: QuantileDiscretizer
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: QuantileDiscretizer
      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {StructType}
     */
    QuantileDiscretizer.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js')();
      var args ={
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Bucketizer}
     */
    QuantileDiscretizer.prototype.fit = function(dataset) {
      var Bucketizer = require('./Bucketizer.js')();
      var args ={
        target: this,
        method: 'fit',
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
     * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
     */
    QuantileDiscretizer.load = function(path) {
      var args = {
        target: QuantileDiscretizer,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: QuantileDiscretizer
      };

      return Utils.generate(args);
    };

    QuantileDiscretizer.moduleLocation = '/ml/feature/QuantileDiscretizer';

    return QuantileDiscretizer;
  })();
};