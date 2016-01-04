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

var protocol = require('../kernel.js');
var Utils = require('../utils.js');

var DataFrame = require('./DataFrame.js');

/**
 * @constructor
 * @classdesc Functionality for working with missing data in {@link DataFrame}.
 */
function DataFrameNaFunctions(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Returns a new {@link DataFrame} that drops rows containing any null or NaN values.
 *
 * @returns {DataFrame}
 */
DataFrameNaFunctions.prototype.drop = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.drop();';

  return Utils.generateAssignment(this, DataFrame, templateStr);
};

module.exports = DataFrameNaFunctions;
