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

var gKernelP;

/**
 * @classdesc
 * :: Experimental ::
 * Binarize a column of continuous features given a threshold.
 * @class
 * @memberof module:eclairjs/ml/feature
 */

/**
 * @param {string} uid
 * @constructor
 */
function Binarizer() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: Binarizer,
      args: Utils.wrapArguments(arguments),
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

/**
 * @returns {Promise.<number>}
 */
Binarizer.prototype.getThreshold = function() {
  var args = {
    target: this,
    method: 'getThreshold',
   returnType: Number
  };

  return Utils.generate(args);
};

/**
 * @param {number} value
 * @returns {module:eclairjs/ml/feature.Binarizer}
 */
Binarizer.prototype.setThreshold = function(value) {
  var args = {
    target: this,
    method: 'setThreshold',
    args: Utils.wrapArguments(arguments),
    returnType: Binarizer
  };

  return Utils.generate(args);
};

/**
 * @param {string} value
 * @returns {module:eclairjs/ml/feature.Binarizer}
 */
Binarizer.prototype.setInputCol = function(value) {
  var args = {
    target: this,
    method: 'setInputCol',
    args: Utils.wrapArguments(arguments),
    returnType: Binarizer
  };

  return Utils.generate(args);
};

/**
 * @param {string} value
 * @returns {module:eclairjs/ml/feature.Binarizer}
 */
Binarizer.prototype.setOutputCol = function(value) {
  var args = {
    target: this,
    method: 'setOutputCol',
    args: Utils.wrapArguments(arguments),
    returnType: Binarizer
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/sql.DataFrame} dataset
 * @returns {module:eclairjs/sql.DataFrame}
 */
Binarizer.prototype.transform = function(dataset) {
  var DataFrame = require('../../sql/DataFrame.js');

  var args = {
    target: this,
    method: 'transform',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/sql/types.StructType} schema
 * @returns {module:eclairjs/sql/types.StructType}
 */
Binarizer.prototype.transformSchema = function(schema) {
  var StructType = require('../../sql/types/StructType.js')();

  var args = {
    target: this,
    method: 'transformSchema',
    args: Utils.wrapArguments(arguments),
    returnType: StructType
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/ml/param.ParamMap} extra
 * @returns {module:eclairjs/ml/feature.Binarizer}
 */
Binarizer.prototype.copy = function(extra) {
  var args = {
    target: this,
    method: 'copy',
    args: Utils.wrapArguments(arguments),
    returnType: Binarizer
  };

  return Utils.generate(args);
};

//
// static methods
//

/**
 * @param {string} path
 * @returns {module:eclairjs/ml/feature.Binarizer}
 */
Binarizer.load = function(path) {
  var args = {
    target: Binarizer,
    method: 'load',
    kernelP: gKernelP,
    static: true,
    args: Utils.wrapArguments(arguments),
    returnType: Binarizer
  };

  return Utils.generate(args);
};

Binarizer.moduleLocation = '/ml/feature/Binarizer';

module.exports = function(kP) {
  if (kP) gKernelP = kP;

  return Binarizer;
};