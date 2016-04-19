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

/**
 * @constructor
 * @classdesc
 * @memberof module:eclairjs/sql
 */
function SQLContextQueryExecution(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * @returns {string}
 */
SQLContextQueryExecution.prototype.simpleString = function() {
  var args = {
    target: this,
    method: 'simpleString',
    returnType: String
  };

  return Utils.generate(args);
};

/**
 * @returns {string}
 */
SQLContextQueryExecution.prototype.toString = function() {
  var args = {
    target: this,
    method: 'toString',
    returnType: String
  };

  return Utils.generate(args);
};

//SQLContextQueryExecution.moduleLocation = '/sql/SQLContextQueryExecution';

module.exports = SQLContextQueryExecution;