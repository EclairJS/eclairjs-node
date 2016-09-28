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
     * :: DeveloperApi ::
     * Attributes that describe a vector ML column.
     *
     * @param name name of the attribute group (the ML column name)
     * @param numAttributes optional number of attributes. At most one of `numAttributes` and `attrs`
     *                      can be defined.
     * @param attrs optional array of attributes. Attribute will be copied with their corresponding
     *              indices in the array.
     * @class
     * @memberof module:eclairjs/ml/attribute
     */

    /**
     * Creates an attribute group with attributes.
     * @param {string} name  name of the attribute group
     * @param {Attribute[]} attrs  array of attributes. Attributes will be copied with their corresponding indices in
     *              the array.
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function AttributeGroup() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }



    /**
     *  Size of the attribute group. Returns -1 if the size is unknown.
     * @returns {Promise.<number>}
     */
    AttributeGroup.prototype.size = function() {
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
    //     method: 'size',
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     *  Test whether this attribute group contains a specific attribute.
     * @param {string} attrName
     * @returns {Promise.<boolean>}
     */
    AttributeGroup.prototype.hasAttr = function(attrName) {
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
    //     method: 'hasAttr',
    //     args: [
    //       { value: attrName, type: 'string' }
    //     ],
    //     resolver: _resolve,
    //     returnType: boolean
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     *  Index of an attribute specified by name.
     * @param {string} attrName
     * @returns {Promise.<number>}
     */
    AttributeGroup.prototype.indexOf = function(attrName) {
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
    //     method: 'indexOf',
    //     args: [
    //       { value: attrName, type: 'string' }
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     *  Gets an attribute by its name.
     * @param {string} attrName
     * @returns {Attribute}
     */
    AttributeGroup.prototype.applywithstring = function(attrName) {

     var Attribute = require('./Attribute.js')();

      var args ={
        target: this,
        method: 'apply',
        args: Utils.wrapArguments(arguments),
        returnType: Attribute

      };

      return Utils.generate(args);
    };


    /**
     *  Gets an attribute by its name.
     * @param {string} attrName
     * @returns {Attribute}
     */
    AttributeGroup.prototype.getAttrwithstring = function(attrName) {

     var Attribute = require('./Attribute.js')();

      var args ={
        target: this,
        method: 'getAttr',
        args: Utils.wrapArguments(arguments),
        returnType: Attribute

      };

      return Utils.generate(args);
    };


    /**
     *  Gets an attribute by its index.
     * @param {number} attrIndex
     * @returns {Attribute}
     */
    AttributeGroup.prototype.applywithnumber = function(attrIndex) {

     var Attribute = require('./Attribute.js')();

      var args ={
        target: this,
        method: 'apply',
        args: Utils.wrapArguments(arguments),
        returnType: Attribute

      };

      return Utils.generate(args);
    };


    /**
     *  Gets an attribute by its index.
     * @param {number} attrIndex
     * @returns {Attribute}
     */
    AttributeGroup.prototype.getAttrwithnumber = function(attrIndex) {

     var Attribute = require('./Attribute.js')();

      var args ={
        target: this,
        method: 'getAttr',
        args: Utils.wrapArguments(arguments),
        returnType: Attribute

      };

      return Utils.generate(args);
    };


    /**
     *  Converts to ML metadata with some existing metadata.
     * @param {module:eclairjs/sql/types.Metadata} [existingMetadata]
     * @returns {Metadata}
     */
    AttributeGroup.prototype.toMetadata = function(existingMetadata) {

     var Metadata = require('../../sql/types/Metadata.js')();

     var args ={
        target: this,
        method: 'toMetadata',
        args: Utils.wrapArguments(arguments),
        returnType: Metadata

      };

      return Utils.generate(args);
    };


    /**
     *  Converts to a StructField with some existing metadata.
     * @param {module:eclairjs/sql/types.Metadata} [existingMetadata]
     * @returns {StructField}
     */
    AttributeGroup.prototype.toStructField = function(existingMetadata) {

      var StructField = require('../../sql/types/StructField.js')();

      var args ={
        target: this,
        method: 'toStructField',
        args: Utils.wrapArguments(arguments),
        returnType: StructField

      };

      return Utils.generate(args);
    };


    /**
     * @param {object} other
     * @returns {Promise.<boolean>}
     */
    AttributeGroup.prototype.equals = function(other) {
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
    AttributeGroup.prototype.hashCode = function() {
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
     * @returns {Promise.<string>}
     */
    AttributeGroup.prototype.toString = function() {
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

    //
    // static methods
    //


    /**
     *  Creates an attribute group from a {@link StructField} instance.
     * @param {module:eclairjs/sql/types.StructField} field
     * @returns {AttributeGroup}
     */
    AttributeGroup.fromStructField = function(field) {
      var args ={
        target: AttributeGroup,
        method: 'fromStructField',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: AttributeGroup

      };

      return Utils.generate(args);
    };

    AttributeGroup.moduleLocation = '/ml/attribute/AttributeGroup';

    return AttributeGroup;
  })();
};