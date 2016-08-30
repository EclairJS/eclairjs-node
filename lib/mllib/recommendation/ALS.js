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
     * Constructs an ALS instance with default parameters: {numBlocks: -1, rank: 10, iterations: 10,
     * lambda: 0.01, implicitPrefs: false, alpha: 1.0}.
     * @returns {??}
     * @class
     * @memberof module:eclairjs/mllib/recommendation
     */
    function ALS() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Set the number of blocks for both user blocks and product blocks to parallelize the computation
     * into; pass -1 for an auto-configured number of blocks. Default: -1.
     * @param {number} numBlocks
     * @returns {}
     */
    ALS.prototype.setBlocks = function(numBlocks) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setBlocks',
    //     args: [
    //       { value: numBlocks, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Set the number of user blocks to parallelize the computation.
     * @param {number} numUserBlocks
     * @returns {}
     */
    ALS.prototype.setUserBlocks = function(numUserBlocks) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setUserBlocks',
    //     args: [
    //       { value: numUserBlocks, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Set the number of product blocks to parallelize the computation.
     * @param {number} numProductBlocks
     * @returns {}
     */
    ALS.prototype.setProductBlocks = function(numProductBlocks) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setProductBlocks',
    //     args: [
    //       { value: numProductBlocks, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {number} rank
     * @returns {}
     */
    ALS.prototype.setRank = function(rank) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setRank',
    //     args: [
    //       { value: rank, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {number} iterations
     * @returns {}
     */
    ALS.prototype.setIterations = function(iterations) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setIterations',
    //     args: [
    //       { value: iterations, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {number} lambda
     * @returns {}
     */
    ALS.prototype.setLambda = function(lambda) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setLambda',
    //     args: [
    //       { value: lambda, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {boolean} implicitPrefs
     * @returns {}
     */
    ALS.prototype.setImplicitPrefs = function(implicitPrefs) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setImplicitPrefs',
    //     args: [
    //       { value: implicitPrefs, type: 'boolean' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Sets the constant used in computing confidence in implicit ALS. Default: 1.0.
     * @param {number} alpha
     * @returns {}
     */
    ALS.prototype.setAlpha = function(alpha) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setAlpha',
    //     args: [
    //       { value: alpha, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {number} seed
     * @returns {}
     */
    ALS.prototype.setSeed = function(seed) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setSeed',
    //     args: [
    //       { value: seed, type: 'number' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Set whether the least-squares problems solved at each iteration should have
     * nonnegativity constraints.
     * @param {boolean} b
     * @returns {}
     */
    ALS.prototype.setNonnegative = function(b) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setNonnegative',
    //     args: [
    //       { value: b, type: 'boolean' }
    //     ],
    //     returnType:
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Run ALS with the configured parameters on an input RDD of (user, product, rating) triples.
     * Returns a MatrixFactorizationModel with feature vectors for each user and product.
     * @param {module:eclairjs/rdd.RDD} ratings
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.prototype.runwithRDD = function(ratings) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'run',
    //     args: [
    //       { value: ratings, type: 'RDD' }
    //     ],
    //     returnType: MatrixFactorizationModel
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Java-friendly version of {@link run}.
     * @param {JavaRDD} ratings
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.prototype.runwithJavaRDD = function(ratings) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'run',
    //     args: [
    //       { value: ratings, type: 'JavaRDD' }
    //     ],
    //     returnType: MatrixFactorizationModel
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * Train a matrix factorization model given an RDD of ratings given by users to some products,
     * in the form of (userID, productID, rating) pairs. We approximate the ratings matrix as the
     * product of two lower-rank matrices of a given rank (number of features). To solve for these
     * features, we run a given number of iterations of ALS. This is done using a level of
     * parallelism given by `blocks`.
     *
     * @param {module:eclairjs/rdd.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @param {number} [lambda]  regularization factor (recommended: 0.01)
     * @param {number} [blocks]  level of parallelism to split computation into
     * @param {number} [seed]  random seed
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.train = function() {
      var MatrixFactorizationModel = require('./MatrixFactorizationModel.js')(this.kernelP);

      var args = {
        target: ALS,
        method: 'train',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: MatrixFactorizationModel
      };

      return Utils.generate(args);
    };

    /**
     * Train a matrix factorization model given an RDD of 'implicit preferences' given by users
     * to some products, in the form of (userID, productID, preference) pairs. We approximate the
     * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
     * To solve for these features, we run a given number of iterations of ALS. This is done using
     * a level of parallelism given by `blocks`.
     *
     * @param {module:eclairjs/rdd.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @param {number} lambda      regularization factor (recommended: 0.01)
     * @param {number} blocks      level of parallelism to split computation into
     * @param {number} alpha       confidence parameter
     * @param {number} seed        random seed
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.trainImplicit0 = function(ratings,rank,iterations,lambda,blocks,alpha,seed) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: ALS,
    //     method: 'trainImplicit',
    //     args: [
    //       { value: ratings, type: 'RDD' },
    //       { value: rank, type: 'number' },
    //       { value: iterations, type: 'number' },
    //       { value: lambda, type: 'number' },
    //       { value: blocks, type: 'number' },
    //       { value: alpha, type: 'number' },
    //       { value: seed, type: 'number' }
    //     ],
    //     returnType: MatrixFactorizationModel
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Train a matrix factorization model given an RDD of 'implicit preferences' given by users
     * to some products, in the form of (userID, productID, preference) pairs. We approximate the
     * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
     * To solve for these features, we run a given number of iterations of ALS. This is done using
     * a level of parallelism given by `blocks`.
     *
     * @param {module:eclairjs/rdd.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @param {number} lambda      regularization factor (recommended: 0.01)
     * @param {number} blocks      level of parallelism to split computation into
     * @param {number} alpha       confidence parameter
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.trainImplicit1 = function(ratings,rank,iterations,lambda,blocks,alpha) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: ALS,
    //     method: 'trainImplicit',
    //     args: [
    //       { value: ratings, type: 'RDD' },
    //       { value: rank, type: 'number' },
    //       { value: iterations, type: 'number' },
    //       { value: lambda, type: 'number' },
    //       { value: blocks, type: 'number' },
    //       { value: alpha, type: 'number' }
    //     ],
    //     returnType: MatrixFactorizationModel
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Train a matrix factorization model given an RDD of 'implicit preferences' given by users to
     * some products, in the form of (userID, productID, preference) pairs. We approximate the
     * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
     * To solve for these features, we run a given number of iterations of ALS. The level of
     * parallelism is determined automatically based on the number of partitions in `ratings`.
     *
     * @param {module:eclairjs/rdd.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @param {number} lambda      regularization factor (recommended: 0.01)
     * @param {number} alpha       confidence parameter
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.trainImplicit2 = function(ratings,rank,iterations,lambda,alpha) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: ALS,
    //     method: 'trainImplicit',
    //     args: [
    //       { value: ratings, type: 'RDD' },
    //       { value: rank, type: 'number' },
    //       { value: iterations, type: 'number' },
    //       { value: lambda, type: 'number' },
    //       { value: alpha, type: 'number' }
    //     ],
    //     returnType: MatrixFactorizationModel
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Train a matrix factorization model given an RDD of 'implicit preferences' ratings given by
     * users to some products, in the form of (userID, productID, rating) pairs. We approximate the
     * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
     * To solve for these features, we run a given number of iterations of ALS. The level of
     * parallelism is determined automatically based on the number of partitions in `ratings`.
     * Model parameters `alpha` and `lambda` are set to reasonable default values
     *
     * @param {module:eclairjs/rdd.RDD} ratings     RDD of (userID, productID, rating) pairs
     * @param {number} rank        number of features to use
     * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
     * @returns {module:eclairjs/mllib/recommendation.MatrixFactorizationModel}
     */
    ALS.trainImplicit3 = function(ratings,rank,iterations) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: ALS,
    //     method: 'trainImplicit',
    //     args: [
    //       { value: ratings, type: 'RDD' },
    //       { value: rank, type: 'number' },
    //       { value: iterations, type: 'number' }
    //     ],
    //     returnType: MatrixFactorizationModel
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    ALS.moduleLocation = '/mllib/recommendation/ALS';

    return ALS;
  })();
};