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
 * 
 * Interface used to write a streaming {@link Dataset} to external storage systems (e.g. file systems,
 * key-value stores, etc). Use {@link writeStream} to access this.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @class
 * @memberof module:eclairjs/sql/streaming
 */


function DataStreamWriter(kernelP, refIdP) {
	 this.kernelP = kernelP;
	 this.refIdP = refIdP;
	 
};



/**
 * 
 * Specifies how data of a streaming DataFrame/Dataset is written to a streaming sink.
 *   - `OutputMode.Append()`: only the new rows in the streaming DataFrame/Dataset will be
 *                            written to the sink
 *   - `OutputMode.Complete()`: all the rows in the streaming DataFrame/Dataset will be written
 *                              to the sink every time these is some updates
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {OutputMode} outputMode
 * @returns {DataStreamWriter} 
 * @ignore
 */
DataStreamWriter.prototype.outputModewithOutputMode = function(outputMode) {
throw "not implemented by ElairJS";
// var DataStreamWriter = require('../../sql/streaming/DataStreamWriter.js');
//   var args ={
//     target: this, 
//     method: 'outputMode', 
//     args: Utils.wrapArguments(arguments),
//     returnType: DataStreamWriter
// 
//   };
// 
//   return Utils.generate(args);
};


/**
 * 
 * Specifies how data of a streaming DataFrame/Dataset is written to a streaming sink.
 *   - `append`:   only the new rows in the streaming DataFrame/Dataset will be written to
 *                 the sink
 *   - `complete`: all the rows in the streaming DataFrame/Dataset will be written to the sink
 *                 every time these is some updates
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} outputMode
 * @returns {DataStreamWriter} 
 */
DataStreamWriter.prototype.outputMode = function(outputMode) {
	 var DataStreamWriter = require('../../sql/streaming/DataStreamWriter.js');
	   var args ={
	     target: this, 
	     method: 'outputMode', 
	     args: Utils.wrapArguments(arguments),
	     returnType: DataStreamWriter
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * 
 * Set the trigger for the stream query. The default value is `ProcessingTime(0)` and it will run
 * the query as fast as possible.
 *
 * Scala Example:
 * @example 
 *   df.writeStream.trigger(ProcessingTime("10 seconds"))
 *
 *   import scala.concurrent.duration._
 *   df.writeStream.trigger(ProcessingTime(10.seconds))
 *  
 *
 * Java Example:
 * @example 
 *   df.writeStream().trigger(ProcessingTime.create("10 seconds"))
 *
 *   import java.util.concurrent.TimeUnit
 *   df.writeStream().trigger(ProcessingTime.create(10, TimeUnit.SECONDS))
 *  
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {module:eclairjs/sql/streaming.Trigger} trigger
 * @returns {DataStreamWriter} 
 */
DataStreamWriter.prototype.trigger = function(trigger) {
 var DataStreamWriter = require('../../sql/streaming/DataStreamWriter.js');
   var args ={
     target: this, 
     method: 'trigger', 
     args: Utils.wrapArguments(arguments),
     returnType: DataStreamWriter
 
   };
 
   return Utils.generate(args);
};


/**
 * 
 * Specifies the name of the {@link StreamingQuery} that can be started with `start()`.
 * This name must be unique among all the currently active queries in the associated SQLContext.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} queryName
 * @returns {DataStreamWriter} 
 */
DataStreamWriter.prototype.queryName = function(queryName) {

	 var DataStreamWriter = require('../../sql/streaming/DataStreamWriter.js');
	   var args ={
	     target: this, 
	     method: 'queryName', 
	     args: Utils.wrapArguments(arguments),
	     returnType: DataStreamWriter
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * 
 * Specifies the underlying output data source. Built-in options include "parquet"
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} source
 * @returns {DataStreamWriter} 
 */
DataStreamWriter.prototype.format = function(source) {
	 var DataStreamWriter = require('../../sql/streaming/DataStreamWriter.js');
	   var args ={
	     target: this, 
	     method: 'format', 
	     args: Utils.wrapArguments(arguments),
	     returnType: DataStreamWriter
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Partitions the output by the given columns on the file system. If specified, the output is
 * laid out on the file system similar to Hive's partitioning scheme. As an example, when we
 * partition a dataset by year and then month, the directory layout would look like:
 *
 *   - year=2016/month=01/
 *   - year=2016/month=02/
 *
 * Partitioning is one of the most widely used techniques to optimize physical data layout.
 * It provides a coarse-grained index for skipping unnecessary data reads when queries have
 * predicates on the partitioned columns. In order for partitioning to work well, the number
 * of distinct values in each column should typically be less than tens of thousands.
 *
 * This was initially applicable for Parquet but in 1.5+ covers JSON, text, ORC and avro as well.
 *
 * @since EclairJS 0.7 Spark  1.4.0
 * @param {...string} colNames
 * @returns {DataStreamWriter} 
 */
DataStreamWriter.prototype.partitionBy = function(colNames) {
	 var DataStreamWriter = require('../../sql/streaming/DataStreamWriter.js');
	 // TODO: handle repeated parm 'colNames'
	   var args ={
	     target: this, 
	     method: 'partitionBy', 
	     args: Utils.wrapArguments(arguments),
	     returnType: DataStreamWriter
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * 
 * Adds an output option for the underlying data source.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} key
 * @param {string} value
 * @returns {DataStreamWriter} 
 */
DataStreamWriter.prototype.option = function(key,value) {
	 var DataStreamWriter = require('../../sql/streaming/DataStreamWriter.js');
	   var args ={
	     target: this, 
	     method: 'option', 
	     args: Utils.wrapArguments(arguments),
	     returnType: DataStreamWriter
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * 
 * Starts the execution of the streaming query, which will continually output results to the given
 * path as new data arrives. The returned {@link StreamingQuery} object can be used to interact with
 * the stream.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} [path]
 * @returns {StreamingQuery} 
 */
DataStreamWriter.prototype.start = function(path) {
	 var StreamingQuery = require('../../sql/streaming/StreamingQuery.js');
	 // TODO: handle optional parms 'path'
	   var args ={
	     target: this, 
	     method: 'start', 
	     args: Utils.wrapArguments(arguments),
	     returnType: StreamingQuery
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * 
 * Starts the execution of the streaming query, which will continually send results to the given
 * as as new data arrives. The {@link ForeachWriter} can be used to send the data
 * generated by the [[DataFrame]]/{@link Dataset} to an external system.
 *  
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {module:eclairjs/sql.ForeachWriter} writer
 * @returns {DataStreamWriter} 
 * @ignore
 */
//DataStreamWriter.prototype.foreach = function(writer) {
//	 var DataStreamWriter = require('../../sql/streaming/DataStreamWriter.js');
//	   var args ={
//	     target: this, 
//	     method: 'foreach', 
//	     args: Utils.wrapArguments(arguments),
//	     returnType: DataStreamWriter
//	 
//	   };
//	 
//	   return Utils.generate(args);
//};




module.exports = DataStreamWriter;
