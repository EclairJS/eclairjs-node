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

    var PipelineStage = require('../PipelineStage.js')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Class for indexing categorical feature columns in a dataset of {@link Vector}.
     *
     * This has 2 usage modes:
     *  - Automatically identify categorical features (default behavior)
     *     - This helps process a dataset of unknown vectors into a dataset with some continuous
     *       features and some categorical features. The choice between continuous and categorical
     *       is based upon a maxCategories parameter.
     *     - Set maxCategories to the maximum number of categorical any categorical feature should have.
     *     - E.g.: Feature 0 has unique values {-1.0, 0.0}, and feature 1 values {1.0, 3.0, 5.0}.
     *       If maxCategories = 2, then feature 0 will be declared categorical and use indices {0, 1},
     *       and feature 1 will be declared continuous.
     *  - Index all features, if all features are categorical
     *     - If maxCategories is set to be very large, then this will build an index of unique
     *       values for all features.
     *     - Warning: This can cause problems if features are continuous since this will collect ALL
     *       unique values to the driver.
     *     - E.g.: Feature 0 has unique values {-1.0, 0.0}, and feature 1 values {1.0, 3.0, 5.0}.
     *       If maxCategories >= 3, then both features will be declared categorical.
     *
     * This returns a model which can transform categorical features to use 0-based indices.
     *
     * Index stability:
     *  - This is not guaranteed to choose the same category index across multiple runs.
     *  - If a categorical feature includes value 0, then this is guaranteed to map value 0 to index 0.
     *    This maintains vector sparsity.
     *  - More stability may be added in the future.
     *
     * TODO: Future extensions: The following functionality is planned for the future:
     *  - Preserve metadata in transform; if a feature's metadata is already present, do not recompute.
     *  - Specify certain features to not index, either via a parameter or via existing metadata.
     *  - Add warning if a categorical feature has only 1 category.
     *  - Add option for allowing unknown categories.
     * @class
     * @extends module:eclairjs/ml.PipelineStage
     * @memberof module:eclairjs/ml/feature
     * @param {string} [uid]
     */
    function VectorIndexer() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    VectorIndexer.prototype = Object.create(PipelineStage.prototype);

    VectorIndexer.prototype.constructor = VectorIndexer;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    VectorIndexer.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.prototype.setMaxCategories = function(value) {
      var args = {
        target: this,
        method: 'setMaxCategories',
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexer
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexer
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexer
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.VectorIndexerModel}
     */
    VectorIndexer.prototype.fit = function(dataset) {
      var VectorIndexerModel = require('./VectorIndexerModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexerModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    VectorIndexer.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexer
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.VectorIndexer}
     */
    VectorIndexer.load = function(path) {
      var args = {
        target: VectorIndexerModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: VectorIndexer
      };

      return Utils.generate(args);
    };

    VectorIndexer.moduleLocation = '/ml/feature/VectorIndexer';

    return VectorIndexer;
  })();
};