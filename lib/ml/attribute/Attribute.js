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

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Abstract class for ML attributes.
     * @class
     * @memberof module:eclairjs/ml/attribute
     */

    /**
     * @constructor
     */
    function Attribute(kernelP, refIdP) {
      Utils.handleConstructor(this, arguments, gKernelP);

    }

    /**
     *  Attribute type.
     * @returns {AttributeType}
     */
    Attribute.prototype.attrType = function() {
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
     *  Name of the attribute. None if it is not set.
     * @returns {Promise.<string>}
     */
    Attribute.prototype.name = function() {
    throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=result;
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'name',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     *  Copy with a new name.
     * @param {string} name
     * @returns {Attribute}
     */
    Attribute.prototype.withName = function(name) {
    throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'withName',
    //     args: [
    //       { value: name, type: 'string' }
    //     ],
    //     returnType: Attribute
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     *  Copy without the name.
     * @returns {Attribute}
     */
    Attribute.prototype.withoutName = function() {
    throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'withoutName',
    //     returnType: Attribute
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     *  Index of the attribute. None if it is not set.
     * @returns {Promise.<number>}
     */
    Attribute.prototype.index = function() {
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
    //     method: 'index',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     *  Copy with a new index.
     * @param {number} index
     * @returns {Attribute}
     */
    Attribute.prototype.withIndex = function(index) {
    throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'withIndex',
    //     args: [
    //       { value: index, type: 'number' }
    //     ],
    //     returnType: Attribute
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     *  Copy without the index.
     * @returns {Attribute}
     */
    Attribute.prototype.withoutIndex = function() {
    throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'withoutIndex',
    //     returnType: Attribute
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Tests whether this attribute is numeric, true for [[NumericAttribute]] and {@link BinaryAttribute}.
     * @returns {Promise.<boolean>}
     */
    Attribute.prototype.isNumeric = function() {
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
    //     method: 'isNumeric',
    //     resolver: _resolve,
    //     returnType: boolean
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Tests whether this attribute is nominal, true for [[NominalAttribute]] and {@link BinaryAttribute}.
     * @returns {Promise.<boolean>}
     */
    Attribute.prototype.isNominal = function() {
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
     *  Converts to ML metadata with some existing metadata.
     * @param {module:eclairjs/sql/types.Metadata} [existingMetadata]
     * @returns {Metadata}
     */
    Attribute.prototype.toMetadata = function(existingMetadata) {
    throw "not implemented by ElairJS";
    // // TODO: handle optional parms 'existingMetadata'
    //   var args ={
    //     target: this,
    //     method: 'toMetadata',
    //     args: [
    //       { value: existingMetadata, type: 'Metadata' ,  optional: true}
    //     ],
    //     returnType: Metadata
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Converts to a {@link StructField} with some existing metadata.
     * @param {module:eclairjs/sql/types.Metadata} [existingMetadata]  existing metadata to carry over
     * @returns {StructField}
     */
    Attribute.prototype.toStructField = function(existingMetadata) {
    throw "not implemented by ElairJS";
    // // TODO: handle optional parms 'existingMetadata'
    //   var args ={
    //     target: this,
    //     method: 'toStructField',
    //     args: [
    //       { value: existingMetadata, type: 'Metadata' ,  optional: true}
    //     ],
    //     returnType: StructField
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string>}
     */
    Attribute.prototype.toString = function() {
    throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	try {
    // 		var returnValue=result;
    // 		resolve(returnValue);
    // 	} catch (e) {
    // 		var err = new Error("Parse Error: "+ e.message);
    // 		reject(err);
    // 	}
    // };
    //   var args ={
    //     target: this,
    //     method: 'toString',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    Attribute.moduleLocation = '/ml/attribute/Attribute';

    return Attribute;
  })();
};