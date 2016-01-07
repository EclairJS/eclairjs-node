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

/**
 *
 * @constructor
 * @classdesc A column in a DataFrame.
 */
function Column(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Gives the column an alias. Same as as.
 * @param {string} alias
 * @returns {Column}
 * @example
 * // Renames colA to colB in select output.
 * df.select(df.col("colA").alias("colB"))
 */
Column.prototype.alias = function(alias) {
  var templateStr = 'var {{refId}} = {{inRefId}}.alias("{{alias}}");';

  return Utils.generateAssignment(this, Column, templateStr, {alias: alias});
};

/**
 * Boolean AND.
 * @param {Column} other
 * @returns {Column}
 * @example
 * people.select( people.col("inSchool").and(people.col("isEmployed")));
 */
Column.prototype.and = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.and({{other}});';

  return Utils.generateAssignment(this, Column, templateStr, {other: other.refIdP});
};

/**
 * Extracts a value or values from a complex type.
 * The following types of extraction are supported:
 * - Given an Array, an integer ordinal can be used to retrieve a single value.
 * - Given a Map, a key of the correct type can be used to retrieve an individual value.
 * - Given a Struct, a string fieldName can be used to extract that field.
 * - Given an Array of Structs, a string fieldName can be used to extract filed
 *   of every struct in that array, and return an Array of fields
 * @param {string}
 * @returns {Column}
 * @private
 */
Column.prototype.apply = function(extraction) {
  throw "not implemented by ElairJS";
};

/**
 * Gives the column an alias.
 * @param {string | string[]} aliases, if array of strings assigns the given aliases to the results of a table generating function.
 * @param {Metadata} metadata Optional, not valid with string array
 * @returns {Column}
 */
Column.prototype.as = function(aliases, metadata) {
  var templateStr = !metadata || Array.isArray(aliases) ? 'var {{refId}} = {{inRefId}}.as({{aliases}});' : 'var {{refId}} = {{inRefId}}.as({{aliases}}, {{metadata}});';

  var asAliases;

  if (Array.isArray(aliases)) {
    asAliases = [];

    aliases.forEach(function(alias) {
      asAliases.push('"' + alias + '"');
    });

    asAliases = '['+asAliases.join(',')+']';
  } else {
    asAliases = '"' + asAliases + '"';
  }

  return Utils.generateAssignment(this, Column, templateStr, {aliases: asAliases, metadata: metadata ? metadata.toJSON() : ''});
};

/**
 * Returns an ordering used in sorting.
 * @returns {Column}
 * @example
 * df.sort(df.col("age").asc());
 */
Column.prototype.asc = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.asc();';

  return Utils.generateAssignment(this, Column, templateStr);
};

/**
 * True if the current column is between the lower bound and upper bound, inclusive.
 * @param {object} lowerBound
 * @param {object} upperBound
 * @returns {Column}
 * @example
 * var col = new Column("age");
 * var testCol = col.between(10, 29);
 * var results = peopleDataFrame.select(testCol);
 */
Column.prototype.between = function(lowerBound, upperBound) {
  var templateStr = 'var {{refId}} = {{inRefId}}.between({{lowerBound}}, {{upperBound}});';

  return Utils.generateAssignment(this, Column, templateStr, {lowerBound: Utils.prepForReplacement(lowerBound),
    upperBound: Utils.prepForReplacement(upperBound)});
};

/**
 * Compute bitwise AND of this expression with another expression.
 * @example
 *   df.select(df.col("colA").bitwiseAND(df.col("colB")));
 *
 * @param {Column} other
 * @returns {Column}
 */
Column.prototype.bitwiseAND = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.bitwiseAND({{other}});';

  return Utils.generateAssignment(this, Column, templateStr, {other: Utils.prepForReplacement(other)});
};

/**
 * Compute bitwise OR of this expression with another expression.
 * @example
 *   df.select(df.col("colA").bitwiseOR(df.col("colB")));
 *
 * @param {Column} other
 * @returns {Column}
 */
Column.prototype.bitwiseOR = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.bitwiseOR({{other}});';

  return Utils.generateAssignment(this, Column, templateStr, {other: Utils.prepForReplacement(other)});
};

/**
 * Compute bitwise XOR of this expression with another expression.
 * @example
 *   df.select(df.col("colA").bitwiseXOR(df.col("colB")));
 *
 * @param {Column} other
 * @returns {Column}
 */
Column.prototype.bitwiseXOR = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.bitwiseXOR({{other}});';

  return Utils.generateAssignment(this, Column, templateStr, {other: Utils.prepForReplacement(other)});
};

/**
 * Casts the column to a different data type.
 * @example
 *   // Casts colA to IntegerType.
 *   df.select(df("colA").cast(DataTypes.IntegerType))
 *
 *   // equivalent to
 *   df.select(df.col("colA").cast("int"))
 *
 * @param {DataType | string} to If string supported types are: `string`, `boolean`, `int`,
 * `float`, `double`, `date`, `timestamp`.
 * @returns {Column}
 */
Column.prototype.cast = function(to) {
  var templateStr = 'var {{refId}} = {{inRefId}}.cast({{to}});';

  // If its a Datatypes.*, we don't want " around the value
  var toStr = to.indexOf('org.apache.spark.sql.types.DataTypes') == 0 ? to : '"' + to + '"';

  return Utils.generateAssignment(this, Column, templateStr, {to: toStr});
};

/**
 * Contains the other element.
 *
 * @param {object}
 * @returns {Column}
 */
Column.prototype.contains = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.contains({{other}});';

  return Utils.generateAssignment(this, Column, templateStr, {other: Utils.prepForReplacement(other)});
};

/**
 * Returns an ordering used in sorting.
 * @returns {Column}
 * @example
 * df.sort(df.col("age").desc());
 */
Column.prototype.desc = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.desc();';

  return Utils.generateAssignment(this, Column, templateStr);
};

/**
 * Division this expression by another expression.
 * @example
 *   people.select( people.col("height").divide(people.col("weight")) );
 *
 * @param {Column} other
 * @returns {Column}
 */
Column.prototype.divide = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.divide({{other}});';

  return Utils.generateAssignment(this, Column, templateStr, {other: Utils.prepForReplacement(other)});
};

/**
 * String ends with.
 * with another string literal
 * @param {string | Column} other, if string ends with another string literal.
 * @returns {Column}
 */
Column.prototype.endsWith = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.endsWith({{other}});';

  return Utils.generateAssignment(this, Column, templateStr, {other: Utils.prepForReplacement(other)});
};

/**
 * Equality test that is safe for null values.
 *
 * @param {object} other
 * @returns {Column}
 */
Column.prototype.eqNullSafe = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.eqNullSafe({{other}});';

  return Utils.generateAssignment(this, Column, templateStr, {other: Utils.prepForReplacement(other)});
};

/**
 * Equality test
 * @param {object}
 * @returns {boolean}
 */
Column.prototype.equals = function(that) {
  function _resolve(result, resolve, reject) {
    resolve(result === 'true');
  }

  var templateStr = '{{inRefId}}.equals({{that}});';

  return Utils.generateResultPromise(this, templateStr, {that: Utils.prepForReplacement(that)}, _resolve);
};

/**
 * Equality test
 * @param {object}
 * @returns {Column}
 */
Column.prototype.equalTo = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.equalTo({{other}});';

  return Utils.generateAssignment(this, Column, templateStr, {other: Utils.prepForReplacement(other)});
};








Column.prototype.toString = function() {
  var templateStr = '{{inRefId}}.toString();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 * Equality test
 * @param {object}
 * @returns {Column}
 */
Column.prototype.equalTo = function(obj) {
  var templateStr = typeof obj == 'object' ? 'var {{refId}} = {{inRefId}}.equalTo({{arg}});' : 'var {{refId}} = {{inRefId}}.equalTo("{{arg}}");';

  var arg;

  if (typeof obj == 'object') {
    arg = obj.refIdP;
  } else {
    arg = obj;
  }

  return Utils.generateAssignment(this, Column, templateStr, {arg: arg});
};

/**
 * Greater than.
 * @param {object}
 * @returns {Column}
 */
Column.prototype.gt = function(obj) {
  var templateStr = typeof obj == 'object' ? 'var {{refId}} = {{inRefId}}.gt({{arg}});' : 'var {{refId}} = {{inRefId}}.gt("{{arg}}");';

  var arg;

  if (typeof obj == 'object') {
    arg = obj.refIdP;
  } else {
    arg = obj;
  }

  return Utils.generateAssignment(this, Column, templateStr, {arg: arg});
};

module.exports = Column;
