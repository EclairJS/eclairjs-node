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

var gKernelP

/**
 * @constructor
 * @memberof module:eclairjs/sql
 * @classdesc A column in a DataFrame.
 * @param {string} column name of the column
 */
function Column() {
  Utils.handleConstructor(this, arguments, gKernelP);
}

/**
 * Gives the column an alias. Same as as.
 * @param {string} alias
 * @returns {module:eclairjs/sql.Column}
 * @example
 * // Renames colA to colB in select output.
 * df.select(df.col("colA").alias("colB"))
 */
Column.prototype.alias = function(alias) {
  var args = {
    target: this,
    method: 'alias',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Boolean AND.
 * @param {module:eclairjs/sql.Column} other
 * @returns {module:eclairjs/sql.Column}
 * @example
 * people.select( people.col("inSchool").and(people.col("isEmployed")));
 */
Column.prototype.and = function(other) {
  var args = {
    target: this,
    method: 'and',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);;
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
 * @returns {module:eclairjs/sql.Column}
 * @private
 */
Column.prototype.apply = function(extraction) {
  var args = {
    target: this,
    method: 'apply',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Gives the column an alias.
 * @param {string | string[]} aliases, if array of strings assigns the given aliases to the results of a table generating function.
 * @param {module:eclairjs/sql/types.Metadata} [metadata] not valid with string array
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.as = function(aliases, metadata) {
  var args = {
    target: this,
    method: 'as',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Returns an ordering used in sorting.
 * @returns {module:eclairjs/sql.Column}
 * @example
 * df.sort(df.col("age").asc());
 */
Column.prototype.asc = function() {
  var args = {
    target: this,
    method: 'asc',
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * True if the current column is between the lower bound and upper bound, inclusive.
 * @param {object} lowerBound
 * @param {object} upperBound
 * @returns {module:eclairjs/sql.Column}
 * @example
 * var col = new Column("age");
 * var testCol = col.between(10, 29);
 * var results = peopleDataFrame.select(testCol);
 */
Column.prototype.between = function(lowerBound, upperBound) {
  var args = {
    target: this,
    method: 'between',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Compute bitwise AND of this expression with another expression.
 * @example
 *   df.select(df.col("colA").bitwiseAND(df.col("colB")));
 *
 * @param {module:eclairjs/sql.Column} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.bitwiseAND = function(other) {
  var args = {
    target: this,
    method: 'bitwiseAND',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Compute bitwise OR of this expression with another expression.
 * @example
 *   df.select(df.col("colA").bitwiseOR(df.col("colB")));
 *
 * @param {module:eclairjs/sql.Column} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.bitwiseOR = function(other) {
  var args = {
    target: this,
    method: 'bitwiseOR',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Compute bitwise XOR of this expression with another expression.
 * @example
 *   df.select(df.col("colA").bitwiseXOR(df.col("colB")));
 *
 * @param {module:eclairjs/sql.Column} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.bitwiseXOR = function(other) {
  var args = {
    target: this,
    method: 'bitwiseXOR',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
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
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.cast = function(to) {
  var args = {
    target: this,
    method: 'cast',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Contains the other element.
 *
 * @param {object}
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.contains = function(other) {
  var args = {
    target: this,
    method: 'contains',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Returns an ordering used in sorting.
 * @returns {module:eclairjs/sql.Column}
 * @example
 * df.sort(df.col("age").desc());
 */
Column.prototype.desc = function() {
  var args = {
    target: this,
    method: 'desc',
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Division this expression by another expression.
 * @example
 *   people.select( people.col("height").divide(people.col("weight")) );
 *
 * @param {module:eclairjs/sql.Column} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.divide = function(other) {
  var args = {
    target: this,
    method: 'divide',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * String ends with.
 * with another string literal
 * @param {string | Column} other, if string ends with another string literal.
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.endsWith = function(other) {
  var args = {
    target: this,
    method: 'endsWith',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Equality test that is safe for null values.
 *
 * @param {object} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.eqNullSafe = function(other) {
  var args = {
    target: this,
    method: 'eqNullSafe',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Equality test
 * @param {object}
 * @returns {boolean}
 */
Column.prototype.equals = function(that) {
  var args = {
    target: this,
    method: 'equals',
    args: Utils.wrapArguments(arguments),
    returnType: Boolean
  };

  return Utils.generate(args)
};

/**
 * Equality test
 * @param {object}
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.equalTo = function(other) {
  var args = {
    target: this,
    method: 'equalTo',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Prints the expression to the console for debugging purpose.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Column.prototype.explain = function(extended) {
  var args = {
    target: this,
    method: 'explain',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Greater than or equal to an expression.
 * @example
 * people.select( people.col("age").geq(21) )
 * @param {object}
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.geq = function(other) {
  var args = {
    target: this,
    method: 'geq',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * An expression that gets a field by name in a {@link StructType}.
 *
 * @param {string} fieldName
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.getField = function(fieldName) {
  var args = {
    target: this,
    method: 'getField',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * An expression that gets an item at position `ordinal` out of an array,
 * or gets a value by key `key` in a {@link MapType}.
 *
 * @param {object} key
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.getItem = function(key) {
  var args = {
    target: this,
    method: 'getItem',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Greater than.
 * @example
 *   people.select( people.col("age").gt(21) );
 * @param {object}
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.gt = function(other) {
  var args = {
    target: this,
    method: 'gt',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * @returns {Promise.<Integer>} A Promise that resolves to the hashcode.
 */
Column.prototype.hashCode = function() {
  var args = {
    target: this,
    method: 'hashCode',
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * A boolean expression that is evaluated to true if the value of this expression is contained
 * by the evaluated values of the arguments.
 * @example
 * var col = peopleDataFrame.col("age");
 * var testCol = col.in([20, 19]);
 * var results = peopleDataFrame.select(testCol);
 *
 * @param {array}
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.in = function(list) {
  var args = {
    target: this,
    method: 'in',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * A boolean expression that is evaluated to true if the value of this expression is contained
 * by the evaluated values of the arguments.
 *
 * @param {array}
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.isin = function(list) {
  var args = {
    target: this,
    method: 'isin',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * True if the current expression is NaN.
 *
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.isNaN = function() {
  var args = {
    target: this,
    method: 'isNaN',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * True if the current expression is null.
 *
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.isNull = function() {
  var args = {
    target: this,
    method: 'isNull',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * True if the current expression is NOT null.
 *
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.isNotNull = function() {
  var args = {
    target: this,
    method: 'isNotNull',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Less than or equal to.
 * @example
 *   people.select( people.col("age").leq(21) );
 *
 * @param {object} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.leq = function(other) {
  var args = {
    target: this,
    method: 'leq',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * SQL like expression.
 *
 * @param {string} literal
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.like = function(literal) {
  var args = {
    target: this,
    method: 'like',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Less than.
 * @example
 *   people.select( people.col("age").lt(21) );
 *
 * @param {object} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.lt = function(other) {
  var args = {
    target: this,
    method: 'lt',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Subtraction. Subtract the other expression from this expression.
 * @example
 *   people.select( people.col("height").minus(people.col("weight")) );
 *
 * @param {module:eclairjs/sql.Column} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.minus = function(other) {
  var args = {
    target: this,
    method: 'minus',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Modulo (a.k.a. remainder) expression.
 *
 * @param {object} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.mod = function(other) {
  var args = {
    target: this,
    method: 'mod',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Multiplication of this expression and another expression.
 * @example
 *   people.select( people.col("height").multiply(people.col("weight")) );
 *
 * @param {module:eclairjs/sql.Column} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.multiply = function(other) {
  var args = {
    target: this,
    method: 'multiply',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Inequality test.
 * @example
 *   df.filter( df.col("colA").notEqual(df.col("colB")) );
 *
 * @param {module:eclairjs/sql.Column} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.notEqual = function(other) {
  var args = {
    target: this,
    method: 'notEqual',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Boolean OR.
 * @example
 *   people.filter( people.col("inSchool").or(people.col("isEmployed")) );
 *
 * @param {module:eclairjs/sql.Column} other
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.or = function(other) {
  var args = {
    target: this,
    method: 'or',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Evaluates a list of conditions and returns one of multiple possible result expressions.
 * If otherwise is not defined at the end, null is returned for unmatched conditions.
 *
 * @example
 *   people.select(functions.when(people.col("gender").equalTo("male"), 0)
 *     .when(people.col("gender").equalTo("female"), 1)
 *     .otherwise(2))
 *
 * @param {object} value
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.otherwise = function(value) {
  var args = {
    target: this,
    method: 'otherwise',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

Column.prototype.toString = function() {
  var args = {
    target: this,
    method: 'toString',
    returnType: String
  };

  return Utils.generate(args);
};

/**
 * Evaluates a list of conditions and returns one of multiple possible result expressions.
 * If otherwise is not defined at the end, null is returned for unmatched conditions.
 *
 * @example
 *   people.select(functions.when(people.col("gender").equalTo("male"), 0)
 *     .when(people.col("gender").equalTo("female"), 1)
 *     .otherwise(2))
 *
 * @returns {module:eclairjs/sql.Column}
 */
Column.prototype.when = function(condition,value) {
  var args = {
    target: this,
    method: 'when',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

Column.moduleLocation = '/sql/Column';

module.exports = Column;