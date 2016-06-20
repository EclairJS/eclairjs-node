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
 * :: Experimental ::
 * Interface used to write a {@link DataFrame} to external storage systems (e.g. file systems,
 * key-value stores, etc). Use {@link write} to access this.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @constructor
 * @memberof module:eclairjs/sql
 * @classdesc
 */
function DataFrameWriter(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Specifies the underlying output data source. Built-in options include "parquet", "json", etc.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} source
 * @returns {module:eclairjs/sql.DataFrameWriter}
 */
DataFrameWriter.prototype.format = function(source) {
  var args = {
    target: this,
    method: 'format',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrameWriter
  };

  return Utils.generate(args);
};

/**
 * Inserts the content of the {@link DataFrame} to the specified table. It requires that
 * the schema of the {@link DataFrame} is the same as the schema of the table.
 *
 * Because it inserts data to an existing table, format or options will be ignored.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} tableName
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrameWriter.prototype.insertInto = function(tableName) {
  var args = {
    target: this,
    method: 'insertInto',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Saves the content of the {@link DataFrame} to a external database table via JDBC. In the case the
 * table already exists in the external database, behavior of this function depends on the
 * save mode, specified by the `mode` function (default to throwing an exception).
 *
 * Don't create too many partitions in parallel on a large cluster; otherwise Spark might crash
 * your external database systems.
 *
 * @param {string} url  JDBC database url of the form `jdbc:subprotocol:subname`
 * @param {string} table  Name of the table in the external database.
 * @param {object} connectionProperties  JDBC database connection arguments, a list of arbitrary string
 *                             tag/value. Normally at least a "user" and "password" property
 *                             should be included.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrameWriter.prototype.jdbc = function(url,table,connectionProperties) {
  var args = {
    target: this,
    method: 'jdbc',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Saves the content of the {@link DataFrame} in JSON format at the specified path.
 * This is equivalent to:
 * @example
 *   format("json").save(path)
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} path
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrameWriter.prototype.json = function(path) {
  var args = {
    target: this,
    method: 'json',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Specifies the behavior when data or table already exists. Options include:
 *   - `overwrite`: overwrite the existing data.
 *   - `append`: append the data.
 *   - `ignore`: ignore the operation (i.e. no-op).
 *   - `error`: default option, throw an exception at runtime.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} saveMode
 * @returns {module:eclairjs/sql.DataFrameWriter}
 */
DataFrameWriter.prototype.mode = function(saveMode) {
  var args = {
    target: this,
    method: 'mode',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrameWriter
  };

  return Utils.generate(args);
};

/**
 * Adds an input option for the underlying data source.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} key
 * @param {string} value
 * @returns {module:eclairjs/sql.DataFrameWriter}
 */
DataFrameWriter.prototype.option = function(key, value) {
  var args = {
    target: this,
    method: 'option',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrameWriter
  };

  return Utils.generate(args);
};

/**
 * Adds input options for the underlying data source.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Map} options
 * @returns {module:eclairjs/sql.DataFrameWriter}
 */
DataFrameWriter.prototype.options = function(options) {
  var args = {
    target: this,
    method: 'options',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrameWriter
  };

  return Utils.generate(args);
};

/**
 * Saves the content of the {@link DataFrame} in Parquet format at the specified path.
 * This is equivalent to:
 * @example
 *   format("parquet").save(path)
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} path
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrameWriter.prototype.parquet = function(path) {
  var args = {
    target: this,
    method: 'parquet',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Saves the content of the {@link DataFrame} in ORC format at the specified path.
 * This is equivalent to:
 * @example
 *   format("orc").save(path)
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @note Currently, this method can only be used together with `HiveContext`.
 * @param {string} path
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrameWriter.prototype.orc = function(path) {
  var args = {
    target: this,
    method: 'orc',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Partitions the output by the given columns on the file system. If specified, the output is
 * laid out on the file system similar to Hive's partitioning scheme.
 *
 * This is only applicable for Parquet at the moment.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} colName,...colName
 * @returns {module:eclairjs/sql.DataFrameWriter}
 */
DataFrameWriter.prototype.partitionBy = function(colNames) {
  var args = {
    target: this,
    method: 'partitionBy',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrameWriter
  };

  return Utils.generate(args);
};

/**
 * Saves the content of the {@link DataFrame} as the specified table.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} [path] Saves the content of the {@link DataFrame} at the specified path.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrameWriter.prototype.save = function(path) {
  var args = {
    target: this,
    method: 'save',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Saves the content of the {@link DataFrame} as the specified table.
 *
 * In the case the table already exists, behavior of this function depends on the
 * save mode, specified by the `mode` function (default to throwing an exception).
 * When `mode` is `Overwrite`, the schema of the {@link DataFrame} does not need to be
 * the same as that of the existing table.
 * When `mode` is `Append`, the schema of the {@link DataFrame} need to be
 * the same as that of the existing table, and format or options will be ignored.
 *
 * When the DataFrame is created from a non-partitioned {@link HadoopFsRelation} with a single input
 * path, and the data source provider can be mapped to an existing Hive builtin SerDe (i.e. ORC
 * and Parquet), the table is persisted in a Hive compatible format, which means other systems
 * like Hive will be able to read this table. Otherwise, the table is persisted in a Spark SQL
 * specific format.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} tableName
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrameWriter.prototype.saveAsTable = function(tableName) {
  var args = {
    target: this,
    method: 'saveAsTable',
    args: Utils.wrapArguments(arguments),
  };

  return Utils.generate(args);
};

DataFrameWriter.moduleLocation = '/sql/DataFrameWriter';

module.exports = DataFrameWriter;