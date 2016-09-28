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
     * Reduction of Multiclass Classification to Binary Classification.
     * Performs reduction using one against all strategy.
     * For a multiclass classification with k classes, train k models (one per class).
     * Each example is scored against all k models and the model with highest score
     * is picked to label the example.
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml.Estimator
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function OneVsRest() {
      Utils.handleConstructor(this, arguments, gKernelP);
    };



    /**
     * @param {module:eclairjs/ml/classification.Classifier} value
     * @returns {type}
     */
    OneVsRest.prototype.setClassifier = function(value) {
      var args ={
        target: this,
        method: 'setClassifier',
        args: Utils.wrapArguments(arguments),
        returnType: OneVsRest

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type}
     */
    OneVsRest.prototype.setLabelCol = function(value) {
      var args ={
        target: this,
        method: 'setLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: OneVsRest

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type}
     */
    OneVsRest.prototype.setFeaturesCol = function(value) {
      var args ={
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: OneVsRest

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type}
     */
    OneVsRest.prototype.setPredictionCol = function(value) {
      var args ={
        target: this,
        method: 'setPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: OneVsRest

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {StructType}
     */
    OneVsRest.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js');
      var args ={
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {OneVsRestModel}
     */
    OneVsRest.prototype.fit = function(dataset) {
      var OneVsRestModel = require('../../ml/classification/OneVsRestModel.js')();
      var args ={
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: OneVsRestModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {OneVsRest}
     */
    OneVsRest.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: OneVsRest

      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter}
     */
    OneVsRest.prototype.write = function() {
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
    OneVsRest.read = function() {
      var MLReader = require('../../ml/util/MLReader.js');
      var args ={
        target: OneVsRest,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {OneVsRest}
     */
    OneVsRest.load = function(path) {
      var args ={
        target: OneVsRest,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: OneVsRest

      };

      return Utils.generate(args);
    };

    OneVsRest.moduleLocation = '/ml/classification/OneVsRest';


    return OneVsRest;
  })();
};