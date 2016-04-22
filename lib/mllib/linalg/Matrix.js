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

var Utils = require('../../utils.js');

/**
 * Trait for a local matrix.
 * @classdesc
 * @abstract
 * @class
 * @memberof module:eclairjs/mllib/linalg
 */
function Matrix(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * @returns {Promise.<number>}
 */
Matrix.prototype.numRows = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//   var args ={
//     target: this,
//     method: 'numRows',
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
Matrix.prototype.numCols = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//   var args ={
//     target: this,
//     method: 'numCols',
//     resolver: _resolve,
//     returnType: Number
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @returns {Promise.<number[]>}
 */
Matrix.prototype.toArray = function() {
  var args = {
    target: this,
    method: 'toArray',
    stringify: true,
    returnType: [Number]
  };

  return Utils.generate(args);
};


/**
 * @param {number} i
 * @param {number} j
 * @returns {Promise.<number>}
 */
Matrix.prototype.apply = function(i,j) {
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
//       { value: i, type: 'number' },
//       { value: j, type: 'number' }
//     ],
//     resolver: _resolve,
//     returnType: Number
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @returns {module:eclairjs/mllib/linalg.Matrix}
 */
Matrix.prototype.copy = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'copy',
//     returnType: Matrix
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @returns {module:eclairjs/mllib/linalg.Matrix}
 */
Matrix.prototype.transpose = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'transpose',
//     returnType: Matrix
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @param {DenseMatrix} y
 * @returns {DenseMatrix}
 */
Matrix.prototype.multiply0 = function(y) {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'multiply',
//     args: [
//       { value: y, type: 'DenseMatrix' }
//     ],
//     returnType: DenseMatrix
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @param {module:eclairjs/mllib/linalg.DenseVector} y
 * @returns {module:eclairjs/mllib/linalg.DenseVector}
 */
Matrix.prototype.multiply1 = function(y) {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'multiply',
//     args: [
//       { value: y, type: 'DenseVector' }
//     ],
//     returnType: DenseVector
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @param {module:eclairjs/mllib/linalg.Vector} y
 * @returns {module:eclairjs/mllib/linalg.DenseVector}
 */
Matrix.prototype.multiply2 = function(y) {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'multiply',
//     args: [
//       { value: y, type: 'Vector' }
//     ],
//     returnType: DenseVector
//
//   };
//
//   return Utils.generate(args);
};


/**
 * @param {number} [maxLines]
 * @param {number} [maxLineWidth]
 * @returns {Promise.<string>}
 */
Matrix.prototype.toString = function(maxLines,maxLineWidth) {
  throw "not implemented by ElairJS";
// // TODO: handle optional parms 'maxLines,maxLineWidth'
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//   var args ={
//     target: this,
//     method: 'toString',
//     args: [
//       { value: maxLines, type: 'number' ,  optional: true},
//       { value: maxLineWidth, type: 'number' ,  optional: true}
//     ],
//     resolver: _resolve,
//     returnType: String
//
//   };
//
//   return Utils.generate(args);
};


/**
 * Find the number of non-zero active values.
 * @returns {Promise.<number>}
 */
Matrix.prototype.numNonzeros = function() {
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
 * Find the number of values stored explicitly. These values can be zero as well.
 * @returns {Promise.<number>}
 */
Matrix.prototype.numActives = function() {
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

module.exports = Matrix;