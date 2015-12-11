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

/**
 *
 * @constructor
 * @classdesc A column in a DataFrame.
 */
function Column(kernelP, refIdP, column) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  this.column = column;
};

Column.prototype.toString = function() {
  var templateStr = '{{inRefId}}.toString();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 * Equality test
 * @param {object}
 * @returns {Column}
 */
Column.prototype.equalTo = function(obj) {
  var templateStr = typeof obj == 'object' ? 'var {{refId}} = {{inRefId}}.equalTo({{arg}});' : 'var {{refId}} = {{inRefId}}.equalTo("{{arg}}");';

  var arg;

  if (typeof obj == 'object') {
    arg = obj.refIdP;
  } else {
    arg = obj;
  }

  return Utils.generateAssignment(this, Column, templateStr, {arg: arg});
};

/**
 * Greater than.
 * @param {object}
 * @returns {Column}
 */
Column.prototype.gt = function(obj) {
  var templateStr = typeof obj == 'object' ? 'var {{refId}} = {{inRefId}}.gt({{arg}});' : 'var {{refId}} = {{inRefId}}.gt("{{arg}}");';

  var arg;

  if (typeof obj == 'object') {
    arg = obj.refIdP;
  } else {
    arg = obj;
  }

  return Utils.generateAssignment(this, Column, templateStr, {arg: arg});
};

module.exports = Column;
