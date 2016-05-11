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

var UnaryTransformer = require('../UnaryTransformer')();

var gKernelP;

/**
 * @classdesc
 * Outputs the Hadamard product (i.e., the element-wise product) of each input vector with a
 * provided "weight" vector.  In other words, it scales each column of the dataset by a scalar
 * multiplier.
 * @class
 * @extends module:eclairjs/ml.UnaryTransformer
 * @memberof module:eclairjs/ml/feature
 * @param {string} [uid]
 */
function ElementwiseProduct() {
  if (arguments.length == 2 && arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: ElementwiseProduct,
      args: Utils.wrapArguments(arguments),
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

ElementwiseProduct.prototype = Object.create(UnaryTransformer.prototype);

ElementwiseProduct.prototype.constructor = ElementwiseProduct;

/**
 * An immutable unique ID for the object and its derivatives.
 * @returns {Promise.<string>}
 */
ElementwiseProduct.prototype.uid = function () {
  var args = {
    target: this,
    method: 'uid',
    args: Utils.wrapArguments(arguments),
    returnType: String
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/mllib/linalg.Vector} value
 * @returns {module:eclairjs/mllib/feature.ElementwiseProduct}
 */
ElementwiseProduct.prototype.setScalingVec = function(value) {
  var args = {
    target: this,
    method: 'setScalingVec',
    args: Utils.wrapArguments(arguments),
    returnType: ElementwiseProduct
  };

  return Utils.generate(args);
};

/**
 * @returns {module:eclairjs/mllib/linalg.Vector}
 */
ElementwiseProduct.prototype.getScalingVec = function() {
  var Vector = require('../../mllib/linalg/Vector');

  var args = {
    target: this,
    method: 'getScalingVec',
    args: Utils.wrapArguments(arguments),
    returnType: Vector
  };

  return Utils.generate(args);
};

/**
 * the vector to multiply with input vectors
 * @returns {module:eclairjs/ml/param.Param}
 */
ElementwiseProduct.prototype.scalingVec = function() {
  var Param = require('../param/Param')();

  var args = {
    target: this,
    method: 'getScalingVec',
    args: Utils.wrapArguments(arguments),
    returnType: Param
  };

  return Utils.generate(args);
};

ElementwiseProduct.moduleLocation = '/ml/feature/ElementwiseProduct';

module.exports = function(kP) {
  gKernelP = kP;

  return ElementwiseProduct;
};