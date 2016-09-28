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

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('../../utils.js');

    var gKernelP = kernelP;

    /**
     * @constructor
     * @memberof module:eclairjs/sql/types
     * @classdesc For a StructType object, one or multiple StructFields can be extracted by names.
     * If multiple StructFields are extracted, a StructType object will be returned.
     * If a provided name does not have a matching field, it will be ignored.
     * @param {module:eclairjs/sql/types.StructField[]} fields - The name of this field.
     */
    function StructType() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Creates a new StructType by adding a new nullable field with no metadata.
     * @param {string | StructField} name
     * @param {DataType | string} dataType
     * @param {boolean} [nullable]  defaults true, nullable field
     * @param {module:eclairjs/sql/types.Metadata} [metadata] defaults to null, specifying metadata
     * @returns {module:eclairjs/sql/types.StructType}
     */
    StructType.prototype.add = function(name, dataType, nullable, metadata) {
      var args = {
        target: this,
        method: 'add',
        args: Utils.wrapArguments(arguments),
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     * Extracts a StructField of the given name or index.
     * @param {integer | string} field - index or name
     * @returns {module:eclairjs/sql/types.StructField}
     */
    StructType.prototype.apply = function(field) {
      var StructField = require('./StructField.js')(this.kernelP);

      var args = {
        target: this,
        method: 'apply',
        args: Utils.wrapArguments(arguments),
        returnType: StructField
      };

      return Utils.generate(args);
    };

    /**
     * The default size of a value of the StructType is the total default sizes of all field types.
     * @returns {integer}
     */
    StructType.prototype.defaultSize = function() {
      var args = {
        target: this,
        method: 'defaultSize',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns index of a given field
     * @param {string} name
     * @returns {integer}
     */
    StructType.prototype.fieldIndex = function(name) {
      var args = {
        target: this,
        method: 'fieldIndex',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns all field names in an array.
     * @returns {string[]}
     * @ignore
     */
    StructType.prototype.fieldNames = function() {
      var args = {
        target: this,
        method: 'fieldNames',
        returnType: [String]
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/sql/types.StructField[]}
     * @ignore
     */
    StructType.prototype.fields = function() {
      throw 'not implemented by ElairJS';
    };

    /**
     * @returns {integer}
     */
    StructType.prototype.length = function() {
      var args = {
        target: this,
        method: 'length',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {void}
     */
    StructType.prototype.printTreeString = function() {
      var args = {
        target: this,
        method: 'printTreeString'
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {string} Readable string representation for the type.
     */
    StructType.prototype.simpleString = function() {
      var args = {
        target: this,
        method: 'simpleString',
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {string}
     */
    StructType.prototype.treeString = function() {
      var args = {
        target: this,
        method: 'treeString',
        returnType: String
      };

      return Utils.generate(args);
    };

    StructType.prototype.toJSON = function() {
      throw 'not implemented by ElairJS';
    };

    StructType.moduleLocation = '/sql/types/StructType';

    return StructType;
  })();
};