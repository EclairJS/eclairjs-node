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
 */
function Matrix(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * @returns {??}
 */
Matrix.prototype.$init$ = function() {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.$init$();';
//
// return Utils.generateAssignment(this, ??, templateStr );
};


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
//
// var templateStr = '{{inRefId}}.numRows();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
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
//
// var templateStr = '{{inRefId}}.numCols();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};


/**
 * @returns {Promise.<number[]>}
 */
Matrix.prototype.toArray = function() {
  function _resolve(result, resolve, reject) {
    var returnValue=JSON.parse(result)
    resolve(returnValue);
  }

  var templateStr = 'JSON.stringify({{inRefId}}.toArray());';
  return Utils.generateResultPromise(this, templateStr, null, _resolve);
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
//
// var templateStr = '{{inRefId}}.apply({{i}},{{j}});';
// return Utils.generateResultPromise(this, templateStr  , {i : i,j : j}, _resolve);
};


/**
 * @returns {Matrix}
 */
Matrix.prototype.copy = function() {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.copy();';
//
// return Utils.generateAssignment(this, Matrix, templateStr );
};


/**
 * @returns {Matrix}
 */
Matrix.prototype.transpose = function() {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.transpose();';
//
// return Utils.generateAssignment(this, Matrix, templateStr );
};


/**
 * @param {DenseMatrix} y
 * @returns {DenseMatrix}
 */
Matrix.prototype.multiply0 = function(y) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.multiply({{y}});';
//
// return Utils.generateAssignment(this, DenseMatrix, templateStr , {y : y});
};


/**
 * @param {DenseVector} y
 * @returns {DenseVector}
 */
Matrix.prototype.multiply1 = function(y) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.multiply({{y}});';
//
// return Utils.generateAssignment(this, DenseVector, templateStr , {y : y});
};


/**
 * @param {Vector} y
 * @returns {DenseVector}
 */
Matrix.prototype.multiply2 = function(y) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.multiply({{y}});';
//
// return Utils.generateAssignment(this, DenseVector, templateStr , {y : y});
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
//
// var templateStr = '{{inRefId}}.toString({{maxLines}},{{maxLineWidth}});';
// return Utils.generateResultPromise(this, templateStr  , {maxLines : maxLines,maxLineWidth : maxLineWidth}, _resolve);
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
//
// var templateStr = '{{inRefId}}.numNonzeros();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
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
//
// var templateStr = '{{inRefId}}.numActives();';
// return Utils.generateResultPromise(this, templateStr  , _resolve);
};

module.exports = Matrix;