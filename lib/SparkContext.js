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

module.exports = function(kernelP, server) {
  return (function() {
    var Utils = require('./utils.js');

    var RDD = require('./rdd/RDD.js');
    var PairRDD = require('./rdd/PairRDD.js');
    var SparkConf = require('./SparkConf.js')();

    var gKernelP = kernelP;

    /**
     *
     * @constructor
     * @memberof module:eclairjs
     * @classdesc A JavaScript-friendly version of SparkContext that returns RDDs
     * Only one SparkContext may be active per JVM. You must stop() the active SparkContext before creating a new one.
     * This limitation may eventually be removed; see SPARK-2243 for more details.
     * @param {string} master - Cluster URL to connect to
     * @param {string} name - A name for your application, to display on the cluster web UI
     */
    function SparkContext() {
      if (arguments.length == 2 && arguments[0] instanceof Promise) {
        // Someone created an instance of this class for us
        this.kernelP = arguments[0];
        this.refIdP = arguments[1];
      } else {
        if (arguments.length == 2) {
          server.start(arguments[1]);
        } else {
          if (arguments[0] instanceof SparkConf) {
            var appName = arguments[0].getAppName();
            if (appName) {
              server.start(appName);
            } else {
              throw 'SparkConf needs an App Name';
            }
          } else {
            throw 'SparkContext arguments are invalid';
          }
        }

        var fArgs = arguments;

        this.kernelP = new Promise(function(resolve, reject) {
          gKernelP.then(function(kernel) {
            var args = {
              target: SparkContext,
              args: Utils.wrapArguments(fArgs),
              refId: 'jsc',
              kernelP: gKernelP
            };

            Utils.generateConstructor(args).then(function(refId) {
              var args = {
                target: {kernelP: gKernelP, refIdP: Promise.resolve(refId)},
                method: 'version',
                returnType: String
              };

              Utils.generate(args).then(function(version) {
                resolve(kernel);
                /*if (version === 'EclairJS-nashorn 0.7-SNAPSHOT Spark 1.6.0' ||
                    version === 'EclairJS-nashorn 0.6 Spark 1.6.0') {
                  // correct version
                  resolve(kernel);
                } else {
                  throw "Wrong version of EclairJS-nashorn detected: "+version;
                }*/
              }).catch(reject);
            }).catch(reject);
          });
        });

        this.refIdP = new Promise(function(resolve, reject) {
          this.kernelP.then(function() {
            resolve('jsc');
          }).catch(reject);
        }.bind(this));
      }
    }

    /**
     * Create an {@link Accumulable} shared variable of the given type, to which tasks can "add" values with add.
     * Only the master can access the accumuable's value.
     *
     * @param {object} initialValue
     * @param {module:eclairjs.AccumulableParam} param
     * @param {string} name of  the accumulator for display in Spark's web UI.
     * @returns {module:eclairjs.Accumulable}
     */
    SparkContext.prototype.accumulable = function() {
      var Accumulable = require('./Accumulable.js')(gKernelP);

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
     * @param {string | AccumulableParam} [name] of  the accumulator for display in Spark's web UI. or param.  defaults to FloatAccumulatorParam
     * @param {module:eclairjs.AccumulableParam} [param]  defaults to FloatAccumulatorParam, use only if also specifying name
     * @returns {module:eclairjs.Accumulator}
     */
    SparkContext.prototype.accumulator = function() {
      var Accumulator = require('./Accumulator.js')(gKernelP);

      var args = {
        target: this,
        method: 'accumulator',
        args: Utils.wrapArguments(arguments),
        returnType: Accumulator
      };

      return Utils.generate(args);
    }

    /**
     * Add a file to be downloaded with this Spark job on every node.
     * The `path` passed can be either a local file, a file in HDFS (or other Hadoop-supported
     * filesystems), or an HTTP, HTTPS or FTP URI.  To access the file in Spark jobs,
     * use `SparkFiles.get(fileName)` to find its download location.
     *
     * A directory can be given if the recursive option is set to true. Currently directories are only
     * supported for Hadoop-supported filesystems.
     * @param {string} path
     * @param {boolean} [recursive]
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkContext.prototype.addFile = function(path,recursive) {
      var args = {
        target: this,
        method: 'addFile',
        args: Utils.wrapArguments(arguments),
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * Adds a JAR dependency for all tasks to be executed on this SparkContext in the future.
     * The `path` passed can be either a local file, a file in HDFS (or other Hadoop-supported
     * filesystems), an HTTP, HTTPS or FTP URI, or local:/path for a file on every worker node.
     * @param {string} path
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkContext.prototype.addJar = function(path) {
      var args = {
        target: this,
        method: 'addJar',
        args: Utils.wrapArguments(arguments),
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * A unique identifier for the Spark application.
     * Its format depends on the scheduler implementation.
     * (i.e.
     *  in case of local spark app something like 'local-1433865536131'
     *  in case of YARN something like 'application_1433865536131_34483'
     * )
     * @returns {Promise.<string>}
     */
    SparkContext.prototype.applicationId = function() {
      var args = {
        target: this,
        method: 'applicationId',
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    SparkContext.prototype.applicationAttemptId = function() {
      var args = {
        target: this,
        method: 'applicationAttemptId',
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    SparkContext.prototype.appName = function() {
      var args = {
        target: this,
        method: 'appName',
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Broadcast a read-only variable to the cluster, returning a
     * {@link Broadcast} object for reading it in distributed functions.
     * The variable will be sent to each cluster only once.
     * @param {object} value
     * @returns {Broadcast}
     */
    SparkContext.prototype.broadcast = function(value) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'broadcast',
    //     args: [
    //       { value: value, type: 'object' }
    //     ],
    //     returnType: Broadcast
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkContext.prototype.clearJobGroup = function() {
      var args = {
        target: this,
        method: 'clearJobGroup',
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string[]>}
     */
    SparkContext.prototype.files = function() {
      var args = {
        target: this,
        method: 'files',
        returnType: [String]
      };

      return Utils.generate(args);
    };

    /**
     * Return a copy of this SparkContext's configuration. The configuration ''cannot'' be
     * changed at runtime.
     * @returns {module:eclairjs.SparkConf}
     */
    SparkContext.prototype.getConf = function() {
      var args = {
        target: this,
        method: 'getConf',
        returnType: SparkConf
      };

      return Utils.generate(args);
    };

    /**
     * Get a local property set in this thread, or null if it is missing. See
     * {@link setLocalProperty}.
     * @param {string} key
     * @returns {Promise.<string>}
     */
    SparkContext.prototype.getLocalProperty = function(key) {
      var args = {
        target: this,
        method: 'getLocalProperty',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkContext.prototype.initLocalProperties = function() {
      var args = {
        target: this,
        method: 'initLocalProperties',
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<boolean>}
     */
    SparkContext.prototype.isLocal = function() {
      var args = {
        target: this,
        method: 'isLocal',
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<boolean>}  true if context is stopped or in the midst of stopping.
     */
    SparkContext.prototype.isStopped = function() {
      var args = {
        target: this,
        method: 'isStopped',
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string[]>}
     */
    SparkContext.prototype.jars = function() {
      var args = {
        target: this,
        method: 'jars',
        returnType: [String]
      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<string>}
     */
    SparkContext.prototype.master = function() {
      var args = {
        target: this,
        method: 'master',
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Distribute a local array to form an RDD.
     * @param {array} list
     * @param {integer} [numSlices]
     * @returns {module:eclairjs/rdd.RDD}
     */
    SparkContext.prototype.parallelize = function(arr) {
      var args = {
        target: this,
        method: 'parallelize',
        args: Utils.wrapArguments(arguments),
        returnType: RDD
      };

      return Utils.generate(args);
    };

    /**
     * Distribute a local array to form an RDD.
     * @param {array} list
     * @param {integer} [numSlices]
     * @returns {module:eclairjs/rdd.PairRDD}
     */
    SparkContext.prototype.parallelizePairs = function(arr) {
      var args = {
        target: this,
        method: 'parallelizePairs',
        args: Utils.wrapArguments(arguments),
        returnType: PairRDD
      };

      return Utils.generate(args);
    };

    /**
     * Creates a new RDD[Long] containing elements from `start` to `end`(exclusive), increased by
     * `step` every element.
     *
     * @note if we need to cache this RDD, we should make sure each partition does not exceed limit.
     *
     * @param {number} start  the start value.
     * @param {number} end  the end value.
     * @param {number} step  the incremental step
     * @param {number} numSlices  the partition number of the new RDD.
     * @returns {module:eclairjs/rdd.RDD}
     */
    SparkContext.prototype.range = function(start,end,step,numSlices) {
      var args = {
        target: this,
        method: 'range',
        args: Utils.wrapArguments(arguments),
        returnType: RDD
      };

      return Utils.generate(args);
    };

    /**
     * @returns {SparkStatusTracker}
     */
    SparkContext.prototype.statusTracker = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this, 
    //     method: 'statusTracker', 
    //     returnType: SparkStatusTracker
    // 
    //   };
    // 
    //   return Utils.generate(args);
    };

    /**
     * Set the directory under which RDDs are going to be checkpointed. The directory must
     * be a HDFS path if running on a cluster.
     * @param {string} directory
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkContext.prototype.setCheckpointDir = function(directory) {
      var args = {
        target: this,
        method: 'setCheckpointDir',
        args: Utils.wrapArguments(arguments),
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} value
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkContext.prototype.setJobDescription = function(value) {
      var args = {
        target: this,
        method: 'setJobDescription',
        args: Utils.wrapArguments(arguments),
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * Assigns a group ID to all the jobs started by this thread until the group ID is set to a
     * different value or cleared.
     *
     * Often, a unit of execution in an application consists of multiple Spark actions or jobs.
     * Application programmers can use this method to group all those jobs together and give a
     * group description. Once set, the Spark web UI will associate such jobs with this group.
     *
     * The application can also use {@link cancelJobGroup} to cancel all
     * running jobs in this group. For example,
     * @example
     * // In the main thread:
     * sc.setJobGroup("some_job_to_cancel", "some job description")
     * sc.parallelize(1 to 10000, 2).map { i => Thread.sleep(10); i }.count()
     *
     * // In a separate thread:
     * sc.cancelJobGroup("some_job_to_cancel")
     *
     *
     * If interruptOnCancel is set to true for the job group, then job cancellation will result
     * in Thread.interrupt() being called on the job's executor threads. This is useful to help ensure
     * that the tasks are actually stopped in a timely manner, but is off by default due to HDFS-1208,
     * where HDFS may respond to Thread.interrupt() by marking nodes as dead.
     * @param {string} groupId
     * @param {string} description
     * @param {boolean} interruptOnCancel
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkContext.prototype.setJobGroup = function(groupId,description,interruptOnCancel) {
      var args = {
        target: this,
        method: 'setJobGroup',
        args: Utils.wrapArguments(arguments),
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * Set a local property that affects jobs submitted from this thread, such as the
     * Spark fair scheduler pool.
     * @param {string} key
     * @param {string} value
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkContext.prototype.setLocalProperty = function(key,value) {
      var args = {
        target: this,
        method: 'setLocalProperty',
        args: Utils.wrapArguments(arguments),
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * @param {string} logLevel  The desired log level as a string.
     * Valid log levels include: ALL, DEBUG, ERROR, FATAL, INFO, OFF, TRACE, WARN
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkContext.prototype.setLogLevel = function(logLevel) {
      var args = {
        target: this,
        method: 'setLogLevel',
        args: Utils.wrapArguments(arguments),
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * Read a text file from HDFS, a local file system (available on all nodes), or any Hadoop-supported file system URI,
     * and return it as an RDD of Strings.
     * @param {string} path - path to file
     * @param {int} [minPartitions]
     * @returns {module:eclairjs/rdd.RDD}
     */
    SparkContext.prototype.textFile = function() {
      var args = {
        target: this,
        method: 'textFile',
        args: Utils.wrapArguments(arguments),
        returnType: RDD
      };

      return Utils.generate(args);
    };

    /**
     * Load an RDD saved as a SequenceFile containing serialized objects, with NullWritable keys and BytesWritable
     * values that contain a serialized partition. This is still an experimental storage format and may not be supported
     * exactly as is in future releases. 
     * @param {string} path - path to file
     * @param {int} [minPartitions]
     * @returns {module:eclairjs/rdd.RDD}
     */
    SparkContext.prototype.objectFile = function() {
      var args = {
        target: this,
        method: 'objectFile',
        args: Utils.wrapArguments(arguments),
        returnType: RDD
      };

      return Utils.generate(args);
    };

    SparkContext.prototype.stop = function() {
      return server.stop();
    };

    /**
     * Read a directory of text files from HDFS, a local file system (available on all nodes), or any
     * Hadoop-supported file system URI. Each file is read as a single record and returned in a
     * key-value pair, where the key is the path of each file, the value is the content of each file.
     *
     * <p> For example, if you have the following files:
     * @example
     *   hdfs://a-hdfs-path/part-00000
     *   hdfs://a-hdfs-path/part-00001
     *   ...
     *   hdfs://a-hdfs-path/part-nnnnn
     *
     *
     * Do `val rdd = sparkContext.wholeTextFile("hdfs://a-hdfs-path")`,
     *
     * <p> then `rdd` contains
     * @example
     *   (a-hdfs-path/part-00000, its content)
     *   (a-hdfs-path/part-00001, its content)
     *   ...
     *   (a-hdfs-path/part-nnnnn, its content)
     *
     *
     * @note Small files are preferred, large file is also allowable, but may cause bad performance.
     * @note On some filesystems, `.../path/&#42;` can be a more efficient way to read all files
     *       in a directory rather than `.../path/` or `.../path`
     *
     * @param {string} path  Directory to the input data files, the path can be comma separated paths as the
     *             list of inputs.
     * @param {number} minPartitions  A suggestion value of the minimal splitting number for input data.
     * @returns {module:eclairjs/rdd.RDD}
     */
    SparkContext.prototype.wholeTextFiles = function(path,minPartitions) {
      var args = {
        target: this,
        method: "wholeTextFiles",
        args: Utils.wrapArguments(arguments),
        returnType: RDD
      };

      return Utils.generate(args);
    };

    SparkContext.moduleLocation = '/SparkContext';

    return SparkContext;
  })();
};