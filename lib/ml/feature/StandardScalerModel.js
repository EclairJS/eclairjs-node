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
    var Model = require('../Model.js');

    var gKernelP = kernelP;


    /**
     * @classdesc
     * Model fitted by {@link StandardScaler}.
     *
     * @param std Standard deviation of the StandardScalerModel
     * @param mean Mean of the StandardScalerModel
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml/util.MLWritable
     */


    function StandardScalerModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    StandardScalerModel.prototype = Object.create(Model.prototype);

    StandardScalerModel.prototype.constructor = StandardScalerModel;



    /**
     * @param {string} value
     * @returns {StandardScalerModel}
     */
    StandardScalerModel.prototype.setInputCol = function(value) {
      var args ={
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StandardScalerModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {StandardScalerModel}
     */
    StandardScalerModel.prototype.setOutputCol = function(value) {
      var args ={
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: StandardScalerModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Dataset}
     */
    StandardScalerModel.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset.js');

      var args ={
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset

      };

      return Utils.generate(args);
    };


    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    StandardScalerModel.prototype.transformSchema = function(schema) {
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
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {StandardScalerModel}
     */
    StandardScalerModel.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: StandardScalerModel

      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter}
     */
    StandardScalerModel.prototype.write = function() {
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
    StandardScalerModel.read = function() {
    throw "not implemented by ElairJS";
    //   var args ={
    //     target: StandardScalerModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {StandardScalerModel}
     */
    StandardScalerModel.load = function(path) {
      var args ={
        target: StandardScalerModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: StandardScalerModel

      };

      return Utils.generate(args);
    };

    StandardScalerModel.moduleLocation = '/ml/feature/StandardScalerModel';

    return StandardScalerModel;
  })();
};