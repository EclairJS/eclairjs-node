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
     * A dense vector represented by a value array.
     * @classdesc
     */

    /**
     * @param {number[]} values
     * @class
     * @memberof module:eclairjs/mllib/linalg
     * @extends Vector
     */
    function DenseVector() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @returns {Promise.<number>}
     */
    DenseVector.prototype.size = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'size',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string>}
     */
    DenseVector.prototype.toString = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=result
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'toString',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<number[]>}
     */
    DenseVector.prototype.toArray = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=JSON.parse(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'toArray',
    //     stringify: true,
    //     resolver: _resolve,
    //     returnType: [Double]
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {number} i
     * @returns {Promise.<number>}
     */
    DenseVector.prototype.apply = function(i) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'apply',
    //     args: [
    //       { value: i, type: 'number' }
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {module:eclairjs/mllib/linalg.DenseVector}
     */
    DenseVector.prototype.copy = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'copy',
    //     returnType: DenseVector
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {func} f
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    DenseVector.prototype.foreachActive = function(f) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'foreachActive',
    //     args: [
    //       { value: f, type: 'func' }
    //     ],
    //     returnType: null
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<number>}
     */
    DenseVector.prototype.hashCode = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'hashCode',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<number>}
     */
    DenseVector.prototype.numActives = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'numActives',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<number>}
     */
    DenseVector.prototype.numNonzeros = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'numNonzeros',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {SparseVector}
     */
    DenseVector.prototype.toSparse = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'toSparse',
    //     returnType: SparseVector
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<number>}
     */
    DenseVector.prototype.argmax = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'argmax',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string>}
     */
    DenseVector.prototype.toJson = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=result
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'toJson',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    DenseVector.moduleLocation = '/mllib/linalg/DenseVector';

    return DenseVector;
  })();
};