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
 * :: Experimental ::
 * A handle to a query that is executing continuously in the background as new data arrives.
 * All these methods are thread-safe.
 * @since EclairJS 0.7 Spark  2.0.0
 * @class
 * @memberof module:eclairjs/sql/streaming
 */


function StreamingQuery(kernelP, refIdP) {
	this.kernelP = kernelP;
	this.refIdP = refIdP;
}



/**
 * Returns the name of the query. This name is unique across all active queries. This can be
 * set in the [[org.apache.spark.sql.DataStreamWriter DataStreamWriter]] as
 * `dataframe.writeStream.queryName("query").start()`.
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Promise.<string>} 
 */
StreamingQuery.prototype.name = function() {
	 
	 function _resolve(result, resolve, reject) {
	 	try {
	 		var returnValue=result;
	 		resolve(returnValue);
	 	} catch (e) {
	 		var err = new Error("Parse Error: "+ e.message);
	 		reject(err);
	 	}
	 };
	   var args ={
	     target: this, 
	     method: 'name', 
	     resolver: _resolve,
	     returnType: String
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Returns the unique id of this query. This id is automatically generated and is unique across
 * all queries that have been started in the current process.
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Promise.<number>} 
 */
StreamingQuery.prototype.id = function() {
	 
	 function _resolve(result, resolve, reject) {
	 	try {
	 		var returnValue=parseInt(result);
	 		resolve(returnValue);
	 	} catch (e) {
	 		var err = new Error("Parse Error: "+ e.message);
	 		reject(err);
	 	}
	 };
	   var args ={
	     target: this, 
	     method: 'id', 
	     resolver: _resolve,
	     returnType: Number
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Returns the {@link SparkSession} associated with `this`.
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {SparkSession} 
 */
StreamingQuery.prototype.sparkSession = function() {
	 var SparkSession = require('../../sql/SparkSession.js');
	   var args ={
	     target: this, 
	     method: 'sparkSession', 
	     returnType: SparkSession
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Whether the query is currently active or not
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Promise.<boolean>} 
 */
StreamingQuery.prototype.isActive = function() {
	 
	 function _resolve(result, resolve, reject) {
	 	try {
	 		var returnValue=result === 'true';
	 		resolve(returnValue);
	 	} catch (e) {
	 		var err = new Error("Parse Error: "+ e.message);
	 		reject(err);
	 	}
	 };
	   var args ={
	     target: this, 
	     method: 'isActive', 
	     resolver: _resolve,
	     returnType: boolean
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Returns the {@link StreamingQueryException} if the query was terminated by an exception.
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {StreamingQueryException} 
 */
StreamingQuery.prototype.exception = function() {
	   var args ={
	     target: this, 
	     method: 'exception', 
	     returnType: StreamingQueryException
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Returns current status of all the sources.
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {SourceStatus[]} 
 */
StreamingQuery.prototype.sourceStatuses = function() {
	   var args ={
	     target: this, 
	     method: 'sourceStatuses', 
	     returnType: [SourceStatus]
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 *  Returns current status of the sink. 
 * @returns {SinkStatus} 
 */
StreamingQuery.prototype.sinkStatus = function() {
	 var SinkStatus = require('../../sql/streaming/SinkStatus.js');
	   var args ={
	     target: this, 
	     method: 'sinkStatus', 
	     returnType: SinkStatus
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Waits for the termination of `this` query, either by `query.stop()` or by an exception.
 * If the query has terminated with an exception, then the exception will be thrown.
 * Otherwise, it returns whether the query has terminated or not within the `timeoutMs`
 * milliseconds.
 *
 * If the query has terminated, then all subsequent calls to this method will either return
 * `true` immediately (if the query was terminated by `stop()`), or throw the exception
 * immediately (if the query has terminated with exception).
 *
 * @throws StreamingQueryException, if `this` query has terminated with an exception
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {number} [timeoutMs]
 * @returns {Promise.<boolean>} 
 */
StreamingQuery.prototype.awaitTermination = function(timeoutMs) {
	 // TODO: handle optional parms 'timeoutMs'
	 
	 function _resolve(result, resolve, reject) {
	 	try {
	 		var returnValue=result === 'true';
	 		resolve(returnValue);
	 	} catch (e) {
	 		var err = new Error("Parse Error: "+ e.message);
	 		reject(err);
	 	}
	 };
	   var args ={
	     target: this, 
	     method: 'awaitTermination', 
	     args: Utils.wrapArguments(arguments),
	     resolver: _resolve,
	     returnType: Boolean
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Blocks until all available data in the source has been processed and committed to the sink.
 * This method is intended for testing. Note that in the case of continually arriving data, this
 * method may block forever. Additionally, this method is only guaranteed to block until data that
 * has been synchronously appended data to a {@link Source}
 * prior to invocation. (i.e. `getOffset` must immediately reflect the addition).
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
StreamingQuery.prototype.processAllAvailable = function() {
	   var args ={
	     target: this, 
	     method: 'processAllAvailable', 
	     returnType: null
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Stops the execution of this query if it is running. This method blocks until the threads
 * performing execution has stopped.
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
StreamingQuery.prototype.stop = function() {
	   var args ={
	     target: this, 
	     method: 'stop', 
	     returnType: null
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Prints the physical plan to the console for debugging purposes.
 *
 * @param {boolean} [extended]  whether to do extended explain or not
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
StreamingQuery.prototype.explain = function(extended) {
	 // TODO: handle optional parms 'extended'
	   var args ={
	     target: this, 
	     method: 'explain', 
	     args: Utils.wrapArguments(arguments),
	     returnType: null
	 
	   };
	 
	   return Utils.generate(args);
};

module.exports = StreamingQuery;
