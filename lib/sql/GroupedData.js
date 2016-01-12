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

var DataFrame = require('./DataFrame.js');

/**
 * @constructor
 * @classdec A set of methods for aggregations on a DataFrame, created by DataFrame.groupBy.
 */
function GroupedData(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Compute aggregates by specifying a series of aggregate columns. Note that this function by default retains the grouping columns in its output.
 * To not retain grouping columns, set spark.sql.retainGroupColumns to false.
 * The available aggregate methods are defined in {@link functions}.
 * @example
 * df.groupBy("department").agg(max("age"), sum("expense"));
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} columnExpr,...columnExpr or columnName, ...columnName
 * @returns {DataFrame}
 */
GroupedData.prototype.agg = function() {
  var args = Array.prototype.slice.call(arguments);

  var cols = [];
  args.forEach(function(arg) {
    cols.push(Utils.prepForReplacement(arg));
  });

  var templateStr = 'var {{refId}} = {{inRefId}}.agg({{cols}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {cols: cols});
};

/**
 * Compute the avg value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.avg = function() {
  var args = Array.prototype.slice.call(arguments);

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  var templateStr = 'var {{refId}} = {{inRefId}}.avg({{cols}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {cols: cols.join(',')});
};

GroupedData.prototype.apply = function(cols) {
  throw "not implemented by ElairJS";
};

/**
 * Count the number of rows for each group.
 * @returns {DataFrame}
 */
GroupedData.prototype.count = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.count();';

  return Utils.generateAssignment(this, DataFrame, templateStr);
};

/**
 * Compute the max value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.max = function() {
  var args = Array.prototype.slice.call(arguments);

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  var templateStr = 'var {{refId}} = {{inRefId}}.max({{cols}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {cols: cols.join(',')});
};

/**
 * Compute the mean value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.mean = function() {
  var args = Array.prototype.slice.call(arguments);

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  var templateStr = 'var {{refId}} = {{inRefId}}.mean({{cols}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {cols: cols.join(',')});
};

/**
 * Compute the min value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.min = function() {
  var args = Array.prototype.slice.call(arguments);

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  var templateStr = 'var {{refId}} = {{inRefId}}.min({{cols}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {cols: cols.join(',')});
};

/**
 * Compute the sum value for each numeric columns for each group.
 * @param {string[]} cols
 * @returns {DataFrame}
 */
GroupedData.prototype.sum = function() {
  var args = Array.prototype.slice.call(arguments);

  var cols = [];
  args.forEach(function(arg) {
    cols.push('"'+arg+'"');
  });

  var templateStr = 'var {{refId}} = {{inRefId}}.sum({{cols}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {cols: cols.join(',')});
};

module.exports = GroupedData;
