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
    var Estimator = require('../Estimator.js');

    var gKernelP = kernelP;


    /**
     * @classdesc
     * Compute the Inverse Document Frequency (IDF) given a collection of documents.
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function IDF() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }
    IDF.prototype = Object.create(Estimator.prototype);

    IDF.prototype.constructor = IDF;





    /**
     * @param {string} value
     * @returns {IDF}
     */
    IDF.prototype.setInputCol = function(value) {
      var args ={
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: IDF

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {IDF}
     */
    IDF.prototype.setOutputCol = function(value) {
      var args ={
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: IDF

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {IDF}
     */
    IDF.prototype.setMinDocFreq = function(value) {
      var args ={
        target: this,
        method: 'setMinDocFreq',
        args: Utils.wrapArguments(arguments),
        returnType: IDF

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {IDFModel}
     */
    IDF.prototype.fit = function(dataset) {
      var IDFModel = require('./IDFModel.js')();

      var args ={
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: IDFModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    IDF.prototype.transformSchema = function(schema) {
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
     * @returns {IDF}
     */
    IDF.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: IDF

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {IDF}
     */
    IDF.load = function(path) {
      var args ={
        target: IDF,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: IDF

      };

      return Utils.generate(args);
    };


    IDF.moduleLocation = '/ml/feature/IDF';

    return IDF;
  })();
};