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

var Utils = require('./../utils.js');

var PairRDD = require('./PairRDD.js');

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
 * Aggregate the elements of each partition, and then the results for all the partitions, using
 * given combine functions and a neutral "zero value". This function can return a different result
 * type, U, than the type of this RDD, T. Thus, we need one operation for merging a T into an U
 * and one operation for merging two U's, as in scala.TraversableOnce. Both of these functions are
 * allowed to modify and return their first argument instead of creating a new U to avoid memory
 * allocation.
 * @param {RDD} zeroValue - (undocumented)
 * @param {function} func1 seqOp - (undocumented) Function with two parameters
 * @param {function} func2 combOp - (undocumented) Function with two parameters
 * @param {Object[]} bindArgs1 - Optional array whose values will be added to func1's argument list.
 * @param {Object[]} bindArgs2 - Optional array whose values will be added to func2's argument list.
 * @returns {object}
 */
RDD.prototype.aggregate = function(zeroValue, func1, func2, bindArgs1, bindArgs2) {
  var templateStr = 'var {{refId}} = {{inRefId}}.aggregate({{zeroValue}}, {{func1}}, {{func2}}, {{bindArgs1}}, {{bindArgs2}});';

  return Utils.generateResultPromise(this, templateStr, {zeroValue: Utils.prepForReplacement(zeroValue), func1: Utils.serializeLambda(func1), func2:  Utils.serializeLambda(func2), bindArgs1: Utils.prepBindArgs(bindArgs1), bindArgs2: Utils.prepBindArgs(bindArgs2)});
};

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
 * Return an RDD of grouped items. Each group consists of a key and a sequence of elements
 * mapping to that key. The ordering of elements within each group is not guaranteed, and
 * may even differ each time the resulting RDD is evaluated.
 *
 * Note: This operation may be very expensive. If you are grouping in order to perform an
 * aggregation (such as a sum or average) over each key, using {@link aggregateByKey}
 * or {@link reduceByKey} will provide much better performance.
 * @param {function} func - (undocumented) Function with one parameter
 * @param {number} numPartitions - (optional) How many partitions to use in the resulting RDD (if non-zero partitioner is ignored)
 * @param {Partitioner} partitioner - (optional) Partitioner to use for the resulting RDD
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
RDD.prototype.groupBy = function(func, numPartitions, partitioner, bindArgs) {
  var templateStr;
  if (bindArgs) {
    templateStr = 'var {{refId}} = {{inRefId}}.groupBy({{udf}}, {{numPartitions}}, {{partitioner}}, [{{bindArgs}}]);';
  } else if (partitioner) {
    templateStr = 'var {{refId}} = {{inRefId}}.groupBy({{udf}}, {{numPartitions}}, {{partitioner}});';
  } else if (numPartitions) {
    templateStr = 'var {{refId}} = {{inRefId}}.groupBy({{udf}}, {{numPartitions}});';
  } else {
    templateStr = 'var {{refId}} = {{inRefId}}.groupBy({{udf}});';
  }

  return Utils.generateAssignment(this, RDD, templateStr, {udf: Utils.serializeLambda(func), numPartitions: numPartitions, partitioner: Utils.prepForReplacement(partitioner), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {PairRDD}
 */
RDD.prototype.mapToPair = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.mapToPair({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.mapToPair({{udf}});';

  return Utils.generateAssignment(this, PairRDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Pass each value in the key-value pair RDD through a map function without changing the keys;
 * this also retains the original RDD's partitioning.
 * @param {func}
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
RDD.prototype.mapValues = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.mapValues({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.mapValues({{udf}});';

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
 * Reduces the elements of this RDD using the specified commutative and
 * associative binary operator.
 * {function} func - (undocumented) Function with two parameters
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {Promise<Object>}
 */
RDD.prototype.reduce = function(func, bindArgs) {
  var templateStr = bindArgs ? '{{inRefId}}.reduce({{udf}}, [{{bindArgs}}]);' : '{{inRefId}}.reduce({{udf}});';

  return Utils.generateResultPromise(this, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
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

/**
 * Return an RDD with the values of each tuple.
 * @returns {RDD}
 */
RDD.prototype.values = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.values();';

  return Utils.generateAssignment(this, RDD, templateStr);
};

/**
 * Return an RDD containing all pairs of elements with matching keys in `this` and `other`. Each
 * pair of elements will be returned as a (k, (v1, v2)) tuple, where (k, v1) is in `this` and
 * (k, v2) is in `other`. Performs a hash join across the cluster.
 * @param {RDD}
 * @param {number} optionanl
 * @returns {RDD}
 */
RDD.prototype.join = function(other, numPartitions) {
  var templateStr = numPartitions ? 'var {{refId}} = {{inRefId}}.join({{other}}, {{numPartitions}});' : 'var {{refId}} = {{inRefId}}.join({{other}});';

  return Utils.generateAssignment(this, RDD, templateStr, {other: Utils.prepForReplacement(other), numPartitions: numPartitions});
};

module.exports = RDD;