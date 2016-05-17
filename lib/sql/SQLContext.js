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

var RDD = require('../rdd/RDD.js');
var Utils = require('../utils.js');

var DataFrame = require('./DataFrame.js');
var DataFrameReader = require('./DataFrameReader.js');

/**
 * @constructor
 * @memberof module:eclairjs/sql
 * @classdesc  The entry point for working with structured data (rows and columns) in Spark.
 * Allows the creation of DataFrame objects as well as the execution of SQL queries.
 * @param {module:eclairjs.SparkContext}
 * @since EclairJS 0.1 Spark  1.0.0
 */
function SQLContext(SparkContext) {
  this.context = SparkContext;

  this.kernelP = this.context.kernelP;

  var self = this;

  var args = {
    target: SQLContext,
    args: [{value: SparkContext}],
    kernelP: this.kernelP
  };

  this.refIdP = Utils.generateConstructor(args);
}

/**
 * Creates a DataFrame from RDD of Rows using the schema
 * @param {module:eclairjs/rdd.RDD[]} rowRDD -
 * @param {module:eclairjs/sql/types.StructType} schema -
 * @returns {module:eclairjs/sql.DataFrame}
 */
SQLContext.prototype.createDataFrame = function(rowRDD, schema) {
  var args = {
    target: this,
    method: 'createDataFrame',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
    
  };

  return Utils.generate(args);
};

/**
 * Returns DataFrameReader
 * @returns {module:eclairjs/sql.DataFrameReader}
 */
SQLContext.prototype.read = function() {
  var args = {
    target: this,
    method: 'read',
    returnType: DataFrameReader
  };

  return Utils.generate(args);
};

/**
 * Returns DataFrame
 * @param {string} sqlString
 * @returns {module:eclairjs/sql.DataFrame}
 */
SQLContext.prototype.sql = function(sqlString) {
  var args = {
    target: this,
    method: 'sql',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
  };

  return Utils.generate(args);
};

SQLContext.moduleLocation = '/sql/SQLContext';

module.exports = SQLContext;