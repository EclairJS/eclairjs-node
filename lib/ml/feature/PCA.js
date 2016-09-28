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
     * PCA trains a model to project vectors to a lower dimensional space of the top [[PCA!.k]]
     * principal components.
     *
     * @class
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     * @constructor
     */
    function PCA(kernelP, refIdP, uid) {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.PCA}
     */
    PCA.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: PCA
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/mllib/feature.PCA}
     */
    PCA.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: PCA
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/mllib/feature.PCA}
     */
    PCA.prototype.setK = function(value) {
      var args = {
        target: this,
        method: 'setK',
        args: Utils.wrapArguments(arguments),
        returnType: PCA
      };

      return Utils.generate(args);
    };

    /**
     * Computes a {@link PCAModel} that contains the principal components of the input vectors.
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/mllib/feature.PCAModel}
     */
    PCA.prototype.fit = function(dataset) {
      var PCAModel = require('./PCAModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: PCAModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    PCA.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/mllib/feature.PCA}
     */
    PCA.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: PCA
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.PCA}
     */
    PCA.load = function(path) {
      var args = {
        target: PCA,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: PCA
      };

      return Utils.generate(args);
    };

    PCA.moduleLocation = '/ml/feature/PCA';

    return PCA;
  })();
};