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
var RDD = require('../RDD.js');
var DataFrame = require('./DataFrame.js');

/**
 * @constructor
 * @classdesc Interface used to write a DataFrame to external storage systems (e.g. file systems, key-value stores, etc).
 * Use DataFrame.write to access this.
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
 * @returns {DataFrameWriter}
 */
DataFrameWriter.prototype.format = function(source) {
  var templateStr = 'var {{refId}} = {{inRefId}}.format({{source}});';

 return Utils.generateAssignment(this, DataFrameWriter, templateStr, {source: Utils.prepForReplacement(source)});
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
  var templateStr = '{{inRefId}}.insertInto({{tableName}});';
  return Utils.generateVoidPromise(this, templateStr, {tableName : Utils.prepForReplacement(tableName)});
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
  var templateStr = '{{inRefId}}.jdbc({{url}}, {{table}}, {{connectionProperties}});';
  return Utils.generateVoidPromise(this, templateStr, {url: Utils.prepForReplacement(url), table: Utils.prepForReplacement(table), connectionProperties: JSON.stringify(connectionProperties)});
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
  var templateStr = '{{inRefId}}.json({{path}});';

  return Utils.generateVoidPromise(this, templateStr, {path: Utils.prepForReplacement(path)});
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
 * @returns {DataFrameWriter}
 */
DataFrameWriter.prototype.mode = function(saveMode) {
  var templateStr = '{{inRefId}}.mode({{saveMode}});';

  return Utils.generateVoidPromise(this, templateStr, {saveMode: Utils.prepForReplacement(saveMode)});
};

/**
 * Adds an input option for the underlying data source.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} key
 * @param {string} value
 * @returns {DataFrameWriter}
 */
DataFrameWriter.prototype.option = function(key, value) {
  var templateStr = 'var {{refId}} = {{inRefId}}.option({{key}}, {{value}});';

  return Utils.generateAssignment(this, DataFrameWriter, templateStr, {key: Utils.prepForReplacement(key), value : Utils.prepForReplacement(value)});
};

/**
 * Adds input options for the underlying data source.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Map} options
 * @returns {DataFrameWriter}
 */
DataFrameWriter.prototype.options = function(options) {
  var templateStr = 'var {{refId}} = {{inRefId}}.options({{options}});';

  return Utils.generateAssignment(this, DataFrameWriter, templateStr, {options: JSON.stringify(options)});
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
  var templateStr = '{{inRefId}}.parquet({{path}});';
  return Utils.generateVoidPromise(this, templateStr, {path: Utils.prepForReplacement(path)});
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
  var templateStr = '{{inRefId}}.orc({{path}});';
  return Utils.generateVoidPromise(this, templateStr, {path: Utils.prepForReplacement(path)});
};

/**
 * Partitions the output by the given columns on the file system. If specified, the output is
 * laid out on the file system similar to Hive's partitioning scheme.
 *
 * This is only applicable for Parquet at the moment.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} colName,...colName
 * @returns {DataFrameWriter}
 */
DataFrameWriter.prototype.partitionBy = function(colNames) {
  var args = Array.prototype.slice.call(arguments);

  var templateStr = 'var {{refId}} = {{inRefId}}.partitionBy({{colNames}});';

  var cols = [];
  args.forEach(function(arg) {
    cols.push(Utils.prepForReplacement(arg));
  });

 return Utils.generateAssignment(this, DataFrameWriter, templateStr, {colNames: cols.join(',')});
};

/**
 * Saves the content of the {@link DataFrame} as the specified table.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {string} path Optional
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrameWriter.prototype.save = function(path) {
  var templateStr = path ? '{{inRefId}}.save({{path}});' : '{{inRefId}}.save();';

 return Utils.generateVoidPromise(this, templateStr, {path: Utils.prepForReplacement(path)});
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
  var templateStr = '{{inRefId}}.saveAsTable({{tableName}});';

  return Utils.generateVoidPromise(this, templateStr, {tableName: Utils.prepForReplacement(tableName)});
};



module.exports = DataFrameWriter;
