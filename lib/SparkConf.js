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

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('./utils.js');

    var gKernelP = kernelP;

    /**
     * Configuration for a Spark application. Used to set various Spark parameters as key-value pairs.
     *
     * Most of the time, you would create a SparkConf object with `new SparkConf()`, which will load
     * values from any `spark.*` Java system properties set in your application as well. In this case,
     * parameters you set directly on the `SparkConf` object take priority over system properties.
     *
     * For unit tests, you can also call `new SparkConf(false)` to skip loading external settings and
     * get the same configuration no matter what the system properties are.
     *
     * All setter methods in this class support chaining. For example, you can write
     * `new SparkConf().setMaster("local").setAppName("My app")`.
     *
     * Note that once a SparkConf object is passed to Spark, it is cloned and can no longer be modified
     * by the user. Spark does not support modifying the configuration at runtime.
     *
     * @param loadDefaults whether to also load values from Java system properties
     * @classdesc
     */

    var gAppName;

    /**
     * @constructor
     * @memberof module:eclairjs
     * @classdesc Configuration for a Spark application. Used to set various Spark parameters as key-value pairs.
     * Most of the time, you would create a SparkConf object with new SparkConf(),  parameters you set directly on the SparkConf
     * object take priority over system properties.
     * All setter methods in this class support chaining. For example, you can write new SparkConf().setMaster("local").setAppName("My app").
     * Note that once a SparkConf object is passed to Spark, it is cloned and can no longer be modified by the user.
     * Spark does not support modifying the configuration at runtime.
     * @param {boolean} loadDefaults
     */
    function SparkConf() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @param {string} key
     * @param {string} value
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.set = function(key,value) {
       var args ={
         target: this,
         method: 'set',
         args: [
           { value: key, type: 'string' },
           { value: value, type: 'string' }
         ],
         returnType: SparkConf

       };

       return Utils.generate(args);
    };


    /**
     * The master URL to connect to, such as "local" to run locally with one thread, "local[4]" to
     * run locally with 4 cores, or "spark://master:7077" to run on a Spark standalone cluster.
     * @param {string} master
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setMaster = function(master) {
      var args = {
        target: this,
        method: 'setMaster',
        args: Utils.wrapArguments(arguments),
        returnType: SparkConf
      };

      return Utils.generate(args);
    };


    /**
     * Set a name for your application.
     * @param {string} appName
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setAppName = function(name) {
      // we store the appName so we can use it during Toree creation
      gAppName = name;

      var args = {
        target: this,
        method: 'setAppName',
        args: Utils.wrapArguments(arguments),
        returnType: SparkConf
      };

      return Utils.generate(args);
    };

    SparkConf.prototype.getAppName = function() {
      return gAppName;
    };

    /**
     * @param {string[]} jars
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setJars = function(jars) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setJars',
    //     args: [
    //       { value: jars, type: 'string[]' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string[]} jars
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setJars = function(jars) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setJars',
    //     args: [
    //       { value: jars, type: 'string[]' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Set an environment variable to be used when launching executors for this application.
     * These variables are stored as properties of the form spark.executorEnv.VAR_NAME
     * (for example spark.executorEnv.PATH) but this method makes them easier to set.
     * @param {string} variable
     * @param {string} value
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setExecutorEnv0 = function(variable,value) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setExecutorEnv',
    //     args: [
    //       { value: variable, type: 'string' },
    //       { value: value, type: 'string' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Set multiple environment variables to be used when launching executors.
     * These variables are stored as properties of the form spark.executorEnv.VAR_NAME
     * (for example spark.executorEnv.PATH) but this method makes them easier to set.
     * @param {Tuple2[]} variables
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setExecutorEnv1 = function(variables) {
      throw "not implemented by ElairJS";
    // // TODO: handle Tuple conversion for 'variables'
    //   var args ={
    //     target: this,
    //     method: 'setExecutorEnv',
    //     args: [
    //       { value: variables, type: 'Tuple2[]' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Set multiple environment variables to be used when launching executors.
     * (Java-friendly version.)
     * @param {Tuple2[]} variables
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setExecutorEnv2 = function(variables) {
      throw "not implemented by ElairJS";
    // // TODO: handle Tuple conversion for 'variables'
    //   var args ={
    //     target: this,
    //     method: 'setExecutorEnv',
    //     args: [
    //       { value: variables, type: 'Tuple2[]' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Set the location where Spark is installed on worker nodes.
     * @param {string} home
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setSparkHome = function(home) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setSparkHome',
    //     args: [
    //       { value: home, type: 'string' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {Traversable} settings
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setAll = function(settings) {
      throw "not implemented by ElairJS";
    // // TODO: handle Tuple conversion for 'settings'
    //   var args ={
    //     target: this,
    //     method: 'setAll',
    //     args: [
    //       { value: settings, type: 'Traversable' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} key
     * @param {string} value
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.setIfMissing = function(key,value) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'setIfMissing',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: value, type: 'string' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Use Kryo serialization and register the given set of classes with Kryo.
     * If called multiple times, this will append the classes from all calls together.
     * @param {Class[]} classes
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.registerKryoClasses = function(classes) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'registerKryoClasses',
    //     args: [
    //       { value: classes, type: 'Class[]' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Use Kryo serialization and register the given set of Avro schemas so that the generic
     * record serializer can decrease network IO
     * @param {...Schema} schemas
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.registerAvroSchemas = function(schemas) {
      throw "not implemented by ElairJS";
    // // TODO: handle repeated parm 'schemas'
    //   var args ={
    //     target: this,
    //     method: 'registerAvroSchemas',
    //     args: [
    //       { value: schemas, type: 'Schema' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Map}
     */
    SparkConf.prototype.getAvroSchema = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'getAvroSchema',
    //     returnType: Map
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} key
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.remove = function(key) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'remove',
    //     args: [
    //       { value: key, type: 'string' }
    //     ],
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} key
     * @param {string} [defaultValue]
     * @returns {Promise.<string>}
     */
    SparkConf.prototype.get = function(key, defaultValue) {
      var args = {
        target: this,
        method: 'get',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Get a time parameter as seconds, falling back to a default if not set. If no
     * suffix is provided then seconds are assumed.
     * @param {string} key
     * @param {string} [defaultValue]
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getTimeAsSeconds = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    // // TODO: handle optional parms 'defaultValue'
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getTimeAsSeconds',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'string' ,  optional: true}
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Get a time parameter as milliseconds, falling back to a default if not set. If no
     * suffix is provided then milliseconds are assumed.
     * @param {string} key
     * @param {string} [defaultValue]
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getTimeAsMs = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    // // TODO: handle optional parms 'defaultValue'
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getTimeAsMs',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'string' ,  optional: true}
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Get a size parameter as bytes; throws a NoSuchElementException if it's not set. If no
     * suffix is provided then bytes are assumed.
     * @throws NoSuchElementException
     * @param {string} key
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getSizeAsBytes0 = function(key) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getSizeAsBytes',
    //     args: [
    //       { value: key, type: 'string' }
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Get a size parameter as bytes, falling back to a default if not set. If no
     * suffix is provided then bytes are assumed.
     * @param {string} key
     * @param {string} defaultValue
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getSizeAsBytes1 = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getSizeAsBytes',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'string' }
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Get a size parameter as bytes, falling back to a default if not set.
     * @param {string} key
     * @param {number} defaultValue
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getSizeAsBytes2 = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getSizeAsBytes',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'number' }
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Get a size parameter as Kibibytes, falling back to a default if not set. If no
     * suffix is provided then Kibibytes are assumed.
     * @param {string} key
     * @param {string} [defaultValue]
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getSizeAsKb = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    // // TODO: handle optional parms 'defaultValue'
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getSizeAsKb',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'string' ,  optional: true}
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Get a size parameter as Mebibytes, falling back to a default if not set. If no
     * suffix is provided then Mebibytes are assumed.
     * @param {string} key
     * @param {string} [defaultValue]
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getSizeAsMb = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    // // TODO: handle optional parms 'defaultValue'
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getSizeAsMb',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'string' ,  optional: true}
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Get a size parameter as Gibibytes, falling back to a default if not set. If no
     * suffix is provided then Gibibytes are assumed.
     * @param {string} key
     * @param {string} [defaultValue]
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getSizeAsGb = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    // // TODO: handle optional parms 'defaultValue'
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getSizeAsGb',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'string' ,  optional: true}
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} key
     * @returns {Promise.<string>}
     */
    SparkConf.prototype.getOption = function(key) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=result
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getOption',
    //     args: [
    //       { value: key, type: 'string' }
    //     ],
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Tuple2[]}
     */
    SparkConf.prototype.getAll = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'getAll',
    //     returnType: [Tuple2]
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} key
     * @param {number} defaultValue
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getInt = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getInt',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'number' }
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} key
     * @param {number} defaultValue
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getLong = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getLong',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'number' }
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} key
     * @param {number} defaultValue
     * @returns {Promise.<number>}
     */
    SparkConf.prototype.getDouble = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=parseInt(result)
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getDouble',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'number' }
    //     ],
    //     resolver: _resolve,
    //     returnType: Number
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} key
     * @param {boolean} defaultValue
     * @returns {Promise.<boolean>}
     */
    SparkConf.prototype.getBoolean = function(key,defaultValue) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=result === 'true'
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getBoolean',
    //     args: [
    //       { value: key, type: 'string' },
    //       { value: defaultValue, type: 'boolean' }
    //     ],
    //     resolver: _resolve,
    //     returnType: boolean
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Tuple2[]}
     */
    SparkConf.prototype.getExecutorEnv = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'getExecutorEnv',
    //     returnType: [Tuple2]
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {Tuple2[]}
     */
    SparkConf.prototype.getAkkaConf = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'getAkkaConf',
    //     returnType: [Tuple2]
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Returns the Spark application id, valid in the Driver after TaskScheduler registration and
     * from the start in the Executor.
     * @returns {Promise.<string>}
     */
    SparkConf.prototype.getAppId = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=result
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'getAppId',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @param {string} key
     * @returns {Promise.<boolean>}
     */
    SparkConf.prototype.contains = function(key) {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=result === 'true'
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'contains',
    //     args: [
    //       { value: key, type: 'string' }
    //     ],
    //     resolver: _resolve,
    //     returnType: boolean
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * @returns {module:eclairjs.SparkConf}
     */
    SparkConf.prototype.clone = function() {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'clone',
    //     returnType: SparkConf
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Return a string listing all keys and values, one per line. This is useful to print the
     * configuration out for debugging.
     * @returns {Promise.<string>}
     */
    SparkConf.prototype.toDebugString = function() {
      throw "not implemented by ElairJS";
    //
    // function _resolve(result, resolve, reject) {
    // 	var returnValue=result
    // 	resolve(returnValue);
    // };
    //   var args ={
    //     target: this,
    //     method: 'toDebugString',
    //     resolver: _resolve,
    //     returnType: String
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    SparkConf.moduleLocation = '/SparkConf';

    return SparkConf;
  })();
};