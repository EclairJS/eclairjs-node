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

var StructField = require('./StructField.js');
var StructType = require('./StructType.js');

/**
 * @constructor
 * @classdesc The base type of all Spark SQL data types.
 */
function DataTypes(kernelP) {
  this.kernelP = kernelP;
}

/**
 * Gets the BooleanType object.
 * @static
 */
DataTypes.prototype.BooleanType = "org.apache.spark.sql.types.DataTypes.BooleanType";
/**
 * Gets the DateType object.
 * @static
 */
DataTypes.prototype.DateType = "org.apache.spark.sql.types.DataTypes.DateType";
/**
 * Gets the DoubleType object.
 * @static
 */
DataTypes.prototype.DoubleType = "org.apache.spark.sql.types.DataTypes.DoubleType";
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
DataTypes.prototype.FloatType = "org.apache.spark.sql.types.DataTypes.DoubleType";
/**
 * Gets the IntegerType object.
 * @static
 */
DataTypes.prototype.IntegerType = "org.apache.spark.sql.types.DataTypes.IntegerType";
/**
 * Gets the StringType object.
 * @static
 */
DataTypes.prototype.StringType = "org.apache.spark.sql.types.DataTypes.StringType";
/**
 * Gets the TimestampType object.
 * @static
 */
DataTypes.prototype.TimestampType = "org.apache.spark.sql.types.DataTypes.TimestampType";

/*
 * NOTE:
 * the following types are not applicable to JavaScript so we are not implement them
 */
/*
DataTypes.prototype.BinaryType = "org.apache.spark.sql.types.DataTypes.BinaryType";
DataTypes.prototype.ByteType = "org.apache.spark.sql.types.DataTypes.ByteType";
DataTypes.prototype.CalendarIntervalType = "org.apache.spark.sql.types.DataTypes.CalendarIntervalType";
DataTypes.prototype.DecimalType = "org.apache.spark.sql.types.DataTypes.DecimalType";
DataTypes.prototype.LongType = "org.apache.spark.sql.types.DataTypes.LongType";
DataTypes.prototype.NullType = "org.apache.spark.sql.types.DataTypes.NullType";
DataTypes.prototype.ShortType = "org.apache.spark.sql.types.DataTypes.ShortType";
*/

/**
 * Creates a StructField with empty metadata.
 * @param {String} fieldName
 * @param {DataType} dataType
 * @param {boolean} nullable
 * @returns {StructField}
 */
DataTypes.prototype.createStructField = function(fieldName, dataType, nullable) {
  var refId = protocol.genVariable('sqlStructField');
  var self = this;

  return new StructField(this.kernelP, new Promise(function(resolve, reject) {
    self.kernelP.then(kernel => {
      try {
        var templateStr = 'var {{refId}} = DataTypes.createStructField("{{fieldName}}", {{dataType}}, {{nullable}});';
        var code = Utils.processTemplate(templateStr, {
          refId: refId,
          fieldName: fieldName,
          dataType: dataType,
          nullable: nullable ? "true" : "false"
        });

        protocol.verifyAssign(kernel.execute({code: code, silent: false}),
          resolve,
          reject,
          refId);
      } catch (e) {
        console.log(e)
      }
    })
  }), fieldName, dataType, nullable);
};

/**
 * Creates a StructType with the given StructField array (fields).
 * @param {Array} fields
 * @returns {StructType}
 */
DataTypes.prototype.createStructType = function(fieldArr) {
  var refId = protocol.genVariable('sqlStructType');
  var self = this;

  return new StructType(this.kernelP, new Promise(function(resolve, reject) {
    self.kernelP.then(kernel => {
      // gather all the refIds of the specifield fields (which are promises)
      var promises = [];
      fieldArr.forEach(function(field) {
        promises.push(field.refIdP);
      });

      Promise.all(promises).then(function(values) {
        var templateStr = 'var {{refId}} = DataTypes.createStructType([{{fieldsArr}}]);';
        var code = Utils.processTemplate(templateStr, {
          refId: refId,
          fieldsArr: values
        });

        protocol.verifyAssign(kernel.execute({code: code, silent: false}),
          resolve,
          reject,
          refId);
      }).catch(reject);
    });
  }), fieldArr);
};

module.exports = DataTypes;
