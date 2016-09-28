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
     * :: AlphaComponent ::
     *
     * User-defined type for {@link Vector} which allows easy interaction with SQL
     * via {@link DataFrame}.
     * @class
     * @memberof module:eclairjs/mllib/linalg
     */

    /**
     * @constructor
     */
    function VectorUDT() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @returns {StructType}
     */
    VectorUDT.prototype.sqlType = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'sqlType',
    //     returnType: StructType
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {object} obj
     * @returns {Promise.<InternalRow>}
     */
    VectorUDT.prototype.serialize = function(obj) {
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
    //     method: 'serialize',
    //     args: [
    //       { value: obj, type: 'object' }
    //     ],
    //     resolver: _resolve,
    //     returnType: InternalRow
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {object} datum
     * @returns {Vector}
     */
    VectorUDT.prototype.deserialize = function(datum) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'deserialize',
    //     args: [
    //       { value: datum, type: 'object' }
    //     ],
    //     returnType: Vector
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string>}
     */
    VectorUDT.prototype.pyUDT = function() {
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
    //     method: 'pyUDT',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Class}
     */
    VectorUDT.prototype.userClass = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'userClass',
    //     returnType: Class
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {object} o
     * @returns {Promise.<boolean>}
     */
    VectorUDT.prototype.equals = function(o) {
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
    //       { value: o, type: 'object' }
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
    VectorUDT.prototype.hashCode = function() {
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
    VectorUDT.prototype.typeName = function() {
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
    //     method: 'typeName',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    VectorUDT.moduleLocation = '/ml/linalg/VectorUDT';

    return VectorUDT;
  })();
};