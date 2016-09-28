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
     * :: Experimental ::
     * Model fitted by {@link RFormula}. Fitting is required to determine the factor levels of
     * formula terms.
     * @param resolvedFormula the fitted R formula.
     * @param pipelineModel the fitted feature model, including factor to index mappings.
     * @class
     * @memberof module:eclairjs/ml/feature
     */


    function RFormulaModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    RFormulaModel.prototype = Object.create(Model.prototype);

    RFormulaModel.prototype.constructor = RFormulaModel;



    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Dataset}
     */
    RFormulaModel.prototype.transform = function(dataset) {
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
    RFormulaModel.prototype.transformSchema = function(schema) {
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
     * @returns {RFormulaModel}
     */
    RFormulaModel.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: RFormulaModel

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string>}
     */
    RFormulaModel.prototype.toString = function() {
      var args ={
        target: this,
        method: 'toString',
        returnType: String

      };

      return Utils.generate(args);
    };



    /**
     * @returns {MLWriter}
     */
    RFormulaModel.prototype.write = function() {
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
    RFormulaModel.read = function() {
      var MLReader = require('../../ml/util/MLReader.js');
      var args ={
        target: RFormulaModel,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {RFormulaModel}
     */
    RFormulaModel.load = function(path) {
      var args ={
        target: RFormulaModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: RFormulaModel

      };

      return Utils.generate(args);
    };

    RFormulaModel.moduleLocation = '/ml/feature/RFormulaModel';

    return RFormulaModel;
  })();
};