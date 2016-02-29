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

var Utils = require('../utils.js');

/**
 * @param {RDD} rdd
 * @param {ClassTag} kClassTag
 * @param {ClassTag} vClassTag
 * @returns {??}
 *  @class
 */
function PairRDD(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Persist this PairRDD with the default storage level (`MEMORY_ONLY`).
 * @returns {PairRDD}
 */
PairRDD.prototype.cache = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.cache();';

  return Utils.generateAssignment(this, PairRDD, templateStr);
};

/**
 * Asynchronously returns the number of elements in the PairRDD.
 *
 * @returns {Promise.<Number>} A Promise that resolves to the number of elements in the PairRDD.
 */
PairRDD.prototype.count = function() {
  function _resolve(result, resolve, reject) {
    resolve(parseInt(result));
  }

  var templateStr = '{{inRefId}}.count();';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * Asynchronously returns all elements of the PairRDD.
 *
 * @returns {Promise.<Array>} A Promise that resolves to an array containing all elements in the PairRDD.
 */
PairRDD.prototype.collect = function() {
  function _resolve(result, resolve, reject) {
    try {
      // take returns a stringified json result so parse it here
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = 'JSON.stringify({{inRefId}}.collect());';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * Returns a new PairRDD by sampling a fraction of rows, using a random seed.
 * @param {boolean} withReplacement
 * @param {float} fraction
 * @param {integer} seed Optional
 * @returns {PairRDD}
 */
PairRDD.prototype.sample = function(withReplacement, fraction, seed) {
  var templateStr = seed ? 'var {{refId}} = {{inRefId}}.sample({{withReplacement}}, {{fraction}}, {{seed}});' : 'var {{refId}} = {{inRefId}}.sample({{withReplacement}}, {{fraction}});';

  return Utils.generateAssignment(this, PairRDD, templateStr, {withReplacement: withReplacement, fraction: fraction, seed: seed});
};

/**
 * Save this PairRDD as a text file, using string representations of elements.
 * @param {string} path
 * @returns {Promise.<void>}
 */
PairRDD.prototype.saveAsTextFile = function(path) {
  var templateStr = '{{inRefId}}.saveAsTextFile({{path}});';

  return Utils.generateVoidPromise(this, templateStr, {path: Utils.prepForReplacement(path)});
};

/**
 * Asynchronously returns the first num elements in this PairRDD.
 *
 * @param {Number} num
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the first num elements in this PairRDD.
 */
PairRDD.prototype.take = function(num) {
  function _resolve(result, resolve, reject) {
    try {
      // take returns a stringified json result so parse it here
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = 'JSON.stringify({{inRefId}}.take({{num}}));';

  return Utils.generateResultPromise(this, templateStr, {num: num}, _resolve);
};

/**
 * Return a fixed-size sampled subset of this PairRDD in an array
 *
 * @param {boolean} withReplacement  whether sampling is done with replacement
 * @param {number} num  size of the returned sample
 * @param {number} seed  seed for the random number generator
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the specified number of elements in this PairRDD.
 */
PairRDD.prototype.takeSample = function(withReplacement, num, seed) {
  function _resolve(result, resolve, reject) {
    try {
      // take returns a stringified json result so parse it here
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = seed ? 'JSON.stringify({{inRefId}}.takeSample({{withReplacement}}, {{num}}, {{seed}}));' : 'JSON.stringify({{inRefId}}.takeSample({{withReplacement}}, {{num}}));';

  return Utils.generateResultPromise(this, templateStr, {withReplacement: withReplacement, num: num, seed: seed}, _resolve);
};

/**
 * Return an array that contains all of the elements in this PairRDD.
 * @returns {Promise.<Array>} A Promise that resolves to an array containing all elements in this PairRDD.
 */
PairRDD.prototype.toArray = function() {
  function _resolve(result, resolve, reject) {
    try {
      // take returns a stringified json result so parse it here
      var res = JSON.parse(result);

      // TODO: why do we need to reparse each row?
      for (var i = 0; i < res.length; i++) {
        res[i] = JSON.parse(res[i]);
      }

      resolve(res);
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = 'JSON.stringify({{inRefId}}.toArray());';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

PairRDD.prototype.toString = function() {
  var templateStr = '{{inRefId}}.toString();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 * Return a new PairRDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {PairRDD}
 */
PairRDD.prototype.map = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.map({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.map({{udf}});';

  return Utils.generateAssignment(this, PairRDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Return a new PairRDD by first applying a function to all elements of this PairRDD, and then flattening the results.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
PairRDD.prototype.flatMap = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.flatMap({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.flatMap({{udf}});';

  return Utils.generateAssignment(this, PairRDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Return a new PairRDD containing only the elements that satisfy a predicate.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
PairRDD.prototype.filter = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.filter({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.filter({{udf}});';

  return Utils.generateAssignment(this, PairRDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {PairRDD}
 */
PairRDD.prototype.mapToPair = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.mapToPair({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.mapToPair({{udf}});';

  return Utils.generateAssignment(this, PairRDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Randomly splits this RDD with the provided weights.
 *
 * @param {number[]} weights - weights for splits, will be normalized if they don't sum to 1
 * @param {number} seed - random seed
 * @returns {Promise.<RDD[]>} A Promise that resolves to the array of split up RDDs
 * @private
 */
PairRDD.prototype.randomSplit = function(weights, seed) {
  var templateStr = seed ? 'var {{refId}} = {{inRefId}}.randomSplit({{weights}}, {{seed}});' : 'var {{refId}} = {{inRefId}}.randomSplit({{weights}});';

  return Utils.generateResultArrayPromise(this, PairRDD, templateStr, {weights: Utils.prepForReplacement(weights), seed: Utils.prepForReplacement(seed)});
};

/**
 * Reduces the elements of this RDD using the specified commutative and
 * associative binary operator.
 * {function} func - (undocumented) Function with two parameters
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {Promise<Object>}
 */
PairRDD.prototype.reduce = function(func, bindArgs) {
  var templateStr = bindArgs ? '{{inRefId}}.reduce({{udf}}, [{{bindArgs}}]);' : '{{inRefId}}.reduce({{udf}});';

  return Utils.generateResultPromise(this, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Reduces the elements of this RDD using the specified function.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
PairRDD.prototype.reduceByKey = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.reduceByKey({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.reduceByKey({{udf}});';

  return Utils.generateAssignment(this, PairRDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Return this RDD sorted by the given key function.
 * @param {Boolean} ascending
 * @returns {RDD}
 */
PairRDD.prototype.sortByKey = function(ascending) {
  var templateStr = 'var {{refId}} = {{inRefId}}.sortByKey({{ascending}});';

  return Utils.generateAssignment(this, PairRDD, templateStr, {ascending: Utils.prepForReplacement(ascending)});
};

/**
 * Applies a function func to all rows.
 * @param {function} func
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
PairRDD.prototype.foreach = function(func, bindArgs) {
  var templateStr = bindArgs ? '{{inRefId}}.foreach({{udf}}, [{{bindArgs}}]);' : '{{inRefId}}.foreach({{udf}});';

  return Utils.generateVoidPromise(this, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};


module.exports = PairRDD;