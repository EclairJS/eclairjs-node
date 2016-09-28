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

module.exports = function(kernelP, server) {
  return (function() {
    var Utils = require('../utils.js');

    var gKernelP = kernelP;

    /**
     * @classdesc
     * The entry point to programming Spark with the Dataset and DataFrame API.
     *
     * In environments that this has been created upfront (e.g. REPL, notebooks), use the builder
     * to get an existing session:
     *
     * @example
     *   SparkSession.builder().getOrCreate()
     *
     *
     * The builder can also be used to create a new session:
     *
     * @example
     *   SparkSession.builder()
     *     .master("local")
     *     .appName("Word Count")
     *     .config("spark.some.config.option", "some-value").
     *     .getOrCreate()
     *
     * @class
     * @memberof module:eclairjs/sql
     */

    function SparkSession() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * The underlying SparkContext.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#sparkContext
     * @returns {module:eclairjs/SparkContext}
     */
    SparkSession.prototype.sparkContext = function() {
      var SparkContext = require('../SparkContext')(gKernelP, server);

      var args = {
        target: this,
        method: 'sparkContext',
        returnType: SparkContext
      };

      return Utils.generate(args);
    };

    /**
     * A collection of methods for registering user-defined functions (UDF).
     * Note that the user-defined functions must be deterministic. Due to optimization,
     * duplicate invocations may be eliminated or the function may even be invoked more times than
     * it is present in the query.
     *
     * The following example registers a Scala closure as UDF:
     * @example
     *   sparkSession.udf.register("myUDF", (arg1: Int, arg2: String) => arg2 + arg1)
     *
     *
     * The following example registers a UDF in Java:
     * @example
     *   sparkSession.udf().register("myUDF",
     *       new UDF2<Integer, String, String>() {
     *           @Override
     *           public String call(Integer arg1, String arg2) {
     *               return arg2 + arg1;
     *           }
     *      }, DataTypes.StringType);
     *
     *
     * Or, to use Java 8 lambda syntax:
     * @example
     *   sparkSession.udf().register("myUDF",
     *       (Integer arg1, String arg2) -> arg2 + arg1,
     *       DataTypes.StringType);
     *
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {module:eclairjs/sql.UDFRegistration}
     */
    SparkSession.prototype.udf = function() {
      throw "not implemented by ElairJS";
    // var UDFRegistration = require('../sql/UDFRegistration.js');
    //   var args ={
    //     target: this,
    //     method: 'udf',
    //     returnType: UDFRegistration
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * :: Experimental ::
     * Returns a {@link StreamingQueryManager} that allows managing all the
     * [[StreamingQuery StreamingQueries]] active on `this`.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {module:eclairjs/sql/streaming.StreamingQueryManager}
     */
    SparkSession.prototype.streams = function() {
    	 var StreamingQueryManager = require('../sql/streaming/StreamingQueryManager.js');
    	   var args ={
    	     target: this,
    	     method: 'streams',
    	     returnType: StreamingQueryManager

    	   };

    	   return Utils.generate(args);
    };

    /**
     * Start a new session with isolated SQL configurations, temporary tables, registered
     * functions are isolated, but sharing the underlying {@link SparkContext} and cached data.
     *
     * Note: Other than the {@link SparkContext}, all shared state is initialized lazily.
     * This method will force the initialization of the shared state to ensure that parent
     * and child sessions are set up with the same shared state. If the underlying catalog
     * implementation is Hive, this will initialize the metastore, which may take some time.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {module:eclairjs/sql.SparkSession}
     */
    SparkSession.prototype.newSession = function() {
      var args = {
        target: this,
        method: 'newSession',
        returnType: SparkSession
      };

      return Utils.generate(args);
    };

    /**
     * :: Experimental ::
     * Creates a new {@link Dataset} of type T containing zero elements.
     *
     * @function
     * @name module:eclairjs/sql.SparkSession#emptyDataset
     * @returns {module:eclairjs/sql.Dataset}  2.0.0
     */
    SparkSession.prototype.emptyDataset = function() {
      throw "not implemented by ElairJS";
    };

    /**
     * Creates a {@link Dataset} from {@link RDD} of Rows using the schema
     * @function
     * @name module:eclairjs/sql.SparkSession#createDataFrame
     * @param {module:eclairjs.RDD<module:eclairjs/sql.Row> | module:eclairjs/sql.Row[]} rowRDD_or_values A RDD of [Rows]{@link Row} or array of arrays that contain values of valid {@link DataTypes}
     * @param {module:eclairjs/sql/types.StructType} schema -
     * @returns {module:eclairjs/sql.Dataset}
     * @example
     * var df = sqlSession.createDataFrame([[1,1], [1,2], [2,1], [2,1], [2,3], [3,2], [3,3]], schema);
     */
    SparkSession.prototype.createDataFrame = function() {
      var Dataset = require('./Dataset');

      var args = {
        target: this,
        method: 'createDataFrame',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    /**
     * Creates a {@link Dataset} from RDD of JSON
     * @param {{module:eclairjs.RDD<object>}    RDD of JSON
     * @param {object} schema - object with keys corresponding to JSON field names (or getter functions), and values indicating Datatype
     * @returns {module:eclairjs/sql.Dataset}
     * @example
     * var df = sqlSession.createDataFrame([{id:1,"name":"jim"},{id:2,"name":"tom"}], {"id":"Integer","name","String"});
     *
     */
    SparkSession.prototype.createDataFrameFromJson = function(rowRDD, schema) {
      var Dataset = require('./Dataset');
      var args = {
        target: this,
        method: 'createDataFrameFromJson',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };


    /**
     * Convert a [[BaseRelation]] created for external data sources into a {@link DataFrame}.
     *
     * @since EclairJS 0.6 Spark  2.0.0
     * @function
     * @name module:eclairjs/sql.SparkSession#baseRelationToDataFrame
     * @param {module:eclairjs/sql/sources.BaseRelation} baseRelation
     * @returns {module:eclairjs/sql.DataFrame}
     */
    SparkSession.prototype.baseRelationToDataFrame = function(baseRelation) {
      throw "not implemented by ElairJS";
    //   var args ={
    //     target: this,
    //     method: 'baseRelationToDataFrame',
    //     args: Utils.wrapArguments(arguments),
    //     returnType: DataFrame
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * :: Experimental ::
     * Creates a {@link Dataset}
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {module:eclairjs/rdd.RDD | object[]} data
     * @param {function} encoder
     * @returns {module:eclairjs/sql.Dataset}
     */
    SparkSession.prototype.createDataset = function() {
      var Dataset = require('../sql/Dataset.js');

      var args = {
        target: this,
        method: 'createDataset',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    /**
     * :: Experimental ::
     * Creates a [[Dataset]] with a single {@link LongType} column named `id`, containing elements
     * in the specified range
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {number} end
     * @returns {module:eclairjs/sql.Dataset}
     */
    SparkSession.prototype.range = function(end) {
      throw "not implemented by ElairJS";
    // var Dataset = require('../sql/Dataset.js');
    //   var args ={
    //     target: this,
    //     method: 'range',
    //     args: Utils.wrapArguments(arguments),
    //     returnType: Dataset
    //
    //   };
    //
    //   return Utils.generate(args);
    };

    /**
     * Returns the specified table as a {@link DataFrame}.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} tableName
     * @returns {module:eclairjs/sql.DataFrame}
     */
    SparkSession.prototype.table = function(tableName) {
      var DataFrame = require('./DataFrame');

      var args = {
        target: this,
        method: 'table',
        args: Utils.wrapArguments(arguments),
        returnType: DataFrame
      };

      return Utils.generate(args);
    };

    /**
     * Executes a SQL query using Spark, returning the result as a {@link DataFrame}.
     * The dialect that is used for SQL parsing can be configured with 'spark.sql.dialect'.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} sqlText
     * @returns {module:eclairjs/sql.DataFrame}
     */
    SparkSession.prototype.sql = function(sqlText) {
      var DataFrame = require('./DataFrame');

      var args = {
        target: this,
        method: 'sql',
        args: Utils.wrapArguments(arguments),
        returnType: DataFrame
      };

      return Utils.generate(args);
    };


    /**
     * Returns a {@link DataFrameReader} that can be used to read non-streaming data in as a
     * {@link DataFrame}.
     * @example
     *   sparkSession.read.parquet("/path/to/file.parquet")
     *   sparkSession.read.schema(schema).json("/path/to/file.json")
     *
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {module:eclairjs/sql.DataFrameReader}
     */
    SparkSession.prototype.read = function() {
      var DataFrameReader = require('./DataFrameReader');

      var args = {
        target: this,
        method: 'read',
        returnType: DataFrameReader
      };

      return Utils.generate(args);
    };

    /**
     * :: Experimental ::
     * Returns a [[DataStreamReader]] that can be used to read streaming data in as a {@link DataFrame}.
     * @example
     *   sparkSession.readStream.parquet("/path/to/directory/of/parquet/files")
     *   sparkSession.readStream.schema(schema).json("/path/to/directory/of/json/files")
     *
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {module:eclairjs/sql/streaming.DataStreamReader}
     */
    SparkSession.prototype.readStream = function() {
    	 var DataStreamReader = require('../sql/streaming/DataStreamReader.js');
    	   var args ={
    	     target: this,
    	     method: 'readStream',
    	     returnType: DataStreamReader

    	   };

    	   return Utils.generate(args);
    };

    /**
     * The version of Spark on which this application is running.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {Promise.<string>}
     */
    SparkSession.prototype.version = function() {
      var args = {
        target: this,
        method: 'version',
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Stop the underlying {@link SparkContext}.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkSession.prototype.stop = function() {
      return server.stop();
    };

    // Static
    /**
     * Creates a [[SparkSession.Builder]] for constructing a {@link SparkSession}.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {Builder}
     */
    SparkSession.builder = function() {
      var Builder = require('./Builder')(kernelP, server);

      var args = {
        target: SparkSession,
        method: 'builder',
        static: true,
        kernelP: gKernelP,
        returnType: Builder
      };

      return Utils.generate(args);
    };

    /**
     * Changes the SparkSession that will be returned in this thread and its children when
     * SparkSession.getOrCreate() is called. This can be used to ensure that a given thread receives
     * a SparkSession with an isolated session, instead of the global (first created) context.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {module:eclairjs/sql.SparkSession} session
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkSession.setActiveSession = function(session) {
      var args = {
        target: SparkSession,
        method: 'setActiveSession',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP
      };

      return Utils.generate(args);
    };

    /**
     * Clears the active SparkSession for current thread. Subsequent calls to getOrCreate will
     * return the first created context instead of a thread-local override.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkSession.clearActiveSession = function() {
      var args = {
        target: SparkSession,
        method: 'clearActiveSession',
        static: true,
        kernelP: gKernelP,
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * Sets the default SparkSession that is returned by the builder.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {module:eclairjs/sql.SparkSession} session
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkSession.setDefaultSession = function(session) {
      var args = {
        target: SparkSession,
        method: 'setDefaultSession',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: null
      };

      return Utils.generate(args);
    };

    /**
     * Clears the default SparkSession that is returned by the builder.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     */
    SparkSession.clearDefaultSession = function() {
      var args = {
        target: SparkSession,
        method: 'clearDefaultSession',
        static: true,
        returnType: null
      };

      return Utils.generate(args);
    };

    SparkSession.moduleLocation = '/sql/SparkSession';

    return SparkSession;
  })();
};