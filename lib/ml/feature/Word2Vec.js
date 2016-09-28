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

    var Estimator = require('../Estimator.js')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Word2Vec trains a model of `Map(String, Vector)`, i.e. transforms a word into a code for further
     * natural language processing or machine learning process.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml.Estimator
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function Word2Vec(kernelP, refIdP, uid) {
      Utils.handleConstructor(this, arguments, gKernelP);
    }


    Word2Vec.prototype = Object.create(Estimator.prototype);

    Word2Vec.prototype.constructor = Word2Vec;


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setInputCol = function(value) {
      var args ={
        target: this,
        method: 'setInputCol',
        args: [
          { value: value, type: 'string' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setOutputCol = function(value) {
      var args ={
        target: this,
        method: 'setOutputCol',
        args: [
          { value: value, type: 'string' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setVectorSize = function(value) {
      var args ={
        target: this,
        method: 'setVectorSize',
        args: [
          { value: value, type: 'number' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setWindowSize = function(value) {
      var args ={
        target: this,
        method: 'setWindowSize',
        args: [
          { value: value, type: 'number' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setStepSize = function(value) {
      var args ={
        target: this,
        method: 'setStepSize',
        args: [
          { value: value, type: 'number' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setNumPartitions = function(value) {
      var args ={
        target: this,
        method: 'setNumPartitions',
        args: [
          { value: value, type: 'number' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setMaxIter = function(value) {
      var args ={
        target: this,
        method: 'setMaxIter',
        args: [
          { value: value, type: 'number' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setSeed = function(value) {
      var args ={
        target: this,
        method: 'setSeed',
        args: [
          { value: value, type: 'number' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.setMinCount = function(value) {
      var args ={
        target: this,
        method: 'setMinCount',
        args: [
          { value: value, type: 'number' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type}
     */
    Word2Vec.prototype.setMaxSentenceLength = function(value) {
      var args ={
        target: this,
        method: 'setMaxSentenceLength',
        args: Utils.wrapArguments(arguments),
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/ml/feature.Word2VecModel}
     */
    Word2Vec.prototype.fit = function(dataset) {
      var Word2VecModel = require('./Word2VecModel')();

      var args ={
        target: this,
        method: 'fit',
        args: [
          { value: dataset, type: 'Dataset' }
        ],
        returnType: Word2VecModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Word2Vec.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js')();

      var args ={
        target: this,
        method: 'transformSchema',
        args: [
          { value: schema, type: 'StructType' }
        ],
        returnType: StructType

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: [
          { value: extra, type: 'ParamMap' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {module:eclairjs/ml/feature.Word2Vec}
     */
    Word2Vec.load = function(path) {
      var args ={
        target: Word2Vec,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: [
          { value: path, type: 'string' }
        ],
        returnType: Word2Vec

      };

      return Utils.generate(args);
    };

    Word2Vec.moduleLocation = '/ml/feature/Word2Vec';

    return Word2Vec;
  })();
};