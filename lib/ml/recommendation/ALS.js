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
     * Alternating Least Squares (ALS) matrix factorization.
     *
     * ALS attempts to estimate the ratings matrix `R` as the product of two lower-rank matrices,
     * `X` and `Y`, i.e. `X * Yt = R`. Typically these approximations are called 'factor' matrices.
     * The general approach is iterative. During each iteration, one of the factor matrices is held
     * constant, while the other is solved for using least squares. The newly-solved factor matrix is
     * then held constant while solving for the other factor matrix.
     *
     * This is a blocked implementation of the ALS factorization algorithm that groups the two sets
     * of factors (referred to as "users" and "products") into blocks and reduces communication by only
     * sending one copy of each user vector to each product block on each iteration, and only for the
     * product blocks that need that user's feature vector. This is achieved by pre-computing some
     * information about the ratings matrix to determine the "out-links" of each user (which blocks of
     * products it will contribute to) and "in-link" information for each product (which of the feature
     * vectors it receives from each user block it will depend on). This allows us to send only an
     * array of feature vectors between each user block and product block, and have the product block
     * find the users' ratings and update the products based on these messages.
     *
     * For implicit preference data, the algorithm used is based on
     * "Collaborative Filtering for Implicit Feedback Datasets", available at
     * [[http://dx.doi.org/10.1109/ICDM.2008.22]], adapted for the blocked approach used here.
     *
     * Essentially instead of finding the low-rank approximations to the rating matrix `R`,
     * this finds the approximations for a preference matrix `P` where the elements of `P` are 1 if
     * r 0 and 0 if r <= 0. The ratings then act as 'confidence' values related to strength of
     * indicated user
     * preferences rather than explicit ratings given to items.
     * @class
     * @memberof module:eclairjs/ml/recommendation
     */

    /**
     * @param {string} uid
     * @constructor
     */
    function ALS() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setRank = function(value) {
      var args = {
        target: this,
        method: 'setRank',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setNumUserBlocks = function(value) {
      var args = {
        target: this,
        method: 'setNumUserBlocks',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setNumItemBlocks = function(value) {
      var args = {
        target: this,
        method: 'setNumItemBlocks',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setImplicitPrefs = function(value) {
      var args = {
        target: this,
        method: 'setImplicitPrefs',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setAlpha = function(value) {
      var args = {
        target: this,
        method: 'setAlpha',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setUserCol = function(value) {
      var args = {
        target: this,
        method: 'setUserCol',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setItemCol = function(value) {
      var args = {
        target: this,
        method: 'setItemCol',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setRatingCol = function(value) {
      var args = {
        target: this,
        method: 'setRatingCol',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setPredictionCol = function(value) {
      var args = {
        target: this,
        method: 'setPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setMaxIter = function(value) {
      var args = {
        target: this,
        method: 'setMaxIter',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setRegParam = function(value) {
      var args = {
        target: this,
        method: 'setRegParam',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {boolean} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setNonnegative = function(value) {
      var args = {
        target: this,
        method: 'setNonnegative',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setCheckpointInterval = function(value) {
      var args = {
        target: this,
        method: 'setCheckpointInterval',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setSeed = function(value) {
      var args = {
        target: this,
        method: 'setSeed',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * Sets both numUserBlocks and numItemBlocks to the specific value.
     * @param {number} value
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.setNumBlocks = function(value) {
      var args = {
        target: this,
        method: 'setNumBlocks',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {type}
     */
    ALS.prototype.setIntermediateStorageLevel = function(value) {
      var args ={
        target: this,
        method: 'setIntermediateStorageLevel',
        args: Utils.wrapArguments(arguments),
        returnType: ALS

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type}
     */
    ALS.prototype.setFinalStorageLevel = function(value) {
      var args ={
        target: this,
        method: 'setFinalStorageLevel',
        args: Utils.wrapArguments(arguments),
        returnType: ALS

      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/recommendation.ALSModel}
     */
    ALS.prototype.fit = function(dataset) {
      var ALSModel = require('./ALSModel')();
      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: ALSModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    ALS.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/recommendation.ALS}
     */
    ALS.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: ALS
      };

      return Utils.generate(args);
    };

    ALS.moduleLocation = '/ml/recommendation/ALS';

    return ALS;
  })();
};