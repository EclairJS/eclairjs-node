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
var Estimator = require('../Estimator')();

var gKernelP;

/**
 * @classdesc
 * `QuantileDiscretizer` takes a column with continuous features and outputs a column with binned
 * categorical features. The bin ranges are chosen by taking a sample of the data and dividing it
 * into roughly equal parts. The lower and upper bin bounds will be -Infinity and +Infinity,
 * covering all real values. This attempts to find numBuckets partitions based on a sample of data,
 * but it may find fewer depending on the data sample values.
 * @class
 * @extends module:eclairjs/ml.Estimator
 * @memberof module:eclairjs/ml/feature
 * @param {string} [uid]
 */
function QuantileDiscretizer() {
  Utils.handleConstructor(this, arguments, gKernelP);
}

QuantileDiscretizer.prototype = Object.create(Estimator.prototype);

QuantileDiscretizer.prototype.constructor = QuantileDiscretizer;

/**
 * @param {number} value
 * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
 */
QuantileDiscretizer.prototype.setNumBuckets = function(value) {
  var args = {
    target: this,
    method: 'setNumBuckets',
    args: Utils.wrapArguments(arguments),
    returnType: QuantileDiscretizer
  };

  return Utils.generate(args);
};

/**
 * Maximum number of buckets (quantiles, or categories) into which data points are grouped. Must be >= 2. default: 2
 * @returns {module:eclairjs/ml/param.IntParam}
 */
QuantileDiscretizer.prototype.numBuckets = function () {
  var IntParam = require('../param/IntParam')();

  var args = {
    target: this,
    method: 'numBuckets',
    args: Utils.wrapArguments(arguments),
    returnType: IntParam
  };

  return Utils.generate(args);
};

/**
 * @returns {Promise.<number>}
 */
QuantileDiscretizer.prototype.getNumBuckets = function () {
  var args = {
    target: this,
    method: 'getNumBuckets',
    args: Utils.wrapArguments(arguments),
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * @param {string} value
 * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
 */
QuantileDiscretizer.prototype.setInputCol = function(value) {
  var args = {
    target: this,
    method: 'setInputCol',
    args: Utils.wrapArguments(arguments),
    returnType: QuantileDiscretizer
  };

  return Utils.generate(args);
};

/**
 * @param {string} value
 * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
 */
QuantileDiscretizer.prototype.setOutputCol = function(value) {
  var args = {
    target: this,
    method: 'setOutputCol',
    args: Utils.wrapArguments(arguments),
    returnType: QuantileDiscretizer
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/ml/param.ParamMap} extra
 * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
 */
QuantileDiscretizer.prototype.copy = function(extra) {
  var args = {
    target: this,
    method: 'copy',
    args: Utils.wrapArguments(arguments),
    returnType: QuantileDiscretizer
  };

  return Utils.generate(args);
};

//
// static methods
//

/**
 * @param {string} path
 * @returns {module:eclairjs/ml/feature.QuantileDiscretizer}
 */
QuantileDiscretizer.load = function(path) {
  var args = {
    target: QuantileDiscretizer,
    method: 'load',
    kernelP: gKernelP,
    static: true,
    args: Utils.wrapArguments(arguments),
    returnType: QuantileDiscretizer
  };

  return Utils.generate(args);
};

QuantileDiscretizer.moduleLocation = '/ml/feature/QuantileDiscretizer';

module.exports = function(kP) {
  if (kP) gKernelP = kP;

  return QuantileDiscretizer;
};