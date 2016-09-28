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

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('../utils.js');

    var Transformer = require('./Transformer')();

    /**
     * @classdesc
     * A fitted model, i.e., a {@link module:eclairjs/ml.Transformer} produced by an {@link module:eclairjs/ml.Estimator}.
     *
     * @class
     * @memberof module:eclairjs/ml
     * @extends module:eclairjs/ml.Transformer
     */
    function Model() {
      Utils.handleAbstractConstructor(this, arguments);
    }

    Model.prototype = Object.create(Transformer.prototype);

    Model.prototype.constructor = Model;

    /**
     * Sets the parent of this model.
     * @param {module:eclairjs/ml.Estimator} parent
     * @returns {object}
     */
    Model.prototype.setParent = function(parent) {
      var args = {
        target: this,
        method: 'setParent',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/ml.Estimator}
     */
    Model.prototype.parent = function() {
      var Estimator = require('./Estimator')();

      var args = {
        target: this,
        method: 'parent',
        args: Utils.wrapArguments(arguments),
        returnType: Estimator
      };

      return Utils.generate(args);
    };

    /**
     *  Indicates whether this {@link Model} has a corresponding parent.
     * @returns {Promise.<boolean>}
     */
    Model.prototype.hasParent = function() {
      var args = {
        target: this,
        method: 'hasParent',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {object}
     */
    Model.prototype.copy = function(extra) {
      var args = {
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: Utils.getContextClass(this)
      };

      return Utils.generate(args);
    };

    return Model;
  })();
};