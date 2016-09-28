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
    var Utils = require('../utils.js');

    var Column = require('./Column.js');
    var DataFrame = require('./DataFrame.js');

    var gKernelP = kernelP;

    function generateFunction(name, farguments) {
      var args = {
        target: functions,
        method: name,
        args: Utils.wrapArguments(farguments),
        returnType: Column,
        static: true,
        kernelP: gKernelP
      };

      return Utils.generate(args);
    }

    /**
     * @constructor
     * @memberof module:eclairjs/sql
     * @classdesc Spark SQL functions.
     */
    function functions() {
    }

    /**
     * Returns a {@link Column} based on the given column name.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} colName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.col = function(colName) {
      return generateFunction('col', arguments);
    };

    /**
     * Returns a [[Column]] based on the given column name. Alias of {@link col}.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} colName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.column = function(colName) {
      return generateFunction('column', arguments);
    };

    /**
     * Creates a {@link Column} of literal value.
     *
     * The passed in object is returned directly if it is already a {@link Column}.
     * Otherwise, a new {@link Column} is created to represent the literal value.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {object} literal
     * @returns {module:eclairjs/sql.Column}
     */
    functions.lit = function(literal) {
      return generateFunction('lit', arguments);
    };

    /**
     * Returns a sort expression based on ascending order of the column.
     * @example
     *   // Sort by dept in ascending order, and then age in descending order.
     *   df.sort(functions.asc("dept"), functions.desc("age"))
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.asc = function(columnName) {
      return generateFunction('asc', arguments);
    };

    /**
     * Returns a sort expression based on the descending order of the column.
     * @example
     *   // Sort by dept in ascending order, and then age in descending order.
     *   df.sort(functions.asc("dept"), functions.desc("age"))
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {string} columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.desc = function(columnName) {
      return generateFunction('desc', arguments);
    };

    /**
     * Aggregate function: returns the approximate number of distinct items in a group.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @param {float} [rsd]
     * @returns {module:eclairjs/sql.Column}
     */
    functions.approxCountDistinct = function(column, rsd) {
      return generateFunction('approxCountDistinct', arguments);
    };

    /**
     * Aggregate function: returns the average of the values in a group.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @returns {module:eclairjs/sql.Column}
     */
    functions.avg = function(column) {
      return generateFunction('avg', arguments);
    };

    /**
     * Aggregate function: returns the number of items in a group.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @returns {module:eclairjs/sql.Column}
     */
    functions.count = function(column) {
      return generateFunction('count', arguments);
    };

    /**
     * Aggregate function: returns the number of distinct items in a group.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} columnExpr, ...columnExpr or columnName, ...columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.countDistinct  = function() {
      return generateFunction('countDistinct', arguments);
    };

    /**
     * Aggregate function: returns the first value in a group.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @returns {module:eclairjs/sql.Column}
     */
    functions.first = function(column) {
      return generateFunction('first', arguments);
    };

    /**
     * Aggregate function: returns the last value in a group.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @returns {module:eclairjs/sql.Column}
     */
    functions.last = function(column) {
      return generateFunction('last', arguments);
    };

    /**
     * Aggregate function: returns the maximum value of the expression in a group.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @returns {module:eclairjs/sql.Column}
     */
    functions.max = function(column) {
      return generateFunction('max', arguments);
    };

    /**
     * Aggregate function: returns the average of the values in a group.
     * Alias for avg.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @returns {module:eclairjs/sql.Column}
     */
    functions.mean = function(column) {
      return generateFunction('mean', arguments);
    };

    /**
     * Aggregate function: returns the minimum value of the expression in a group.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @returns {module:eclairjs/sql.Column}
     */
    functions.min = function(column) {
      return generateFunction('min', arguments);
    };

    /**
     * Aggregate function: returns the sum of all values in the expression.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @returns {module:eclairjs/sql.Column}
     */
    functions.sum = function(column) {
      return generateFunction('sum', arguments);
    };

    /**
     * Aggregate function: returns the sum of distinct values in the expression.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column | string} column object or column name as a string
     * @returns {module:eclairjs/sql.Column}
     */
    functions.sumDistinct = function(column) {
      return generateFunction('sumDistinct', arguments);
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
     * @returns {module:eclairjs/sql.Column}
     */
    functions.cumeDist = function() {
      return generateFunction('cumeDist', arguments);
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
     * @returns {module:eclairjs/sql.Column}
     */
    functions.denseRank = function() {
      return generateFunction('denseRank', arguments);
    };

    /**
     * Window function: returns the value that is `offset` rows before the current row, and
     * `null` or defaultValue if there is less than `offset` rows before the current row. For example,
     * an `offset` of one will return the previous row at any given point in the window partition.
     *
     * This is equivalent to the LAG function in SQL.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} column
     * @param {integer} offset
     * @param {object} defaultValue
     * @returns {module:eclairjs/sql.Column}
     */
    functions.lag = function(column, offset, defaultValue) {
      return generateFunction('lag', arguments);
    };

    /**
     * Window function: returns the value that is `offset` rows after the current row, and
     * `null` or defaultValue if there is less than `offset` rows after the current row. For example,
     * an `offset` of one will return the next row at any given point in the window partition.
     *
     * This is equivalent to the LEAD function in SQL.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} column
     * @param {integer} offset
     * @param {object} defaultValue
     * @returns {module:eclairjs/sql.Column}
     */
    functions.lead = function(column, offset, defaultValue) {
      return generateFunction('lead', arguments);
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
     * @returns {module:eclairjs/sql.Column}
     */
    functions.ntile = function(n) {
      return generateFunction('ntile', arguments);
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
     * @returns {module:eclairjs/sql.Column}
     */
    functions.percentRank = function() {
      return generateFunction('percentRank', arguments);
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
     * @returns {module:eclairjs/sql.Column}
     */
    functions.rank = function() {
      return generateFunction('rank', arguments);
    };

    /**
     * Window function: returns a sequential number starting at 1 within a window partition.
     *
     * This is equivalent to the ROW_NUMBER function in SQL.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @returns {module:eclairjs/sql.Column}
     */
    functions.rowNumber = function() {
      return generateFunction('rowNumber', arguments);
    };

    /**
     * Computes the absolute value.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.abs = function(column) {
      return generateFunction('abs', arguments);
    };

    /**
     * Creates a new array column. The input columns must all have the same data type.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} columnExpr, ...columnExpr or columnName, ...columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.array = function() {
      return generateFunction('array', arguments);
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
     * @param {module:eclairjs/sql.DataFrame} df
     * @returns {module:eclairjs/sql.DataFrame}
     */
    functions.broadcast = function(df) {
      return generateFunction('broadcast', arguments);
    };

    /**
     * Returns the first column that is not null, or null if all inputs are null.
     *
     * For example, `coalesce(a, b, c)` will return a if a is not null,
     * or b if a is null and b is not null, or c if both a and b are null but c is not null.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column} column, ...column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.coalesce = function() {
      return generateFunction('coalesce', arguments);
    };

    /**
     * Creates a string column for the file name of the current Spark task.
     *
     * @returns {module:eclairjs/sql.Column}
     */
    functions.inputFileName = function() {
      return generateFunction('inputFileName', arguments);
    };

    /**
     * Return true iff the column is NaN.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.isNaN = function(column) {
      return generateFunction('isNaN', arguments);
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
     * @returns {module:eclairjs/sql.Column}
     */
    functions.monotonicallyIncreasingId = function() {
      return generateFunction('monotonicallyIncreasingId', arguments);
    };

    /**
     * Returns col1 if it is not NaN, or col2 if col1 is NaN.
     *
     * Both inputs should be floating point columns (DoubleType or FloatType).
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} col1
     * @param {module:eclairjs/sql.Column} col2
     * @returns {module:eclairjs/sql.Column}
     */
    functions.nanvl = function(col1, col2) {
      return generateFunction('nanvl', arguments);
    };

    /**
     * Unary minus, i.e. negate the expression.
     * @example
     *   df.select(functions.negate(df.col("amount")) );
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.negate = function(column) {
      return generateFunction('negate', arguments);
    };

    /**
     * Inversion of boolean expression, i.e. NOT.
     * @example
     *   df.filter( functions.not(df.col("isActive")) );
     *
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column} e
     * @returns {module:eclairjs/sql.Column}
     */
    functions.not = function(column) {
      return generateFunction('not', arguments);
    };

    /**
     * Generate a random column with i.i.d. samples from U[0.0, 1.0].
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {integer} [seed]
     * @returns {module:eclairjs/sql.Column}
     */
    functions.rand = function(seed) {
      return generateFunction('rand', arguments);
    };

    /**
     * Generate a column with i.i.d. samples from the standard normal distribution.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {integer} [seed]
     * @returns {module:eclairjs/sql.Column}
     */
    functions.randn = function(seed) {
      return generateFunction('randn', arguments);
    };

    /**
     * Partition ID of the Spark task.
     *
     * Note that this is indeterministic because it depends on data partitioning and task scheduling.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @returns {module:eclairjs/sql.Column}
     */
    functions.sparkPartitionId = function() {
      return generateFunction('sparkPartitionId', arguments);
    };

    /**
     * Computes the square root of the specified float value.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.sqrt = function(col) {
      return generateFunction('sqrt', arguments);
    };

    /**
     * Creates a new struct column.
     * If the input column is a column in a {@link DataFrame}, or a derived column expression
     * that is named (i.e. aliased), its name would be remained as the StructField's name,
     * otherwise, the newly generated StructField's name would be auto generated as col${index + 1},
     * i.e. col1, col2, col3, ...
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} columnExpr, ...columnExpr or columnName, ...columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.struct = function() {
      return generateFunction('struct', arguments);
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
     * @returns {module:eclairjs/sql.Column}
     */
    functions.when = function(condition, value) {
      return generateFunction('when', arguments);
    };

    /**
     * Computes bitwise NOT.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.bitwiseNOT = function(column) {
      return generateFunction('bitwiseNOT', arguments);
    };

    /**
     * Parses the expression string into the column that it represents, similar to
     * DataFrame.selectExpr
     * @example
     *   // get the number of words of each length
     *   df.groupBy(functions.expr("length(word)")).count()
     *
     * @param {string} expr
     * @returns {module:eclairjs/sql.Column}
     */
    functions.expr = function(expr) {
      return generateFunction('expr', arguments);
    };

    /**
     * Computes the cosine inverse of the given value; the returned angle is in the range
     * 0.0 through pi.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.acos = function(col) {
      return generateFunction('acos', arguments);
    };

    /**
     * Computes the sine inverse of the given value; the returned angle is in the range
     * -pi/2 through pi/2.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.asin = function(col) {
      return generateFunction('asin', arguments);
    };

    /**
     * Computes the tangent inverse of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.atan = function(col) {
      return generateFunction('atan', arguments);
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
     * @param {module:eclairjs/sql.Column | string | float} left
     * @param {module:eclairjs/sql.Column | string | float} right
     * @returns {module:eclairjs/sql.Column}
     */
    functions.atan2 = function(left, right) {
      return generateFunction('atan2', arguments);
    };

    /**
     * An expression that returns the string representation of the binary value of the given long
     * column. For example, bin("12") returns "1100".
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.bin = function(col) {
      return generateFunction('bin', arguments);
    };

    /**
     * Computes the cube-root of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.cbrt = function(col) {
      return generateFunction('cbrt', arguments);
    };

    /**
     * Computes the ceiling of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.ceil = function(col) {
      return generateFunction('ceil', arguments);
    };

    /**
     * Convert a number in a string column from one base to another.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} num
     * @param {integer} fromBase
     * @param {integer} toBase
     * @returns {module:eclairjs/sql.Column}
     */
    functions.conv = function(num, fromBase, toBase) {
      return generateFunction('conv', arguments);
    };

    /**
     * Computes the cosine of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.cos = function(col) {
      return generateFunction('cos', arguments);
    };

    /**
     * Computes the hyperbolic cosine of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.cosh = function(col) {
      return generateFunction('cosh', arguments);;
    };

    /**
     * Computes the exponential of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.exp = function(col) {
      return generateFunction('exp', arguments);
    };

    /**
     * Computes the exponential of the given value minus one.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.expm1 = function(col) {
      return generateFunction('expm1', arguments);
    };

    /**
     * Computes the factorial of the given value.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} e
     * @returns {module:eclairjs/sql.Column}
     */
    functions.factorial = function(column) {
      return generateFunction('factorial', arguments);
    };

    /**
     * Computes the floor of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.floor = function(col) {
      return generateFunction('floor', arguments);
    };

    /**
     * Returns the greatest value of the list of values, skipping null values.
     * This function takes at least 2 parameters. It will return null if all parameters are null.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column | string} columnExpr, ...columnExpr or columnName, ...columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.greatest = function() {
      return generateFunction('greatest', arguments);
    };

    /**
     * Computes hex value of the given column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.hex = function(column) {
      return generateFunction('hex', arguments);
    };

    /**
     * Inverse of hex. Interprets each pair of characters as a hexadecimal number
     * and converts to the byte representation of number.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.unhex = function(column) {
      return generateFunction('unhex', arguments);
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
     * @param {module:eclairjs/sql.Column | string | float} left
     * @param {module:eclairjs/sql.Column | string | float} right
     * @returns {module:eclairjs/sql.Column}
     */
    functions.hypot = function(left, right) {
      return generateFunction('hypot', arguments);
    };

    /**
     * Returns the least value of the list of values, skipping null values.
     * This function takes at least 2 parameters. It will return null iff all parameters are null.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column | string} columnExpr, ...columnExpr or columnName, ...columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.least = function() {
      return generateFunction('least', arguments);
    };

    /**
     * Computes the natural logarithm of the given column.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string}
     * @param {float} [base] Returns the first argument-base logarithm for the column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.log = function(col, base) {
      return generateFunction('log', arguments);
    };

    /**
     * Computes the logarithm of the given value in base 10.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.log10 = function(col) {
      return generateFunction('log10', arguments);
    };

    /**
     * Computes the natural logarithm of the given value plus one.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.log1p = function(col) {
      return generateFunction('log1p', arguments);
    };

    /**
     * Computes the logarithm of the given column in base 2.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.log2 = function(col) {
      return generateFunction('log2', arguments);
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
     * @param {module:eclairjs/sql.Column | string | float} left
     * @param {module:eclairjs/sql.Column | string | float} right
     * @returns {module:eclairjs/sql.Column}
     */
    functions.pow = function(left, right) {
      return generateFunction('pow', arguments);
    };

    /**
     * Returns the positive value of dividend mod divisor.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} dividend
     * @param {module:eclairjs/sql.Column} divisor
     * @returns {module:eclairjs/sql.Column}
     */
    functions.pmod = function(dividend, divisor) {
      return generateFunction('pmod', arguments);
    };

    /**
     * Returns the double value that is closest in value to the argument and
     * is equal to a mathematical integer.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.rint = function(col) {
      return generateFunction('rint', arguments);
    };

    /**
     * Returns the value of the column `e` rounded to 0 decimal places.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.round = function(column) {
      return generateFunction('round', arguments);
    };

    /**
     * Shift the the given value numBits left. If the given value is a long value, this function
     * will return a long value else it will return an integer value.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {integer} numBits
     * @returns {module:eclairjs/sql.Column}
     */
    functions.shiftLeft = function(column, numBits) {
      return generateFunction('shiftLeft', arguments);
    };

    /**
     * Shift the the given value numBits right. If the given value is a long value, it will return
     * a long value else it will return an integer value.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} e
     * @param {integer} numBits
     * @returns {module:eclairjs/sql.Column}
     */
    functions.shiftRight = function(column, numBits) {
      return generateFunction('shiftRight', arguments);
    };

    /**
     * Unsigned shift the the given value numBits right. If the given value is a long value,
     * it will return a long value else it will return an integer value.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} e
     * @param {integer} numBits
     * @returns {module:eclairjs/sql.Column}
     */
    functions.shiftRightUnsigned = function(column, numBits) {
      return generateFunction('shiftRightUnsigned', arguments);
    };

    /**
     * Computes the signum of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.signum = function(col) {
      return generateFunction('signum', arguments);
    };

    /**
     * Computes the sine of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.sin = function(col) {
      return generateFunction('sin', arguments);
    };

    /**
     * Computes the hyperbolic sine of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.sinh = function(col) {
      return generateFunction('sinh', arguments);
    };

    /**
     * Computes the tangent of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.tan = function(col) {
      return generateFunction('tan', arguments);
    };

    /**
     * Computes the hyperbolic tangent of the given value.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.tanh = function(col) {
      return generateFunction('tanh', arguments);
    };

    /**
     * Converts an angle measured in radians to an approximately equivalent angle measured in degrees.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.toDegrees = function(col) {
      return generateFunction('toDegrees', arguments);
    };

    /**
     * Converts an angle measured in degrees to an approximately equivalent angle measured in radians.
     *
     * @since EclairJS 0.1 Spark  1.4.0
     * @param {module:eclairjs/sql.Column | string} col
     * @returns {module:eclairjs/sql.Column}
     */
    functions.toRadians = function(col) {
      return generateFunction('toRadians', arguments);
    };

    /**
     * Calculates the MD5 digest of a binary column and returns the value
     * as a 32 character hex string.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.md5 = function(column) {
      return generateFunction('md5', arguments);
    };

    /**
     * Calculates the SHA-1 digest of a binary column and returns the value
     * as a 40 character hex string.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.sha1 = function(column) {
      return generateFunction('sha1', arguments);
    };

    /**
     * Calculates the SHA-2 family of hash functions of a binary column and
     * returns the value as a hex string.
     *
     * @param {module:eclairjs/sql.Column} column  column to compute SHA-2 on.
     * @param {number} numBits  one of 224, 256, 384, or 512.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @returns {module:eclairjs/sql.Column}
     */
    functions.sha2 = function(column, numBits) {
      return generateFunction('sha2', arguments);
    };

    /**
     * Calculates the cyclic redundancy check value  (CRC32) of a binary column and
     * returns the value as a bigint.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} e
     * @returns {module:eclairjs/sql.Column}
     */
    functions.crc32 = function(column) {
      return generateFunction('crc32', arguments);
    };

    /**
     * Computes the numeric value of the first character of the string column, and returns the
     * result as a int column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.ascii = function(column) {
      return generateFunction('ascii', arguments);
    };

    /**
     * Computes the BASE64 encoding of a binary column and returns it as a string column.
     * This is the reverse of unbase64.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.base64 = function(column) {
      return generateFunction('base64', arguments);
    };

    /**
     * Concatenates multiple input string columns together into a single string column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column | string} columnExpr, ...columnExpr or columnName, ...columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.concat = function() {
      return generateFunction('concat', arguments);
    };

    /**
     * Concatenates multiple input string columns together into a single string column,
     * using the given separator.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {string} sep
     * @param {module:eclairjs/sql.Column | string} columnExpr, ...columnExpr or columnName, ...columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.concat_ws = function() {
      return generateFunction('concat_ws', arguments);
    };

    /**
     * Computes the first argument into a string from a binary using the provided character set
     * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
     * If either argument is null, the result will also be null.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {string} charset one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16'
     * @returns {module:eclairjs/sql.Column}
     */
    functions.decode = function(column, charset) {
      return generateFunction('decode', arguments);
    };

    /**
     * Computes the first argument into a binary from a string using the provided character set
     * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
     * If either argument is null, the result will also be null.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {string} charset one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16'
     * @returns {module:eclairjs/sql.Column}
     */
    functions.encode = function(column, charset) {
      return generateFunction('encode', arguments);
    };

    /**
     * Formats numeric column x to a format like '#,###,###.##', rounded to d decimal places,
     * and returns the result as a string column.
     *
     * If d is 0, the result has no decimal point or fractional part.
     * If d < 0, the result will be null.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {integer} d rounded to d decimal places
     * @returns {module:eclairjs/sql.Column}
     */
    functions.format_number = function(column, d) {
      return generateFunction('format_number', arguments);
    };

    /**
     * Formats the arguments in printf-style and returns the result as a string column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {string} format, printf-style
     * @param {module:eclairjs/sql.Column | string} columnExpr, ...columnExpr or columnName, ...columnName
     * @returns {module:eclairjs/sql.Column}
     */
    functions.format_string = function() {
      return generateFunction('format_string', arguments);
    };

    /**
     * Returns a new string column by converting the first letter of each word to uppercase.
     * Words are delimited by whitespace.
     *
     * For example, "hello world" will become "Hello World".
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.initcap = function(column) {
      return generateFunction('initcap', arguments);
    };

    /**
     * Locate the position of the first occurrence of substr column in the given string.
     * Returns null if either of the arguments are null.
     *
     * NOTE: The position is not zero based, but 1 based index, returns 0 if substr
     * could not be found in str.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {string} substring
     * @returns {module:eclairjs/sql.Column}
     */
    functions.instr = function(column, substring) {
      return generateFunction('instr', arguments);
    };

    /**
     * Computes the length of a given string or binary column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.getLength = function(column) {
      return generateFunction('getLength', arguments);
    };

    /**
     * Converts a string column to lower case.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.lower = function(column) {
      return generateFunction('lower', arguments);
    };

    /**
     * Computes the Levenshtein distance of the two given string columns.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} left
     * @param {module:eclairjs/sql.Column} right
     * @returns {module:eclairjs/sql.Column}
     */
    functions.levenshtein = function(left, right) {
      return generateFunction('levenshtein', arguments);
    };

    /**
     * Locate the position of the first occurrence of substr.
     * NOTE: The position is not zero based, but 1 based index, returns 0 if substr
     * could not be found in str.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {string} substr
     * @param {module:eclairjs/sql.Column} str
     * @param {integer} [pos]
     * @returns {module:eclairjs/sql.Column}
     */
    functions.locate = function(substr, column, pos) {
      return generateFunction('locate', arguments);
    };

    /**
     * Left-pad the string column with
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {integer} len
     * @param {string} pad
     * @returns {module:eclairjs/sql.Column}
     */
    functions.lpad = function(column, len, pad) {
      return generateFunction('lpad', arguments);
    };

    /**
     * Trim the spaces from left end for the specified string value.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.ltrim = function(column) {
      return generateFunction('ltrim', arguments);
    };

    /**
     * Extract a specific(idx) group identified by a regex, from the specified string column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {string} regex
     * @param {integer} groupIdx
     * @returns {module:eclairjs/sql.Column}
     */
    functions.regexp_extract = function(column, regex, groupIdx) {
      return generateFunction('regexp_extract', arguments);
    };

    /**
     * Replace all substrings of the specified string value that match regexp with rep.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {string} pattern
     * @param {string} replacement
     * @returns {module:eclairjs/sql.Column}
     */
    functions.regexp_replace = function(column, pattern, replacement) {
      return generateFunction('regexp_replace', arguments);
    };

    /**
     * Decodes a BASE64 encoded string column and returns it as a binary column.
     * This is the reverse of base64.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.unbase64 = function(column) {
      return generateFunction('unbase64', arguments);
    };

    /**
     * Right-padded with pad to a length of len.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {integer} len
     * @param {string} pad
     * @returns {module:eclairjs/sql.Column}
     */
    functions.rpad = function(column, len, pad) {
      return generateFunction('rpad', arguments);
    };

    /**
     * Repeats a string column n times, and returns it as a new string column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {integer} n
     * @returns {module:eclairjs/sql.Column}
     */
    functions.repeat = function(column, n) {
      return generateFunction('repeat', arguments);
    };

    /**
     * Reverses the string column and returns it as a new string column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.reverse = function(column) {
      return generateFunction('reverse', arguments);
    };

    /**
     * Trim the spaces from right end for the specified string value.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.rtrim = function(column) {
      return generateFunction('rtrim', arguments);
    };

    /**
     * * Return the soundex code for the specified expression.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.soundex = function(column) {
      return generateFunction('soundex', arguments);
    };

    /**
     * Splits str around pattern (pattern is a regular expression).
     * NOTE: pattern is a string represent the regular expression.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {string} pattern
     * @returns {module:eclairjs/sql.Column}
     */
    functions.split = function(column, pattern) {
      return generateFunction('split', arguments);
    };

    /**
     * Substring starts at `pos` and is of length `len` when str is String type or
     * returns the slice of byte array that starts at `pos` in byte and is of length `len`
     * when str is Binary type
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {integer} pos
     * @param {integer} len
     * @returns {module:eclairjs/sql.Column}
     */
    functions.substring = function(column, pos, len) {
      return generateFunction('substring', arguments);
    };

    /**
     * Returns the substring from string str before count occurrences of the delimiter delim.
     * If count is positive, everything the left of the final delimiter (counting from left) is
     * returned. If count is negative, every to the right of the final delimiter (counting from the
     * right) is returned. substring_index performs a case-sensitive match when searching for delim.
     *
     * @param {module:eclairjs/sql.Column} column
     * @param {string} delim
     * @param {integer} count
     * @returns {module:eclairjs/sql.Column}
     */
    functions.substring_index = function(column, delim, count) {
      return generateFunction('substring_index', arguments);
    };

    /**
     * Translate any character in the src by a character in replaceString.
     * The characters in replaceString is corresponding to the characters in matchingString.
     * The translate will happen when any character in the string matching with the character
     * in the matchingString.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {string} matchingString
     * @param {string} replaceString
     * @returns {module:eclairjs/sql.Column}
     */
    functions.translate = function(column, matchingString, replaceString) {
      return generateFunction('translate', arguments);
    };

    /**
     * Trim the spaces from both ends for the specified string column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.trim = function(column) {
      return generateFunction('trim', arguments);
    };

    /**
     * Converts a string column to upper case.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.upper = function(column) {
      return generateFunction('upper', arguments);
    };

    /**
     * Returns the date that is numMonths after startDate.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} startDate
     * @param {integer} numMonths
     * @returns {module:eclairjs/sql.Column}
     */
    functions.add_months = function(startDate, numMonths) {
      return generateFunction('add_months', arguments);
    };

    /**
     * Returns the current date as a date column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @returns {module:eclairjs/sql.Column}
     */
    functions.current_date = function() {
      return generateFunction('current_date', arguments);
    };

    /**
     * Returns the current timestamp as a timestamp column.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @returns {module:eclairjs/sql.Column}
     */
    functions.current_timestamp = function() {
      return generateFunction('current_timestamp', arguments);
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
     * @param {module:eclairjs/sql.Column} dateExpr
     * @param {string} format
     * @returns {module:eclairjs/sql.Column}
     */
    functions.date_format = function(dateExpr, format) {
      return generateFunction('date_format', arguments);
    };

    /**
     * Returns the date that is `days` days after `start`
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} start
     * @param {integer} days
     * @returns {module:eclairjs/sql.Column}
     */
    functions.date_add = function(start, days) {
      return generateFunction('date_add', arguments);
    };

    /**
     * Returns the date that is `days` days before `start`
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} start
     * @param {integer} days
     * @returns {module:eclairjs/sql.Column}
     */
    functions.date_sub = function(start,days) {
      return generateFunction('date_sub', arguments);
    };

    /**
     * Returns the number of days from `start` to `end`.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} end
     * @param {module:eclairjs/sql.Column} start
     * @returns {module:eclairjs/sql.Column}
     */
    functions.datediff = function(end,start) {
      return generateFunction('datediff', arguments);
    };

    /**
     * Extracts the year as an integer from a given date/timestamp/string.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.year = function(column) {
      return generateFunction('year', arguments);
    };

    /**
     * Extracts the quarter as an integer from a given date/timestamp/string.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} e
     * @returns {module:eclairjs/sql.Column}
     */
    functions.quarter = function(column) {
      return generateFunction('quarter', arguments);
    };

    /**
     * Extracts the month as an integer from a given date/timestamp/string.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.month = function(column) {
      return generateFunction('month', arguments);
    };

    /**
     * Extracts the day of the month as an integer from a given date/timestamp/string.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.dayofmonth = function(column) {
      return generateFunction('dayofmonth', arguments);
    };

    /**
     * Extracts the day of the year as an integer from a given date/timestamp/string.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.dayofyear = function(column) {
      return generateFunction('dayofyear', arguments);
    };

    /**
     * Extracts the hours as an integer from a given date/timestamp/string.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.hour = function(column) {
      return generateFunction('hour', arguments);
    };

    /**
     * Given a date column, returns the last day of the month which the given date belongs to.
     * For example, input "2015-07-27" returns "2015-07-31" since July 31 is the last day of the
     * month in July 2015.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.last_day = function(column) {
      return generateFunction('last_day', arguments);
    };

    /**
     * Extracts the minutes as an integer from a given date/timestamp/string.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.minute = function(column) {
      return generateFunction('minute', arguments);
    };

    /**
     * Extracts the months between date1 and date2
     * @param {module:eclairjs/sql.Column} date1
     * @param {module:eclairjs/sql.Column} date2
     * @returns {module:eclairjs/sql.Column}
     */
    functions.months_between = function(date1, date2) {
      return generateFunction('months_between', arguments);
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
     * @param {module:eclairjs/sql.Column} date
     * @param {string} dayOfWeek, Day of the week parameter is case insensitive, and accepts: "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun".
     * @returns {module:eclairjs/sql.Column}
     */
    functions.next_day = function(date, dayOfWeek) {
      return generateFunction('next_day', arguments);
    };

    /**
     * Extracts the seconds as an integer from a given date/timestamp/string.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.second = function(column) {
      return generateFunction('second', arguments);
    };

    /**
     * Extracts the week number as an integer from a given date/timestamp/string.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.weekofyear = function(column) {
      return generateFunction('weekofyear', arguments);
    };

    /**
     * Converts the number of seconds from unix epoch (1970-01-01 00:00:00 UTC) to a string
     * representing the timestamp of that moment in the current system time zone in the given
     * format.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} ut
     * @param {string} [f] data format example: "yyyy-MM-dd"
     * @returns {module:eclairjs/sql.Column}
     */
    functions.from_unixtime = function(column, format) {
      return generateFunction('from_unixtime', arguments);
    };

    /**
     * Gets current Unix timestamp in seconds. if not arguments are specified
     *
     * Convert time string with given pattern
     * (see [http://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html])
     * to Unix time stamp (in seconds), return null if fail.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} [s] converts time string in format yyyy-MM-dd HH:mm:ss to Unix timestamp (in seconds),
     * using the default timezone and the default locale, return null if fail.
     * @param {string} [p] convert time string with given pattern
     * (see [http://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html]) to Unix time stamp (in seconds), return null if fail.
     * @returns {module:eclairjs/sql.Column}
     */
    functions.unix_timestamp = function(column, pattern) {
      return generateFunction('unix_timestamp', arguments);
    };

    /**
     * Converts the column into DateType.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.to_date = function(column) {
      return generateFunction('to_date', arguments);
    };

    /**
     * Returns date truncated to the unit specified by the format.
     *
     * @param {module:eclairjs/sql.Column} date
     * @param {string} format : 'year', 'yyyy', 'yy' for truncate by year,
     *               or 'month', 'mon', 'mm' for truncate by month
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @returns {module:eclairjs/sql.Column}
     */
    functions.trunc = function(date, format) {
      return generateFunction('trunc', arguments);
    };

    /**
     * Assumes given timestamp is UTC and converts to given timezone.
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} ts
     * @param {string} tz
     * @returns {module:eclairjs/sql.Column}
     */
    functions.from_utc_timestamp = function(ts, tz) {
      return generateFunction('from_utc_timestamp', arguments);
    };

    /**
     * Assumes given timestamp is in given timezone and converts to UTC.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} ts
     * @param {string} tz
     * @returns {module:eclairjs/sql.Column}
     */
    functions.to_utc_timestamp = function(ts, tz) {
      return generateFunction('to_utc_timestamp', arguments);
    };

    /**
     * Returns true if the array contain the value
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @param {string | number} value
     * @returns {module:eclairjs/sql.Column}
     */
    functions.array_contains = function(column, value) {
      return generateFunction('array_contains', arguments);
    };

    /**
     * Creates a new row for each element in the given array or map column.
     *
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.explode = function(column) {
      return generateFunction('explode', arguments);
    };

    /**
     * Returns length of array or map.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} column
     * @returns {module:eclairjs/sql.Column}
     */
    functions.size = function(column) {
      return generateFunction('size', arguments);
    };

    /**
     * Sorts the input array for the given column in ascending / descending order,
     * according to the natural ordering of the array elements.
     *
     * @since EclairJS 0.1 Spark  1.5.0
     * @param {module:eclairjs/sql.Column} e
     * @param {boolean} [asc] defaults to true
     * @returns {module:eclairjs/sql.Column}
     */
    functions.sort_array = function(column, asc) {
      return generateFunction('sort_array', arguments);
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
    functions.udf = function(f) {
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
     * @returns {module:eclairjs/sql.Column}
     */
    functions.callUDF = function(udfName,cols) {
      throw "not implemented by ElairJS";
    };

    functions.moduleLocation = '/sql/functions';

    return functions;
  })();
};