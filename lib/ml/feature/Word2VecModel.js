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


    var Model = require('../Model.js')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * Model fitted by {@link Word2Vec}.
     * @class
     * @memberof module:eclairjs/ml/feature
     * @extends module:eclairjs/ml/util.MLWritable
     */

    function Word2VecModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Find "num" number of words closest in similarity to the given word.
     * Returns a Dataset with the words and the cosine similarities between the
     * synonyms and the given word.
     * @param {string} word
     * @param {number} num
     * @returns {module:eclairjs/sql.Dataset}
     */
    Word2VecModel.prototype.findSynonyms = function(word,num) {
      var Dataset = require('../../sql/Dataset.js');

      var args ={
        target: this,
        method: 'findSynonyms',
        args: [
          { value: word, type: 'string' },
          { value: num, type: 'number' }
        ],
        returnType: Dataset

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Word2VecModel}
     */
    Word2VecModel.prototype.setInputCol = function(value) {
      var args ={
        target: this,
        method: 'setInputCol',
        args: [
          { value: value, type: 'string' }
        ],
        returnType: Word2VecModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/feature.Word2VecModel}
     */
    Word2VecModel.prototype.setOutputCol = function(value) {
      var args ={
        target: this,
        method: 'setOutputCol',
        args: [
          { value: value, type: 'string' }
        ],
        returnType: Word2VecModel

      };

      return Utils.generate(args);
    };


    /**
     * Transform a sentence column to a vector column to represent the whole sentence. The transform
     * is performed by averaging all word vectors it contains.
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    Word2VecModel.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset.js');

      var args ={
        target: this,
        method: 'transform',
        args: [
          { value: dataset, type: 'Dataset' }
        ],
        returnType: Dataset

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {module:eclairjs/sql/types.StructType}
     */
    Word2VecModel.prototype.transformSchema = function(schema) {
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
     * @returns {module:eclairjs/ml/feature.Word2VecModel}
     */
    Word2VecModel.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: [
          { value: extra, type: 'ParamMap' }
        ],
        returnType: Word2VecModel

      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter}
     */
    Word2VecModel.prototype.write = function() {
    throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'write',
    //     returnType: MLWriter
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @returns {MLReader}
     */
    Word2VecModel.read = function() {
    throw "not implemented by ElairJS";
    //   var args ={
    //     target: Word2VecModel,
    //     method: 'read',
    //     returnType: MLReader
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} path
     * @returns {Word2VecModel}
     */
    Word2VecModel.load = function(path) {
      var args ={
        target: Word2VecModel,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: [
          { value: path, type: 'string' }
        ],
        returnType: Word2VecModel

      };

      return Utils.generate(args);
    };

    Word2VecModel.moduleLocation = '/ml/feature/Word2VecModel';

    return Word2VecModel;
  })();
};