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
     * :: Experimental ::
     * A trigger that runs a query periodically based on the processing time. If `interval` is 0,
     * the query will run as fast as possible.
     *
     * @example
     *   df.write.trigger(ProcessingTime.create("10 seconds"))
     *
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @class
     * @memberof module:eclairjs/sql/streaming
     * @extends module:eclairjs/sql/streaming.Trigger
     */

    /**
     * @param {number} intervalMs
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function ProcessingTime() {
      Utils.handleConstructor(this, arguments, gKernelP);
    };


//
// static methods
//


    /**
     * Create a {@link ProcessingTime}. If `interval` is 0, the query will run as fast as possible.
     *
     * Example:
     * @example
     *   df.write.trigger(ProcessingTime("10 seconds"))
     *
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} interval
     * @returns {ProcessingTime}
     */
    ProcessingTime.applywithstring = function(interval) {
      throw "not implemented by ElairJS";
// var ProcessingTime = require('../../sql/streaming/ProcessingTime.js');
//   var args ={
//     target: ProcessingTime, 
//     method: 'apply', 
//     args: Utils.wrapArguments(arguments),
//     static: true,
//     returnType: ProcessingTime
// 
//   };
// 
//   return Utils.generate(args);
    };


    /**
     * Create a {@link ProcessingTime}. If `interval` is 0, the query will run as fast as possible.
     *
     * Example:
     * @example
     *   import scala.concurrent.duration._
     *   df.write.trigger(ProcessingTime(10.seconds))
     *
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {module:eclairjs/streaming.Duration} interval
     * @returns {ProcessingTime}
     */
    ProcessingTime.applywithDuration = function(interval) {
      throw "not implemented by ElairJS";
// var ProcessingTime = require('../../sql/streaming/ProcessingTime.js');
//   var args ={
//     target: ProcessingTime, 
//     method: 'apply', 
//     args: Utils.wrapArguments(arguments),
//     static: true,
//     returnType: ProcessingTime
// 
//   };
// 
//   return Utils.generate(args);
    };


    /**
     * Create a {@link ProcessingTime}. If `interval` is 0, the query will run as fast as possible.
     *
     * Example:
     * @example
     *   df.write.trigger(ProcessingTime.create("10 seconds"))
     *
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} interval
     * @returns {ProcessingTime}
     */
    ProcessingTime.create = function(interval) {
      //var ProcessingTime = require('../../sql/streaming/ProcessingTime.js');
      var args ={
        target: ProcessingTime,
        method: 'create',
        kernelP: gKernelP,
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: ProcessingTime

      };

      return Utils.generate(args);
    };


    /**
     * Create a {@link ProcessingTime}. If `interval` is 0, the query will run as fast as possible.
     *
     * Example:
     * @example
     *   import java.util.concurrent.TimeUnit
     *   df.write.trigger(ProcessingTime.create(10, TimeUnit.SECONDS))
     *
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {number} interval
     * @param {TimeUnit} unit
     * @returns {ProcessingTime}
     * @ignore
     */
    ProcessingTime.createwithUnit = function(interval,unit) {
      throw "not implemented by ElairJS";
// var ProcessingTime = require('../../sql/streaming/ProcessingTime.js');
//   var args ={
//     target: ProcessingTime, 
//     method: 'create', 
//     args: Utils.wrapArguments(arguments),
//     static: true,
//     returnType: ProcessingTime
// 
//   };
// 
//   return Utils.generate(args);
    };

//module.exports = ProcessingTime;
    ProcessingTime.moduleLocation = '/sql/streaming/ProcessingTime';


    return ProcessingTime;
  })();
};