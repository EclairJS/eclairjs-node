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
 * A class used to report information about the progress of a {@link StreamingQuery}.
 *
 * @param name The {@link StreamingQuery} name. This name is unique across all active queries.
 * @param id The {@link StreamingQuery} id. This id is unique across
 *          all queries that have been started in the current process.
 * @param sourceStatuses The current statuses of the {@link StreamingQuery}'s sources.
 * @param sinkStatus The current status of the {@link StreamingQuery}'s sink.
 * @class
 * @memberof module:eclairjs/sql/streaming
 */


function StreamingQueryInfo(name, id, sourceStatuses, sinkStatus) {
	var SourceStatus = require('../../sql/streaming/SourceStatus.js');
	var SinkStatus = require('../../sql/streaming/SinkStatus.js');
	if (typeof name == 'object') {
		this._name = arguments[0].name;
		this._id = arguments[0].id;
		this._sourceStatuses = [];
		arguments[0].sourceStatuses.forEach(function(sourceStatus){
			this._sourceStatuses.push(new SourceStatus(sourceStatus.description, sourceStatus.offsetDesc));
		}.bind(this));
		this._sinkStatus = new SinkStatus(arguments[0].sinkStatus.description, arguments[0].sinkStatus.offsetDesc);
	} else {
	 this._name = name;
	 this._id = id;
	 this._sourceStatuses = sourceStatuses;
	 this._sinkStatus = sinkStatus;
	}

};

StreamingQueryInfo.prototype.name = function() {
	return this._name;
 
   return Utils.generate(args);
};

StreamingQueryInfo.prototype.id = function() {
   return this._id;
};

StreamingQueryInfo.prototype.sourceStatuses = function() {
   return this._sourceStatuses;
};
	
StreamingQueryInfo.prototype.sinkStatus = function() {
   return this._sinkStatus;
};


module.exports = StreamingQueryInfo;
