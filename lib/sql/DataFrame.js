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

/**
 * @constructor
 * @classdesc A distributed collection of data organized into named columns. A DataFrame is equivalent to a relational table in Spark SQL.
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
    });
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

module.exports = DataFrame;
