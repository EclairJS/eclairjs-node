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

module.exports = Column;
