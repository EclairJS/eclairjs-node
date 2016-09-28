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
  return (function() {    var Utils = require('../../utils.js');

    var Estimator = require('../Estimator')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * K-means clustering with support for k-means|| initialization proposed by Bahmani et al.
     *
     * @see [Bahmani et al., Scalable k-means++.]{@link http://dx.doi.org/10.14778/2180912.2180915}
     * @class
     * @extends module:eclairjs/ml.Estimator
     * @memberof module:eclairjs/ml/clustering
     * @param {string} [uid]
     */
    function KMeans() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    KMeans.prototype = Object.create(Estimator.prototype);

    KMeans.prototype.constructor = KMeans;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    KMeans.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setFeaturesCol = function(value) {
      var args = {
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setPredictionCol = function(value) {
      var args = {
        target: this,
        method: 'setPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setK = function(value) {
      var args = {
        target: this,
        method: 'setK',
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setInitMode = function(value) {
      var args = {
        target: this,
        method: 'setInitMode',
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setInitSteps = function(value) {
      var args = {
        target: this,
        method: 'setInitSteps',
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setMaxIter = function(value) {
      var args = {
        target: this,
        method: 'setMaxIter',
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setTol = function(value) {
      var args = {
        target: this,
        method: 'setTol',
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/mllib/clustering.KMeansModel}
     */
    KMeans.prototype.fit = function(dataset) {
      var KMeansModel = require('./KMeansModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: KMeansModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    KMeans.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/clustering.KMeans}
     */
    KMeans.load = function(path) {
      var args = {
        target: KMeans,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: KMeans
      };

      return Utils.generate(args);
    };

    KMeans.moduleLocation = '/ml/clustering/KMeans';

    return KMeans;
  })();
};