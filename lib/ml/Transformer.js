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

    var PipelineStage = require('./PipelineStage')();

    /**
     * @classdesc
     * Abstract class for transformers that transform one dataset into another.
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.PipelineStage
     */
    function Transformer() {
      Utils.handleAbstractConstructor(this, arguments);
    }

    Transformer.prototype = Object.create(PipelineStage.prototype);

    Transformer.prototype.constructor = Transformer;

    /**
     * Transforms the dataset with optional parameters
     * @param {module:eclairjs/sql.Dataset} dataset  input dataset
     * @param {module:eclairjs/ml/param.ParamMap | module:eclairjs/ml/param.ParamPair} [params] additional parameters, overwrite embedded params, overwrite embedded params
     * @param {...module:eclairjs/ml/param.ParamPair} [otherParamPairs]  other param pairs, Only used if argument two is {@link module:eclairjs/ml/param.ParamPair}. Overwrite embedded params
     * @returns {module:eclairjs/sql.Dataset}  transformed dataset
     */
    Transformer.prototype.transform = function() {
      var Dataset = require('../sql/Dataset');

      var args = {
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.Transformer}
     */
    Transformer.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    return Transformer;
  })();
};