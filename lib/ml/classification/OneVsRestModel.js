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
     * Model produced by {@link OneVsRest}.
     * This stores the models resulting from training k binary classifiers: one for each class.
     * Each example is scored against all k models, and the model with the highest score
     * is picked to label the example.
     *
     * @param labelMetadata Metadata of label column if it exists, or Nominal attribute
     *                      representing the number of classes in training dataset otherwise.
     * @param models The binary classification models for the reduction.
     *               The i-th model is produced by testing the i-th class (taking label 1) vs the rest
     *               (taking label 0).
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml.Model
     */


    function OneVsRestModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    };



    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {StructType}
     */
    OneVsRestModel.prototype.transformSchema = function(schema) {
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
     * @returns {DataFrame}
     */
    OneVsRestModel.prototype.transform = function(dataset) {
      var DataFrame = require('../../sql/DataFrame.js');
      var args ={
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: DataFrame

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {OneVsRestModel}
     */
    OneVsRestModel.prototype.copy = function(extra) {
      var OneVsRestModel = require('../../ml/classification/OneVsRestModel.js');
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: OneVsRestModel

      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter}
     */
    OneVsRestModel.prototype.write = function() {
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
    OneVsRestModel.read = function() {
      var MLReader = require('../../ml/util/MLReader.js');
      var args ={
        target: OneVsRestModel,
        method: 'read',
        static: true,
        returnType: MLReader

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {OneVsRestModel}
     */
    OneVsRestModel.load = function(path) {
      var OneVsRestModel = require('../../ml/classification/OneVsRestModel.js');
      var args ={
        target: OneVsRestModel,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: OneVsRestModel

      };

      return Utils.generate(args);
    };


    OneVsRestModel.moduleLocation = '/ml/classification/OneVsRestModel';

    return OneVsRestModel;
  })();
};