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

    var gKernelP = kernelP;

    /**
     * @classdesc
     * A stage in a pipeline, either an Estimator or a Transformer.
     * @class
     * @memberof module:eclairjs/ml
     */
    function PipelineStage() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @abstract
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.PipelineStage}
     */
    PipelineStage.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: PipelineStage
      };

      return Utils.generate(args);
    };

    /***
     * Check transform validity and derive the output schema from the input schema.
     *
     * Typical implementation should first conduct verification on schema change and parameter
     * validity, including complex parameter interaction checks.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    PipelineStage.prototype.transformSchema = function(schema) {
      var StructType = require('../sql/types/StructType')();

      var args = {
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    PipelineStage.moduleLocation = '/ml/PipelineStage';

    return PipelineStage;
  })();
};