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
 * Trait for objects that provide {@link MLReader}.
 *
 * @class
 * @memberof module:eclairjs/ml/util
 */


function MLReadable(kernelP, refIdP) {
	 throw "Can't instantiate abstract class - MLReadable";
}




/**
 * Returns an {@link MLReader} instance for this class.
 * @returns {MLReader}
 */
MLReadable.prototype.read = function() {
  var MLReader = require('../../ml/util/MLReader.js');
  var args ={
    target: this,
    method: 'read',
    returnType: MLReader

  };

  return Utils.generate(args);
};


/**
 * Reads an ML instance from the input path, a shortcut of `read.load(path)`.
 *
 * Note: Implementing classes should override this to be Java-friendly.
 * @param {string} path
 * @returns {object}
 */
MLReadable.prototype.load = function(path) {
  var args ={
    target: this,
    method: 'load',
    args: Utils.wrapArguments(arguments),
    returnType: object

  };

  return Utils.generate(args);
};

module.exports = MLReadable;
