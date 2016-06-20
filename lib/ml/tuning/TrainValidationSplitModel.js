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

var Model = require('../Model')();

var gKernelP;

/**
 * @classdesc
 * Model from train validation split.
 *
 * @class
 * @extends module:eclairjs/ml.Model
 * @memberof module:eclairjs/ml/tuning
 */
function TrainValidationSplitModel() {
  Utils.handleConstructor(this, arguments, gKernelP);
}

TrainValidationSplitModel.prototype = Object.create(Model.prototype);

TrainValidationSplitModel.prototype.constructor = TrainValidationSplitModel;

/**
 *
 * @returns {Promise.<number[]>}
 */
TrainValidationSplitModel.prototype.validationMetrics = function() {
  var args = {
    target: this,
    method: 'validationMetrics',
    args: Utils.wrapArguments(arguments),
    returnType: [Number]
  };

  return Utils.generate(args);};

/**
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
TrainValidationSplitModel.prototype.validateParams = function() {
  var args = {
    target: this,
    method: 'validateParams',
    args: Utils.wrapArguments(arguments),
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/sql.DataFrame} dataset
 * @returns {module:eclairjs/sql.DataFrame}
 */
TrainValidationSplitModel.prototype.transform = function(dataset) {
  var DataFrame = require('../../sql/DataFrame');

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
TrainValidationSplitModel.prototype.transformSchema = function(schema) {
  var StructType = require('../../sql/types/StructType')();

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
 * @returns {module:eclairjs/ml/tuning.TrainValidationSplitModel}
 */
TrainValidationSplitModel.prototype.copy = function(extra) {
  var args = {
    target: this,
    method: 'copy',
    args: Utils.wrapArguments(arguments),
    returnType: TrainValidationSplitModel
  };

  return Utils.generate(args);
};

TrainValidationSplitModel.moduleLocation = '/ml/tuning/TrainValidationSplitModel';

module.exports = function(kP) {
  if (kP) gKernelP = kP;

  return TrainValidationSplitModel;
};