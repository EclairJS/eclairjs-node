/*
 * Copyright 2016 IBM Corp.
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

var Column = require('./Column.js');

var kernelP;

/**
 * @constructor
 * @classdesc Spark SQL functions.
 */
function SQLFunctions(kernelP) {
  this.kernelP = kernelP;
}

/**
 * Evaluates a list of conditions and returns one of multiple possible result expressions.
 * If otherwise is not defined at the end, null is returned for unmatched conditions.
 *
 * @example
 *   // Example: encoding gender string column into integer.
 *   people.select(functions.when(people.col("gender").equalTo("male"), 0)
 *     .when(people.col("gender").equalTo("female"), 1)
 *     .otherwise(2))
 *
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column}
 */
SQLFunctions.when = function(condition, value) {
  var templateStr = 'var {{refId}} = functions.when({{condition}}, {{value}});';
  return Utils.evaluate(kernelP, Column, templateStr, {condition: Utils.prepForReplacement(condition), value: Utils.prepForReplacement(value)});
};

module.exports = function(kP) {
  kernelP = kP;

  return SQLFunctions;
};
