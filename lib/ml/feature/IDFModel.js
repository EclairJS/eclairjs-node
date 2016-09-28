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
     * Model fitted by {@link IDF}.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml/util.MLWritable
     */


    function IDFModel() {
      Utils.handleConstructor(this, arguments, gKernelP);

    }
    IDFModel.prototype = Object.create(Model.prototype);

    IDFModel.prototype.constructor = IDFModel;




    /**
     * @param {string} value
     * @returns {IDFModel}
     */
    IDFModel.prototype.setInputCol = function(value) {
      var args ={
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: IDFModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {IDFModel}
     */
    IDFModel.prototype.setOutputCol = function(value) {
      var args ={
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: IDFModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Dataset}
     */
    IDFModel.prototype.transform = function(dataset) {
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
    IDFModel.prototype.transformSchema = function(schema) {
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
     * @returns {IDFModel}
     */
    IDFModel.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: IDFModel

      };

      return Utils.generate(args);
    };


    /**
     *  Returns the IDF vector.
     * @returns {Vector}
     */
    IDFModel.prototype.idf = function() {
          var Vector = require('../../mllib.linalg/Vector.js')();

      var args ={
        target: this,
        method: 'idf',
        returnType: Vector

      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter}
     */
    IDFModel.prototype.write = function() {
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
    IDFModel.read = function() {
    throw "not implemented by ElairJS";
    //   var args ={
    //     target: IDFModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {IDFModel}
     */
    IDFModel.load = function(path) {
      var args ={
        target: IDFModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: IDFModel

      };

      return Utils.generate(args);
    };


    IDFModel.moduleLocation = '/ml/feature/IDFModel';

    return IDFModel;
  })();
};