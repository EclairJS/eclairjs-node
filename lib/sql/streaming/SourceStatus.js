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
 * Status and metrics of a streaming {@link Source}.
 *
 * @param description Description of the source corresponding to this status
 * @param offsetDesc Description of the current {@link Source} offset if known
 * @since EclairJS 0.7 Spark  2.0.0
 * @class
 * @memberof module:eclairjs/sql/streaming
 */

function SourceStatus(description, offsetDesc) {
	this._offsetDesc = offsetDesc;
	this._description = description;
};

SourceStatus.prototype.description = function() {
	return this._description;
 
   return Utils.generate(args);
};

SourceStatus.prototype.offsetDesc = function() {
   return this._offsetDesc;
};

module.exports = SourceStatus;
