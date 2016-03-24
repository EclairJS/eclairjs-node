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
 *
 * @constructor
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
//
// var templateStr = '{{inRefId}}.size();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Converts the instance to a double array.
 * @returns {Promise.<number[]>}
 */
Vector.prototype.toArray = function() {
  function _resolve(result, resolve, reject) {
    var returnValue=JSON.parse(result)
    resolve(returnValue);
  }

  var templateStr = 'JSON.stringify({{inRefId}}.toArray());';
  return Utils.generateResultPromise(this, templateStr, null, _resolve);
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
//
// var templateStr = '{{inRefId}}.equals({{other}});';
// return Utils.generateResultPromise(this, templateStr  , {other : other}, _resolve);
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
//
// var templateStr = '{{inRefId}}.hashCode();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
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
//
// var templateStr = '{{inRefId}}.apply({{i}});';
// return Utils.generateResultPromise(this, templateStr  , {i : i}, _resolve);
};


/**
 * Makes a deep copy of this vector.
 * @returns {Vector}
 */
Vector.prototype.copy = function() {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.copy();';
//
// return Utils.generateAssignment(this, Vector, templateStr );
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
//
// var templateStr = '{{inRefId}}.foreachActive({{f}});';
// return Utils.generateVoidPromise(this, templateStr , {f : f});
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
//
// var templateStr = '{{inRefId}}.numActives();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
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
//
// var templateStr = '{{inRefId}}.numNonzeros();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Converts this vector to a sparse vector with all explicit zeros removed.
 * @returns {SparseVector}
 */
Vector.prototype.toSparse = function() {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.toSparse();';
//
// return Utils.generateAssignment(this, SparseVector, templateStr );
};


/**
 * Converts this vector to a dense vector.
 * @returns {DenseVector}
 */
Vector.prototype.toDense = function() {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.toDense();';
//
// return Utils.generateAssignment(this, DenseVector, templateStr );
};


/**
 * Returns a vector in either dense or sparse format, whichever uses less storage.
 * @returns {Vector}
 */
Vector.prototype.compressed = function() {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.compressed();';
//
// return Utils.generateAssignment(this, Vector, templateStr );
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
//
// var templateStr = '{{inRefId}}.argmax();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * Converts the vector to a JSON string.
 * @returns {Promise.<string>}
 */
Vector.prototype.toJson = function() {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = '{{inRefId}}.toJson();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


Vector.prototype.toString = function() {
  var templateStr = '{{inRefId}}.toString();';

  return Utils.generateResultPromise(this, templateStr);
};


module.exports = Vector;