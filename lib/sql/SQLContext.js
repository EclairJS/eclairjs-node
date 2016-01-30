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

var gw = require('jupyter-js-services');
var RDD = require('../RDD.js');
var protocol = require('../kernel.js');
var Utils = require('../utils.js');
var request = require('request');

var DataTypes = require('./types/DataTypes.js');
var DataFrame = require('./DataFrame.js');
var DataFrameReader = require('./DataFrameReader.js');

/**
 * @constructor
 * @classdesc The entry point for working with structured data (rows and columns) in Spark.  Allows the creation of DataFrame objects as well as the execution of SQL queries.
 * @param {SparkContext}
 */
function SQLContext(SparkContext) {
  this.context = SparkContext;

  this.kernelP = this.context.kernelP;

  this.types = {};
  this.types.DataTypes = new DataTypes(this.kernelP);

  var self = this;

  this.refIdP = new Promise(function(resolve, reject) {
    // generate the SQLContext source code
    self.context.kernelP.then(function(kernel) {
      var refId = "sqlContext";
      var templateStr = 'var {{refId}} = new SQLContext(jsc);';
      var code = Utils.processTemplate(templateStr, {refId: refId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    });
  });
}

/**
 * Creates a DataFrame from RDD of Rows using the schema
 * @param {RDD[]} rowRDD -
 * @param {StructType} schema -
 * @returns {DataFrame}
 */
SQLContext.prototype.createDataFrame = function(rowRDD, schema) {
  var templateStr = 'var {{refId}} = {{inRefId}}.createDataFrame({{rowRDD}}, {{schema}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {rowRDD: Utils.prepForReplacement(rowRDD), schema: Utils.prepForReplacement(schema)});
};

/**
 * Returns DataFrameReader
 * @returns {DataFrameReader}
 */
SQLContext.prototype.read = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.read();';

  return Utils.generateAssignment(this, DataFrameReader, templateStr);
};

/**
 * Returns DataFrame
 * @param {string} sqlString
 * @returns {DataFrame}
 */
SQLContext.prototype.sql = function(sqlString) {
  var templateStr = 'var {{refId}} = {{inRefId}}.sql({{sqlString}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {sqlString: Utils.prepForReplacement(sqlString)});
};

module.exports = SQLContext;
