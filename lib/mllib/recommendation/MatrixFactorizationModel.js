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

    var RDD = require('../../rdd/RDD.js');

    var gKernelP = kernelP;

    /**
     * Model representing the result of matrix factorization.
     *
     * Note: If you create the model directly using constructor, please be aware that fast prediction
     * requires cached user/product features and their associated partitioners.
     *
     * @param rank Rank for the features in this model.
     * @param userFeatures RDD of tuples where each tuple represents the userId and
     *                     the features computed for this user.
     * @param productFeatures RDD of tuples where each tuple represents the productId
     *                        and the features computed for this product.
     * @classdesc
     */

    /**
     * @param {number} rank
     * @param {module:eclairjs/rdd.RDD} userFeatures
     * @param {module:eclairjs/rdd.RDD} productFeatures
     * @class
     * @memberof module:eclairjs/mllib/recommendation
     */
    function MatrixFactorizationModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {number|RDD} user
     * @param {number} Optional product
     * @returns {Promise.<number>|RDD}
     */
    MatrixFactorizationModel.prototype.predict = function(user, product) {
      var args = {
        target: this,
        method: 'predict',
        args: Utils.wrapArguments(arguments),
        returnType: product ? Number : RDD
      };

      return Utils.generate(args);
    };

    /**
     * Recommends products to a user.
     *
     * @param {number} user  the user to recommend products to
     * @param {number} num  how many products to return. The number returned may be less than this.
     *  "score" in the rating field. Each represents one recommended product, and they are sorted
     *  by score, decreasing. The first returned is the one predicted to be most strongly
     *  recommended to the user. The score is an opaque value that indicates how strongly
     *  recommended the product is.
     * @returns {module:eclairjs/mllib/recommendation.Rating[]}  [[Rating]] objects, each of which contains the given user ID, a product ID, and a
     */
    MatrixFactorizationModel.prototype.recommendProducts = function(user,num) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'recommendProducts',
    //     args: [
    //       { value: user, type: 'number' },
    //       { value: num, type: 'number' }
    //     ],
    //     returnType: [Rating]
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Recommends users to a product. That is, this returns users who are most likely to be
     * interested in a product.
     *
     * @param {number} product  the product to recommend users to
     * @param {number} num  how many users to return. The number returned may be less than this.
     *  "score" in the rating field. Each represents one recommended user, and they are sorted
     *  by score, decreasing. The first returned is the one predicted to be most strongly
     *  recommended to the product. The score is an opaque value that indicates how strongly
     *  recommended the user is.
     * @returns {module:eclairjs/mllib/recommendation.Rating[]}  [[Rating]] objects, each of which contains a user ID, the given product ID, and a
     */
    MatrixFactorizationModel.prototype.recommendUsers = function(product,num) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'recommendUsers',
    //     args: [
    //       { value: product, type: 'number' },
    //       { value: num, type: 'number' }
    //     ],
    //     returnType: [Rating]
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * Save this model to the given path.
     *
     * This saves:
     *  - human-readable (JSON) model metadata to path/metadata/
     *  - Parquet formatted data to path/data/
     *
     * The model may be loaded using {@link load}.
     *
     * @param {module:eclairjs.SparkContext} sc   Spark context used to save model data.
     * @param {string} path   Path specifying the directory in which to save this model.
     * @param {boolean} [overwrite] overwrites the directory, defaults to false.
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    MatrixFactorizationModel.prototype.save = function(sc,path,overwrite) {
       var args ={
         target: this,
         method: 'save',
         args: [
           { value: sc, type: 'SparkContext' },
           { value: path, type: 'string' },
           { value: overwrite, type: 'booolean' }
         ],
         returnType: null

       };

       return Utils.generate(args);
    };

    /**
     * Recommends topK products for all users.
     *
     * @param {number} num  how many products to return for every user.
     * rating objects which contains the same userId, recommended productID and a "score" in the
     * rating field. Semantics of score is same as recommendProducts API
     * @returns {module:eclairjs/rdd.RDD}  [(Int, Array[Rating])] objects, where every tuple contains a userID and an array of
     */
    MatrixFactorizationModel.prototype.recommendProductsForUsers = function(num) {
      var args = {
        target: this,
         method: 'recommendProductsForUsers',
         args: Utils.wrapArguments(arguments),
         returnType: RDD
       };

       return Utils.generate(args);
    };

    /**
     * Recommends topK users for all products.
     *
     * @param {number} num  how many users to return for every product.
     * of rating objects which contains the recommended userId, same productID and a "score" in the
     * rating field. Semantics of score is same as recommendUsers API
     * @returns {module:eclairjs/rdd.RDD}  [(Int, Array[Rating])] objects, where every tuple contains a productID and an array
     */
    MatrixFactorizationModel.prototype.recommendUsersForProducts = function(num) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'recommendUsersForProducts',
    //     args: [
    //       { value: num, type: 'number' }
    //     ],
    //     returnType: RDD
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/rdd.RDD}
     */
    MatrixFactorizationModel.prototype.userFeatures = function() {
      var args = {
        target: this,
        method: 'userFeatures',
        returnType: RDD
      };

      return Utils.generate(args);
    };

    /**
     *
     * @returns {module:eclairjs/rdd.RDD}
     */
    MatrixFactorizationModel.prototype.productFeatures = function() {
      var args = {
        target: this,
        method: 'productFeatures',
        returnType: RDD
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * Load a model from the given path.
     *
     * The model should have been saved by {@link save}.
     *
     * @param {module:eclairjs.SparkContext} sc   Spark context used for loading model files.
     * @param {string} path   Path specifying the directory to which the model was saved.
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}   Model instance
     */
    MatrixFactorizationModel.load = function(sc,path) {
       var args ={
         target: MatrixFactorizationModel,
         method: 'load',
         static: true,
         kernelP: gKernelP,
         args: [
           { value: sc, type: 'SparkContext' },
           { value: path, type: 'string' } 
         ],
         returnType: MatrixFactorizationModel,

       };
       
       return Utils.generate(args);
    };


    MatrixFactorizationModel.moduleLocation = '/mllib/recommendation/MatrixFactorizationModel';

    return MatrixFactorizationModel;
  })();
};