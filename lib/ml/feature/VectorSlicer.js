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
     * This class takes a feature vector and outputs a new feature vector with a subarray of the
     * original features.
     *
     * The subset of features can be specified with either indices ([[setIndices()]])
     * or names ([[setNames()]]).  At least one feature must be selected. Duplicate features
     * are not allowed, so there can be no overlap between selected indices and names.
     *
     * The output vector will order features with the selected indices first (in the order given),
     * followed by the selected names (in the order given).
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @constructor
     */
    function VectorSlicer() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }



    /**
     * @returns {Promise.<number[]>}
     */
    VectorSlicer.prototype.getIndices = function() {
    throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=JSON.parse(result);
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'getIndices',
    //     stringify: true,
    //     resolver: _resolve,
    //     returnType: [Int]
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {number[]} value
     * @returns {VectorSlicer}
     */
    VectorSlicer.prototype.setIndices = function(value) {
      var args ={
        target: this,
        method: 'setIndices',
        args: Utils.wrapArguments(arguments),
        returnType: VectorSlicer

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string[]>}
     */
    VectorSlicer.prototype.getNames = function() {
    throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=JSON.parse(result);
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'getNames',
    //     stringify: true,
    //     resolver: _resolve,
    //     returnType: [String]
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string[]} value
     * @returns {VectorSlicer}
     */
    VectorSlicer.prototype.setNames = function(value) {
      var args ={
        target: this,
        method: 'setNames',
        args: Utils.wrapArguments(arguments),
        returnType: VectorSlicer

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {VectorSlicer}
     */
    VectorSlicer.prototype.setInputCol = function(value) {
      var args ={
        target: this,
        method: 'setInputCol',
        args: Utils.wrapArguments(arguments),
        returnType: VectorSlicer

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {VectorSlicer}
     */
    VectorSlicer.prototype.setOutputCol = function(value) {
      var args ={
        target: this,
        method: 'setOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: VectorSlicer

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Dataset}
     */
    VectorSlicer.prototype.transform = function(dataset) {
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
    VectorSlicer.prototype.transformSchema = function(schema) {
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
     * @returns {VectorSlicer}
     */
    VectorSlicer.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: VectorSlicer

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {VectorSlicer}
     */
    VectorSlicer.load = function(path) {
      var args ={
        target: VectorSlicer,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        returnType: VectorSlicer

      };

      return Utils.generate(args);
    };

    VectorSlicer.moduleLocation = '/ml/feature/VectorSlicer';

    return VectorSlicer;
  })();
};