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
     * Alternating Least Squares matrix factorization.
     *
     * ALS attempts to estimate the ratings matrix `R` as the product of two lower-rank matrices,
     * `X` and `Y`, i.e. `X * Yt = R`. Typically these approximations are called 'factor' matrices.
     * The general approach is iterative. During each iteration, one of the factor matrices is held
     * constant, while the other is solved for using least squares. The newly-solved factor matrix is
     * then held constant while solving for the other factor matrix.
     *
     * This is a blocked implementation of the ALS factorization algorithm that groups the two sets
     * of factors (referred to as "users" and "products") into blocks and reduces communication by only
     * sending one copy of each user vector to each product block on each iteration, and only for the
     * product blocks that need that user's feature vector. This is achieved by precomputing some
     * information about the ratings matrix to determine the "out-links" of each user (which blocks of
     * products it will contribute to) and "in-link" information for each product (which of the feature
     * vectors it receives from each user block it will depend on). This allows us to send only an
     * array of feature vectors between each user block and product block, and have the product block
     * find the users' ratings and update the products based on these messages.
     *
     * For implicit preference data, the algorithm used is based on
     * "Collaborative Filtering for Implicit Feedback Datasets", available at
     * [[http://dx.doi.org/10.1109/ICDM.2008.22]], adapted for the blocked approach used here.
     *
     * Essentially instead of finding the low-rank approximations to the rating matrix `R`,
     * this finds the approximations for a preference matrix `P` where the elements of `P` are 1 if
     * r > 0 and 0 if r <= 0. The ratings then act as 'confidence' values related to strength of
     * indicated user
     * preferences rather than explicit ratings given to items.
     * @classdesc
     */

    /**
     * A more class to represent a rating than array[Int, Int, float].
     * @classdesc
     */

    /**
     * @param {integer} user
     * @param {integer} product
     * @param {float} rating
     * @class
     * @memberof module:eclairjs/mllib/recommendation
     */
    function Rating() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }


    /**
    *
    * @returns {Promise.<object>}
    */
    Rating.prototype.product = function () {
     var args = {
       target: this,
       method: 'product',
       //args: Utils.wrapArguments(arguments),
       returnType: Number
     };

     return Utils.generate(args);
    };

    /**
    *
    * @returns {Promise.<object>}
    */
    Rating.prototype.user = function () {
     var args = {
       target: this,
       method: 'user',
       //args: Utils.wrapArguments(arguments),
       returnType: Number
     };
     return Utils.generate(args);
    };

     /**
     *
     * @returns {Promise.<object>}
     */
     Rating.prototype.rating = function () {
      var args = {
        target: this,
        method: 'rating',
        //args: Utils.wrapArguments(arguments),
        returnType: Number
      };
     return Utils.generate(args);
    };

    Rating.moduleLocation = '/mllib/recommendation/Rating';

    return Rating;
  })();
};