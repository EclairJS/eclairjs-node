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
var serialize = require('../serialize.js');

var RDD = require('../RDD.js');
var Column = require('./Column.js');
var Row = require('./Row.js');

/**
 * @constructor
 * @classdesc A distributed collection of data organized into named columns. A DataFrame is equivalent to a relational table in Spark SQL.
 */
function DataFrame(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
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
 * Returns the number of rows in the DataFrame.
 * @returns {integer}
 */
DataFrame.prototype.count = function() {
  var self = this;

  return new Promise(function(resolve, reject) {

    function _resolve(count) {
      resolve(parseInt(count));
    }

    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var refId = values[0];
      var kernel = values[1];

      var templateStr = '{{inRefId}}.count();';
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
    if (typeof arg == 'object') {
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

/**
 * Filters rows using the given Column
 * @param {Column} col
 * @returns {DataFrame}
 */
DataFrame.prototype.filterWithColumn = function(col) {
  return this.filter(col);
};

/**
 * Filters rows using the given SQL expression string
 * @param {string} columnExpr
 * @returns {DataFrame}
 */
DataFrame.prototype.filterWithString = function(columnExpr) {
  return this.filter(col);
};

/**
 * Returns a new RDD by first applying a function to all rows of this DataFrame, and then flattening the results.
 * @param {function} func
 * @returns {RDD}
 */
DataFrame.prototype.flatMap = function(func) {
  var refId = protocol.genVariable('rdd');
  var self = this;

  return new RDD(this.kernelP, new Promise(function(resolve, reject) {
    var udfP = (typeof func === 'function') ? serialize.serializeFunction(func) : Promise.resolve(func);

    Promise.all([self.kernelP, self.refIdP, udfP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];
      var udf = values[2];

      var templateStr = 'var {{refId}} = {{dataFrameId}}.flatMap({{udf}});';
      var code = Utils.processTemplate(templateStr, {refId: refId, dataFrameId: dataFrameId, udf: udf});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Groups the DataFrame using the specified columns, so we can run aggregation on them
 * @param {string[] | Column[]} - Array of Column objects of column name strings
 * @returns {GroupedData}
 */
DataFrame.prototype.groupBy = function() {
  var args = Array.prototype.slice.call(arguments);

  var refId = protocol.genVariable('groupedData');
  var self = this;

  var GroupedData = require('./GroupedData.js');

  return new GroupedData(this.kernelP, new Promise(function(resolve, reject) {
    var promises = [self.kernelP, self.refIdP];

    // we have columns, so we need to resolve their refIds
    if(typeof args[0] === 'object') {
      args.forEach(function(arg) {
        promises.push(arg.refIdP);
      });
    }

    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // if not a Column then its a sql string
      var colIds = [];

      if (values[2]) {
        // we had an array of cols
        for (var i = 2; i < values.length; i++) {
          colIds.push(values[i]);
        }
      } else {
        // array of col ids
        args.forEach(function(colId) {
          // we need to surround the ids with "
          colIds.push('"' + colId + '"');
        });
      }

      // different template for string or object
      var templateStr = 'var {{refId}} = {{inRefId}}.groupBy({{groupByArgs}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, groupByArgs: colIds.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns the first row.
 * @returns {Row}
 */
DataFrame.prototype.head = function() {
  var refId = protocol.genVariable('row');
  var self = this;

  return new Row(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{dataFrameId}}.head();';
      var code = Utils.processTemplate(templateStr, {refId: refId, dataFrameId: dataFrameId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

module.exports = DataFrame;
