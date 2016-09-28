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

    var Model = require('../Model')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Model from train validation split.
     *
     * @class
     * @extends module:eclairjs/ml.Model
     * @memberof module:eclairjs/ml/tuning
     */
    function TrainValidationSplitModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    TrainValidationSplitModel.prototype = Object.create(Model.prototype);

    TrainValidationSplitModel.prototype.constructor = TrainValidationSplitModel;

    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    TrainValidationSplitModel.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset');

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
    TrainValidationSplitModel.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType')();

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
     * @returns {module:eclairjs/ml/tuning.TrainValidationSplitModel}
     */
    TrainValidationSplitModel.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: TrainValidationSplitModel
      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter}
     */
    TrainValidationSplitModel.prototype.write = function() {
      var MLWriter = require('../../ml/util/MLWriter.js');
      var args ={
        target: this,
        method: 'write',
        returnType: MLWriter

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @returns {MLReader}
     */
    TrainValidationSplitModel.read = function() {
      var MLReader = require('../../ml/util/MLReader.js');
      var args ={
        target: TrainValidationSplitModel,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {TrainValidationSplitModel}
     */
    TrainValidationSplitModel.load = function(path) {
      var args ={
        target: TrainValidationSplitModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: TrainValidationSplitModel

      };

      return Utils.generate(args);
    };


    TrainValidationSplitModel.moduleLocation = '/ml/tuning/TrainValidationSplitModel';

    return TrainValidationSplitModel;
  })();
};