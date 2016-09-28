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
     * :: Experimental ::
     * Evaluator for binary classification, which expects two input columns: rawPrediction and label.
     * The rawPrediction column can be of type double (binary 0/1 prediction, or probability of label 1)
     * or of type vector (length-2 vector of raw predictions, scores, or label probabilities).
     * @class
     * @memberof module:eclairjs/ml/evaluation
     * @extends module:eclairjs/ml/evaluation.Evaluator
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function BinaryClassificationEvaluator() {
      Utils.handleConstructor(this, arguments, gKernelP);
    };



    /**
     * @returns {Promise.<string>}
     */
    BinaryClassificationEvaluator.prototype.getMetricName = function() {
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=result;
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'getMetricName',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type}
     */
    BinaryClassificationEvaluator.prototype.setMetricName = function(value) {
      var args ={
        target: this,
        method: 'setMetricName',
        args: Utils.wrapArguments(arguments),
        returnType: BinaryClassificationEvaluator

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type}
     */
    BinaryClassificationEvaluator.prototype.setRawPredictionCol = function(value) {
      var args ={
        target: this,
        method: 'setRawPredictionCol',
        args: Utils.wrapArguments(arguments),
        returnType: BinaryClassificationEvaluator

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type}
     */
    BinaryClassificationEvaluator.prototype.setLabelCol = function(value) {
      var args ={
        target: this,
        method: 'setLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: BinaryClassificationEvaluator

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Promise.<number>}
     */
    BinaryClassificationEvaluator.prototype.evaluate = function(dataset) {
    throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=parseInt(result);
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'evaluate',
    //     args: Utils.wrapArguments(arguments),
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<boolean>}
     */
    BinaryClassificationEvaluator.prototype.isLargerBetter = function() {
    throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=result === 'true';
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'isLargerBetter',
    //     resolver: _resolve,
    //     returnType: boolean
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {BinaryClassificationEvaluator}
     */
    BinaryClassificationEvaluator.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: BinaryClassificationEvaluator

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {BinaryClassificationEvaluator}
     */
    BinaryClassificationEvaluator.load = function(path) {
      var args ={
        target: BinaryClassificationEvaluator,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: BinaryClassificationEvaluator

      };

      return Utils.generate(args);
    };


    BinaryClassificationEvaluator.moduleLocation = '/ml/evaluation/BinaryClassificationEvaluator';

    return BinaryClassificationEvaluator;
  })();
};