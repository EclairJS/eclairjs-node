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
 *
 * Abstract class for utility classes that can load ML instances.
 *
 * @class
 * @memberof module:eclairjs/ml/util
 */

/**
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 * @constructor
 */
function MLReader(kernelP, refIdP) {
	 throw "Can't instantiate abstract class - MLReader";
}



/**
 * Loads the ML component from the input path.
 * @param {string} path
 * @returns {object}
 */
MLReader.prototype.load = function(path) {
  var args ={
    target: this,
    method: 'load',
    args: Utils.wrapArguments(arguments),
    returnType: object

  };

  return Utils.generate(args);
};


/**
 * @param {module:eclairjs/sql.SparkSession} sparkSession
 * @returns {MLReader}
 */
MLReader.prototype.session = function(sparkSession) {
  var args ={
    target: this,
    method: 'session',
    args: Utils.wrapArguments(arguments),
    returnType: MLReader

  };

  return Utils.generate(args);
};


/**
 * @param {module:eclairjs/sql.SQLContext} sqlContext
 * @returns {MLReader}
 */
MLReader.prototype.context = function(sqlContext) {
  var args ={
    target: this,
    method: 'context',
    args: Utils.wrapArguments(arguments),
    returnType: MLReader

  };

  return Utils.generate(args);
};

module.exports = MLReader;
