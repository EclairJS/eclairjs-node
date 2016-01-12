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

var Utils = require('../utils.js');

var Column = require('./Column.js');
var DataFrame = require('./DataFrame.js');

var kernelP;

/**
 * @constructor
 * @classdesc Spark SQL functions.
 */
function SQLFunctions() {
}

/**
 * Returns a {@link Column} based on the given column name.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {string} colName
 * @returns {Column}
 */
SQLFunctions.col = function(colName) {
  var templateStr = 'var {{refId}} = functions.col({{colName}});';

  return Utils.evaluate(kernelP, Column, templateStr, {colName: Utils.prepForReplacement(colName)});
};

/**
 * Returns a [[Column]] based on the given column name. Alias of {@link col}.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {string} colName
 * @returns {Column}
 */
SQLFunctions.column = function(colName) {
  var templateStr = 'var {{refId}} = functions.column({{colName}});';

  return Utils.evaluate(kernelP, Column, templateStr, {colName: Utils.prepForReplacement(colName)});
};

/**
 * Creates a {@link Column} of literal value.
 *
 * The passed in object is returned directly if it is already a {@link Column}.
 * Otherwise, a new {@link Column} is created to represent the literal value.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {object} literal
 * @returns {Column}
 */
SQLFunctions.lit = function(literal) {
  var templateStr = 'var {{refId}} = functions.lit({{literal}});';

  return Utils.evaluate(kernelP, Column, templateStr, {literal: Utils.prepForReplacement(literal)});
};

/**
 * Returns a sort expression based on ascending order of the column.
 * @example
 *   // Sort by dept in ascending order, and then age in descending order.
 *   df.sort(functions.asc("dept"), functions.desc("age"))
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {string} columnName
 * @returns {Column}
 */
SQLFunctions.asc = function(columnName) {
  var templateStr = 'var {{refId}} = functions.asc({{columnName}});';

  return Utils.evaluate(kernelP, Column, templateStr, {columnName: Utils.prepForReplacement(columnName)});
};

/**
 * Returns a sort expression based on the descending order of the column.
 * @example
 *   // Sort by dept in ascending order, and then age in descending order.
 *   df.sort(functions.asc("dept"), functions.desc("age"))
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {string} columnName
 * @returns {Column}
 */
SQLFunctions.desc = function(columnName) {
  var templateStr = 'var {{refId}} = functions.desc({{columnName}});';

  return Utils.evaluate(kernelP, Column, templateStr, {columnName: Utils.prepForReplacement(columnName)});
};

/**
 * Aggregate function: returns the approximate number of distinct items in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @param {float} rsd Optional
 * @returns {Column}
 */
SQLFunctions.approxCountDistinct = function(column, rsd) {
  var templateStr = rsd ? 'var {{refId}} = functions.approxCountDistinct({{column}}, {{rsd}});': 'var {{refId}} = functions.approxCountDistinct({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), rsd: rsd});
};

/**
 * Aggregate function: returns the average of the values in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column}
 */
SQLFunctions.avg = function(column) {
  var templateStr = 'var {{refId}} = functions.avg({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Aggregate function: returns the number of items in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column}
 */
SQLFunctions.count = function(column) {
  var templateStr = 'var {{refId}} = functions.count({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Aggregate function: returns the number of distinct items in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column}
 */
SQLFunctions.countDistinct  = function() {
  var args = Array.prototype.slice.call(arguments);

  var countDistinctArgs = [];

  if (args && Array.isArray(args)) {
    args.forEach(function(arg) {
      countDistinctArgs.push(Utils.prepForReplacement(arg));
    });
  }

  var templateStr = 'var {{refId}} = functions.countDistinct({{args}});';

  return Utils.evaluate(kernelP, Column, templateStr, {args: countDistinctArgs});
};

/**
 * Aggregate function: returns the first value in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column}
 */
SQLFunctions.first = function(column) {
  var templateStr = 'var {{refId}} = functions.first({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Aggregate function: returns the last value in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column}
 */
SQLFunctions.last = function(column) {
  var templateStr = 'var {{refId}} = functions.last({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Aggregate function: returns the maximum value of the expression in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column}
 */
SQLFunctions.max = function(column) {
  var templateStr = 'var {{refId}} = functions.max({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Aggregate function: returns the average of the values in a group.
 * Alias for avg.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column}
 */
SQLFunctions.mean = function(column) {
  var templateStr = 'var {{refId}} = functions.mean({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Aggregate function: returns the minimum value of the expression in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column}
 */
SQLFunctions.min = function(column) {
  var templateStr = 'var {{refId}} = functions.min({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Aggregate function: returns the sum of all values in the expression.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column}
 */
SQLFunctions.sum = function(column) {
  var templateStr = 'var {{refId}} = functions.sum({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Aggregate function: returns the sum of distinct values in the expression.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column}
 */
SQLFunctions.sumDistinct = function(column) {
  var templateStr = 'var {{refId}} = functions.sumDistinct({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Window function: returns the cumulative distribution of values within a window partition,
 * i.e. the fraction of rows that are below the current row.
 *
 * @example
 *   N = total number of rows in the partition
 *   cumeDist(x) = number of values before (and including) x / N
 *
 *
 *
 * This is equivalent to the CUME_DIST function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column}
 */
SQLFunctions.cumeDist = function() {
  var templateStr = 'var {{refId}} = functions.cumeDist();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Window function: returns the rank of rows within a window partition, without any gaps.
 *
 * The difference between rank and denseRank is that denseRank leaves no gaps in ranking
 * sequence when there are ties. That is, if you were ranking a competition using denseRank
 * and had three people tie for second place, you would say that all three were in second
 * place and that the next person came in third.
 *
 * This is equivalent to the DENSE_RANK function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column}
 */
SQLFunctions.denseRank = function() {
  var templateStr = 'var {{refId}} = functions.denseRank();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Window function: returns the value that is `offset` rows before the current row, and
 * `null` or defaultValue if there is less than `offset` rows before the current row. For example,
 * an `offset` of one will return the previous row at any given point in the window partition.
 *
 * This is equivalent to the LAG function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} column
 * @param {integer} offset
 * @param {object} defaultValue
 * @returns {Column}
 */
SQLFunctions.lag = function(column, offset, defaultValue) {
  var templateStr = defaultValue ? 'var {{refId}} = functions.lag({{column}}, {{offset}}, {{defaultValue}});': 'var {{refId}} = functions.lag({{column}}, {{offset}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), offset: offset, defaultValue: defaultValue ? Utils.prepForReplacement(defaultValue) : null});
};

/**
 * Window function: returns the value that is `offset` rows after the current row, and
 * `null` or defaultValue if there is less than `offset` rows after the current row. For example,
 * an `offset` of one will return the next row at any given point in the window partition.
 *
 * This is equivalent to the LEAD function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} column
 * @param {integer} offset
 * @param {object} defaultValue
 * @returns {Column}
 */
SQLFunctions.lead = function(column, offset, defaultValue) {
  var templateStr = defaultValue ? 'var {{refId}} = functions.lead({{column}}, {{offset}}, {{defaultValue}});': 'var {{refId}} = functions.lag({{column}}, {{offset}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), offset: offset, defaultValue: defaultValue ? Utils.prepForReplacement(defaultValue) : null});
};

/**
 * Window function: returns the ntile group id (from 1 to `n` inclusive) in an ordered window
 * partition. Fow example, if `n` is 4, the first quarter of the rows will get value 1, the second
 * quarter will get 2, the third quarter will get 3, and the last quarter will get 4.
 *
 * This is equivalent to the NTILE function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {integer} n
 * @returns {Column}
 */
SQLFunctions.ntile = function(n) {
  var templateStr = 'var {{refId}} = functions.ntile({{n}});';

  return Utils.evaluate(kernelP, Column, templateStr, {n: n});
};

/**
 * Window function: returns the relative rank (i.e. percentile) of rows within a window partition.
 *
 * This is computed by:
 * @example
 *   (rank of row in its partition - 1) / (number of rows in the partition - 1)
 *
 * This is equivalent to the PERCENT_RANK function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column}
 */
SQLFunctions.percentRank = function() {
  var templateStr = 'var {{refId}} = functions.percentRank();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Window function: returns the rank of rows within a window partition.
 *
 * The difference between rank and denseRank is that denseRank leaves no gaps in ranking
 * sequence when there are ties. That is, if you were ranking a competition using denseRank
 * and had three people tie for second place, you would say that all three were in second
 * place and that the next person came in third.
 *
 * This is equivalent to the RANK function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column}
 */
SQLFunctions.rank = function() {
  var templateStr = 'var {{refId}} = functions.rank();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Window function: returns a sequential number starting at 1 within a window partition.
 *
 * This is equivalent to the ROW_NUMBER function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column}
 */
SQLFunctions.rowNumber = function() {
  var templateStr = 'var {{refId}} = functions.rowNumber();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Computes the absolute value.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.abs = function(column) {
  var templateStr = 'var {{refId}} = functions.abs({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Creates a new array column. The input columns must all have the same data type.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column}
 */
SQLFunctions.array = function() {
  var args = Array.prototype.slice.call(arguments);

  var arrayArgs = [];

  if (args && Array.isArray(args)) {
    args.forEach(function(arg) {
      arrayArgs.push(Utils.prepForReplacement(arg));
    });
  }

  var templateStr = 'var {{refId}} = functions.array({{args}});';

  return Utils.evaluate(kernelP, Column, templateStr, {args: arrayArgs});
};

/**
 * Marks a DataFrame as small enough for use in broadcast joins.
 *
 * The following example marks the right DataFrame for broadcast hash join using `joinKey`.
 * @example
 *   // left and right are DataFrames
 *   left.join(broadcast(right), "joinKey")
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {DataFrame} df
 * @returns {DataFrame}
 */
SQLFunctions.broadcast = function(df) {
  var templateStr = 'var {{refId}} = functions.broadcast({{df}});';

  return Utils.evaluate(kernelP, DataFrame, templateStr, {df: Utils.prepForReplacement(df)});
};

/**
 * Returns the first column that is not null, or null if all inputs are null.
 *
 * For example, `coalesce(a, b, c)` will return a if a is not null,
 * or b if a is null and b is not null, or c if both a and b are null but c is not null.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} column, ...column
 * @returns {Column}
 */
SQLFunctions.coalesce = function() {
  var args = Array.prototype.slice.call(arguments);

  var coalesceArgs = [];

  if (args && Array.isArray(args)) {
    args.forEach(function(arg) {
      coalesceArgs.push(Utils.prepForReplacement(arg));
    });
  }

  var templateStr = 'var {{refId}} = functions.coalesce({{args}});';

  return Utils.evaluate(kernelP, Column, templateStr, {args: coalesceArgs});
};

/**
 * Creates a string column for the file name of the current Spark task.
 *
 * @returns {Column}
 */
SQLFunctions.inputFileName = function() {
  var templateStr = 'var {{refId}} = functions.inputFileName();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Return true iff the column is NaN.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.isNaN = function(column) {
  var templateStr = 'var {{refId}} = functions.isNaN({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * A column expression that generates monotonically increasing 64-bit integers.
 *
 * The generated ID is guaranteed to be monotonically increasing and unique, but not consecutive.
 * The current implementation puts the partition ID in the upper 31 bits, and the record number
 * within each partition in the lower 33 bits. The assumption is that the data frame has
 * less than 1 billion partitions, and each partition has less than 8 billion records.
 *
 * As an example, consider a {@link DataFrame} with two partitions, each with 3 records.
 * This expression would return the following IDs:
 * 0, 1, 2, 8589934592 (1L << 33), 8589934593, 8589934594.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column}
 */
SQLFunctions.monotonicallyIncreasingId = function() {
  var templateStr = 'var {{refId}} = functions.monotonicallyIncreasingId();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Returns col1 if it is not NaN, or col2 if col1 is NaN.
 *
 * Both inputs should be floating point columns (DoubleType or FloatType).
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} col1
 * @param {Column} col2
 * @returns {Column}
 */
SQLFunctions.nanvl = function(col1, col2) {
  var templateStr = 'var {{refId}} = functions.nanvl({{col1}}, {{col2}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col1: Utils.prepForReplacement(col1), col2: Utils.prepForReplacement(col2)});
};

/**
 * Unary minus, i.e. negate the expression.
 * @example
 *   df.select(functions.negate(df.col("amount")) );
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.negate = function(column) {
  var templateStr = 'var {{refId}} = functions.negate({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Inversion of boolean expression, i.e. NOT.
 * @example
 *   df.filter( functions.not(df.col("isActive")) );
 *
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} e
 * @returns {Column}
 */
SQLFunctions.not = function(column) {
  var templateStr = 'var {{refId}} = functions.not({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Generate a random column with i.i.d. samples from U[0.0, 1.0].
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {integer} seed Optional
 * @returns {Column}
 */
SQLFunctions.rand = function(seed) {
  var templateStr = seed ? 'var {{refId}} = functions.rand({{seed}});': 'var {{refId}} = functions.rand();';

  return Utils.evaluate(kernelP, Column, templateStr, {seed: seed});
};

/**
 * Generate a column with i.i.d. samples from the standard normal distribution.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {integer} seed Optional
 * @returns {Column}
 */
SQLFunctions.randn = function(seed) {
  var templateStr = seed ? 'var {{refId}} = functions.randn({{seed}});': 'var {{refId}} = functions.randn();';

  return Utils.evaluate(kernelP, Column, templateStr, {seed: seed});
};

/**
 * Partition ID of the Spark task.
 *
 * Note that this is indeterministic because it depends on data partitioning and task scheduling.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column}
 */
SQLFunctions.sparkPartitionId = function() {
  var templateStr = 'var {{refId}} = functions.sparkPartitionId();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Computes the square root of the specified float value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.sqrt = function(col) {
  var templateStr = 'var {{refId}} = functions.sqrt({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Creates a new struct column.
 * If the input column is a column in a {@link DataFrame}, or a derived column expression
 * that is named (i.e. aliased), its name would be remained as the StructField's name,
 * otherwise, the newly generated StructField's name would be auto generated as col${index + 1},
 * i.e. col1, col2, col3, ...
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column}
 */
SQLFunctions.struct = function() {
  var args = Array.prototype.slice.call(arguments);

  var structArgs = [];

  if (args && Array.isArray(args)) {
    args.forEach(function(arg) {
      structArgs.push(Utils.prepForReplacement(arg));
    });
  }

  var templateStr = 'var {{refId}} = functions.struct({{args}});';

  return Utils.evaluate(kernelP, Column, templateStr, {args: structArgs});
};

/**
 * Evaluates a list of conditions and returns one of multiple possible result expressions.
 * If otherwise is not defined at the end, null is returned for unmatched conditions.
 *
 * @example
 *   // Example: encoding gender string column into integer.
 *   people.select(functions.when(people.col("gender").equalTo("male"), 0)
 *     .when(people.col("gender").equalTo("female"), 1)
 *     .otherwise(2))
 *
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column}
 */
SQLFunctions.when = function(condition, value) {
  var templateStr = 'var {{refId}} = functions.when({{condition}}, {{value}});';

  return Utils.evaluate(kernelP, Column, templateStr, {condition: Utils.prepForReplacement(condition), value: Utils.prepForReplacement(value)});
};

/**
 * Computes bitwise NOT.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.bitwiseNOT = function(column) {
  var templateStr = 'var {{refId}} = functions.bitwiseNOT({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Parses the expression string into the column that it represents, similar to
 * DataFrame.selectExpr
 * @example
 *   // get the number of words of each length
 *   df.groupBy(functions.expr("length(word)")).count()
 *
 * @param {string} expr
 * @returns {Column}
 */
SQLFunctions.expr = function(expr) {
  var templateStr = 'var {{refId}} = functions.expr({{expr}});';

  return Utils.evaluate(kernelP, Column, templateStr, {expr: Utils.prepForReplacement(expr)});
};

/**
 * Computes the cosine inverse of the given value; the returned angle is in the range
 * 0.0 through pi.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.acos = function(col) {
  var templateStr = 'var {{refId}} = functions.acos({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the sine inverse of the given value; the returned angle is in the range
 * -pi/2 through pi/2.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.asin = function(col) {
  var templateStr = 'var {{refId}} = functions.asin({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the tangent inverse of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.atan = function(col) {
  var templateStr = 'var {{refId}} = functions.atan({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Returns the angle theta from the conversion of rectangular coordinates (x, y) to
 * polar coordinates (r, theta).
 *
 * @example
 * var col1 = new Column("age");
 * var col2 = new Column("expense");
 * var result = functions.atan2(col1, col2);
 *  // or
 *  result = functions.atan2(col1, "name");
 *  // or
 *  result = functions.atan2("age", col2);
 *  // or
 *  result = functions.atan2("age", "expense");
 *  // or
 *  result = functions.atan2(col1, 2.0);
 *  // or
 *  result = functions.atan2("age", 2.0);
 *  // or
 *  result = functions.atan2(2.0, col2);
 *  // or
 *  result = functions.atan2(2.0, "expense");
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string | float} left
 * @param {Column | string | float} right
 * @returns {Column}
 */
SQLFunctions.atan2 = function(left, right) {
  var templateStr = 'var {{refId}} = functions.atan2({{left}}, {{right}});';

  return Utils.evaluate(kernelP, Column, templateStr, {left: Utils.prepForReplacement(left), right: Utils.prepForReplacement(right)});
};

/**
 * An expression that returns the string representation of the binary value of the given long
 * column. For example, bin("12") returns "1100".
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.bin = function(col) {
  var templateStr = 'var {{refId}} = functions.bin({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the cube-root of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.cbrt = function(col) {
  var templateStr = 'var {{refId}} = functions.cbrt({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the ceiling of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.ceil = function(col) {
  var templateStr = 'var {{refId}} = functions.ceil({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Convert a number in a string column from one base to another.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} num
 * @param {integer} fromBase
 * @param {integer} toBase
 * @returns {Column}
 */
SQLFunctions.conv = function(num, fromBase, toBase) {
  var templateStr = 'var {{refId}} = functions.conv({{num}}, {{fromBase}}, {{toBase}});';

  return Utils.evaluate(kernelP, Column, templateStr, {num: Utils.prepForReplacement(num), fromBase: fromBase, toBase: toBase});
};

/**
 * Computes the cosine of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.cos = function(col) {
  var templateStr = 'var {{refId}} = functions.cos({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the hyperbolic cosine of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.cosh = function(col) {
  var templateStr = 'var {{refId}} = functions.cosh({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the exponential of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.exp = function(col) {
  var templateStr = 'var {{refId}} = functions.exp({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the exponential of the given value minus one.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.expm1 = function(col) {
  var templateStr = 'var {{refId}} = functions.expm1({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the factorial of the given value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column}
 */
SQLFunctions.factorial = function(column) {
  var templateStr = 'var {{refId}} = functions.factorial({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Computes the floor of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.floor = function(col) {
  var templateStr = 'var {{refId}} = functions.floor({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Returns the greatest value of the list of values, skipping null values.
 * This function takes at least 2 parameters. It will return null if all parameters are null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column}
 */
SQLFunctions.greatest = function() {
  var args = Array.prototype.slice.call(arguments);

  var fArgs = [];

  if (args && Array.isArray(args)) {
    args.forEach(function(arg) {
      fArgs.push(Utils.prepForReplacement(arg));
    });
  }

  var templateStr = 'var {{refId}} = functions.greatest({{args}});';

  return Utils.evaluate(kernelP, Column, templateStr, {args: fArgs});
};

/**
 * Computes hex value of the given column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.hex = function(column) {
  var templateStr = 'var {{refId}} = functions.hex({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Inverse of hex. Interprets each pair of characters as a hexadecimal number
 * and converts to the byte representation of number.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.unhex = function(column) {
  var templateStr = 'var {{refId}} = functions.unhex({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Computes `sqrt(a^2^ + b^2^)` without intermediate overflow or underflow.
 *
 * @example
 * var col1 = new Column("age");
 * var col2 = new Column("expense");
 * var result = functions.hypot(col1, col2);
 *  // or
 *  result = functions.hypot(col1, "name");
 *  // or
 *  result = functions.hypot("age", col2);
 *  // or
 *  result = functions.hypot("age", "expense");
 *  // or
 *  result = functions.hypot(col1, 2.0);
 *  // or
 *  result = functions.hypot("age", 2.0);
 *  // or
 *  result = functions.hypot(2.0, col2);
 *  // or
 *  result = functions.hypot(2.0, "expense");
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string | float} left
 * @param {Column | string | float} right
 * @returns {Column}
 */
SQLFunctions.hypot = function(left, right) {
  var templateStr = 'var {{refId}} = functions.hypot({{left}}, {{right}});';

  return Utils.evaluate(kernelP, Column, templateStr, {left: Utils.prepForReplacement(left), right: Utils.prepForReplacement(right)});
};

/**
 * Returns the least value of the list of values, skipping null values.
 * This function takes at least 2 parameters. It will return null iff all parameters are null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column}
 */
SQLFunctions.least = function() {
  var args = Array.prototype.slice.call(arguments);

  var fArgs = [];

  if (args && Array.isArray(args)) {
    args.forEach(function(arg) {
      fArgs.push(Utils.prepForReplacement(arg));
    });
  }

  var templateStr = 'var {{refId}} = functions.least({{args}});';

  return Utils.evaluate(kernelP, Column, templateStr, {args: fArgs});
};

/**
 * Computes the natural logarithm of the given column.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string}
 * @param {float} base Optional, Returns the first argument-base logarithm for the column
 * @returns {Column}
 */
SQLFunctions.log = function(col, base) {
  var templateStr = base ? 'var {{refId}} = functions.log({{col}}, {{base}});' : 'var {{refId}} = functions.log({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col), base: base});
};

/**
 * Computes the logarithm of the given value in base 10.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.log10 = function(col) {
  var templateStr = 'var {{refId}} = functions.log10({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the natural logarithm of the given value plus one.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.log1p = function(col) {
  var templateStr = 'var {{refId}} = functions.log1p({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the logarithm of the given column in base 2.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.log2 = function(col) {
  var templateStr = 'var {{refId}} = functions.log2({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Returns the value of the first argument raised to the power of the second argument.
 *
 * @example
 * var col1 = new Column("age");
 * var col2 = new Column("expense");
 * var result = functions.atan2(col1, col2);
 *  // or
 *  result = functions.pow(col1, "name");
 *  // or
 *  result = functions.pow("age", col2);
 *  // or
 *  result = functions.pow("age", "expense");
 *  // or
 *  result = functions.pow(col1, 2.0);
 *  // or
 *  result = functions.pow("age", 2.0);
 *  // or
 *  result = functions.pow(2.0, col2);
 *  // or
 *  result = functions.pow(2.0, "expense");
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string | float} left
 * @param {Column | string | float} right
 * @returns {Column}
 */
SQLFunctions.pow = function(left, right) {
  var templateStr = 'var {{refId}} = functions.pow({{left}}, {{right}});';

  return Utils.evaluate(kernelP, Column, templateStr, {left: Utils.prepForReplacement(left), right: Utils.prepForReplacement(right)});
};

/**
 * Returns the positive value of dividend mod divisor.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} dividend
 * @param {Column} divisor
 * @returns {Column}
 */
SQLFunctions.pmod = function(dividend, divisor) {
  var templateStr = 'var {{refId}} = functions.pmod({{dividend}}, {{divisor}});';

  return Utils.evaluate(kernelP, Column, templateStr, {dividend: Utils.prepForReplacement(dividend), divisor: Utils.prepForReplacement(divisor)});
};

/**
 * Returns the double value that is closest in value to the argument and
 * is equal to a mathematical integer.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.rint = function(col) {
  var templateStr = 'var {{refId}} = functions.rint({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Returns the value of the column `e` rounded to 0 decimal places.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.round = function(column) {
  var templateStr = 'var {{refId}} = functions.round({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Shift the the given value numBits left. If the given value is a long value, this function
 * will return a long value else it will return an integer value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {integer} numBits
 * @returns {Column}
 */
SQLFunctions.shiftLeft = function(column, numBits) {
  var templateStr = 'var {{refId}} = functions.shiftLeft({{column}}, {{numBits}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), numBits: numBits});
};

/**
 * Shift the the given value numBits right. If the given value is a long value, it will return
 * a long value else it will return an integer value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @param {integer} numBits
 * @returns {Column}
 */
SQLFunctions.shiftRight = function(column, numBits) {
  var templateStr = 'var {{refId}} = functions.shiftRight({{column}}, {{numBits}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), numBits: numBits});
};

/**
 * Unsigned shift the the given value numBits right. If the given value is a long value,
 * it will return a long value else it will return an integer value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @param {integer} numBits
 * @returns {Column}
 */
SQLFunctions.shiftRightUnsigned = function(column, numBits) {
  var templateStr = 'var {{refId}} = functions.shiftRightUnsigned({{column}}, {{numBits}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), numBits: numBits});
};

/**
 * Computes the signum of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.signum = function(col) {
  var templateStr = 'var {{refId}} = functions.signum({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the sine of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.sin = function(col) {
  var templateStr = 'var {{refId}} = functions.sin({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the hyperbolic sine of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.sinh = function(col) {
  var templateStr = 'var {{refId}} = functions.sinh({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the tangent of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.tan = function(col) {
  var templateStr = 'var {{refId}} = functions.tan({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Computes the hyperbolic tangent of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.tanh = function(col) {
  var templateStr = 'var {{refId}} = functions.tanh({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Converts an angle measured in radians to an approximately equivalent angle measured in degrees.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.toDegrees = function(col) {
  var templateStr = 'var {{refId}} = functions.toDegrees({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Converts an angle measured in degrees to an approximately equivalent angle measured in radians.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column}
 */
SQLFunctions.toRadians = function(col) {
  var templateStr = 'var {{refId}} = functions.toRadians({{col}});';

  return Utils.evaluate(kernelP, Column, templateStr, {col: Utils.prepForReplacement(col)});
};

/**
 * Calculates the MD5 digest of a binary column and returns the value
 * as a 32 character hex string.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.md5 = function(column) {
  var templateStr = 'var {{refId}} = functions.md5({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Calculates the SHA-1 digest of a binary column and returns the value
 * as a 40 character hex string.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.sha1 = function(column) {
  var templateStr = 'var {{refId}} = functions.sha1({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Calculates the SHA-2 family of hash functions of a binary column and
 * returns the value as a hex string.
 *
 * @param {Column} column  column to compute SHA-2 on.
 * @param {number} numBits  one of 224, 256, 384, or 512.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column}
 */
SQLFunctions.sha2 = function(column, numBits) {
  var templateStr = 'var {{refId}} = functions.sha2({{column}}, {{numBits}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), numBits: numBits});
};

/**
 * Calculates the cyclic redundancy check value  (CRC32) of a binary column and
 * returns the value as a bigint.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column}
 */
SQLFunctions.crc32 = function(column) {
  var templateStr = 'var {{refId}} = functions.crc32({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Computes the numeric value of the first character of the string column, and returns the
 * result as a int column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.ascii = function(column) {
  var templateStr = 'var {{refId}} = functions.ascii({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Computes the BASE64 encoding of a binary column and returns it as a string column.
 * This is the reverse of unbase64.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.base64 = function(column) {
  var templateStr = 'var {{refId}} = functions.base64({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Concatenates multiple input string columns together into a single string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column}
 */
SQLFunctions.concat = function() {
  var args = Array.prototype.slice.call(arguments);

  var fArgs = [];

  if (args && Array.isArray(args)) {
    args.forEach(function(arg) {
      fArgs.push(Utils.prepForReplacement(arg));
    });
  }

  var templateStr = 'var {{refId}} = functions.concat({{args}});';

  return Utils.evaluate(kernelP, Column, templateStr, {args: fArgs});
};

/**
 * Concatenates multiple input string columns together into a single string column,
 * using the given separator.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {string} sep
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column}
 */
SQLFunctions.concat_ws = function() {
  var args = Array.prototype.slice.call(arguments);

  var fArgs = [];

  if (args && Array.isArray(args)) {
    args.forEach(function(arg) {
      fArgs.push(Utils.prepForReplacement(arg));
    });
  }

  var templateStr = 'var {{refId}} = functions.concat_ws({{args}});';

  return Utils.evaluate(kernelP, Column, templateStr, {args: fArgs});
};

/**
 * Computes the first argument into a string from a binary using the provided character set
 * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
 * If either argument is null, the result will also be null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {string} charset one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16'
 * @returns {Column}
 */
SQLFunctions.decode = function(column, charset) {
  var templateStr = 'var {{refId}} = functions.decode({{column}}, {{charset}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), charset: Utils.prepForReplacement(charset)});
};

/**
 * Computes the first argument into a binary from a string using the provided character set
 * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
 * If either argument is null, the result will also be null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {string} charset one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16'
 * @returns {Column}
 */
SQLFunctions.encode = function(column, charset) {
  var templateStr = 'var {{refId}} = functions.encode({{column}}, {{charset}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), charset: Utils.prepForReplacement(charset)});
};

/**
 * Formats numeric column x to a format like '#,###,###.##', rounded to d decimal places,
 * and returns the result as a string column.
 *
 * If d is 0, the result has no decimal point or fractional part.
 * If d < 0, the result will be null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {integer} d rounded to d decimal places
 * @returns {Column}
 */
SQLFunctions.format_number = function(column, d) {
  var templateStr = 'var {{refId}} = functions.format_number({{column}}, {{d}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), d: d});
};

/**
 * Formats the arguments in printf-style and returns the result as a string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {string} format, printf-style
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column}
 */
SQLFunctions.format_string = function() {
  var args = Array.prototype.slice.call(arguments);

  var fArgs = [];

  if (args && Array.isArray(args)) {
    args.forEach(function(arg) {
      fArgs.push(Utils.prepForReplacement(arg));
    });
  }

  var templateStr = 'var {{refId}} = functions.format_string({{args}});';

  return Utils.evaluate(kernelP, Column, templateStr, {args: fArgs});
};

/**
 * Returns a new string column by converting the first letter of each word to uppercase.
 * Words are delimited by whitespace.
 *
 * For example, "hello world" will become "Hello World".
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.initcap = function(column) {
  var templateStr = 'var {{refId}} = functions.initcap({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Locate the position of the first occurrence of substr column in the given string.
 * Returns null if either of the arguments are null.
 *
 * NOTE: The position is not zero based, but 1 based index, returns 0 if substr
 * could not be found in str.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {string} substring
 * @returns {Column}
 */
SQLFunctions.instr = function(column, substring) {
  var templateStr = 'var {{refId}} = functions.instr({{column}}, {{substring}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), substring: Utils.prepForReplacement(substring)});
};

/**
 * Computes the length of a given string or binary column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.getLength = function(column) {
  var templateStr = 'var {{refId}} = functions.getLength({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Converts a string column to lower case.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.lower = function(column) {
  var templateStr = 'var {{refId}} = functions.lower({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Computes the Levenshtein distance of the two given string columns.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} left
 * @param {Column} right
 * @returns {Column}
 */
SQLFunctions.levenshtein = function(left, right) {
  var templateStr = 'var {{refId}} = functions.levenshtein({{left}}, {{right}});';

  return Utils.evaluate(kernelP, Column, templateStr, {left: Utils.prepForReplacement(left), right: Utils.prepForReplacement(right)});
};

/**
 * Locate the position of the first occurrence of substr.
 * NOTE: The position is not zero based, but 1 based index, returns 0 if substr
 * could not be found in str.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {string} substr
 * @param {Column} column
 * @param {integer} (Optional) pos
 * @returns {Column}
 */
SQLFunctions.locate = function(substr, column, pos) {
  var templateStr = pos ? 'var {{refId}} = functions.locate({{substr}}, {{column}}, {{pos}});' : 'var {{refId}} = functions.locate({{substr}}, {{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {substr: Utils.prepForReplacement(substr), column: Utils.prepForReplacement(column), pos: pos});
};

/**
 * Left-pad the string column with
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {integer} len
 * @param {string} pad
 * @returns {Column}
 */
SQLFunctions.lpad = function(column, len, pad) {
  var templateStr = 'var {{refId}} = functions.lpad({{column}}, {{len}}, {{pad}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), len: len, pad: Utils.prepForReplacement(pad)});
};

/**
 * Trim the spaces from left end for the specified string value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.ltrim = function(column) {
  var templateStr = 'var {{refId}} = functions.ltrim({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Extract a specific(idx) group identified by a regex, from the specified string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {string} regex
 * @param {integer} groupIdx
 * @returns {Column}
 */
SQLFunctions.regexp_extract = function(column, regex, groupIdx) {
  var templateStr = 'var {{refId}} = functions.regexp_extract({{column}}, {{regex}}, {{groupIdx}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), regex: Utils.prepForReplacement(regex), groupIdx: groupIdx});
};

/**
 * Replace all substrings of the specified string value that match regexp with rep.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {string} pattern
 * @param {string} replacement
 * @returns {Column}
 */
SQLFunctions.regexp_replace = function(column, pattern, replacement) {
  var templateStr = 'var {{refId}} = functions.regexp_replace({{column}}, {{pattern}}, {{replacement}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), pattern: Utils.prepForReplacement(pattern), replacement: Utils.prepForReplacement(replacement)});
};

/**
 * Decodes a BASE64 encoded string column and returns it as a binary column.
 * This is the reverse of base64.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.unbase64 = function(column) {
  var templateStr = 'var {{refId}} = functions.unbase64({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Right-padded with pad to a length of len.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {integer} len
 * @param {string} pad
 * @returns {Column}
 */
SQLFunctions.rpad = function(column, len, pad) {
  var templateStr = 'var {{refId}} = functions.rpad({{column}}, {{len}}, {{pad}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), len: len, pad: Utils.prepForReplacement(pad)});
};

/**
 * Repeats a string column n times, and returns it as a new string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {integer} n
 * @returns {Column}
 */
SQLFunctions.repeat = function(column, n) {
  var templateStr = 'var {{refId}} = functions.repeat({{column}}, {{n}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), n: n});
};

/**
 * Reverses the string column and returns it as a new string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.reverse = function(column) {
  var templateStr = 'var {{refId}} = functions.reverse({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Trim the spaces from right end for the specified string value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.rtrim = function(column) {
  var templateStr = 'var {{refId}} = functions.rtrim({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * * Return the soundex code for the specified expression.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.soundex = function(column) {
  var templateStr = 'var {{refId}} = functions.soundex({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Splits str around pattern (pattern is a regular expression).
 * NOTE: pattern is a string represent the regular expression.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {string} pattern
 * @returns {Column}
 */
SQLFunctions.split = function(column, pattern) {
  var templateStr = 'var {{refId}} = functions.split({{column}}, {{pattern}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), pattern: Utils.prepForReplacement(pattern)});
};

/**
 * Substring starts at `pos` and is of length `len` when str is String type or
 * returns the slice of byte array that starts at `pos` in byte and is of length `len`
 * when str is Binary type
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {integer} pos
 * @param {integer} len
 * @returns {Column}
 */
SQLFunctions.substring = function(column, pos, len) {
  var templateStr = 'var {{refId}} = functions.substring({{column}}, {{pos}}, {{len}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), pos: pos, len: len});
};

/**
 * Returns the substring from string str before count occurrences of the delimiter delim.
 * If count is positive, everything the left of the final delimiter (counting from left) is
 * returned. If count is negative, every to the right of the final delimiter (counting from the
 * right) is returned. substring_index performs a case-sensitive match when searching for delim.
 *
 * @param {Column} column
 * @param {string} delim
 * @param {integer} count
 * @returns {Column}
 */
SQLFunctions.substring_index = function(column, delim, count) {
  var templateStr = 'var {{refId}} = functions.substring_index({{column}}, {{delim}}, {{count}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), delim: Utils.prepForReplacement(delim), count: count});
};

/**
 * Translate any character in the src by a character in replaceString.
 * The characters in replaceString is corresponding to the characters in matchingString.
 * The translate will happen when any character in the string matching with the character
 * in the matchingString.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {string} matchingString
 * @param {string} replaceString
 * @returns {Column}
 */
SQLFunctions.translate = function(column, matchingString, replaceString) {
  var templateStr = 'var {{refId}} = functions.translate({{column}}, {{matchingString}}, {{replaceString}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), matchingString: Utils.prepForReplacement(matchingString), replaceString: Utils.prepForReplacement(replaceString)});
};

/**
 * Trim the spaces from both ends for the specified string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.trim = function(column) {
  var templateStr = 'var {{refId}} = functions.trim({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Converts a string column to upper case.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.upper = function(column) {
  var templateStr = 'var {{refId}} = functions.upper({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Returns the date that is numMonths after startDate.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} startDate
 * @param {integer} numMonths
 * @returns {Column}
 */
SQLFunctions.add_months = function(startDate, numMonths) {
  var templateStr = 'var {{refId}} = functions.add_months({{startDate}}, {{numMonths}});';

  return Utils.evaluate(kernelP, Column, templateStr, {startDate: Utils.prepForReplacement(startDate), numMonths: numMonths});
};

/**
 * Returns the current date as a date column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column}
 */
SQLFunctions.current_date = function() {
  var templateStr = 'var {{refId}} = functions.current_date();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Returns the current timestamp as a timestamp column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column}
 */
SQLFunctions.current_timestamp = function() {
  var templateStr = 'var {{refId}} = functions.current_timestamp();';

  return Utils.evaluate(kernelP, Column, templateStr);
};

/**
 * Converts a date/timestamp/string to a value of string in the format specified by the date
 * format given by the second argument.
 *
 * A pattern could be for instance `dd.MM.yyyy` and could return a string like '18.03.1993'. All
 * pattern letters of {@link SimpleDateFormat} can be used.
 *
 * NOTE: Use when ever possible specialized functions like {@link year}. These benefit from a
 * specialized implementation.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} dateExpr
 * @param {string} format
 * @returns {Column}
 */
SQLFunctions.date_format = function(dateExpr, format) {
  var templateStr = 'var {{refId}} = functions.date_format({{dateExpr}}, {{format}});';

  return Utils.evaluate(kernelP, Column, templateStr, {dateExpr: Utils.prepForReplacement(dateExpr), format: Utils.prepForReplacement(format)});
};

/**
 * Returns the date that is `days` days after `start`
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} start
 * @param {integer} days
 * @returns {Column}
 */
SQLFunctions.date_add = function(start, days) {
  var templateStr = 'var {{refId}} = functions.date_add({{start}}, {{days}});';

  return Utils.evaluate(kernelP, Column, templateStr, {start: Utils.prepForReplacement(start), days: days});
};

/**
 * Returns the date that is `days` days before `start`
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} start
 * @param {integer} days
 * @returns {Column}
 */
SQLFunctions.date_sub = function(start,days) {
  var templateStr = 'var {{refId}} = functions.date_sub({{start}}, {{days}});';

  return Utils.evaluate(kernelP, Column, templateStr, {start: Utils.prepForReplacement(start), days: days});
};

/**
 * Returns the number of days from `start` to `end`.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} end
 * @param {Column} start
 * @returns {Column}
 */
SQLFunctions.datediff = function(end,start) {
  var templateStr = 'var {{refId}} = functions.datediff({{end}}, {{start}});';

  return Utils.evaluate(kernelP, Column, templateStr, {start: Utils.prepForReplacement(start), end: Utils.prepForReplacement(end)});
};

/**
 * Extracts the year as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.year = function(column) {
  var templateStr = 'var {{refId}} = functions.year({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Extracts the quarter as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column}
 */
SQLFunctions.quarter = function(column) {
  var templateStr = 'var {{refId}} = functions.quarter({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Extracts the month as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.month = function(column) {
  var templateStr = 'var {{refId}} = functions.month({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Extracts the day of the month as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.dayofmonth = function(column) {
  var templateStr = 'var {{refId}} = functions.dayofmonth({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Extracts the day of the year as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.dayofyear = function(column) {
  var templateStr = 'var {{refId}} = functions.dayofyear({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Extracts the hours as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.hour = function(column) {
  var templateStr = 'var {{refId}} = functions.hour({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Given a date column, returns the last day of the month which the given date belongs to.
 * For example, input "2015-07-27" returns "2015-07-31" since July 31 is the last day of the
 * month in July 2015.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.last_day = function(column) {
  var templateStr = 'var {{refId}} = functions.last_day({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Extracts the minutes as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.minute = function(column) {
  var templateStr = 'var {{refId}} = functions.minute({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Extracts the months between date1 and date2
 * @param {Column} date1
 * @param {Column} date2
 * @returns {Column}
 */
SQLFunctions.months_between = function(date1, date2) {
  var templateStr = 'var {{refId}} = functions.months_between({{date1}}, {{date2}});';

  return Utils.evaluate(kernelP, Column, templateStr, {date1: Utils.prepForReplacement(date1), date2: Utils.prepForReplacement(date2)});
};

/**
 * Given a date column, returns the first date which is later than the value of the date column
 * that is on the specified day of the week.
 *
 * For example, `next_day('2015-07-27', "Sunday")` returns 2015-08-02 because that is the first
 * Sunday after 2015-07-27.
 *
 * Day of the week parameter is case insensitive, and accepts:
 * "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun".
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} date
 * @param {string} dayOfWeek, Day of the week parameter is case insensitive, and accepts: "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun".
 * @returns {Column}
 */
SQLFunctions.next_day = function(date, dayOfWeek) {
  var templateStr = 'var {{refId}} = functions.next_day({{date}}, {{dayOfWeek}});';

  return Utils.evaluate(kernelP, Column, templateStr, {date: Utils.prepForReplacement(date), dayOfWeek: Utils.prepForReplacement(dayOfWeek)});
};

/**
 * Extracts the seconds as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.second = function(column) {
  var templateStr = 'var {{refId}} = functions.second({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Extracts the week number as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.weekofyear = function(column) {
  var templateStr = 'var {{refId}} = functions.weekofyear({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Converts the number of seconds from unix epoch (1970-01-01 00:00:00 UTC) to a string
 * representing the timestamp of that moment in the current system time zone in the given
 * format.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {string} format, Optional data format example: "yyyy-MM-dd"
 * @returns {Column}
 */
SQLFunctions.from_unixtime = function(column, format) {
  var templateStr = format ? 'var {{refId}} = functions.from_unixtime({{column}}, {{format}});' : 'var {{refId}} = functions.from_unixtime({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), format: Utils.prepForReplacement(format)});
}

/**
 * Gets current Unix timestamp in seconds. if not arguments are specified
 *
 * Convert time string with given pattern
 * (see [http://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html])
 * to Unix time stamp (in seconds), return null if fail.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column, Optional converts time string in format yyyy-MM-dd HH:mm:ss to Unix timestamp (in seconds),
 * using the default timezone and the default locale, return null if fail.
 * @param {string} pattern, Optional convert time string with given pattern
 * (see [http://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html]) to Unix time stamp (in seconds), return null if fail.
 * @returns {Column}
 */
SQLFunctions.unix_timestamp = function(column, pattern) {
  var templateStr;

  if (pattern) {
    templateStr = 'var {{refId}} = functions.unix_timestamp({{column}}, {{pattern}});'
  } else if (column) {
    templateStr = 'var {{refId}} = functions.unix_timestamp({{column}});'
  } else {
    templateStr = 'var {{refId}} = functions.unix_timestamp();'
  }

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), pattern: Utils.prepForReplacement(pattern)});
};

/**
 * Converts the column into DateType.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.to_date = function(column) {
  var templateStr = 'var {{refId}} = functions.to_date({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Returns date truncated to the unit specified by the format.
 *
 * @param {Column} date
 * @param {string} format : 'year', 'yyyy', 'yy' for truncate by year,
 *               or 'month', 'mon', 'mm' for truncate by month
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column}
 */
SQLFunctions.trunc = function(date, format) {
  var templateStr = 'var {{refId}} = functions.trunc({{date}}, {{format}});';

  return Utils.evaluate(kernelP, Column, templateStr, {date: Utils.prepForReplacement(date), format: Utils.prepForReplacement(format)});
};

/**
 * Assumes given timestamp is UTC and converts to given timezone.
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} ts
 * @param {string} tz
 * @returns {Column}
 */
SQLFunctions.from_utc_timestamp = function(ts, tz) {
  var templateStr = 'var {{refId}} = functions.from_utc_timestamp({{ts}}, {{tz}});';

  return Utils.evaluate(kernelP, Column, templateStr, {ts: Utils.prepForReplacement(ts), tz: Utils.prepForReplacement(tz)});
};

/**
 * Assumes given timestamp is in given timezone and converts to UTC.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} ts
 * @param {string} tz
 * @returns {Column}
 */
SQLFunctions.to_utc_timestamp = function(ts, tz) {
  var templateStr = 'var {{refId}} = functions.to_utc_timestamp({{ts}}, {{tz}});';

  return Utils.evaluate(kernelP, Column, templateStr, {ts: Utils.prepForReplacement(ts), tz: Utils.prepForReplacement(tz)});
};

/**
 * Returns true if the array contain the value
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {string | number} value
 * @returns {Column}
 */
SQLFunctions.array_contains = function(column, value) {
  var templateStr = 'var {{refId}} = functions.array_contains({{column}}, {{value}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), value: Utils.prepForReplacement(value)});
};

/**
 * Creates a new row for each element in the given array or map column.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.explode = function(column) {
  var templateStr = 'var {{refId}} = functions.explode({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Returns length of array or map.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column}
 */
SQLFunctions.size = function(column) {
  var templateStr = 'var {{refId}} = functions.size({{column}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column)});
};

/**
 * Sorts the input array for the given column in ascending / descending order,
 * according to the natural ordering of the array elements.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @param {boolean} asc Optional, defaults to true
 * @returns {Column}
 */
SQLFunctions.sort_array = function(column, asc) {
  var templateStr = 'var {{refId}} = functions.sort_array({{column}}, {{asc}});';

  return Utils.evaluate(kernelP, Column, templateStr, {column: Utils.prepForReplacement(column), asc: asc});
};

/**
 * Defines a user-defined function of 0 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * NOTE: this seems overly complex for JavaScrip environment so we are not implementing at this time
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction}
 * @private
 */
SQLFunctions.udf = function(f) {
  throw "not implemented by ElairJS";
};

/**
 * Call an user-defined function.
 * NOTE: this seems overly complex for JavaScrip environment so we are not implementing at this time
 * Example:
 * @example
 *  import org.apache.spark.sql._
 *
 *  val df = Seq(("id1", 1), ("id2", 4), ("id3", 5)).toDF("id", "value")
 *  val sqlContext = df.sqlContext
 *  sqlContext.udf.register("simpleUDF", (v: Int) => v * v)
 *  df.select($"id", callUDF("simpleUDF", $"value"))
 *
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @private
 * @returns {Column}
 */
SQLFunctions.callUDF = function(udfName,cols) {
  throw "not implemented by ElairJS";
};

module.exports = function(kP) {
  kernelP = kP;

  return SQLFunctions;
};
