/*
 * Copyright 2015 IBM Corp.
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

var Utils = require('./utils.js');

/**
 * @constructor
 * @classdesc A Resilient Distributed Dataset (RDD), the basic abstraction in Spark. Represents an immutable,
 * partitioned collection of elements that can be operated on in parallel.
 */
function RDD(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Persist this RDD with the default storage level (`MEMORY_ONLY`).
 * @returns {RDD}
 */
RDD.prototype.cache = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.cache();';

  return Utils.generateAssignment(this, RDD, templateStr);
};

/**
 * Asynchronously returns the number of elements in the RDD.
 *
 * @returns {Promise.<Number>} A Promise that resolves to the number of elements in the RDD.
 */
RDD.prototype.count = function() {
  function _resolve(result, resolve, reject) {
    resolve(parseInt(result));
  }

  var templateStr = '{{inRefId}}.count();';

  return Utils.generateResultPromise(this, templateStr, null, _resolve);
};

/**
 * Asynchronously returns all elements of the RDD.
 *
 * @returns {Promise.<Array>} A Promise that resolves to an array containing all elements in the RDD.
 */
RDD.prototype.collect = function() {
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
 * Returns a new DataFrame by sampling a fraction of rows, using a random seed.
 * @param {boolean} withReplacement
 * @param {float} fraction
 * @param {integer} seed Optional
 * @returns {RDD}
 */
RDD.prototype.sample = function(withReplacement, fraction, seed) {
  var templateStr = seed ? 'var {{refId}} = {{inRefId}}.sample({{withReplacement}}, {{fraction}}, {{seed}});' : 'var {{refId}} = {{inRefId}}.sample({{withReplacement}}, {{fraction}});';

  return Utils.generateAssignment(this, RDD, templateStr, {withReplacement: withReplacement, fraction: fraction, seed: seed});
};

/**
 * Save this RDD as a text file, using string representations of elements.
 * @param {string} path
 * @returns {Promise.<void>}
 */
RDD.prototype.saveAsTextFile = function(path) {
  var templateStr = '{{inRefId}}.saveAsTextFile({{path}});';

  return Utils.generateVoidPromise(this, templateStr, {path: Utils.prepForReplacement(path)});
};

/**
 * Asynchronously returns the first num elements in this RDD.
 *
 * @param {Number} num
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the first num elements in this RDD.
 */
RDD.prototype.take = function(num) {
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
 * Return a fixed-size sampled subset of this RDD in an array
 *
 * @param {boolean} withReplacement  whether sampling is done with replacement
 * @param {number} num  size of the returned sample
 * @param {number} seed  seed for the random number generator
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the specified number of elements in this RDD.
 */
RDD.prototype.takeSample = function(withReplacement, num, seed) {
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
 * Return an array that contains all of the elements in this RDD.
 * @returns {Promise.<Array>} A Promise that resolves to an array containing all elements in this RDD.
 */
RDD.prototype.toArray = function() {
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

RDD.prototype.toString = function() {
  var templateStr = '{{inRefId}}.toString();';

  return Utils.generateResultPromise(this, templateStr);
};


/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
RDD.prototype.map = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.map({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.map({{udf}});';

  return Utils.generateAssignment(this, RDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});

};

/**
 * Return a new RDD by first applying a function to all elements of this RDD, and then flattening the results.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
RDD.prototype.flatMap = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.flatMap({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.flatMap({{udf}});';

  return Utils.generateAssignment(this, RDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Return a new RDD containing only the elements that satisfy a predicate.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
RDD.prototype.filter = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.filter({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.filter({{udf}});';

  return Utils.generateAssignment(this, RDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
RDD.prototype.mapToPair = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.mapToPair({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.mapToPair({{udf}});';

  return Utils.generateAssignment(this, RDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Randomly splits this RDD with the provided weights.
 *
 * @param {number[]} weights - weights for splits, will be normalized if they don't sum to 1
 * @param {number} seed - random seed
 * @returns {Promise.<RDD[]>} A Promise that resolves to the array of split up RDDs
 * @private
 */
RDD.prototype.randomSplit = function(weights, seed) {
  var templateStr = seed ? 'var {{refId}} = {{inRefId}}.randomSplit({{weights}}, {{seed}});' : 'var {{refId}} = {{inRefId}}.randomSplit({{weights}});';

  return Utils.generateResultArrayPromise(this, RDD, templateStr, {weights: Utils.prepForReplacement(weights), seed: Utils.prepForReplacement(seed)});
};

/**
 * Reduces the elements of this RDD using the specified function.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
RDD.prototype.reduceByKey = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.reduceByKey({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.reduceByKey({{udf}});';

  return Utils.generateAssignment(this, RDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Return this RDD sorted by the given key function.
 * @param {Boolean} ascending
 * @returns {RDD}
 */
RDD.prototype.sortByKey = function(ascending) {
  var templateStr = 'var {{refId}} = {{inRefId}}.sortByKey({{ascending}});';

  return Utils.generateAssignment(this, RDD, templateStr, {ascending: Utils.prepForReplacement(ascending)});
};

/**
 * Applies a function func to all rows.
 * @param {function} func
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
RDD.prototype.foreach = function(func, bindArgs) {
  var templateStr = bindArgs ? '{{inRefId}}.foreach({{udf}}, [{{bindArgs}}]);' : '{{inRefId}}.foreach({{udf}});';

  return Utils.generateVoidPromise(this, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

module.exports = RDD;