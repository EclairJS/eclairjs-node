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
var FloatRDD = require('./FloatRDD.js')();

/**
 * @param {module:eclairjs/rdd.RDD} rdd of [Tuple(value, value)]{@link Tuple}.
 *  @class
 *  @memberof module:eclairjs/rdd
 *  @extends RDD
 */
function PairRDD() {
  Utils.handleConstructor(this, arguments);
}

/**
 * Persist this PairRDD with the default storage level (`MEMORY_ONLY`).
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.cache = function() {
  var args = {
    target: this,
    method: 'cache',
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Asynchronously returns the number of elements in the PairRDD.
 *
 * @returns {Promise.<Number>} A Promise that resolves to the number of elements in the PairRDD.
 */
PairRDD.prototype.count = function() {
  var args = {
    target: this,
    method: 'count',
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Asynchronously returns all elements of the PairRDD.
 *
 * @returns {Promise.<Array>} A Promise that resolves to an array containing all elements in the PairRDD.
 */
PairRDD.prototype.collect = function() {
  var args = {
    target: this,
    method: 'collect',
    returnType: [Object],
    stringify: true
  };

  return Utils.generate(args);
};

/**
 * Return a sampled subset of this RDD.
 * @param {boolean} withReplacement
 * @param {number} fraction
 * @param {number} [seed]
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.sample = function(withReplacement, fraction, seed) {
  var args = {
    target: this,
    method: 'sample',
    args: Utils.wrapArguments(arguments),
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Save this PairRDD as a text file, using string representations of elements.
 * @param {string} path
 * @param {boolean} [overwrite] defaults to false, if true overwrites file if it exists
 * @returns {Promise.<void>}
 */
PairRDD.prototype.saveAsTextFile = function(path) {
  var args = {
    target: this,
    method: 'saveAsTextFile',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};

/**
 * Save this PairRDD as a SequenceFile of serialized objects.
 * @param {string} path
 * @param {boolean} [overwrite] defaults to false, if true overwrites file if it exists
 * @returns {Promise.<void>}
 */
PairRDD.prototype.saveAsObjectFile = function(path) {
  var args = {
    target: this,
    method: 'saveAsObjectFile',
    args: Utils.wrapArguments(arguments)
  };

  return Utils.generate(args);
};


/**
 * Asynchronously returns the first num elements in this PairRDD.
 *
 * @param {Number} num
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the first num elements in this PairRDD.
 */
PairRDD.prototype.take = function(num) {
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
PairRDD.prototype.takeOrdered = function(num, func, bindArgs) {
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
 * Return a fixed-size sampled subset of this PairRDD in an array
 *
 * @param {boolean} withReplacement  whether sampling is done with replacement
 * @param {number} num  size of the returned sample
 * @param {number} seed  seed for the random number generator
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the specified number of elements in this PairRDD.
 */
PairRDD.prototype.takeSample = function(withReplacement, num, seed) {
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
 * Return an array that contains all of the elements in this PairRDD.
 * @returns {Promise.<Array>} A Promise that resolves to an array containing all elements in this PairRDD.
 */
PairRDD.prototype.toArray = function() {
  throw "not implemented by ElairJS";
};

PairRDD.prototype.toString = function() {
  var args = {
    target: this,
    method: 'toString',
    returnType: String
  };

  return Utils.generate(args);
};

/**
 * Return a new PairRDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.map = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'map',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Return a new PairRDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.mapValues = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'mapValues',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Return a new PairRDD by first applying a function to all elements of this PairRDD, and then flattening the results.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {PairRDD
 */
PairRDD.prototype.flatMap = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'flatMap',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Return a new PairRDD containing only the elements that satisfy a predicate.
 * @param {function} func
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.filter = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'filter',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.mapToPair = function(func, bindArgs) {
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
 * Group the values for each key in the RDD into a single sequence. Allows controlling the partitioning of the resulting 
 * key-value pair RDD by passing a Partitioner. Note: If you are grouping in order to perform an aggregation (such as a sum or average) 
 * over each key, using PairRDD.reduceByKey or combineByKey will provide much better performance.
 * @param {number} [number] number of partitions
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.groupByKey = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'groupByKey',
    args: Utils.wrapArguments(arguments),
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Return a new RDD by applying a function to all elements of this RDD.
 * @param {Function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.FloatRDD}
 */
PairRDD.prototype.mapToFloat = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'mapToFloat',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: FloatRDD
  };

  return Utils.generate(args);
};

/**
 * Randomly splits this PairRDD with the provided weights.
 *
 * @param {number[]} weights - weights for splits, will be normalized if they don't sum to 1
 * @param {number} seed - random seed
 * @returns {Promise.<PairRDD[]>} A Promise that resolves to the array of split up RDDs
 * @private
 */
PairRDD.prototype.randomSplit = function(weights, seed) {
  var args = {
    target: this,
    method: 'randomSplit',
    args: Utils.wrapArguments(arguments),
    returnType: [PairRDD]
  };

  return Utils.generate(args);
};

/**
 * Reduces the elements of this PairRDD using the specified commutative and
 * associative binary operator.
 * {function} func - (undocumented) Function with two parameters
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {Promise<Object>}
 */
PairRDD.prototype.reduce = function(func, bindArgs) {
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
 * Merge the values for each key using an associative reduce function. This will also perform
 * the merging locally on each mapper before sending results to a reducer, similarly to a
 * "combiner" in MapReduce.
 * @param {func} func
 * @param {Object[]} [bindArgs] - array whose values will be added to func's argument list.
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.reduceByKey = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'reduceByKey',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Return this RDD sorted by the given key function.
 * @param {Boolean} ascending
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.sortByKey = function(ascending) {
  var args = {
    target: this,
    method: 'sortByKey',
    args: Utils.wrapArguments(arguments),
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Applies a function func to all rows.
 * @param {function} func
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
PairRDD.prototype.foreach = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'foreach',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ]
  };

  return Utils.generate(args);
};

/**
 * @param {RDFD} rdd
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.fromRDD = function(rdd) {
  var args = {
    target: PairRDD,
    method: 'fromRDD',
    args: Utils.wrapArguments(arguments),
    returnType: PairRDD,
    kernelP: rdd.kernelP,
    static: true
  };

  return Utils.generate(args);
};

/**
 * Return an  * @param {module:eclairjs/rdd.PairRDD}
 containing all pairs of elements with matching keys in `this` and `other`. Each
 * pair of elements will be returned as a (k, (v1, v2)) tuple, where (k, v1) is in `this` and
 * (k, v2) is in `other`. Performs a hash join across the cluster.
 * @param {module:eclairjs/rdd.PairRDD}
 * @param {number} optionanl
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.join = function(other, numPartitions) {
  var args = {
    target: this,
    method: 'join',
    args: Utils.wrapArguments(arguments),
    returnType: PairRDD
  };

  return Utils.generate(args);
};

/**
 * Return an PairRDD with the values of each tuple.
 * @returns {module:eclairjs/rdd.PairRDD}
 */
PairRDD.prototype.values = function() {
  var args = {
    target: this,
    method: 'values',
    returnType: PairRDD
  };

  return Utils.generate(args);
};

PairRDD.moduleLocation = '/PairRDD';

module.exports = PairRDD;