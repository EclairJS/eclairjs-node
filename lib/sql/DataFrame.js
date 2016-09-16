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

var DataSet = require('./Dataset');

/**
 * @constructor
 * @memberof module:eclairjs/sql
 * @classdesc A distributed collection of data organized into named columns. A DataFrame is equivalent to a relational table in Spark SQL.
 * @example
 * var people = sqlContext.read.parquet("...")
 * @example
 * // Once created, it can be manipulated using the various domain-specific-language (DSL) functions defined in:
 * // DataFrame (this class), Column, and functions.
 * // To select a column from the data frame:
 * var ageCol = people("age")
 */
function DataFrame(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

DataFrame.prototype = Object.create(DataSet.prototype);

DataFrame.prototype.constructor = DataFrame;

DataFrame.moduleLocation = '/sql/DataFrame';

module.exports = DataFrame;