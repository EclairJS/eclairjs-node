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

var serialize = require('./serialize.js');
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
 * @returns {RDD}
 */
RDD.prototype.map = function(func) {
  var templateStr = 'var {{refId}} = {{inRefId}}.map({{udf}});';

  var udfP = (typeof func === 'function') ? serialize.serializeFunction(func) : Promise.resolve(func);

  return Utils.generateAssignment(this, RDD, templateStr, {udf: udfP});

};

/**
 * Return a new RDD by first applying a function to all elements of this RDD, and then flattening the results.
 * @param {Function} func
 * @returns {RDD}
 */
RDD.prototype.flatMap = function(func) {
  var templateStr = 'var {{refId}} = {{inRefId}}.flatMap({{udf}});';

  var udfP = (typeof func === 'function') ? serialize.serializeFunction(func) : Promise.resolve(func);

  return Utils.generateAssignment(this, RDD, templateStr, {udf: udfP});
};

/**
 * Return a new RDD containing only the elements that satisfy a predicate.
 * @param {Function} func
 * @returns {RDD}
 */
RDD.prototype.filter = function(func) {
  var templateStr = 'var {{refId}} = {{inRefId}}.filter({{udf}});';

  var udfP = (typeof func === 'function') ? serialize.serializeFunction(func) : Promise.resolve(func);

  return Utils.generateAssignment(this, RDD, templateStr, {udf: udfP});
};

/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @returns {RDD}
 */
RDD.prototype.mapToPair = function(func) {
  var templateStr = 'var {{refId}} = {{inRefId}}.mapToPair({{udf}});';

  var udfP = (typeof func === 'function') ? serialize.serializeFunction(func) : Promise.resolve(func);

  return Utils.generateAssignment(this, RDD, templateStr, {udf: udfP});

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
  var templateStr = 'var {{refId}} = {{inRefId}}.randomSplit({{weights}}, {{seed}});';

  return Utils.generateResultArrayPromise(this, RDD, templateStr, {weights: Utils.prepForReplacement(weights), seed: Utils.prepForReplacement(seed)});
};

/**
 * Reduces the elements of this RDD using the specified function.
 * @param {Function} func
 * @returns {RDD}
 */
RDD.prototype.reduceByKey = function(func) {
  var templateStr = 'var {{refId}} = {{inRefId}}.reduceByKey({{udf}});';

  var udfP = (typeof func === 'function') ? serialize.serializeFunction(func) : Promise.resolve(func);

  return Utils.generateAssignment(this, RDD, templateStr, {udf: udfP});
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
RDD.prototype.foreach = function(func) {
  var udfP = (typeof func === 'function') ? serialize.serializeFunction(func) : Promise.resolve(func);

  var templateStr = '{{inRefId}}.foreach({{udf}});';

  return Utils.generateVoidPromise(this, templateStr, {udf: udfP});
};

module.exports = RDD;