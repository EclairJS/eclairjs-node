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

    var Utils = require('../../utils.js');

    var Attribute = require('./Attribute.js');

    var gKernelP = kernelP;

    /**
     * @classdesc
     * :: DeveloperApi ::
     * A numeric attribute with optional summary statistics.
     * @param name optional name
     * @param index optional index
     * @param min optional min value
     * @param max optional max value
     * @param std optional standard deviation
     * @param sparsity optional sparsity (ratio of zeros)
     * @class
     * @memberof module:eclairjs/ml/attribute
     * @extends module:eclairjs/sql/catalyst/expressions.Attribute
     */


    function NumericAttribute() {
      Utils.handleConstructor(this, arguments, gKernelP);

    }


    NumericAttribute.prototype = Object.create(Attribute.prototype);

    NumericAttribute.prototype.constructor = NumericAttribute;


    /**
     * @returns {AttributeType}
     */
    NumericAttribute.prototype.attrType = function() {
    throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'attrType',
    //     returnType: AttributeType
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} name
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withName = function(name) {
      var args ={
        target: this,
        method: 'withName',
        args: Utils.wrapArguments(arguments),
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withoutName = function() {
      var args ={
        target: this,
        method: 'withoutName',
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} index
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withIndex = function(index) {
      var args ={
        target: this,
        method: 'withIndex',
        args: Utils.wrapArguments(arguments),
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withoutIndex = function() {
      var args ={
        target: this,
        method: 'withoutIndex',
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     *  Copy with a new min value.
     * @param {number} min
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withMin = function(min) {
      var args ={
        target: this,
        method: 'withMin',
         args: Utils.wrapArguments(arguments),
       returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     *  Copy without the min value.
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withoutMin = function() {
      var args ={
        target: this,
        method: 'withoutMin',
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     *  Copy with a new max value.
     * @param {number} max
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withMax = function(max) {
      var args ={
        target: this,
        method: 'withMax',
        args: Utils.wrapArguments(arguments),
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     *  Copy without the max value.
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withoutMax = function() {
      var args ={
        target: this,
        method: 'withoutMax',
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     *  Copy with a new standard deviation.
     * @param {number} std
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withStd = function(std) {
      var args ={
        target: this,
        method: 'withStd',
        args: Utils.wrapArguments(arguments),
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     *  Copy without the standard deviation.
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withoutStd = function() {
      var args ={
        target: this,
        method: 'withoutStd',
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     *  Copy with a new sparsity.
     * @param {number} sparsity
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withSparsity = function(sparsity) {
      var args ={
        target: this,
        method: 'withSparsity',
        args: Utils.wrapArguments(arguments),
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     *  Copy without the sparsity.
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withoutSparsity = function() {
      var args ={
        target: this,
        method: 'withoutSparsity',
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     *  Copy without summary statistics.
     * @returns {NumericAttribute}
     */
    NumericAttribute.prototype.withoutSummary = function() {
      var args ={
        target: this,
        method: 'withoutSummary',
        returnType: NumericAttribute

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<boolean>}
     */
    NumericAttribute.prototype.isNumeric = function() {
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=result === 'true';
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'isNumeric',
    //     resolver: _resolve,
    //     returnType: boolean
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<boolean>}
     */
    NumericAttribute.prototype.isNominal = function() {
    throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=result === 'true';
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'isNominal',
    //     resolver: _resolve,
    //     returnType: boolean
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {object} other
     * @returns {Promise.<boolean>}
     */
    NumericAttribute.prototype.equals = function(other) {
    throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=result === 'true';
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'equals',
    //     args: [
    //       { value: other, type: 'object' }
    //     ],
    //     resolver: _resolve,
    //     returnType: boolean
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<number>}
     */
    NumericAttribute.prototype.hashCode = function() {
    throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=parseInt(result);
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'hashCode',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * The default numeric attribute.
     * @returns {module:eclairjs/ml/attribute.NumericAttribute}
     */
    NumericAttribute.defaultAttr = function() {
      var args = {
        target: NumericAttribute,
        method: 'defaultAttr',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: NumericAttribute
      };

      return Utils.generate(args);

    };


    NumericAttribute.moduleLocation = '/ml/attribute/NumericAttribute';

    return NumericAttribute;
  })();
};