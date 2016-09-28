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
     * @classdesc A field inside a StructType.
     * @memberof module:eclairjs/sql/types
     * @param {string} name - The name of this field.
     * @param {DataType} dataType - The data type of this field.
     * @param {boolean}  nullable -  Indicates if values of this field can be null values.
     * @param {module:eclairjs/sql/types.Metadata} metadata - The metadata of this field. The metadata should be preserved during transformation if the content of the column is not modified, e.g, in selection.
     */
    function StructField() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @returns {string}
     */
    StructField.prototype.name = function() {
      var args = {
        target: this,
        method: 'name',
        returnType: String
      };

      return Utils.generate(args);
    };

    StructField.moduleLocation = '/sql/types/StructField';

    return StructField;
  })();
};