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
 * Represents a numeric vector, whose index type is Int and value type is Double.
 *
 * Note: Users should not implement this interface.
 * @classdesc
 * @constructor
 * @abstract
 * @memberof module:eclairjs/mllib/linalg
 */
function Vector(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Size of the vector.
 * @returns {Promise.<number>}
 */
Vector.prototype.size = function() {
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
 * Converts the instance to a double array.
 * @returns {Promise.<number[]>}
 */
Vector.prototype.toArray = function() {
  var args = {
    target: this,
    method: 'toArray',
    stringify: true,
    returnType: [Number]
  };

  return Utils.generate(args);
};


/**
 * @param {object} other
 * @returns {Promise.<boolean>}
 */
Vector.prototype.equals = function(other) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result === 'true'
// 	resolve(returnValue);
// };
//   var args ={
//     target: this,
//     method: 'equals',
//     args: [
//       { value: other, type: 'object' }
//     ],
//     resolver: _resolve,
//     returnType: boolean
//
//   };
//
//   return Utils.generate(args);
};


/**
 * Returns a hash code value for the vector. The hash code is based on its size and its first 128
 * nonzero entries, using a hash algorithm similar to {@link hashCode}.
 * @returns {Promise.<number>}
 */
Vector.prototype.hashCode = function() {
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
 * Gets the value of the ith element.
 * @param {number} i  index
 * @returns {Promise.<number>}
 */
Vector.prototype.apply = function(i) {
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
 * Makes a deep copy of this vector.
 * @returns {module:eclairjs/mllib/linalg.Vector}
 */
Vector.prototype.copy = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'copy',
//     returnType: Vector
//
//   };
//
//   return Utils.generate(args);
};


/**
 * Applies a function `f` to all the active elements of dense and sparse vector.
 *
 * @param {func} f  the function takes two parameters where the first parameter is the index of
 *          the vector with type `Int`, and the second parameter is the corresponding value
 *          with type `Double`.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Vector.prototype.foreachActive = function(f) {
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
 * Number of active entries.  An "active entry" is an element which is explicitly stored,
 * regardless of its value.  Note that inactive entries have value 0.
 * @returns {Promise.<number>}
 */
Vector.prototype.numActives = function() {
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
 * Number of nonzero elements. This scans all active values and count nonzeros.
 * @returns {Promise.<number>}
 */
Vector.prototype.numNonzeros = function() {
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
 * Converts this vector to a sparse vector with all explicit zeros removed.
 * @returns {SparseVector}
 */
Vector.prototype.toSparse = function() {
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
 * Converts this vector to a dense vector.
 * @returns {module:eclairjs/mllib/linalg.DenseVector}
 */
Vector.prototype.toDense = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'toDense',
//     returnType: DenseVector
//
//   };
//
//   return Utils.generate(args);
};


/**
 * Returns a vector in either dense or sparse format, whichever uses less storage.
 * @returns {module:eclairjs/mllib/linalg.Vector}
 */
Vector.prototype.compressed = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this,
//     method: 'compressed',
//     returnType: Vector
//
//   };
//
//   return Utils.generate(args);
};


/**
 * Find the index of a maximal element.  Returns the first maximal element in case of a tie.
 * Returns -1 if vector has length 0.
 * @returns {Promise.<number>}
 */
Vector.prototype.argmax = function() {
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
 * Converts the vector to a JSON string.
 * @returns {Promise.<string>}
 */
Vector.prototype.toJSON = function() {
  var args = {
    target: this,
    method: 'toJSON',
    stringify: true,
    returnType: String
  };

  return Utils.generate(args);
};

Vector.moduleLocation = '/mllib/linalg/Vector';

module.exports = Vector;