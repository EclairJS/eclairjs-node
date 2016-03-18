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
var RDD = require('../../rdd/RDD.js');

var gKernelP;

function RandomRDDs() {
}

//
// static methods
//


/**
 * Generates an RDD comprised of `i.i.d.` samples from the uniform distribution `U(0.0, 1.0)`.
 *
 * To transform the distribution in the generated RDD from `U(0.0, 1.0)` to `U(a, b)`, use
 * `RandomRDDs.uniformRDD(sc, n, p, seed).map(v => a + (b - a) * v)`.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ `U(0.0, 1.0)`.
 */
RandomRDDs.uniformRDD = function(sc,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.uniformRDD({{sc}},{{size}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,size : size,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#uniformRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.uniformJavaRDD0 = function(jsc,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.uniformJavaRDD({{jsc}},{{size}},{{numPartitions}},{{seed}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,size : size,numPartitions : numPartitions,seed : seed}, _resolve);
};


/**
 * [[RandomRDDs#uniformJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} size
 * @param {number} numPartitions
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.uniformJavaRDD1 = function(jsc,size,numPartitions) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.uniformJavaRDD({{jsc}},{{size}},{{numPartitions}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,size : size,numPartitions : numPartitions}, _resolve);
};


/**
 * [[RandomRDDs#uniformJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} size
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.uniformJavaRDD2 = function(jsc,size) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.uniformJavaRDD({{jsc}},{{size}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,size : size}, _resolve);
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the standard normal distribution.
 *
 * To transform the distribution in the generated RDD from standard normal to some other normal
 * `N(mean, sigma^2^)`, use `RandomRDDs.normalRDD(sc, n, p, seed).map(v => mean + sigma * v)`.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Optional Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Optional Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ N(0.0, 1.0).
 */
RandomRDDs.normalRDD = function(sc,size,numPartitions,seed) {
  var templateStr;

  if (seed) {
    templateStr = 'var {{refId}} = RandomRDDs.normalRDD({{sc}},{{size}},{{numPartitions}},{{seed}});';
  } else if (numPartitions) {
    templateStr = 'var {{refId}} = RandomRDDs.normalRDD({{sc}},{{size}},{{numPartitions}});';
  } else {
    templateStr = 'var {{refId}} = RandomRDDs.normalRDD({{sc}},{{size}});';
  }

  return Utils.evaluate(gKernelP, RDD, templateStr, {sc: Utils.prepForReplacement(sc), size: size, numPartitions: numPartitions, seed: seed});
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the Poisson distribution with the input
 * mean.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean, or lambda, for the Poisson distribution.
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.poissonRDD = function(sc,mean,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.poissonRDD({{sc}},{{mean}},{{size}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,mean : mean,size : size,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#poissonRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.poissonJavaRDD0 = function(jsc,mean,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.poissonJavaRDD({{jsc}},{{mean}},{{size}},{{numPartitions}},{{seed}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,mean : mean,size : size,numPartitions : numPartitions,seed : seed}, _resolve);
};


/**
 * [[RandomRDDs#poissonJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @param {number} numPartitions
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.poissonJavaRDD1 = function(jsc,mean,size,numPartitions) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.poissonJavaRDD({{jsc}},{{mean}},{{size}},{{numPartitions}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,mean : mean,size : size,numPartitions : numPartitions}, _resolve);
};


/**
 * [[RandomRDDs#poissonJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.poissonJavaRDD2 = function(jsc,mean,size) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.poissonJavaRDD({{jsc}},{{mean}},{{size}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,mean : mean,size : size}, _resolve);
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the exponential distribution with
 * the input mean.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean, or 1 / lambda, for the exponential distribution.
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.exponentialRDD = function(sc,mean,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.exponentialRDD({{sc}},{{mean}},{{size}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,mean : mean,size : size,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#exponentialRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.exponentialJavaRDD0 = function(jsc,mean,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.exponentialJavaRDD({{jsc}},{{mean}},{{size}},{{numPartitions}},{{seed}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,mean : mean,size : size,numPartitions : numPartitions,seed : seed}, _resolve);
};


/**
 * [[RandomRDDs#exponentialJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @param {number} numPartitions
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.exponentialJavaRDD1 = function(jsc,mean,size,numPartitions) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.exponentialJavaRDD({{jsc}},{{mean}},{{size}},{{numPartitions}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,mean : mean,size : size,numPartitions : numPartitions}, _resolve);
};


/**
 * [[RandomRDDs#exponentialJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} size
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.exponentialJavaRDD2 = function(jsc,mean,size) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.exponentialJavaRDD({{jsc}},{{mean}},{{size}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,mean : mean,size : size}, _resolve);
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the gamma distribution with the input
 *  shape and scale.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} shape  shape parameter (> 0) for the gamma distribution
 * @param {number} scale  scale parameter (> 0) for the gamma distribution
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.gammaRDD = function(sc,shape,scale,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.gammaRDD({{sc}},{{shape}},{{scale}},{{size}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,shape : shape,scale : scale,size : size,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#gammaRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.gammaJavaRDD0 = function(jsc,shape,scale,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.gammaJavaRDD({{jsc}},{{shape}},{{scale}},{{size}},{{numPartitions}},{{seed}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,shape : shape,scale : scale,size : size,numPartitions : numPartitions,seed : seed}, _resolve);
};


/**
 * [[RandomRDDs#gammaJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} size
 * @param {number} numPartitions
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.gammaJavaRDD1 = function(jsc,shape,scale,size,numPartitions) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.gammaJavaRDD({{jsc}},{{shape}},{{scale}},{{size}},{{numPartitions}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,shape : shape,scale : scale,size : size,numPartitions : numPartitions}, _resolve);
};


/**
 * [[RandomRDDs#gammaJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} size
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.gammaJavaRDD2 = function(jsc,shape,scale,size) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.gammaJavaRDD({{jsc}},{{shape}},{{scale}},{{size}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,shape : shape,scale : scale,size : size}, _resolve);
};


/**
 * Generates an RDD comprised of `i.i.d.` samples from the log normal distribution with the input
 *  mean and standard deviation
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  mean for the log normal distribution
 * @param {number} std  standard deviation for the log normal distribution
 * @param {number} size  Size of the RDD.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Double] comprised of `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.logNormalRDD = function(sc,mean,std,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.logNormalRDD({{sc}},{{mean}},{{std}},{{size}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,mean : mean,std : std,size : size,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#logNormalRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} size
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.logNormalJavaRDD0 = function(jsc,mean,std,size,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.logNormalJavaRDD({{jsc}},{{mean}},{{std}},{{size}},{{numPartitions}},{{seed}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,mean : mean,std : std,size : size,numPartitions : numPartitions,seed : seed}, _resolve);
};


/**
 * [[RandomRDDs#logNormalJavaRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} size
 * @param {number} numPartitions
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.logNormalJavaRDD1 = function(jsc,mean,std,size,numPartitions) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.logNormalJavaRDD({{jsc}},{{mean}},{{std}},{{size}},{{numPartitions}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,mean : mean,std : std,size : size,numPartitions : numPartitions}, _resolve);
};


/**
 * [[RandomRDDs#logNormalJavaRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} size
 * @returns {Promise.<JavaDoubleRDD>}
 */
RandomRDDs.logNormalJavaRDD2 = function(jsc,mean,std,size) {
  throw "not implemented by ElairJS";
//
// function _resolve(result, resolve, reject) {
// 	var returnValue=result
// 	resolve(returnValue);
// };
//
// var templateStr = 'RandomRDDs.logNormalJavaRDD({{jsc}},{{mean}},{{std}},{{size}});';
// return Utils.generateResultPromise(this, templateStr  , {jsc : jsc,mean : mean,std : std,size : size}, _resolve);
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * uniform distribution on `U(0.0, 1.0)`.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD.
 * @param {number} seed  Seed for the RNG that generates the seed for the generator in each partition.
 * @returns {RDD}  RDD[Vector] with vectors containing i.i.d samples ~ `U(0.0, 1.0)`.
 */
RandomRDDs.uniformVectorRDD = function(sc,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.uniformVectorRDD({{sc}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#uniformVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.uniformJavaVectorRDD0 = function(jsc,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.uniformJavaVectorRDD({{jsc}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * [[RandomRDDs#uniformJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.uniformJavaVectorRDD1 = function(jsc,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.uniformJavaVectorRDD({{jsc}},{{numRows}},{{numCols}},{{numPartitions}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,numRows : numRows,numCols : numCols,numPartitions : numPartitions});
};


/**
 * [[RandomRDDs#uniformJavaVectorRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.uniformJavaVectorRDD2 = function(jsc,numRows,numCols) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.uniformJavaVectorRDD({{jsc}},{{numRows}},{{numCols}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,numRows : numRows,numCols : numCols});
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * standard normal distribution.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Optional Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Optional Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples ~ `N(0.0, 1.0)`.
 */
RandomRDDs.normalVectorRDD = function(sc,numRows,numCols,numPartitions,seed) {
  var templateStr;

  if (seed) {
    templateStr = 'var {{refId}} = RandomRDDs.normalVectorRDD({{sc}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
  } else if (numPartitions) {
    templateStr = 'var {{refId}} = RandomRDDs.normalVectorRDD({{sc}},{{numRows}},{{numCols}},{{numPartitions}});';
  } else {
    templateStr = 'var {{refId}} = RandomRDDs.normalVectorRDD({{sc}},{{numRows}},{{numCols}});';
  }

  return Utils.evaluate(gKernelP, RDD, templateStr, {sc: Utils.prepForReplacement(sc), numRows: numRows, numCols: numCols, numPartitions: numPartitions, seed: seed});
};

/**
 * Java-friendly version of [[RandomRDDs#normalVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.normalJavaVectorRDD0 = function(jsc,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.normalJavaVectorRDD({{jsc}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * [[RandomRDDs#normalJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.normalJavaVectorRDD1 = function(jsc,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.normalJavaVectorRDD({{jsc}},{{numRows}},{{numCols}},{{numPartitions}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,numRows : numRows,numCols : numCols,numPartitions : numPartitions});
};


/**
 * [[RandomRDDs#normalJavaVectorRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.normalJavaVectorRDD2 = function(jsc,numRows,numCols) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.normalJavaVectorRDD({{jsc}},{{numRows}},{{numCols}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,numRows : numRows,numCols : numCols});
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from a
 * log normal distribution.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean of the log normal distribution.
 * @param {number} std  Standard deviation of the log normal distribution.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`).
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples.
 */
RandomRDDs.logNormalVectorRDD = function(sc,mean,std,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.logNormalVectorRDD({{sc}},{{mean}},{{std}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,mean : mean,std : std,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#logNormalVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.logNormalJavaVectorRDD0 = function(jsc,mean,std,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.logNormalJavaVectorRDD({{jsc}},{{mean}},{{std}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,mean : mean,std : std,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * [[RandomRDDs#logNormalJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.logNormalJavaVectorRDD1 = function(jsc,mean,std,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.logNormalJavaVectorRDD({{jsc}},{{mean}},{{std}},{{numRows}},{{numCols}},{{numPartitions}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,mean : mean,std : std,numRows : numRows,numCols : numCols,numPartitions : numPartitions});
};


/**
 * [[RandomRDDs#logNormalJavaVectorRDD]] with the default number of partitions and
 * the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} std
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.logNormalJavaVectorRDD2 = function(jsc,mean,std,numRows,numCols) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.logNormalJavaVectorRDD({{jsc}},{{mean}},{{std}},{{numRows}},{{numCols}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,mean : mean,std : std,numRows : numRows,numCols : numCols});
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * Poisson distribution with the input mean.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean, or lambda, for the Poisson distribution.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`)
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples ~ Pois(mean).
 */
RandomRDDs.poissonVectorRDD = function(sc,mean,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.poissonVectorRDD({{sc}},{{mean}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,mean : mean,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#poissonVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.poissonJavaVectorRDD0 = function(jsc,mean,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.poissonJavaVectorRDD({{jsc}},{{mean}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,mean : mean,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * [[RandomRDDs#poissonJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.poissonJavaVectorRDD1 = function(jsc,mean,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.poissonJavaVectorRDD({{jsc}},{{mean}},{{numRows}},{{numCols}},{{numPartitions}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,mean : mean,numRows : numRows,numCols : numCols,numPartitions : numPartitions});
};


/**
 * [[RandomRDDs#poissonJavaVectorRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.poissonJavaVectorRDD2 = function(jsc,mean,numRows,numCols) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.poissonJavaVectorRDD({{jsc}},{{mean}},{{numRows}},{{numCols}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,mean : mean,numRows : numRows,numCols : numCols});
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * exponential distribution with the input mean.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} mean  Mean, or 1 / lambda, for the Exponential distribution.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`)
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples ~ Exp(mean).
 */
RandomRDDs.exponentialVectorRDD = function(sc,mean,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.exponentialVectorRDD({{sc}},{{mean}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,mean : mean,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#exponentialVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.exponentialJavaVectorRDD0 = function(jsc,mean,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.exponentialJavaVectorRDD({{jsc}},{{mean}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,mean : mean,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * [[RandomRDDs#exponentialJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.exponentialJavaVectorRDD1 = function(jsc,mean,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.exponentialJavaVectorRDD({{jsc}},{{mean}},{{numRows}},{{numCols}},{{numPartitions}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,mean : mean,numRows : numRows,numCols : numCols,numPartitions : numPartitions});
};


/**
 * [[RandomRDDs#exponentialJavaVectorRDD]] with the default number of partitions
 * and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} mean
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.exponentialJavaVectorRDD2 = function(jsc,mean,numRows,numCols) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.exponentialJavaVectorRDD({{jsc}},{{mean}},{{numRows}},{{numCols}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,mean : mean,numRows : numRows,numCols : numCols});
};


/**
 * Generates an RDD[Vector] with vectors containing `i.i.d.` samples drawn from the
 * gamma distribution with the input shape and scale.
 *
 * @param {SparkContext} sc  SparkContext used to create the RDD.
 * @param {number} shape  shape parameter (> 0) for the gamma distribution.
 * @param {number} scale  scale parameter (> 0) for the gamma distribution.
 * @param {number} numRows  Number of Vectors in the RDD.
 * @param {number} numCols  Number of elements in each Vector.
 * @param {number} numPartitions  Number of partitions in the RDD (default: `sc.defaultParallelism`)
 * @param {number} seed  Random seed (default: a random long integer).
 * @returns {RDD}  RDD[Vector] with vectors containing `i.i.d.` samples ~ Exp(mean).
 */
RandomRDDs.gammaVectorRDD = function(sc,shape,scale,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.gammaVectorRDD({{sc}},{{shape}},{{scale}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, RDD, templateStr , {sc : sc,shape : shape,scale : scale,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * Java-friendly version of [[RandomRDDs#gammaVectorRDD]].
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @param {number} seed
 * @returns {JavaRDD}
 */
RandomRDDs.gammaJavaVectorRDD0 = function(jsc,shape,scale,numRows,numCols,numPartitions,seed) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.gammaJavaVectorRDD({{jsc}},{{shape}},{{scale}},{{numRows}},{{numCols}},{{numPartitions}},{{seed}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,shape : shape,scale : scale,numRows : numRows,numCols : numCols,numPartitions : numPartitions,seed : seed});
};


/**
 * [[RandomRDDs#gammaJavaVectorRDD]] with the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} numPartitions
 * @returns {JavaRDD}
 */
RandomRDDs.gammaJavaVectorRDD1 = function(jsc,shape,scale,numRows,numCols,numPartitions) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.gammaJavaVectorRDD({{jsc}},{{shape}},{{scale}},{{numRows}},{{numCols}},{{numPartitions}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,shape : shape,scale : scale,numRows : numRows,numCols : numCols,numPartitions : numPartitions});
};


/**
 * [[RandomRDDs#gammaJavaVectorRDD]] with the default number of partitions and the default seed.
 * @param {JavaSparkContext} jsc
 * @param {number} shape
 * @param {number} scale
 * @param {number} numRows
 * @param {number} numCols
 * @returns {JavaRDD}
 */
RandomRDDs.gammaJavaVectorRDD2 = function(jsc,shape,scale,numRows,numCols) {
  throw "not implemented by ElairJS";
//
// var templateStr = 'var {{refId}} = RandomRDDs.gammaJavaVectorRDD({{jsc}},{{shape}},{{scale}},{{numRows}},{{numCols}});';
//
// return Utils.generateAssignment(this, JavaRDD, templateStr , {jsc : jsc,shape : shape,scale : scale,numRows : numRows,numCols : numCols});
};

module.exports = function(kP) {
  gKernelP = kP;

  return RandomRDDs;
};