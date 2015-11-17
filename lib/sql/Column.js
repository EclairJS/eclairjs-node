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
var Column = function(kernelP, refIdP, column) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  this.column = column;
};

Column.prototype.toString = function() {
  var self = this;

  return new Promise(function(resolve, reject) {
    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var refId = values[0];
      var kernel = values[1];

      var templateStr = '{{inRefId}}.toString();';
      var code = Utils.processTemplate(templateStr, {inRefId: refId});
      protocol.verifyResult(kernel.execute({code: code}), resolve, reject);
    }).catch(reject);
  })
};

/**
 * Greater than.
 * @param {object}
 * @returns {Column}
 */
Column.prototype.gt = function(obj) {
  var refId = protocol.genVariable('column');
  var self = this;

  return new Column(this.kernelP, new Promise(function(resolve, reject) {
    var promises = [self.kernelP, self.refIdP];

    // we have an object, so we need to resolve its refId
    if (typeof obj == 'object') {
      promises.push(arg.refIdP);
    }

    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var columnId = values[1];

      // if not a Object then its a sql string
      var filterArg = values[2] ? values[2] : obj;

      var templateStr = typeof arg == 'object' ? 'var {{refId}} = {{inRefId}}.gt({{arg}});' : 'var {{refId}} = {{inRefId}}.gt("{{arg}}");';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: columnId, arg: filterArg});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

module.exports = Column;
