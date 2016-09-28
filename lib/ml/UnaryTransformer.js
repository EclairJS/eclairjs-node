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
    var Utils = require('../utils.js');

    var Transformer = require('./Transformer')();

    /**
     * @classdesc
     * Abstract class for transformers that take one input column, apply transformation, and output the
     * result as a new column.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.Transformer
     */
    function UnaryTransformer() {
      Utils.handleAbstractConstructor(this, arguments);
    }

    UnaryTransformer.prototype = Object.create(Transformer.prototype);

    UnaryTransformer.prototype.constructor = UnaryTransformer;

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.UnaryTransformer}
     */
    UnaryTransformer.prototype.setInputCol = function(value) {
      var args = {
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {module:eclairjs/ml.UnaryTransformer}
     */
    UnaryTransformer.prototype.setOutputCol = function(value) {
      var args = {
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    UnaryTransformer.prototype.transformSchema = function(schema) {
      var StructType = require('../sql/types/StructType')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/sql.DataFrame} dataset
     * @returns {module:eclairjs/sql.DataFrame}
     */
    UnaryTransformer.prototype.transform = function(dataset) {
      var DataFrame = require('../sql/DataFrame');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: DataFrame
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.UnaryTransformer}
     */
    UnaryTransformer.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    return UnaryTransformer;
  })();
};