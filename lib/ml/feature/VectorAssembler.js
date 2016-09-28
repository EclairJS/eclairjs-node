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
     * A feature transformer that merges multiple columns into a vector column.
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function VectorAssembler(kernelP, refIdP, uid) {
      Utils.handleConstructor(this, arguments, gKernelP);
    }



    /**
     * @param {string[]} value
     * @returns {VectorAssembler}
     */
    VectorAssembler.prototype.setInputCols = function(value) {
      var args ={
        target: this,
        method: 'setInputCols',
        args: Utils.wrapArguments(arguments),
        returnType: VectorAssembler

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {VectorAssembler}
     */
    VectorAssembler.prototype.setOutputCol = function(value) {
      var args ={
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: VectorAssembler

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Dataset}
     */
    VectorAssembler.prototype.transform = function(dataset) {

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
    VectorAssembler.prototype.transformSchema = function(schema) {

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
     * @returns {VectorAssembler}
     */
    VectorAssembler.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: VectorAssembler

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {VectorAssembler}
     */
    VectorAssembler.load = function(path) {
      var args ={
        target: VectorAssembler,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: VectorAssembler

      };

      return Utils.generate(args);
    };

    VectorAssembler.moduleLocation = '/ml/feature/VectorAssembler';

    return VectorAssembler;
  })();
};