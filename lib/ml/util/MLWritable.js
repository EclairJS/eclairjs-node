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
 * Trait for classes that provide {@link MLWriter}.
 * @class
 * @memberof module:eclairjs/ml/util
 */


function MLWritable(kernelP, refIdP) {
	 throw "Can't instantiate abstract class - MLWritable";
}



/**
 * @returns {??}
 */
MLWritable.prototype.$init$ = function() {
  var args ={
    target: this,
    method: '$init$',
    returnType: ??

  };

  return Utils.generate(args);
};


/**
 * Returns an {@link MLWriter} instance for this ML instance.
 * @returns {MLWriter}
 */
MLWritable.prototype.write = function() {
  var MLWriter = require('../../ml/util/MLWriter.js');
  var args ={
    target: this,
    method: 'write',
    returnType: MLWriter

  };

  return Utils.generate(args);
};


/**
 * Saves this ML instance to the input path, a shortcut of `write.save(path)`.
 * @param {string} path
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
MLWritable.prototype.save = function(path) {
  var args ={
    target: this,
    method: 'save',
    args: Utils.wrapArguments(arguments),
    returnType: null

  };

  return Utils.generate(args);
};

module.exports = MLWritable;
