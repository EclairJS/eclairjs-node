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
     * A simple pipeline, which acts as an estimator. A Pipeline consists of a sequence of stages, each
     * of which is either an {@link module:eclairjs/ml.Estimator} or a {@link module:eclairjs/ml.Transformer}.
     * When {@link module:eclairjs/ml.Pipeline#fit} is called, the
     * stages are executed in order. If a stage is an {@link module:eclairjs/ml.Estimator}, its {@link module:eclairjs/ml.Estimator#fit} method will
     * be called on the input dataset to fit a model. Then the model, which is a transformer, will be
     * used to transform the dataset as the input to the next stage. If a stage is a {@link Transformer},
     * its {@link module:eclairjs/ml.Transformer#transform} method will be called to produce the dataset for the next stage.
     * The fitted model from a {@link Pipeline} is an {@link module:eclairjs/ml.PipelineModel}, which consists of fitted models and
     * transformers, corresponding to the pipeline stages. If there are no stages, the pipeline acts as
     * an identity transformer.
     * @class
     * @memberof module:eclairjs/ml
     * @param {string} [uid]
     */
    function Pipeline() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {module:eclairjs/ml.PipelineStage[]} value
     * @returns {module:eclairjs/ml.Pipeline}
     */
    Pipeline.prototype.setStages = function(value) {
      var args = {
        target: this,
        method: 'setStages',
        args: Utils.wrapArguments(arguments),
        returnType: Pipeline
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<PipelineStage[]>}
     */
    Pipeline.prototype.getStages = function() {
      var PipelineStage = require('./PipelineStage')();

      var args = {
        target: this,
        method: 'setStages',
        args: Utils.wrapArguments(arguments),
        returnType: [PipelineStage]
      };

      return Utils.generate(args);
    };

    /**
     * Fits the pipeline to the input dataset with additional parameters. If a stage is an
     * {@link Estimator}, its [[Estimator#fit]] method will be called on the input dataset to fit a model.
     * Then the model, which is a transformer, will be used to transform the dataset as the input to
     * the next stage. If a stage is a {@link Transformer}, its [[Transformer#transform]] method will be
     * called to produce the dataset for the next stage. The fitted model from a {@link Pipeline} is an
     * {@link PipelineModel}, which consists of fitted models and transformers, corresponding to the
     * pipeline stages. If there are no stages, the output model acts as an identity transformer.
     *
     * @param {module:eclairjs/sql.Dataset} dataset  input dataset
     * @returns {module:eclairjs/ml.PipelineModel}  fitted pipeline
     */
    Pipeline.prototype.fit = function(dataset) {
      var PipelineModel = require('./PipelineModel')();

      var args = {
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: PipelineModel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml.Pipeline}
     */
    Pipeline.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: Pipeline
      };

      return Utils.generate(args);
    };

    /**
     * Derives the output schema from the input schema.
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Pipeline
    Pipeline.prototype.transformSchema = function(schema) {
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
     * @returns {MLWriter}
     */
    Pipeline.prototype.write = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'write',
    //     returnType: MLWriter
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @returns {MLReader}
     */
    Pipeline.read = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: Pipeline,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml.Pipeline}
     */
    Pipeline.load = function(path) {
      var args = {
        target: Pipeline,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: Pipeline
      };

      return Utils.generate(args);
    };

    Pipeline.moduleLocation = '/ml/Pipeline';

    return Pipeline;
  })();
};