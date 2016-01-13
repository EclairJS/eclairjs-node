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

var Row = require('./Row.js');

/**
 * @constructor
 * @classdesc A factory class used to construct Row objects.
 */
function RowFactory(kernelP) {
  this.kernelP = kernelP;
}

/**
 * Create a Row from the given arguments. Position i in the argument list becomes position i in the created Row object.
 * @param {object} values
 * @returns {Row}
 */
RowFactory.prototype.create = function(values) {
  var templateStr = 'var {{refId}} = RowFactory.create({{values}});';

  return Utils.evaluate(this.kernelP, Row, templateStr, {values: JSON.stringify(values)});
};

module.exports = function(kernelP) {
  return new RowFactory(kernelP);
}