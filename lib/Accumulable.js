/*
 * Copyright 2015 IBM Corp.
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
    var Utils = require('./utils.js');

    var gKernelP = kernelP;

    /**
     * A data type that can be accumulated, ie has an commutative and associative "add" operation,
     * but where the result type, `R`, may be different from the element type being added, `T`.
     *
     * You must define how to add data, and how to merge two of these together.  For some data types,
     * such as a counter, these might be the same operation. In that case, you can use the simpler
     * {@link Accumulator}. They won't always be the same, though -- e.g., imagine you are
     * accumulating a set. You will add items to the set, and you will union two sets together.
     *
     * @classdesc
     * @constructor
     * @memberof module:eclairjs
     * @param {object} initialValue initial value of accumulator
     * @param {module:eclairjs.AccumulableParam} param helper object defining how to add elements
     * @param {string} name human-readable name for use in Spark's web UI
     */
    /*
     * NOTE for now EclairJS will only support floats and int types
     *
     */
    function Accumulable() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Add more data to this accumulator / accumulable
     * @param {object} term  the data to add
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    Accumulable.prototype.add = function(term) {
      var args = {
        target: this,
        method: 'add',
        args: [{value: term, type: 'number'}]
      };

      return Utils.generate(args);
    };

    /**
     * Merge two accumulable objects together
     *
     * Normally, a user will not want to use this version, but will instead call `add`.
     * @param {object} term  the other `R` that will get merged with this
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    Accumulable.prototype.merge = function(term) {
      var args = {
        target: this,
        method: 'merge',
        args: [{value: term}]
      };

      return Utils.generate(args);
    };

    /**
     * Access the accumulator's current value; only allowed on master.
     * @returns {Promise.<Number>}
     */
    Accumulable.prototype.value = function() {
      var args = {
        target: this,
        method: 'value',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Get the current value of this accumulator from within a task.
     *
     * This is NOT the global value of the accumulator.  To get the global value after a
     * completed operation on the dataset, call `value`.
     *
     * The typical use of this method is to directly mutate the local value, eg., to add
     * an element to a Set.
     * @returns {Promise.<Number>}
     */
    Accumulable.prototype.localValue = function() {
      var args = {
        target: this,
        method: 'localValue',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Set the accumulator's value; only allowed on master
     * @param {object}
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    Accumulable.prototype.setValue = function(newValue) {
      var args = {
        target: this,
        method: 'setValue',
        args: [{value: newValue, type: 'number'}]
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    Accumulable.prototype.toString = function() {
      var args = {
        target: this,
        method: 'toString',
        returnType: String
      };

      return Utils.generate(args);
    };

    Accumulable.moduleLocation = '/Accumulable';

    return Accumulable;
  })();
};