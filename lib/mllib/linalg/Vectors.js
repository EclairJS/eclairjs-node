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

var Vector = require('./Vector.js');

var kernelP;

/**
 *
 * @constructor
 */
function Vectors() {
}

/**
 * Creates a dense vector from its values.
 * @param {number[] | number} value
 * @param {...number} Optional otherValues (if value is not an array)
 * @returns {Vector}
 */
Vectors.dense = function(value) {
  if (arguments.length == 1) {
    var templateStr = 'var {{refId}} = Vectors.dense([{{value}}]);';

    return Utils.evaluate(kernelP, Vector, templateStr, {value: value});
  } else {
    var templateStr = 'var {{refId}} = Vectors.dense({{value}}, {{otherValues}});';

    var otherValues = [];

    for (var i = 1; i < arguments.length; i++) {
      otherValues.push(arguments[i]);
    }

    return Utils.evaluate(kernelP, Vector, templateStr, {value: value, otherValues: Utils.prepForReplacement(otherValues, true)});
  }
};

/**
 * Creates a sparse vector providing its index array and value array.
 *
 * @param {number} size  vector size.
 * @param {number[]} indices  index array, must be strictly increasing.
 * @param {number[]} values  value array, must have the same length as indices.
 * @returns {Vector}
 */
Vectors.sparse0 = function(size,indices,values) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = Vectors.sparse({{size}},{{indices}},{{values}});';
//
// return Utils.generateAssignment(this, Vector, templateStr , {size : size,indices : indices,values : values});
};


/**
 * Creates a sparse vector using unordered (index, value) pairs.
 *
 * @param {number} size  vector size.
 * @param {Tuple2[]} elements  vector elements in (index, value) pairs.
 * @returns {Vector}
 */
Vectors.sparse1 = function(size,elements) {
  throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'elements'
//
// var templateStr = 'var {{refId}} = Vectors.sparse({{size}},{{elements}});';
//
// return Utils.generateAssignment(this, Vector, templateStr , {size : size,elements : elements});
};


/**
 * Creates a sparse vector using unordered (index, value) pairs in a Java friendly way.
 *
 * @param {number} size  vector size.
 * @param {JavaIterable} elements  vector elements in (index, value) pairs.
 * @returns {Vector}
 */
Vectors.sparse2 = function(size,elements) {
  throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'elements'
//
// var templateStr = 'var {{refId}} = Vectors.sparse({{size}},{{elements}});';
//
// return Utils.generateAssignment(this, Vector, templateStr , {size : size,elements : elements});
};


/**
 * Creates a vector of all zeros.
 *
 * @param {number} size  vector size
 * @returns {Vector}  a zero vector
 */
Vectors.zeros = function(size) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = Vectors.zeros({{size}});';
//
// return Utils.generateAssignment(this, Vector, templateStr , {size : size});
};


/**
 * Parses a string resulted from [[Vector.toString]] into a {@link Vector}.
 * @param {string} s
 * @returns {Vector}
 */
Vectors.parse = function(s) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = Vectors.parse({{s}});';
//
// return Utils.generateAssignment(this, Vector, templateStr , {s : s});
};


/**
 * Parses the JSON representation of a vector into a {@link Vector}.
 * @param {string} json
 * @returns {Vector}
 */
Vectors.fromJson = function(json) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = Vectors.fromJson({{json}});';
//
// return Utils.generateAssignment(this, Vector, templateStr , {json : json});
};


/**
 * Returns the p-norm of this vector.
 * @param {Vector} vector  input vector.
 * @param {number} p  norm.
 * @returns {Promise.<number>}  norm in L^p^ space.
 */
Vectors.norm = function(vector,p) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = 'Vectors.norm({{vector}},{{p}});';
// return Utils.generateResultPromise(this, templateStr  , {vector : vector,p : p}, _resolve);
};


/**
 * Returns the squared distance between two Vectors.
 * @param {Vector} v1  first Vector.
 * @param {Vector} v2  second Vector.
 * @returns {Promise.<number>}  squared distance between two Vectors.
 */
Vectors.sqdist = function(v1,v2) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=parseInt(result)
// 	resolve(returnValue);
// };
//
// var templateStr = 'Vectors.sqdist({{v1}},{{v2}});';
// return Utils.generateResultPromise(this, templateStr  , {v1 : v1,v2 : v2}, _resolve);
};

module.exports = function(kP) {
  kernelP = kP;

  return Vectors;
};