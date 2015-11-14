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

var protocol = require('../kernel.js');
var Utils = require('../utils.js');

var RDD = require('../RDD.js');
var Column = require('./Column.js');

/**
 * A distributed collection of data organized into named columns. A DataFrame is equivalent to a relational table in Spark SQL.
 * @constructor
 */
function DataFrame(kernelP, refIdP, rowRDD, schema) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  this.rowRDD = rowRDD;
  this.schema = schema;
}

/**
 * Registers this DataFrame as a temporary table using the given name.
 * @param {string} tableName
 * @returns {Promise.<Array>} A Promise that resolves when the temp tample has been created.
 */
DataFrame.prototype.registerTempTable = function(tableName) {
  var self = this;

  return new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = '{{dataFrameId}}.registerTempTable("{{tableName}}");';
      var code = Utils.processTemplate(templateStr, {
        dataFrameId: dataFrameId,
        tableName: tableName
      });

      protocol.verifyAssign(kernel.execute({code: code, silent: false}), resolve, reject);
    }).catch(reject);
  });
};

/**
 * Returns a RDD object.
 * @returns {RDD}
 */
DataFrame.prototype.toRDD = function() {
  var refId = protocol.genVariable('rdd');
  var self = this;

  return new RDD(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{dataFrameId}}.toRDD();';
      var code = Utils.processTemplate(templateStr, {refId: refId, dataFrameId: dataFrameId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Selects column based on the column name and return it as a Column.
 * @param {string} name
 * @returns {Column}
 */
DataFrame.prototype.col = function(name) {
  var refId = protocol.genVariable('column');
  var self = this;

  return new Column(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.col("{{name}}");';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, name: name});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }), name);
};

/**
 * Returns all column names as an array.
 * @returns {string[]}
 */
DataFrame.prototype.columns = function() {
  var self = this;

  return new Promise(function(resolve, reject) {

    function _resolve(result) {
      try {
        // columns() returns a stringified json result so parse it here
        resolve(JSON.parse(result));
      } catch (e) {
        var err = new Error("Parse Error: "+ e.message);
        reject(err);
      }
    }

    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var refId = values[0];
      var kernel = values[1];

      var templateStr = 'JSON.stringify({{inRefId}}.columns());';
      var code = Utils.processTemplate(templateStr, {inRefId: refId});
      protocol.verifyResult(kernel.execute({code: code}), _resolve, reject);
    }).catch(reject);
  })
};

/**
 * Filters rows using the given SQL expression string or Filters rows using the given Column..
 * @param {string | Column}
 * @returns {DataFrame}
 */
DataFrame.prototype.filter = function(arg) {
  var refId = protocol.genVariable('DataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    var promises = [self.kernelP, self.refIdP];

    // we have a column, so we need to resolve its refId
    if (typeof arg == 'Object') {
      promises.push(arg.refIdP)
    }

    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // if not a Column then its a sql string
      var filterArg = values[2] ? values[2] : arg;

      // different template for string or object
      var templateStr = typeof arg == 'object' ? 'var {{refId}} = {{inRefId}}.filter({{filterArg}});' : 'var {{refId}} = {{inRefId}}.filter("{{filterArg}}");';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, filterArg: filterArg});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

module.exports = DataFrame;
