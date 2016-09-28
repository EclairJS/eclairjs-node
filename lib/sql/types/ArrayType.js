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

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('../../utils.js');

    var gKernelP = kernelP;

    /**
     * @classdesc
     * :: DeveloperApi ::
     * The data type for collections of multiple values.
     * Internally these are represented as columns that contain a ``scala.collection.Seq``.
     *
     * Please use [[DataTypes.createArrayType()]] to create a specific instance.
     *
     * An [[ArrayType]] object comprises two fields, `elementType: {@link DataType}` and
     * `containsNull: Boolean`. The field of `elementType` is used to specify the type of
     * array elements. The field of `containsNull` is used to specify if the array has `null` values.
     *
     * @param elementType The data type of values.
     * @param containsNull Indicates if values have `null` values
     * @class
     * @memberof module:eclairjs/sql/types
     * @extends module:eclairjs/sql/types.DataType
     */

    /**
     * @param {module:eclairjs/sql/types.DataType} elementType
     * @param {boolean} containsNull
     * @constructor
     */
    function ArrayType() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * The default size of a value of the ArrayType is 100 * the default size of the element type.
     * (We assume that there are 100 elements).
     * @returns {Promise.<number>}
     */
    ArrayType.prototype.defaultSize = function() {
      var args = {
        target: this,
        method: 'defaultSize',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    ArrayType.prototype.simpleString = function() {
      var args = {
        target: this,
        method: 'simpleString',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     *  Construct a {@link ArrayType} object with the given element type. The `containsNull` is true.
     * @param {module:eclairjs/sql/types.DataType} elementType
     * @returns {ArrayType}
     */
    ArrayType.apply = function(elementType) {
      var args = {
        target: ArrayType,
        method: 'apply',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: ArrayType
      };

      return Utils.generate(args);
    };

    ArrayType.moduleLocation = '/sql/types/ArrayType';

    return ArrayType;
  })();
};