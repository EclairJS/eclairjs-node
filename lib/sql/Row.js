/*
 * Copyright 2015 IBM Corp.
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

var Utils = require('../utils.js');

/*
 * NOTE: the following have not been implemented as they do not make sense for JavaScript
 *
 * <K,V> java.util.Map<K,V>    getJavaMap(int i)
 * Returns the value at position i of array type as a Map.
 * <T> java.util.List<T>   getList(int i)
 * Returns the value at position i of array type as List.
 * <K,V> scala.collection.Map<K,V> getMap(int i)
 * Returns the value at position i of map type as a Scala Map.
 * <T> scala.collection.Seq<T> getSeq(int i)
 * Returns the value at position i of array type as a Scala Seq.
 * <T> scala.collection.immutable.Map<java.lang.String,T>  getValuesMap(scala.collection.Seq<java.lang.String> fieldNames)
 * Returns a Map(name -> value) for the requested fieldNames
 * scala.collection.Seq<java.lang.Object>  toSeq()
 * Return a Scala Seq representing the row.
 *
 * NOTE: the following are being ignored as they also don't make sense for JavaScript (see ./types/DataTypes.js)
 *
 * byte getByte(int i)
 * decimal getDecimal(int i)
 * long getLong(int i)
 * short getShort(int i)
 */

// Local resolve functions to parse results of various types
function _resolveBool(result, resolve, reject) {
  // parse stringified result here
  resolve(JSON.parse(result));
}

function _resolveFloat(result, resolve, reject) {
  resolve(parseFloat(result));
}

function _resolveInt(result, resolve, reject) {
  resolve(parseInt(result));
}

function _resolveObj(result, resolve, reject) {
  // have to parse if number or bool
  resolve(isFinite(result) ? new Number(result).valueOf() : isBool(result) ? JSON.parse(result) : result);
}

/**
 * @constructor
 * @memberof module:eclairjs/sql
 * @classdesc Represents one row of output from a relational operator. Allows both generic access by ordinal, which will incur boxing overhead for primitives, as well as native primitive access.
 * It is invalid to use the native primitive interface to retrieve a value that is null, instead a user must check isNullAt before attempting to retrieve a value that might be null.
 * To create a new Row, use RowFactory.create()
 */
function Row(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Returns true if there are any NULL values in this row.
 * @returns {boolean}
 */
Row.prototype.anyNull = function() {
  var args = {
    target: this,
    method: 'anyNull',
    returnType: Boolean
  };

  return Utils.generate(args);
};

function isBool (val) {
  return val === 'true' || val === 'false';
}

/**
 * Returns the value at position index.
 * @param index
 * @returns {object}
 */
Row.prototype.apply = function(index) {
  var args = {
    target: this,
    method: 'apply',
    args: Utils.wrapArguments(arguments),
    returnType: Object,
    resolver: _resolveObj
  };

  return Utils.generate(args);
};

/**
 * Make a copy of the current Row object
 * @returns {module:eclairjs/sql.Row}
 */
Row.prototype.copy = function() {
  var args = {
    target: this,
    method: 'copy',
    returnType: Row
  };

  return Utils.generate(args);
};

/**
 * compares object obj to this Row object
 * @param {object} obj
 * @returns {boolean}
 */
Row.prototype.equals = function(obj) {
  var args = {
    target: this,
    method: 'equals',
    args: Utils.wrapArguments(arguments),
    returnType: Boolean
  };

  return Utils.generate(args);
};

/**
 * Returns the index of a given field name.
 * @param {string} name
 * @returns {integer}
 */
Row.prototype.fieldIndex = function(name) {
  var args = {
    target: this,
    method: 'fieldIndex',
    args: Utils.wrapArguments(arguments),
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Returns the value at position index.
 * @param {integer} index
 * @returns {object}
 */
Row.prototype.get = function(index) {
  var args = {
    target: this,
    method: 'get',
    args: Utils.wrapArguments(arguments),
    returnType: Object,
    resolver: _resolveObj
  };

  return Utils.generate(args);
};

/**
 * Returns the value at position index as a primitive boolean.
 * @param {integer} index
 * @returns {boolean}
 */
Row.prototype.getBoolean = function(index) {
  var args = {
    target: this,
    method: 'getBoolean',
    args: Utils.wrapArguments(arguments),
    returnType: Boolean
  };

  return Utils.generate(args);
};

/**
 * Returns the value at position idex as a primitive byte.
 * @param {integer} index
 * @returns {byte}
 * @ignore
 */
/* Not applicable to JavaScript
Row.prototype.getByte = function(index) {

  throw {name:'NotImplementedException', message:'The method is not implemented for JavaScript'};
};
*/

/**
 * Returns the value at position index of type as Date.
 * @param {integer} index
 * @returns {module:eclairjs/sql.SqlDate}
 */
Row.prototype.getDate = function(index) {
  var SqlDate = require('./SqlDate.js')(this.kernelP);

  var args = {
    target: this,
    method: 'getDate',
    args: Utils.wrapArguments(arguments),
    returnType: SqlDate
  };

  return Utils.generate(args);
};

/**
 * Returns the value at position index of type as decimal.
 * @param {integer} index
 * @returns {decimal}
 * @ignore
 */
/* Not applicable to JavaScript
Row.prototype.getDecimal = function(index) {

  throw {name:'NotImplementedException', message:'The method is not implemented for JavaScript'};
};
*/

/**
 * Returns the value at position index of type as double.
 * @param {integer} index
 * @returns {double}
 */
Row.prototype.getDouble = function(index) {
  var args = {
    target: this,
    method: 'getDouble',
    args: Utils.wrapArguments(arguments),
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Returns the value at position index of type as float.
 * @param {integer} index
 * @returns {float}
 */
Row.prototype.getFloat = function(index) {
  var args = {
    target: this,
    method: 'getFloat',
    args: Utils.wrapArguments(arguments),
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Returns the value at position index of type as integer.
 * @param {integer} index
 * @returns {integer}
 */
Row.prototype.getInt = function(index) {
  var args = {
    target: this,
    method: 'getInt',
    args: Utils.wrapArguments(arguments),
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Returns the value at position index of type as long.
 * @param {integer} index
 * @returns {long}
 * @ignore
 */
/* Not applicable to JavaScript
Row.prototype.getLong = function(index) {

  throw {name:'NotImplementedException', message:'The method is not implemented for JavaScript'};
};
*/

/**
 * Returns the value at position index of type as short.
 * @param {integer} index
 * @returns {short}
 * @ignore
 */
/* Not applicable to JavaScript
Row.prototype.getShort = function(index) {

  throw {name:'NotImplementedException', message:'The method is not implemented for JavaScript'};
};
*/

/**
 * Returns the value at position index of type as String.
 * @param {integer} index
 * @returns {String}
 */
Row.prototype.getString = function(index) {
  var args = {
    target: this,
    method: 'getString',
    args: Utils.wrapArguments(arguments),
    returnType: String
  };

  return Utils.generate(args);
};

/**
 * Returns the value at position index of struct type as a Row object.
 * @param {integer} index
 * @returns {module:eclairjs/sql.Row}
 */
Row.prototype.getStruct = function(index) {
  var args = {
    target: this,
    method: 'getStruct',
    args: Utils.wrapArguments(arguments),
    returnType: Row
  };

  return Utils.generate(args);
};

/**
 * Returns the value at position index of date type as Date.
 * @param {integer} index
 * @returns {module:eclairjs/sql.SqlTimestamp}
 */
Row.prototype.getTimestamp = function(index) {
  var SqlTimestamp = require('./SqlTimestamp.js')(this.kernelP);

  var args = {
    target: this,
    method: 'getTimestamp',
    args: Utils.wrapArguments(arguments),
    returnType: SqlTimestamp
  };

  return Utils.generate(args);
};

/**
 * Returns hash code
 * @returns {int}
 */
Row.prototype.hashCode = function() {
  var args = {
    target: this,
    method: 'hashCode',
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Checks whether the value at position index is null.
 * @param {integer} index
 * @returns {boolean}
 */
Row.prototype.isNullAt = function(index) {
  var args = {
    target: this,
    method: 'isNullAt',
    args: Utils.wrapArguments(arguments),
    returnType: Boolean
  };

  return Utils.generate(args);
};

/**
 * Number of elements in the Row.
 * @returns {integer}
 */
Row.prototype.length = function() {
  var args = {
    target: this,
    method: 'length',
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Displays all elements of this traversable or iterator in a string using start, end, and separator strings.
 * @param {string} [separator]
 * @param {string} [start] start will be ignored if end parameter is not specified
 * @param {string} [end] Required if start specified
 * @returns {string}
 */
Row.prototype.mkString = function() {
  var args = {
    target: this,
    method: 'mkString',
    args: Utils.wrapArguments(arguments),
    returnType: String
  };

  return Utils.generate(args);
};

/**
 * Schema for the row.
 * @returns {module:eclairjs/sql/types.StructType}
 */
Row.prototype.schema = function() {
  var StructType = require('./types/StructType.js')(this.kernelP);

  var args = {
    target: this,
    method: 'schema',
    returnType: StructType
  };

  return Utils.generate(args);
};

/**
 * Number of elements in the Row.
 * @returns {integer}
 */
Row.prototype.size = function() {
  var args = {
    target: this,
    method: 'size',
    returnType: Number
  };

  return Utils.generate(args);
};

Row.moduleLocation = '/sql/Row';

module.exports = Row;