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


var Utils = require('../../utils.js');


/**
 * @classdesc
 * Interface used to load a streaming {@link Dataset} from external storage systems (e.g. file systems,
 * key-value stores, etc). Use {@link readStream} to access this.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @class
 * @memberof module:eclairjs/sql/streaming
 */


function DataStreamReader(kernelP, refIdP) {
	 this.kernelP = kernelP;
	 this.refIdP = refIdP;
	 
};



/**
 * :: Experimental ::
 * Specifies the input data source format.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} source
 * @returns {DataStreamReader} 
 */
DataStreamReader.prototype.format = function(source) {
	 var DataStreamReader = require('../../sql/streaming/DataStreamReader.js');
	   var args ={
	     target: this, 
	     method: 'format', 
	     args: Utils.wrapArguments(arguments),
	     returnType: DataStreamReader
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * :: Experimental ::
 * Specifies the input schema. Some data sources (e.g. JSON) can infer the input schema
 * automatically from data. By specifying the schema here, the underlying data source can
 * skip the schema inference step, and thus speed up data loading.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {module:eclairjs/sql/types.StructType} schema
 * @returns {DataStreamReader} 
 */
DataStreamReader.prototype.schema = function(schema) {
	 var DataStreamReader = require('../../sql/streaming/DataStreamReader.js');
	   var args ={
	     target: this, 
	     method: 'schema', 
	     args: Utils.wrapArguments(arguments),
	     returnType: DataStreamReader
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * :: Experimental ::
 * Adds an input option for the underlying data source.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} key
 * @param {string} value
 * @returns {DataStreamReader} 
 */
DataStreamReader.prototype.option = function(key,value) {
	 var DataStreamReader = require('../../sql/streaming/DataStreamReader.js');
	   var args ={
	     target: this, 
	     method: 'option', 
	     args: Utils.wrapArguments(arguments),
	     returnType: DataStreamReader
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * :: Experimental ::
 * Loads input in as a {@link Dataset}, for data streams that read from some path.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} [path]
 * @returns {Dataset} 
 */
DataStreamReader.prototype.load = function(path) {
 // TODO: handle optional parms 'path'
   var Dataset = require('../../sql/Dataset.js');
   var args ={
     target: this, 
     method: 'load', 
     args: Utils.wrapArguments(arguments),
     returnType: Dataset
 
   };
 
   return Utils.generate(args);
};


/**
 * :: Experimental ::
 * Loads a JSON file stream (one object per line) and returns the result as a {@link Dataset}.
 *
 * This function goes through the input once to determine the input schema. If you know the
 * schema in advance, use the version that specifies the schema to avoid the extra scan.
 *
 * You can set the following JSON-specific options to deal with non-standard JSON files:
 * <li>`maxFilesPerTrigger` (default: no max limit): sets the maximum number of new files to be
 * considered in every trigger.</li>
 * <li>`primitivesAsString` (default `false`): infers all primitive values as a string type</li>
 * <li>`prefersDecimal` (default `false`): infers all floating-point values as a decimal
 * type. If the values do not fit in decimal, then it infers them as doubles.</li>
 * <li>`allowComments` (default `false`): ignores Java/C++ style comment in JSON records</li>
 * <li>`allowUnquotedFieldNames` (default `false`): allows unquoted JSON field names</li>
 * <li>`allowSingleQuotes` (default `true`): allows single quotes in addition to double quotes
 * </li>
 * <li>`allowNumericLeadingZeros` (default `false`): allows leading zeros in numbers
 * (e.g. 00012)</li>
 * <li>`allowBackslashEscapingAnyCharacter` (default `false`): allows accepting quoting of all
 * character using backslash quoting mechanism</li>
 * <li>`mode` (default `PERMISSIVE`): allows a mode for dealing with corrupt records
 * during parsing.</li>
 * <ul>
 *  <li>`PERMISSIVE` : sets other fields to `null` when it meets a corrupted record, and puts the
 *  malformed string into a new field configured by `columnNameOfCorruptRecord`. When
 *  a schema is set by user, it sets `null` for extra fields.</li>
 *  <li>`DROPMALFORMED` : ignores the whole corrupted records.</li>
 *  <li>`FAILFAST` : throws an exception when it meets corrupted records.</li>
 * </ul>
 * <li>`columnNameOfCorruptRecord` (default is the value specified in
 * `spark.sql.columnNameOfCorruptRecord`): allows renaming the new field having malformed string
 * created by `PERMISSIVE` mode. This overrides `spark.sql.columnNameOfCorruptRecord`.</li>
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} path
 * @returns {Dataset} 
 */
DataStreamReader.prototype.json = function(path) {
	var Dataset = require('../../sql/Dataset.js');
   var args ={
     target: this, 
     method: 'json', 
     args: Utils.wrapArguments(arguments),
     returnType: Dataset
 
   };
 
   return Utils.generate(args);
};


/**
 * :: Experimental ::
 * Loads a CSV file stream and returns the result as a {@link Dataset}.
 *
 * This function will go through the input once to determine the input schema if `inferSchema`
 * is enabled. To avoid going through the entire data once, disable `inferSchema` option or
 * specify the schema explicitly using {@link schema}.
 *
 * You can set the following CSV-specific options to deal with CSV files:
 * <li>`maxFilesPerTrigger` (default: no max limit): sets the maximum number of new files to be
 * considered in every trigger.</li>
 * <li>`sep` (default `,`): sets the single character as a separator for each
 * field and value.</li>
 * <li>`encoding` (default `UTF-8`): decodes the CSV files by the given encoding
 * type.</li>
 * <li>`quote` (default `"`): sets the single character used for escaping quoted values where
 * the separator can be part of the value. If you would like to turn off quotations, you need to
 * set not `null` but an empty string. This behaviour is different form
 * `com.databricks.spark.csv`.</li>
 * <li>`escape` (default `\`): sets the single character used for escaping quotes inside
 * an already quoted value.</li>
 * <li>`comment` (default empty string): sets the single character used for skipping lines
 * beginning with this character. By default, it is disabled.</li>
 * <li>`header` (default `false`): uses the first line as names of columns.</li>
 * <li>`inferSchema` (default `false`): infers the input schema automatically from data. It
 * requires one extra pass over the data.</li>
 * <li>`ignoreLeadingWhiteSpace` (default `false`): defines whether or not leading whitespaces
 * from values being read should be skipped.</li>
 * <li>`ignoreTrailingWhiteSpace` (default `false`): defines whether or not trailing
 * whitespaces from values being read should be skipped.</li>
 * <li>`nullValue` (default empty string): sets the string representation of a null value.</li>
 * <li>`nanValue` (default `NaN`): sets the string representation of a non-number" value.</li>
 * <li>`positiveInf` (default `Inf`): sets the string representation of a positive infinity
 * value.</li>
 * <li>`negativeInf` (default `-Inf`): sets the string representation of a negative infinity
 * value.</li>
 * <li>`dateFormat` (default `null`): sets the string that indicates a date format. Custom date
 * formats follow the formats at `java.text.SimpleDateFormat`. This applies to both date type
 * and timestamp type. By default, it is `null` which means trying to parse times and date by
 * `java.sql.Timestamp.valueOf()` and `java.sql.Date.valueOf()`.</li>
 * <li>`maxColumns` (default `20480`): defines a hard limit of how many columns
 * a record can have.</li>
 * <li>`maxCharsPerColumn` (default `1000000`): defines the maximum number of characters allowed
 * for any given value being read.</li>
 * <li>`mode` (default `PERMISSIVE`): allows a mode for dealing with corrupt records
 *    during parsing.</li>
 * <ul>
 *   <li>`PERMISSIVE` : sets other fields to `null` when it meets a corrupted record. When
 *     a schema is set by user, it sets `null` for extra fields.</li>
 *   <li>`DROPMALFORMED` : ignores the whole corrupted records.</li>
 *   <li>`FAILFAST` : throws an exception when it meets corrupted records.</li>
 * </ul>
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} path
 * @returns {Dataset} 
 */
DataStreamReader.prototype.csv = function(path) {
	var Dataset = require('../../sql/Dataset.js');
   var args ={
     target: this, 
     method: 'csv', 
     args: Utils.wrapArguments(arguments),
     returnType: Dataset
 
   };
 
   return Utils.generate(args);
};


/**
 * :: Experimental ::
 * Loads a Parquet file stream, returning the result as a {@link Dataset}.
 *
 * You can set the following Parquet-specific option(s) for reading Parquet files:
 * <li>`maxFilesPerTrigger` (default: no max limit): sets the maximum number of new files to be
 * considered in every trigger.</li>
 * <li>`mergeSchema` (default is the value specified in `spark.sql.parquet.mergeSchema`): sets
 * whether we should merge schemas collected from all Parquet part-files. This will override
 * `spark.sql.parquet.mergeSchema`.</li>
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} path
 * @returns {Dataset} 
 */
DataStreamReader.prototype.parquet = function(path) {
	var Dataset = require('../../sql/Dataset.js');
   var args ={
     target: this, 
     method: 'parquet', 
     args: Utils.wrapArguments(arguments),
     returnType: Dataset
 
   };
 
   return Utils.generate(args);
};


/**
 * :: Experimental ::
 * Loads text files and returns a {@link Dataset} whose schema starts with a string column named
 * "value", and followed by partitioned columns if there are any.
 *
 * Each line in the text files is a new row in the resulting Dataset. For example:
 * @example 
 *   // Scala:
 *   spark.readStream.text("/path/to/directory/")
 *
 *   // Java:
 *   spark.readStream().text("/path/to/directory/")
 *  
 *
 * You can set the following text-specific options to deal with text files:
 * <li>`maxFilesPerTrigger` (default: no max limit): sets the maximum number of new files to be
 * considered in every trigger.</li>
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} path
 * @returns {Dataset} 
 */
DataStreamReader.prototype.text = function(path) {
	var Dataset = require('../../sql/Dataset.js');
   var args ={
     target: this, 
     method: 'text', 
     args: Utils.wrapArguments(arguments),
     returnType: Dataset
 
   };
 
   return Utils.generate(args);
};

module.exports = DataStreamReader;
