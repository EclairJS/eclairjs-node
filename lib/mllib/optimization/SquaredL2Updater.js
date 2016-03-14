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
 * Class used to perform steps (weight update) using Gradient Descent methods.
 * For general minimization problems, or for regularized problems of the form min L(w) + regParam * R(w),
 * the compute function performs the actual update step, when given some (e.g. stochastic) gradient direction
 * for the loss L(w), and a desired step-size (learning rate).The updater is responsible to also perform the
 * update coming from the regularization term R(w) (if any regularization is used).
 * @class
 * @constructor
 */

function SquaredL2Updater() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = 'var {{refId}} = new SquaredL2Updater();';

    this.refIdP = Utils.evaluate(gKernelP, SquaredL2Updater, templateStr, null, true);
  }
}

module.exports = function(kP) {
  gKernelP = kP;

  return SquaredL2Updater;
};