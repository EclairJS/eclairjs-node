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
var Transformer = require('../Transformer.js');

var gKernelP;


/**
 * @classdesc
 * :: Experimental ::
 * Maps a sequence of terms to their term frequencies using the hashing trick.
 * @class
 * @memberof module:eclairjs/ml/feature
 */

/**
 * @param {string} uid
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 * @constructor
 */
function HashingTF() {
  Utils.handleConstructor(this, arguments, gKernelP);
}

HashingTF.prototype = Object.create(Transformer.prototype);

HashingTF.prototype.constructor = HashingTF;



/**
 * @param {string} value
 * @returns {HashingTF}
 */
HashingTF.prototype.setInputCol = function(value) {
  var args ={
    target: this,
    method: 'setInputCol',
    args: Utils.wrapArguments(arguments),
    returnType: HashingTF

  };

  return Utils.generate(args);
};


/**
 * @param {string} value
 * @returns {HashingTF}
 */
HashingTF.prototype.setOutputCol = function(value) {
  var args ={
    target: this,
    method: 'setOutputCol',
    args: Utils.wrapArguments(arguments),
    returnType: HashingTF

  };

  return Utils.generate(args);
};


/**
 * @returns {Promise.<number>}
 */
HashingTF.prototype.getNumFeatures = function() {
  var args ={
    target: this,
    method: 'getNumFeatures',
    returnType: Number

  };

  return Utils.generate(args);
};


/**
 * @param {number} value
 * @returns {HashingTF}
 */
HashingTF.prototype.setNumFeatures = function(value) {
  var args ={
    target: this,
    method: 'setNumFeatures',
    args: Utils.wrapArguments(arguments),
    returnType: HashingTF

  };

  return Utils.generate(args);
};


/**
 * @param {module:eclairjs/sql.DataFrame} dataset
 * @returns {DataFrame}
 */
HashingTF.prototype.transform = function(dataset) {
  var DataFrame = require('../../sql/DataFrame.js');

  var args ={
    target: this,
    method: 'transform',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame

  };

  return Utils.generate(args);
};


/**
 * @param {StructType} schema
 * @returns {StructType}
 */
HashingTF.prototype.transformSchema = function(schema) {
  var StructType = require('../../sql/types/StructType.js')();

  var args ={
    target: this,
    method: 'transformSchema',
    args: Utils.wrapArguments(arguments),
    returnType: StructType

  };

  return Utils.generate(args);
};


/**
 * @param {module:eclairjs/ml/param.ParamMap} extra
 * @returns {HashingTF}
 */
HashingTF.prototype.copy = function(extra) {
  var args ={
    target: this,
    method: 'copy',
    args: Utils.wrapArguments(arguments),
    returnType: HashingTF

  };

  return Utils.generate(args);
};

//
// static methods
//


/**
 * @param {string} path
 * @returns {HashingTF}
 */
HashingTF.load = function(path) {
  var args ={
    target: HashingTF,
    method: 'load',
    kernelP: gKernelP,
    static: true,
    args: Utils.wrapArguments(arguments),
    returnType: HashingTF

  };

  return Utils.generate(args);
};

HashingTF.moduleLocation = '/ml/feature/HashingTF';

module.exports = function(kP) {
  if (kP) gKernelP = kP;

  return HashingTF;
};
