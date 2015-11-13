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

var DataTypes = require('./DataTypes.js');
var DataFrame = require('./DataFrame.js');

/**
 * The entry point for working with structured data (rows and columns) in Spark.
 * Allows the creation of DataFrame objects as well as the execution of SQL queries.
 *
 * @constructor
 * @param {SparkContext}
 */
function SQLContext(SparkContext) {
  this.context = SparkContext;

  this.types = {};
  this.types.DataTypes = new DataTypes(this.context.kernel);

  var self = this;

  this.sqlContextP = new Promise(function(resolve, reject) {
    // generate the SQLContext source code
    self.context.kernel.then(function(kernel) {
      var refId = "sqlContext";
      var templateStr = 'var {{refId}} = new SQLContext(jsc);';
      var code = Utils.processTemplate(templateStr, {refId: refId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    });
  });
};

/**
 * Creates a DataFrame from RDD of Rows using the schema
 * @param {RDD[]} rowRDD -
 * @param {StructType} schema -
 * @returns {DataFrame}
 */
SQLContext.prototype.createDataFrame = function(rowRDD, schema) {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.context.kernel, new Promise(function(resolve, reject) {
    Promise.all([self.context.kernel, self.sqlContextP]).then(function(values) {
      var kernel = values[0];
      var sqlContextId = values[1];

      // gather all the refIds of the arguments(which are promises)
      var promises = [rowRDD.refIdP, schema.refIdP];

      Promise.all(promises).then(function(values) {
        var templateStr = 'var {{refId}} = {{sqlContextId}}.createDataFrame({{rowRDD}}, {{schema}});';
        var code = Utils.processTemplate(templateStr, {
          refId: refId,
          sqlContextId: sqlContextId,
          rowRDD: values[0],
          schema: values[1]
        });

        protocol.verifyAssign(kernel.execute({code: code, silent: false}),
          resolve,
          reject,
          refId);
      }).catch(reject);
    })
  }), rowRDD, schema);
};

/**
 * Returns DataFrame
 * @param {string} sqlString
 * @returns {DataFrame}
 */
SQLContext.prototype.sql = function(sqlString) {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.context.kernel, new Promise(function(resolve, reject) {
    Promise.all([self.context.kernel, self.sqlContextP]).then(function(values) {
      var kernel = values[0];
      var sqlContextId = values[1];

      var templateStr = 'var {{refId}} = {{sqlContextId}}.sql("{{sqlString}}");';
      var code = Utils.processTemplate(templateStr, {
        refId: refId,
        sqlContextId: sqlContextId,
        sqlString: sqlString
      });

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

module.exports = SQLContext;
