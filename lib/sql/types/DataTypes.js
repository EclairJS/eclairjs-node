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
     * @classdesc The base type of all Spark SQL data types.
     * @memberof module:eclairjs/sql/types
     */
    function DataTypes() {
    }

    /**
     * Gets the BooleanType object.
     * @static
     */
    DataTypes.BooleanType = {_eclairSerialize: 'staticProperty', value: "BooleanType", ref: DataTypes};
    /**
     * Gets the DateType object.
     * @static
     */
    DataTypes.DateType = {_eclairSerialize: 'staticProperty', value: "DateType", ref: DataTypes};
    /**
     * Gets the DoubleType object.
     * @static
     */
    DataTypes.DoubleType = {_eclairSerialize: 'staticProperty', value: "DoubleType", ref: DataTypes};
    /*
     * NOTE:
     * Nashorn interprets numbers as java.lang.Double, java.lang.Long, or java.lang.Integer objects, depending on the computation performed.
     * You can use the Number() function to force a number to be a Double object
     * https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/api.html
     */
    /**
     * Gets the DoubleType object. Note: JavaScript float types are mapped to DoubleTypes in Spark,
     * The user should use the DoubleType for all float processing
     * @static
     */
    DataTypes.FloatType = {_eclairSerialize: 'staticProperty', value: "DoubleType", ref: DataTypes};
    /**
     * Gets the IntegerType object.
     * @static
     */
    DataTypes.IntegerType = {_eclairSerialize: 'staticProperty', value: "IntegerType", ref: DataTypes};
    /**
     * Gets the StringType object.
     * @static
     */
    DataTypes.StringType = {_eclairSerialize: 'staticProperty', value: "StringType", ref: DataTypes};
    /**
     * Gets the TimestampType object.
     * @static
     */
    DataTypes.TimestampType = {_eclairSerialize: 'staticProperty', value: "TimestampType", ref: DataTypes};

    /*
     * NOTE:
     * the following types are not applicable to JavaScript so we are not implement them
     */
    /*
    DataTypes.BinaryType = "org.apache.spark.sql.types.DataTypes.BinaryType";
    DataTypes.ByteType = "org.apache.spark.sql.types.DataTypes.ByteType";
    DataTypes.CalendarIntervalType = "org.apache.spark.sql.types.DataTypes.CalendarIntervalType";
    DataTypes.DecimalType = "org.apache.spark.sql.types.DataTypes.DecimalType";
    DataTypes.LongType = "org.apache.spark.sql.types.DataTypes.LongType";
    DataTypes.NullType = "org.apache.spark.sql.types.DataTypes.NullType";
    DataTypes.ShortType = "org.apache.spark.sql.types.DataTypes.ShortType";
    */

    /**
     * Creates a StructField with empty metadata.
     * @param {String} fieldName
     * @param {DataType} dataType
     * @param {boolean} nullable
     * @returns {module:eclairjs/sql/types.StructField}
     */
    DataTypes.createStructField = function(fieldName, dataType, nullable) {
      var StructField = require('./StructField.js')(gKernelP);

      var args = {
        target: DataTypes,
        method: 'createStructField',
        args: Utils.wrapArguments(arguments),
        returnType: StructField,
        kernelP: gKernelP,
        static: true
      };

      return Utils.generate(args);
    };

    /**
     * Creates a StructType with the given StructField array (fields).
     * @param {Array} fields
     * @returns {module:eclairjs/sql/types.StructType}
     */
    DataTypes.createStructType = function(fields) {
      var StructType = require('./StructType.js')(gKernelP);

      var args = {
        target: this,
        method: 'createStructType',
        args: Utils.wrapArguments(arguments),
        returnType: StructType,
        kernelP: gKernelP,
        static: true
      };

      return Utils.generate(args);
    };

    /**
     * Creates an ArrayType by specifying the data type of elements (elementType) and whether the array contains null values (containsNull).
     * @param {module:eclairjs/sql/types.DataType} elementType
     * @param {boolean} [containsNull]
     * @returns {module:eclairjs/sql/types.ArrayType}
     */
    DataTypes.createArrayType = function (elementType,containsNull) {
      var ArrayType = require('./ArrayType.js')(gKernelP);

      var args = {
        target: this,
        method: 'createArrayType',
        args: Utils.wrapArguments(arguments),
        returnType: ArrayType,
        kernelP: gKernelP,
        static: true
      };

      return Utils.generate(args);
    };

    DataTypes.moduleLocation = '/sql/types/DataTypes';

    return DataTypes;
  })();
};