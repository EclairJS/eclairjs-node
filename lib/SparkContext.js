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

var RDD = require('./rdd/RDD.js');
var Utils = require('./utils.js');
var kernel = require('./kernel.js');

// our shared kernel promise
// TODO: is there a better way to create a Promise and resolve it from the outside?
var kernelPResolve;
var kernelPReject;

var session;

var kernelP = new Promise(function(resolve, reject) {
  kernelPResolve = function(kernelSession) {
    session = kernelSession;
    resolve(kernelSession.kernel)
  };

  kernelPReject = function(e) {
    reject(e)
  };
});

/**
 *
 * @constructor
 * @classdesc A JavaScript-friendly version of SparkContext that returns RDDs
 * Only one SparkContext may be active per JVM. You must stop() the active SparkContext before creating a new one.
 * This limitation may eventually be removed; see SPARK-2243 for more details.
 * @param {string} master - Cluster URL to connect to
 * @param {string} name - A name for your application, to display on the cluster web UI
 */
function SparkContext(master, name) {
  kernel.createKernelSession(name).then(kernelPResolve).catch(kernelPReject);

  this.kernelP = new Promise(function(resolve, reject) {
    kernelP.then(function(kernel) {
      var args = {
        target: SparkContext,
        args: [
          {value: master, type: 'string'},
          {value: name, type: 'string'}
        ],
        refId: 'jsc',
        kernelP: kernelP
      };

      Utils.generateConstructor(args).then(function(refId) {
        var args = {
          target: {kernelP: kernelP, refIdP: Promise.resolve(refId)},
          method: 'version',
          returnType: String
        };

        Utils.generate(args).then(function(version) {
          if (version === 'EclairJS-nashorn 0.1 Spark 1.6.0') {
            // correct version
            resolve(kernel);
          } else {
            throw "Wrong version of EclairJS-nashorn detected: "+version;
          }
        }).catch(reject);
      }).catch(reject);
    });
  });

  this.refIdP = new Promise(function(resolve, reject) {
    this.kernelP.then(function() {
      resolve('jsc');
    }).catch(reject);
  }.bind(this));
};

/**
 * Create an {@link Accumulable} shared variable of the given type, to which tasks can "add" values with add.
 * Only the master can access the accumuable's value.
 *
 * @param {object} initialValue
 * @param {AccumulableParam} param
 * @param {string} name of  the accumulator for display in Spark's web UI.
 * @returns {Accumulable}
 */
SparkContext.prototype.accumulable = function() {
  var Accumulable = require('./Accumulable.js');

  var args = {
    target: this,
    method: 'accumulable',
    args: Utils.wrapArguments(arguments),
    returnType: Accumulable
  };

  return Utils.generate(args);
};

/**
 * Create an {@link Accumulator}  variable, which tasks can "add" values to using the add method.
 * Only the master can access the accumulator's value.
 *
 * @param {int | float} initialValue
 * @param {string} name of  the accumulator for display in Spark's web UI. Optional
 * @param {AccumulableParam} {param} Optional defaults to FloatAccumulatorParam
 * @returns {Accumulator}
 */
SparkContext.prototype.accumulator = function() {
  var Accumulator = require('./Accumulator.js');

  var args = {
    target: this,
    method: 'accumulator',
    args: Utils.wrapArguments(arguments),
    returnType: Accumulator
  };

  return Utils.generate(args);
};

/**
 * Distribute a local Scala collection to form an RDD.
 * @param {array} arr
 * @returns {RDD}
 */
SparkContext.prototype.parallelize = function(arr) {
  var args = {
    target: this,
    method: 'parallelize',
    args: [{value: Utils.wrapArray(arr)}],
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Read a text file from HDFS, a local file system (available on all nodes), or any Hadoop-supported file system URI,
 * and return it as an RDD of Strings.
 * @param {string} path - path to file
 * @returns {RDD}
 */
SparkContext.prototype.textFile = function(path) {
  var args = {
    target: this,
    method: "textFile",
    args: [
      {value: path, type: "string"}
    ],
    returnType: RDD
  };

  return Utils.generate(args);
};

SparkContext.prototype.stop = function() {
  return new Promise(function(resolve, reject) {
    kernelP.then(function(kernel) {
      session.shutdown().then(resolve).catch(reject);
    });
  });
};

SparkContext.moduleLocation = '/SparkContext';

module.exports = function() {
  return [kernelP, SparkContext];
};