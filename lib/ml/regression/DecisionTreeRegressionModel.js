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
 * [[http://en.wikipedia.org/wiki/Decision_tree_learning Decision tree]] model for regression.
 * It supports both continuous and categorical features.
 * @param rootNode  Root of the decision tree
 * @class
 * @memberof module:eclairjs/ml/regression
 * @extends module:eclairjs/mllib/tree/model.DecisionTreeModel
 */
function DecisionTreeRegressionModel() {
  Utils.handleConstructor(this, arguments, gKernelP);
}

/**
 * @param {module:eclairjs/ml/param.ParamMap} extra
 * @returns {module:eclairjs/ml/regression.DecisionTreeRegressionModel}
 */
DecisionTreeRegressionModel.prototype.copy = function(extra) {
  var args = {
    target: this,
    method: 'copy',
    args: Utils.wrapArguments(arguments),
    returnType: DecisionTreeRegressionModel
  };

  return Utils.generate(args);
};

DecisionTreeRegressionModel.moduleLocation = '/ml/regression/DecisionTreeRegressionModel';

module.exports = function(kP) {
  if (kP) gKernelP = kP;

  return DecisionTreeRegressionModel;
};