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

var Utils = require('../../../utils.js');

var gKernelP;

/**
 * Represents a random forest model.
 *
 * @param algo algorithm for the ensemble model, either Classification or Regression
 * @param trees tree ensembles
 * @classdesc
 */

/**
 * @param {Algo} algo
 * @param {DecisionTreeModel[]} trees
 * @class
 * @memberof module:eclairjs/mllib/tree/model
 */
function RandomForestModel() {
  if (arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: RandomForestModel,
      args: Utils.wrapArguments(arguments),
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

/**
 *
 * @param {module:eclairjs.SparkContext} sc   Spark context used to save model data.
 * @param {string} path   Path specifying the directory in which to save this model.
 *              If the directory already exists, this method throws an exception.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
RandomForestModel.prototype.save = function(sc,path) {
  var args = {
    target: this,
    method: 'save',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

RandomForestModel.moduleLocation = '/mllib/tree/model/RandomForestModel';

module.exports = function(kP) {
  gKernelP = kP;

  return RandomForestModel;
};