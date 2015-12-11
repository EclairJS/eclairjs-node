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

/**
 * @constructor
 * @classdesc A field inside a StructType.
 */

function StructField(kernelP, refIdP, name, dataType, nullable, metadata) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  this.name = name;
  this.dataType = dataType;
  this.nullable = nullable;
  this.metadata = metadata;
};

/**
 * @returns {DataType}
 */
StructField.prototype.dataType = function() {
  return this.dataType;
  //var templateStr = '{{inRefId}}.dataType();';

  //return Utils.generateResultPromise(this, templateStr);
};

/**
 * @returns {Metadata}
 */
StructField.prototype.metadata = function() {
  return this.metadata;
  //var templateStr = '{{inRefId}}.metadata();';

  //return Utils.generateResultPromise(this, templateStr);
};

/**
 * @returns {string}
 */
StructField.prototype.name = function() {
  //return this.name;
  var templateStr = '{{inRefId}}.name();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 * @returns {boolean}
 */
StructField.prototype.nullable = function() {
  return this.nullable
  //var templateStr = '{{inRefId}}.nullable();';

  //return Utils.generateResultPromise(this, templateStr);
};

StructField.prototype.toJSON = function() {
    var jsonObj = {};
    jsonObj.name = this.name();
    jsonObj.dataType = this.dataType().toString();
    jsonObj.nullable = this.nullable();
    jsonObj.metadata = this.metadata();
    return jsonObj;
};

module.exports = StructField;
