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
 * @constructor
 * @classdesc Represents one row of output from a relational operator. Allows both generic access by ordinal, which will incur boxing overhead for primitives, as well as native primitive access.
 * It is invalid to use the native primitive interface to retrieve a value that is null, instead a user must check isNullAt before attempting to retrieve a value that might be null.
 * To create a new Row, use RowFactory.create()
 *
 */
function Row(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Displays all elements of this traversable or iterator in a string using start, end, and separator strings.
 * @param {string} Optional separator
 * @param {string} Optional start
 * @param {string} Required end, if start specified
 * @returns {string}
 */
Row.prototype.mkString = function() {
  var args = Array.prototype.slice.call(arguments);
  var self = this;

  return new Promise(function(resolve, reject) {
    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var refId = values[0];
      var kernel = values[1];

      var templateStr = "";
      if (args.length == 3) {
        templateStr = '{{inRefId}}.mkString("{{arg1}}", "{{arg2}}", "{{arg3}}");';
      } else if (args.length == 1) {
        templateStr = '{{inRefId}}.mkString("{{arg1}}");';
      } else {
        templateStr = '{{inRefId}}.mkString();';
      }

      var code = Utils.processTemplate(templateStr, {inRefId: refId, arg1: args[0], arg2: args[1], arg3: args[2]});
      protocol.verifyResult(kernel.execute({code: code}), resolve, reject);
    }).catch(reject);
  })
};

module.exports = Row;