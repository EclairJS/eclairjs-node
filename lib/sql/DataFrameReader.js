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
var RDD = require('../rdd/RDD.js');
var DataFrame = require('./DataFrame.js');

/**
 * @constructor
 * @memberof module:eclairjs/sql
 * @classdesc Interface used to load a DataFrame from external storage systems (e.g. file systems, key-value stores, etc).
 * Use SQLContext.read to access this.
 */
function DataFrameReader(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Specifies the input data source format.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string}
 * @returns {module:eclairjs/sql.DataFrameReader}
 */
DataFrameReader.prototype.format = function(source) {
  var args = {
    target: this,
    method: 'format',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrameReader
  };

  return Utils.generate(args);
};

/**
 * Specifies the input schema. Some data sources (e.g. JSON) can infer the input schema
 * automatically from data. By specifying the schema here, the underlying data source can
 * skip the schema inference step, and thus speed up data loading.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {module:eclairjs/sql/types.StructType}
 * @returns {module:eclairjs/sql.DataFrameReader}
 */
DataFrameReader.prototype.schema = function(schema) {
  var args = {
    target: this,
    method: 'schema',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrameReader
  };

  return Utils.generate(args);
};

/**
 * Adds an input option for the underlying data source.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} key
 * @param {string} value
 * @returns {module:eclairjs/sql.DataFrameReader}
 */
DataFrameReader.prototype.option = function(key, value) {
  var args = {
    target: this,
    method: 'option',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrameReader
  };

  return Utils.generate(args);
};

/**
 * Adds input options for the underlying data source.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Map}
 * @returns {module:eclairjs/sql.DataFrameReader}
 */
DataFrameReader.prototype.options = function(options) {
  var args = {
    target: this,
    method: 'options',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrameReader
  };

  return Utils.generate(args);
};

/**
 * Loads input in as a {@link DataFrame}
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} [path] Loads data sources that require a path (e.g. data backed by
 * a local or distributed file system). If not specified loads data sources that don't require a path (e.g. external
 * key-value stores).
 * @returns {module:eclairjs/sql.DataFrame}
 */
DataFrameReader.prototype.load = function(path) {
  var args = {
    target: this,
    method: 'load',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Construct a {@link DataFrame} representing the database table accessible via JDBC URL
 * @example
 * // url named table and connection properties.
 * var url="jdbc:mysql://localhost:3306/eclairjstesting";
 * var table = "people";
 * var connectionProperties = {"user" : "root", "password": "mypassword"};
 * var predicates = ["age > 20"];
 *
 * // url named table and connection properties.
 * var peopleDF = sqlContext.read().jdbc(url, table, connectionProperties);
 *
 * // or
 * // Partitions of the table will be retrieved in parallel based on the parameters
 * // passed to this function.
 * // Don't create too many partitions in parallel on a large cluster; otherwise Spark might crash
 * //your external database systems.
 * var peopleDF = sqlContext.read().jdbc(url,table,columnName,lowerBound,upperBound,numPartitions,connectionProperties);
 *
 * // or
 * // url named table using connection properties. The `predicates` parameter gives a list
 * // expressions suitable for inclusion in WHERE clauses; each one defines one partition of the {@link DataFrame}.
 * // Don't create too many partitions in parallel on a large cluster; otherwise Spark might crash
 * // your external database systems.
 * var peopleDF = sqlContext.read().jdbc(url,table,predicates,connectionProperties);
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} url
 * @param {string} table
 * @param {object | string | string[]} connectionPropertiesMap|columnName|predicates
 * If connectionPropertiesMap connectionProperties  JDBC database connection arguments, a map of arbitrary string tag/value.
 * Normally at least a "user" and "password" property should be included.
 * If columnName  the name of a column of integral type that will be used for partitioning.
 * If predicates Condition in the where clause for each partition.
 * @param {number | object} lowerBound|connectionPropertiesMap
 * If lowerBound the minimum value of `columnName` used to decide partition stride
 * If connectionProperties  JDBC database connection arguments, a list of arbitrary string
 * tag/value. Normally at least a "user" and "password" property should be included.
 * @param {number} upperBound  the maximum value of `columnName` used to decide partition stride
 * @param {number} numPartitions  the number of partitions.  the range `minValue`-`maxValue` will be split
 *                      evenly into this many partitions
 * @param {object} connectionProperties  JDBC database connection arguments, a list of arbitrary string
 *                             tag/value. Normally at least a "user" and "password" property
 *                             should be included.

 * @returns {module:eclairjs/sql.DataFrame}
 */
DataFrameReader.prototype.jdbc = function() {
  var args = {
    target: this,
    method: 'jdbc',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Loads a JSON file, or RDD[String] storing JSON objects (one object per line) and returns the result as a DataFrame.
 * @param {string | RDD}
 * @returns {module:eclairjs/sql.DataFrame}
 */
DataFrameReader.prototype.json = function(input) {
  var args = {
    target: this,
    method: 'json',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Loads a Parquet file, returning the result as a {@link DataFrame}. This function returns an empty
 * {@link DataFrame} if no paths are passed in.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} paths,...paths
 * @returns {module:eclairjs/sql.DataFrame}
 */
DataFrameReader.prototype.parquet = function() {
  var args = {
    target: this,
    method: 'parquet',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Loads an ORC file and returns the result as a {@link DataFrame}.
 *
 * @param {string} path  input path
 * @since EclairJS 0.1 Spark  1.5.0
 * @note Currently, this method can only be used together with `HiveContext`.
 * @returns {module:eclairjs/sql.DataFrame}
 */
DataFrameReader.prototype.orc = function(path) {
  var args = {
    target: this,
    method: 'orc',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Returns the specified table as a {@link DataFrame}.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string}
 * @returns {module:eclairjs/sql.DataFrame}
 */
DataFrameReader.prototype.table = function(tableName) {
  var args = {
    target: this,
    method: 'table',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Loads text files and returns a {@link Dataset} of String. See the documentation on the
 * other overloaded `textFile()` method for more details.
 * @since EclairJS 0.5 Spark  2.0.0
 * @param {string} path
 * @returns {module:eclairjs/sql.Dataset}
 */
DataFrameReader.prototype.textFile = function(path) {
  var Dataset = require('./Dataset');

  var args = {
    target: this,
    method: 'textFile',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

module.exports = DataFrameReader;