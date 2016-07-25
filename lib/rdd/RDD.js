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
 * @memberof module:eclairjs/rdd
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
 * @param {module:eclairjs/rdd.RDD} zeroValue - (undocumented)
 * @param {function} func1 seqOp - (undocumented) Function with two parameters
 * @param {function} func2 combOp - (undocumented) Function with two parameters
 * @param {Object[]} [bindArgs1] - array whose values will be added to func1's argument list.
 * @param {Object[]} [bindArgs2] - array whose values will be added to func2's argument list.
 * @returns {object}
 */
RDD.prototype.aggregate = function(zeroValue, func1, func2, bindArgs1, bindArgs2) {
  var args = {
    target: this,
    method: 'aggregate',
    args: [
      {value: zeroValue, type: 'object'},
      {value: func1, type: 'lambda'},
      {value: func2, type: 'lamda'},
      {value: Utils.wrapBindArgs(bindArgs1), optional: true},
      {value: Utils.wrapBindArgs(bindArgs2), optional: true}
    ],
    returnType: Object
  };

  return Utils.generate(args);
};

/**
 * Persist this RDD with the default storage level (`MEMORY_ONLY`).
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.cache = function() {
  var args = {
    target: this,
    method: 'cache',
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Asynchronously returns the number of elements in the RDD.
 *
 * @returns {Promise.<Number>} A Promise that resolves to the number of elements in the RDD.
 */
RDD.prototype.count = function() {
  var args = {
    target: this,
    method: "count",
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Asynchronously returns all elements of the RDD.
 *
 * @returns {Promise.<Array>} A Promise that resolves to an array containing all elements in the RDD.
 */
RDD.prototype.collect = function() {
  var args = {
    target: this,
    method: 'collect',
    returnType: [Object],
    stringify: true
  };

  return Utils.generate(args);
};

/**
 * Returns a new DataFrame by sampling a fraction of rows, using a random seed.
 * @param {boolean} withReplacement
 * @param {float} fraction
 * @param {integer} seed Optional
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.sample = function(withReplacement, fraction, seed) {
  var args = {
    target: this,
    method: 'sample',
    args: Utils.wrapArguments(arguments),
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Save this RDD as a text file, using string representations of elements.
 * @param {string} path
 * @param {boolean} [overwrite] defaults to false, if true overwrites file if it exists
 * @returns {Promise.<void>}
 */
RDD.prototype.saveAsTextFile = function(path) {
  var args = {
    target: this,
    method: 'saveAsTextFile',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Save this RDD as a SequenceFile of serialized objects.
 * @param {string} path
 * @param {boolean} [overwrite] defaults to false, if true overwrites file if it exists
 * @returns {Promise.<void>}
 */
RDD.prototype.saveAsObjectFile = function(path) {
  var args = {
    target: this,
    method: 'saveAsObjectFile',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Return an RDD with the elements from `this` that are not in `other`.
 * @param other {module:eclairjs/rdd.RDD}
 * @param  {int} [numPartitions]
 * @param  {Partition} [p] - ignored if numPartitions is non-zero)
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.subtract = function(other, numPartitions, p) {
  var args = {
    target: this,
    method: 'subtract',
    args: Utils.wrapArguments(arguments),
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Return the union of this RDD and another one. Any identical elements will appear multiple times (use `.distinct()` to eliminate them).
 * @param other {module:eclairjs/rdd.RDD}
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.union = function(other) {
  var args = {
    target: this,
    method: 'union',
    args: Utils.wrapArguments(arguments),
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Asynchronously returns the first num elements in this RDD.
 *
 * @param {Number} num
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the first num elements in this RDD.
 */
RDD.prototype.take = function(num) {
  var args = {
    target: this,
    method: 'take',
    args: Utils.wrapArguments(arguments),
    returnType: [Object],
    stringify: true
  };

  return Utils.generate(args);
};

/**
 * Asynchronously returns the first k (smallest) elements from this RDD as defined by the specified implicit Ordering[T] and maintains the ordering. This does the opposite of top.
 *
 * @param {Number} num
 * @param {function} func - (undocumented) Function with one parameter
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the first num elements in this RDD.
 */
RDD.prototype.takeOrdered = function(num, func, bindArgs) {
  var args = {
    target: this,
    method: 'takeOrdered',
    args: [
           {value: num, type: 'number'},
           {value: func, type: 'lambda'},
           {value: Utils.wrapBindArgs(bindArgs), optional: true}
         ],
    returnType: [Object],
    stringify: true
  };

  return Utils.generate(args);
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
  var args = {
    target: this,
    method: 'takeSample',
    args: Utils.wrapArguments(arguments),
    returnType: [Object],
    stringify: true
  };

  return Utils.generate(args);
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

  var args = {
    target: this,
    method: 'toArray',
    returnType: [Object],
    stringify: true,
    resolver: _resolve
  };

  return Utils.generate(args);
};

RDD.prototype.toString = function() {
  var args = {
    target: this,
    method: 'toString',
    returnType: String
  };

  return Utils.generate(args);
};

/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param {function} func - (undocumented) Function with one parameter
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.map = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'map',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Return a new RDD by first applying a function to all elements of this RDD, and then flattening the results.
 * @param {function} func - (undocumented) - Function with one parameter
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.flatMap = function(func, bindArgs) {
  var args = {
    target: this,
    method: "flatMap",
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Return a new RDD containing only the elements that satisfy a predicate.
 * @param {function} func - (undocumented) Function with one parameter
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.filter = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'filter',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: RDD
  };

  return Utils.generate(args);
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
 * @param {number} [numPartitions] -  How many partitions to use in the resulting RDD (if non-zero partitioner is ignored)
 * @param {Partitioner} [partitioner] -  Partitioner to use for the resulting RDD
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.groupBy = function(func, numPartitions, partitioner, bindArgs) {
  var args = {
    target: this,
    method: 'groupBy',
    args: [
      {value: func, type: 'lambda'},
      {value: numPartitions, type: 'number', optional: true},
      {value: partitioner, optional: true},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param (function) func - (undocumented) Function with one parameter that returns tuple
 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.PairRDD}
 */
RDD.prototype.mapToPair = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'mapToPair',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Pass each value in the key-value pair RDD through a map function without changing the keys;
 * this also retains the original RDD's partitioning.
 * @param {func}
 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.mapValues = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'mapValues',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: RDD
  };

  return Utils.generate(args);
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
  var args = {
    target: this,
    method: 'randomSplit',
    args: Utils.wrapArguments(arguments),
    returnType: [RDD]
  };

  return Utils.generate(args);
};

/**
 * Reduces the elements of this RDD using the specified commutative and
 * associative binary operator.
 * {function} func - (undocumented) Function with two parameters
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {object}
 */
RDD.prototype.reduce = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'reduce',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: Object
  };

  return Utils.generate(args);
};

/**
 * Reduces the elements of this RDD using the specified function.
 * @param {Function} func
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.reduceByKey = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'reduceByKey',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Return this RDD sorted by the given key function.
 * @param {Boolean} ascending
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.sortByKey = function(ascending) {
  var args = {
    target: this,
    method: 'sortByKey',
    args: Utils.wrapArguments(arguments),
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Applies a function to all elements of this RDD.
 * @example
 * rdd3.foreach(function(record) {
 *    var connection = createNewConnection()
 *    connection.send(record);
 *    connection.close()
 * });
 * @param {function} func - Function with one parameter that returns void
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {void}
 */
RDD.prototype.foreach = function(func, bindArgs) {
  var args = {
    target: this,
    method: "foreach",
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * Return an RDD with the values of each tuple.
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.values = function() {
  var args = {
    target: this,
    method: 'values',
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Return an RDD containing all pairs of elements with matching keys in `this` and `other`. Each
 * pair of elements will be returned as a (k, (v1, v2)) tuple, where (k, v1) is in `this` and
 * (k, v2) is in `other`. Performs a hash join across the cluster.
 * @param {module:eclairjs/rdd.RDD}
 * @param {number} optionanl
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.join = function(other, numPartitions) {
  var args = {
    target: this,
    method: 'join',
    args: Utils.wrapArguments(arguments),
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Zips this RDD with its element indices. The ordering is first based on the partition index
 * and then the ordering of items within each partition. So the first item in the first
 * partition gets index 0, and the last item in the last partition receives the largest index.
 *
 * This is similar to Scala's zipWithIndex but it uses Long instead of Int as the index type.
 * This method needs to trigger a spark job when this RDD contains more than one partitions.
 *
 * Note that some RDDs, such as those returned by groupBy(), do not guarantee order of
 * elements in a partition. The index assigned to each element is therefore not guaranteed,
 * and may even change if the RDD is reevaluated. If a fixed ordering is required to guarantee
 * the same index assignments, you should sort the RDD with sortByKey() or save it to a file.
 * @returns {module:eclairjs/rdd.RDD}
 */
RDD.prototype.zipWithIndex = function() {
  var args = {
    target: this,
    method: 'zipWithIndex',
    returnType: RDD
  };

  return Utils.generate(args);
};

RDD.moduleLocation = '/RDD';

module.exports = RDD;