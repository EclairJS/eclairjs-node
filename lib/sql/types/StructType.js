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

var protocol = require('../../kernel.js');
var Utils = require('../../utils.js');

var SStructField = require('./StructField.js');

function _resolveInt(result, resolve, reject) {
  resolve(parseInt(result));
};

/**
 * @constructor
 * @classdesc For a StructType object, one or multiple StructFields can be extracted by names. If multiple StructFields are extracted, a StructType object will be returned. If a provided name does not have a matching field, it will be ignored.
 */
function StructType(kernelP, refIdP, fields) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  this.fields = fields;
};

/**
 * Creates a new StructType by adding a new nullable field with no metadata.
 * @param {string | StructField} name
 * @param {DataType | string} dataType
 * @param {boolean} nullable - optional defaults true, nullable field
 * @param {Metadata} metadata - Optional defaults to null, specifying metadata
 * @returns {StructType}
 */
StructType.prototype.add = function(name, dataType, nullable, metadata) {
};

/**
 * Extracts a StructField of the given name or index.
 * @param {integer | string} field - index or name
 * @returns {StructField}
 */
StructType.prototype.apply = function(field) {
  var templateStr = 'var {{refId}} = {{inRefId}}.apply({{field}});';

  return Utils.generateAssignment(this, StructField, templateStr, {field: JSON.stringify(field)});
};

/**
 * The default size of a value of the StructType is the total default sizes of all field types.
 * @returns {integer}
 */
StructType.prototype.defaultSize = function() {
  var templateStr = '{{inRefId}}.defaultSize();';

  return Utils.generateResultPromise(this, templateStr, null, _resolveInt);
};

/**
 * Returns index of a given field
 * @param {string} name
 * @returns {integer}
 */
StructType.prototype.fieldIndex = function(name) {
  var templateStr = '{{inRefId}}.fieldIndex("{{name}}");';

  return Utils.generateResultPromise(this, templateStr, {name: name}, _resolveInt);
};

/**
 * Returns all field names in an array.
 * @returns {string[]}
 * @ignore
 */
StructType.prototype.fieldNames = function() {
};

/**
 *
 * @returns {StructField[]}
 * @ignore
 */
StructType.prototype.fields = function() {
};

/**
 * @returns {integer}
 */
StructType.prototype.length = function() {
  var templateStr = '{{inRefId}}.length();';

  return Utils.generateResultPromise(this, templateStr, null, _resolveInt);
};

/**
 *
 * @returns {void}
 */
StructType.prototype.printTreeString = function() {
  var templateStr = '{{inRefId}}.printTreeString();';

  return Utils.generateVoidPromise(this, templateStr);
};

/**
 *
 * @returns {string} Readable string representation for the type.
 */
StructType.prototype.simpleString = function() {
  var templateStr = '{{inRefId}}.simpleString();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 *
 * @returns {string}
 */
StructType.prototype.treeString = function() {
  var templateStr = '{{inRefId}}.treeString();';

  return Utils.generateResultPromise(this, templateStr);
};

StructType.prototype.toJSON = function() {
  var templateStr = '{{inRefId}}.toJSON();';

  return Utils.generateResultPromise(this, templateStr);
};

module.exports = StructType;

