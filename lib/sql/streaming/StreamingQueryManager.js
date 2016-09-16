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
 * A class to manage all the [[StreamingQuery]] active on a {@link SparkSession}.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @class
 * @memberof module:eclairjs/sql/streaming
 */


function StreamingQueryManager(kernelP, refIdP) {
	 this.kernelP = kernelP;
	 this.refIdP = refIdP;
	 
};



/**
 * Returns a list of active queries associated with this SQLContext
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {StreamingQuery[]} 
 */
StreamingQueryManager.prototype.active = function() {
   var args ={
     target: this, 
     method: 'active', 
     returnType: [StreamingQuery]
 
   };
 
   return Utils.generate(args);
};


/**
 * Returns the query if there is an active query with the given id, or null.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {number} id
 * @returns {StreamingQuery} 
 */
StreamingQueryManager.prototype.get = function(id) {
	 var StreamingQuery = require('../../sql/streaming/StreamingQuery.js');
	   var args ={
	     target: this, 
	     method: 'get', 
	     args: Utils.wrapArguments(arguments),
	     returnType: StreamingQuery
	 
	   };
	 
	   return Utils.generate(args);
};


/**
 * Wait until any of the queries on the associated SQLContext has terminated since the
 * creation of the context, or since `resetTerminated()` was called. Returns whether any query
 * has terminated or not (multiple may have terminated). If any query has terminated with an
 * exception, then the exception will be thrown.
 *
 * If a query has terminated, then subsequent calls to `awaitAnyTermination()` will either
 * return `true` immediately (if the query was terminated by `query.stop()`),
 * or throw the exception immediately (if the query was terminated with exception). Use
 * `resetTerminated()` to clear past terminations and wait for new terminations.
 *
 * In the case where multiple queries have terminated since `resetTermination()` was called,
 * if any query has terminated with exception, then `awaitAnyTermination()` will
 * throw any of the exception. For correctly documenting exceptions across multiple queries,
 * users need to stop all of them after any of them terminates with exception, and then check the
 * `query.exception()` for each query.
 *
 * @throws StreamingQueryException, if any query has terminated with an exception
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {number} [timeoutMs]
 * @returns {Promise.<boolean>} 
 * @ignore
 */
//FIXME This blocks the Toree kernel so no query is processed
//StreamingQueryManager.prototype.awaitAnyTermination = function(timeoutMs) {
// 
// function _resolve(result, resolve, reject) {
// 	try {
// 		var returnValue=result === 'true';
// 		resolve(returnValue);
// 	} catch (e) {
// 		var err = new Error("Parse Error: "+ e.message);
// 		reject(err);
// 	}
// };
//   var args ={
//     target: this, 
//     method: 'awaitAnyTermination', 
//     args: Utils.wrapArguments(arguments),
//     resolver: _resolve,
//     returnType: boolean
// 
//   };
// 
//   return Utils.generate(args);
//};


/**
 * Forget about past terminated queries so that `awaitAnyTermination()` can be used again to
 * wait for new terminations.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
StreamingQueryManager.prototype.resetTerminated = function() {
   var args ={
     target: this, 
     method: 'resetTerminated', 
     returnType: null
 
   };
 
   return Utils.generate(args);
};


/**
 * Register a {@link StreamingQueryListener} to receive up-calls for life cycle events of
 * {@link StreamingQuery}.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {module:eclairjs/sql/streaming.StreamingQueryListener} listener
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
StreamingQueryManager.prototype.addListenerx = function(listener) {
   var args ={
     target: this, 
     method: 'addListener', 
     args: Utils.wrapArguments(arguments),
     returnType: null
 
   };
 
   return Utils.generate(args);
};

var streamingQueryManagerListenerCounter=0;
function generateStreamingQueryManagerListenerFunc(id) {
  var func = "function(queryStartedInfo) {\
    var comm = commMap.get('streamingQueryManagerListener:{{id}}');\
    comm.send('streamingQueryManagerListener', JSON.stringify({type:\"start\", streamingQueryInfo: JSON.stringify(queryStartedInfo)}));\
  },\
  function(queryProcessInfo) {\
    var comm = commMap.get('streamingQueryManagerListener:{{id}}');\
    comm.send('streamingQueryManagerListener', JSON.stringify({type:\"process\", streamingQueryInfo: JSON.stringify(queryProcessInfo)}));\
  },\
  function(queryTerminatedInfo) {\
	  var comm = commMap.get('streamingQueryManagerListener:{{id}}');\
	  comm.send('streamingQueryManagerListener', JSON.stringify({type:\"terminated\", streamingQueryInfo: JSON.stringify(queryTerminatedInfo)}));\
  }\
  ";

  return func.replace(/{{id}}/g, id);
}
/**
 * Register to receive callbacks for life cycle events of {@link module:eclairjs/sql/streaming.StreamingQuery}.
 *
 *
 * Example:
 *
 *	var listener = queryManger.addListener(
 *	    function(event){
 *	        console.log("queryEvent " + JSON.stringify(event));
 *	        if (event.type == 'start') {
 *	        	// event started
 *	        } else if (event.type == 'process') {
 *	        	queryManger.get(event.streamingQueryInfo.id).stop().then(function(){
 *	        		//sparkSession.stop();
 *	        	});
 *	       	
 *	        } else if (event.type == 'terminated') {
 *	        	sparkSession.stop();
 *	        }
 *	    }
 *	);
 *
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {module:eclairjs/sql/streaming.StreamingQueryManager~queryEventCallback} queryEventCallback
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */

StreamingQueryManager.prototype.addListener = function(localFunc) {
  var id = 'streamingQueryManagerListener-' + ++streamingQueryManagerListenerCounter;
  var StreamingQueryListener = require('../../sql/streaming/StreamingQueryListener.js');
  var args = {
    target: this,
    method: 'addListener',
    args: [
      {value: generateStreamingQueryManagerListenerFunc(id), type: 'lambda'}
    ],
    returnType: StreamingQueryListener
  };

  this.kernelP.then(function(kernel) {
    var comm = kernel.connectToComm('streamingQueryManagerListener', id);

    comm.onMsg = (msg) => {
      var StreamingQueryInfo = require('../../sql/streaming/StreamingQueryInfo.js');
      var response = msg.content.data;

      if (localFunc) {
    	var event = {};
    	event.type = response.type;
    	event.streamingQueryInfo = new StreamingQueryInfo(JSON.parse(response.streamingQueryInfo));
        localFunc(event);
      }
    };

    comm.open('');
  });

  return Utils.generate(args);
};

/**
 * This callback called for query starts, process or termination events.
 * @callback module:eclairjs/sql/streaming.StreamingQueryManager~queryEventCallback
 * @param {module:eclairjs/sql/streaming.StreamingQueryInfo} event
 */

/**
 * Deregister a {@link StreamingQueryListener}.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {module:eclairjs/sql/streaming.StreamingQueryListener} listener
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
StreamingQueryManager.prototype.removeListener = function(listener) {
   var args ={
     target: this, 
     method: 'removeListener', 
     args: Utils.wrapArguments(arguments),
     returnType: null
 
   };
 
   return Utils.generate(args);
};

module.exports = StreamingQueryManager;
