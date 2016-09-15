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

/**
 * @classdesc
 * A set of methods for aggregations on a [[DataFrame]], created by {@link groupBy}.
 *
 * The main method is the agg function, which has multiple variants. This class also contains
 * convenience some first order statistics such as mean, sum for convenience.
 *
 * This class was named `GroupedData` in Spark 1.x.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @class
 * @memberof module:eclairjs/sql
 */

function RelationalGroupedDataset(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Compute aggregates by specifying a series of aggregate columns. Note that this function by default retains the grouping columns in its output.
 * To not retain grouping columns, set spark.sql.retainGroupColumns to false.
 * The available aggregate methods are defined in {@link functions}.
 * @example
 * // Java:
 * df.groupBy("department").agg(max("age"), sum("expense"));
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {module:eclairjs/sql.Column | string} columnExpr,...columnExpr or columnName, ...columnName
 * @returns module:eclairjs/sql.Dataset}
 */
RelationalGroupedDataset.prototype.agg = function() {
  var Dataset = require('./Dataset');

  var args = {
    target: this,
    method: 'agg',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Count the number of rows for each group.
 * The resulting {@link DataFrame} will also contain the grouping columns.
 *
 * @since EclairJS 0.7 Spark  1.3.0
 * @returns module:eclairjs/sql.Dataset}
 */
RelationalGroupedDataset.prototype.count = function() {
  var Dataset = require('./Dataset'); //(this.kernelP);

  var args = {
    target: this,
    method: 'count',
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Compute the average value for each numeric columns for each group. This is an alias for `avg`.
 * The resulting {@link DataFrame} will also contain the grouping columns.
 * When specified columns are given, only compute the average values for them.
 *
 * @since EclairJS 0.7 Spark  1.3.0
 * @param {string} colNames...
 * @returns module:eclairjs/sql.Dataset}
 */
RelationalGroupedDataset.prototype.mean = function(colNames) {
  var Dataset = require('./Dataset');

  var args = {
    target: this,
    method: 'mean',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Compute the max value for each numeric columns for each group.
 * The resulting {@link DataFrame} will also contain the grouping columns.
 * When specified columns are given, only compute the max values for them.
 *
 * @since EclairJS 0.7 Spark  1.3.0
 * @param {...string} colNames
 * @returns module:eclairjs/sql.Dataset}
 */
RelationalGroupedDataset.prototype.max = function(colNames) {
  var Dataset = require('./Dataset');

  var args = {
    target: this,
    method: 'max',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Compute the mean value for each numeric columns for each group.
 * The resulting {@link DataFrame} will also contain the grouping columns.
 * When specified columns are given, only compute the mean values for them.
 *
 * @since EclairJS 0.7 Spark  1.3.0
 * @param {...string} colNames
 * @returns module:eclairjs/sql.Dataset}
 */
RelationalGroupedDataset.prototype.avg = function(colNames) {
  var Dataset = require('./Dataset');

  var args = {
    target: this,
    method: 'avg',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Compute the min value for each numeric column for each group.
 * The resulting {@link DataFrame} will also contain the grouping columns.
 * When specified columns are given, only compute the min values for them.
 *
 * @since EclairJS 0.7 Spark  1.3.0
 * @param {...string} colNames
 * @returns module:eclairjs/sql.Dataset}
 */
RelationalGroupedDataset.prototype.min = function(colNames) {
  var Dataset = require('./Dataset');

  var args = {
    target: this,
    method: 'min',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Compute the sum for each numeric columns for each group.
 * The resulting {@link DataFrame} will also contain the grouping columns.
 * When specified columns are given, only compute the sum for them.
 *
 * @since EclairJS 0.7 Spark  1.3.0
 * @param {...string} colNames
 * @returns module:eclairjs/sql.Dataset}
 */
RelationalGroupedDataset.prototype.sum = function(colNames) {
  var Dataset = require('./Dataset');

  var args = {
    target: this,
    method: 'sum',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Pivots a column of the current {@link DataFrame} and perform the specified aggregation.
 * There are two versions of pivot function: one that requires the caller to specify the list
 * of distinct values to pivot on, and one that does not. The latter is more concise but less
 * efficient, because Spark needs to first compute the list of distinct values internally.
 *
 * @example
 *   // Compute the sum of earnings for each year by course with each course as a separate column
 *   df.groupBy("year").pivot("course", new List(["dotNET", "Java"])).sum("earnings")
 *
 *   // Or without specifying column values (less efficient)
 *   df.groupBy("year").pivot("course").sum("earnings")
 *
 *
 * @param {string} pivotColumn  Name of the column to pivot.
 * @param {module:eclairjs.List} [values]  List of values that will be translated to columns in the output DataFrame.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {module:eclairjs/sql.RelationalGroupedDataset}
 */
RelationalGroupedDataset.prototype.pivot = function(pivotColumn) {
  var args = {
    target: this,
    method: 'pivot',
    args: Utils.wrapArguments(arguments),
    returnType: RelationalGroupedDataset
  };

  return Utils.generate(args);
};

RelationalGroupedDataset.moduleLocation = '/sql/RelationalGroupedDataset';

module.exports = RelationalGroupedDataset;