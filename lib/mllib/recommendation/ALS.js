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


var Utils = require('../../utils.js');
var MatrixFactorizationModel = require('./MatrixFactorizationModel.js');
var RDD = require('../../RDD.js');
var StorageLevel = require('../../storage/StorageLevel.js');

var kernelP;


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
 *  @class
 */
function ALS() {
  this.kernelP = kernelP;

  var templateStr = 'var {{refId}} = new ALS();';

  this.refIdP = Utils.evaluate(kernelP, ALS, templateStr, null, true);
}

/**
 * Set the number of blocks for both user blocks and product blocks to parallelize the computation
 * into; pass -1 for an auto-configured number of blocks. Default: -1.
 * @param {number} numBlocks
 * @returns {}
 */
ALS.prototype.setBlocks = function(numBlocks) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setBlocks({{numBlocks}});';
//
// return Utils.generateAssignment(this, , templateStr , {numBlocks : numBlocks});
};

/**
 * Set the number of user blocks to parallelize the computation.
 * @param {number} numUserBlocks
 * @returns {}
 */
ALS.prototype.setUserBlocks = function(numUserBlocks) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setUserBlocks({{numUserBlocks}});';
//
// return Utils.generateAssignment(this, , templateStr , {numUserBlocks : numUserBlocks});
};


/**
 * Set the number of product blocks to parallelize the computation.
 * @param {number} numProductBlocks
 * @returns {}
 */
ALS.prototype.setProductBlocks = function(numProductBlocks) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setProductBlocks({{numProductBlocks}});';
//
// return Utils.generateAssignment(this, , templateStr , {numProductBlocks : numProductBlocks});
};


/**
 * @param {number} rank
 * @returns {}
 */
ALS.prototype.setRank = function(rank) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setRank({{rank}});';
//
// return Utils.generateAssignment(this, , templateStr , {rank : rank});
};


/**
 * @param {number} iterations
 * @returns {}
 */
ALS.prototype.setIterations = function(iterations) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setIterations({{iterations}});';
//
// return Utils.generateAssignment(this, , templateStr , {iterations : iterations});
};


/**
 * @param {number} lambda
 * @returns {}
 */
ALS.prototype.setLambda = function(lambda) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setLambda({{lambda}});';
//
// return Utils.generateAssignment(this, , templateStr , {lambda : lambda});
};


/**
 * @param {boolean} implicitPrefs
 * @returns {}
 */
ALS.prototype.setImplicitPrefs = function(implicitPrefs) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setImplicitPrefs({{implicitPrefs}});';
//
// return Utils.generateAssignment(this, , templateStr , {implicitPrefs : implicitPrefs});
};


/**
 * Sets the constant used in computing confidence in implicit ALS. Default: 1.0.
 * @param {number} alpha
 * @returns {}
 */
ALS.prototype.setAlpha = function(alpha) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setAlpha({{alpha}});';
//
// return Utils.generateAssignment(this, , templateStr , {alpha : alpha});
};


/**
 * @param {number} seed
 * @returns {}
 */
ALS.prototype.setSeed = function(seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setSeed({{seed}});';
//
// return Utils.generateAssignment(this, , templateStr , {seed : seed});
};


/**
 * Set whether the least-squares problems solved at each iteration should have
 * nonnegativity consFts.
 * @param {boolean} b
 * @returns {}
 */
ALS.prototype.setNonnegative = function(b) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.setNonnegative({{b}});';
//
// return Utils.generateAssignment(this, , templateStr , {b : b});
};


/**
 * Run ALS with the configured parameters on an input RDD of (user, product, rating) triples.
 * Returns a MatrixFactorizationModel with feature vectors for each user and product.
 * @param {RDD} ratings
 * @returns {MatrixFactorizationModel}
 */
ALS.prototype.runwithRDD = function(ratings) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.run({{ratings}});';
//
// return Utils.generateAssignment(this, MatrixFactorizationModel, templateStr , {ratings : ratings});
};


/**
 * Java-friendly version of {@link run}.
 * @param {JavaRDD} ratings
 * @returns {MatrixFactorizationModel}
 */
ALS.prototype.runwithJavaRDD = function(ratings) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = {{inRefId}}.run({{ratings}});';
//
// return Utils.generateAssignment(this, MatrixFactorizationModel, templateStr , {ratings : ratings});
};

module.exports = ALS;
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
 * @param {RDD} ratings     RDD of (userID, productID, rating) pairs
 * @param {number} rank        number of features to use
 * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
 * @param {number} lambda      Optional regularization factor (recommended: 0.01)
 * @param {number} blocks      Optional level of parallelism to split computation into
 * @param {number} seed        Optional random seed
 * @returns {MatrixFactorizationModel}
 */
ALS.train = function(ratings, rank, iterations, lambda, blocks, seed) {
  var templateStr;

  if (seed) {
    templateStr = 'var {{refId}} = ALS.train({{ratings}}, {{rank}}, {{iterations}}, {{lambda}}, {{blocks}}, {{seed}});';
  } else if (blocks) {
    templateStr = 'var {{refId}} = ALS.train({{ratings}}, {{rank}}, {{iterations}}, {{lambda}}, {{blocks}});';
  } else if (lambda) {
    templateStr = 'var {{refId}} = ALS.train({{ratings}}, {{rank}}, {{iterations}}, {{lambda}});';
  } else {
    templateStr = 'var {{refId}} = ALS.train({{ratings}}, {{rank}}, {{iterations}});';
  }

  return Utils.evaluate(kernelP, MatrixFactorizationModel, templateStr, {ratings: Utils.prepForReplacement(ratings), rank: rank, iterations: iterations, lambda: lambda, blocks: blocks, seed: seed});
};

/**
 * Train a matrix factorization model given an RDD of 'implicit preferences' given by users
 * to some products, in the form of (userID, productID, preference) pairs. We approximate the
 * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
 * To solve for these features, we run a given number of iterations of ALS. This is done using
 * a level of parallelism given by `blocks`.
 *
 * @param {RDD} ratings     RDD of (userID, productID, rating) pairs
 * @param {number} rank        number of features to use
 * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
 * @param {number} lambda      regularization factor (recommended: 0.01)
 * @param {number} blocks      level of parallelism to split computation into
 * @param {number} alpha       confidence parameter
 * @param {number} seed        random seed
 * @returns {MatrixFactorizationModel}
 */
ALS.trainImplicit0 = function(ratings,rank,iterations,lambda,blocks,alpha,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = ALS.trainImplicit({{ratings}},{{rank}},{{iterations}},{{lambda}},{{blocks}},{{alpha}},{{seed}});';
//
// return Utils.generateAssignment(this, MatrixFactorizationModel, templateStr , {ratings : ratings,rank : rank,iterations : iterations,lambda : lambda,blocks : blocks,alpha : alpha,seed : seed});
};


/**
 * Train a matrix factorization model given an RDD of 'implicit preferences' given by users
 * to some products, in the form of (userID, productID, preference) pairs. We approximate the
 * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
 * To solve for these features, we run a given number of iterations of ALS. This is done using
 * a level of parallelism given by `blocks`.
 *
 * @param {RDD} ratings     RDD of (userID, productID, rating) pairs
 * @param {number} rank        number of features to use
 * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
 * @param {number} lambda      regularization factor (recommended: 0.01)
 * @param {number} blocks      level of parallelism to split computation into
 * @param {number} alpha       confidence parameter
 * @returns {MatrixFactorizationModel}
 */
ALS.trainImplicit1 = function(ratings,rank,iterations,lambda,blocks,alpha) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = ALS.trainImplicit({{ratings}},{{rank}},{{iterations}},{{lambda}},{{blocks}},{{alpha}});';
//
// return Utils.generateAssignment(this, MatrixFactorizationModel, templateStr , {ratings : ratings,rank : rank,iterations : iterations,lambda : lambda,blocks : blocks,alpha : alpha});
};


/**
 * Train a matrix factorization model given an RDD of 'implicit preferences' given by users to
 * some products, in the form of (userID, productID, preference) pairs. We approximate the
 * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
 * To solve for these features, we run a given number of iterations of ALS. The level of
 * parallelism is determined automatically based on the number of partitions in `ratings`.
 *
 * @param {RDD} ratings     RDD of (userID, productID, rating) pairs
 * @param {number} rank        number of features to use
 * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
 * @param {number} lambda      regularization factor (recommended: 0.01)
 * @param {number} alpha       confidence parameter
 * @returns {MatrixFactorizationModel}
 */
ALS.trainImplicit2 = function(ratings,rank,iterations,lambda,alpha) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = ALS.trainImplicit({{ratings}},{{rank}},{{iterations}},{{lambda}},{{alpha}});';
//
// return Utils.generateAssignment(this, MatrixFactorizationModel, templateStr , {ratings : ratings,rank : rank,iterations : iterations,lambda : lambda,alpha : alpha});
};


/**
 * Train a matrix factorization model given an RDD of 'implicit preferences' ratings given by
 * users to some products, in the form of (userID, productID, rating) pairs. We approximate the
 * ratings matrix as the product of two lower-rank matrices of a given rank (number of features).
 * To solve for these features, we run a given number of iterations of ALS. The level of
 * parallelism is determined automatically based on the number of partitions in `ratings`.
 * Model parameters `alpha` and `lambda` are set to reasonable default values
 *
 * @param {RDD} ratings     RDD of (userID, productID, rating) pairs
 * @param {number} rank        number of features to use
 * @param {number} iterations  number of iterations of ALS (recommended: 10-20)
 * @returns {MatrixFactorizationModel}
 */
ALS.trainImplicit3 = function(ratings,rank,iterations) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = ALS.trainImplicit({{ratings}},{{rank}},{{iterations}});';
//
// return Utils.generateAssignment(this, MatrixFactorizationModel, templateStr , {ratings : ratings,rank : rank,iterations : iterations});
};

module.exports = function(kP) {
  kernelP = kP;

  return ALS;
};