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

var Utils = require('../../utils.js');

var StructField = require('./StructField.js');
var StructType = require('./StructType.js');

var gKernelP;

/**
 * @constructor
 * @classdesc The base type of all Spark SQL data types.
 */
function DataTypes() {
}

/**
 * Gets the BooleanType object.
 * @static
 */
DataTypes.BooleanType = "org.apache.spark.sql.types.DataTypes.BooleanType";
/**
 * Gets the DateType object.
 * @static
 */
DataTypes.DateType = "org.apache.spark.sql.types.DataTypes.DateType";
/**
 * Gets the DoubleType object.
 * @static
 */
DataTypes.DoubleType = "org.apache.spark.sql.types.DataTypes.DoubleType";
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
DataTypes.FloatType = "org.apache.spark.sql.types.DataTypes.DoubleType";
/**
 * Gets the IntegerType object.
 * @static
 */
DataTypes.IntegerType = "org.apache.spark.sql.types.DataTypes.IntegerType";
/**
 * Gets the StringType object.
 * @static
 */
DataTypes.StringType = "org.apache.spark.sql.types.DataTypes.StringType";
/**
 * Gets the TimestampType object.
 * @static
 */
DataTypes.TimestampType = "org.apache.spark.sql.types.DataTypes.TimestampType";

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
 * @returns {StructField}
 */
DataTypes.createStructField = function(fieldName, dataType, nullable) {
  var args = {
    target: DataTypes,
    method: 'createStructField',
    args: [
      {value: fieldName, type: 'string'},
      {value: dataType}, // dataTypes needs to be a class reference so don't stringify
      {value: nullable, type: 'boolean'}
    ],
    returnType: StructField,
    kernelP: gKernelP,
    static: true
  };

  return Utils.generate(args);
};

/**
 * Creates a StructType with the given StructField array (fields).
 * @param {Array} fields
 * @returns {StructType}
 */
DataTypes.createStructType = function(fields) {
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

module.exports = function(kP) {
  gKernelP = kP;

  return DataTypes;
};