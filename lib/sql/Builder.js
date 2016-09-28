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

    var gAppName;

    /**
     * @classdesc
     * Builder for {@link SparkSession}.
     * @class
     * @memberof module:eclairjs/sql
     */

    /**
     * @constructor
     */
    function Builder(kernelP, refIdP) {
      this.kernelP = gKernelP;
      this.refIdP = refIdP;
    }

    /**
     * Sets a name for the application, which will be shown in the Spark web UI.
     * If no application name is set, a randomly generated name will be used.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} name
     * @returns {Builder}
     */
    Builder.prototype.appName = function(name) {
      gAppName = name;

      var args = {
        target: this,
        method: 'appName',
        args: Utils.wrapArguments(arguments),
        returnType: Builder
      };

      return Utils.generate(args);
    };

    /**
     * Sets a config option. Options set using this method are automatically propagated to
     * both {@link SparkConf} and SparkSession's own configuration.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string|SparkConf} key
     * @param {string|boolean|number} value
     * @returns {Builder}
     */
    Builder.prototype.config = function(key,value) {
      var args = {
        target: this,
        method: 'config',
        args: Utils.wrapArguments(arguments),
        returnType: Builder
      };

      return Utils.generate(args);
    };

    /**
     * Sets the Spark master URL to connect to, such as "local" to run locally, "local[4]" to
     * run locally with 4 cores, or "spark://master:7077" to run on a Spark standalone cluster.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @param {string} master
     * @returns {Builder}
     */
    Builder.prototype.master = function(master) {
      var args = {
        target: this,
        method: 'master',
        args: Utils.wrapArguments(arguments),
        returnType: Builder
      };

      return Utils.generate(args);
    };

    /**
     * Enables Hive support, including connectivity to a persistent Hive metastore, support for
     * Hive serdes, and Hive user-defined functions.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {Builder}
     */
    Builder.prototype.enableHiveSupport = function() {
      throw "not implemented by ElairJS";
    // var Builder = require('../sql/Builder.js');
    //   var args ={
    //     target: this,
    //     method: 'enableHiveSupport',
    //     returnType: Builder
    //
    //   };
    //
    //   return Utils.generate(args);
    };


    /**
     * Gets an existing {@link SparkSession} or, if there is no existing one, creates a new
     * one based on the options set in this builder.
     *
     * This method first checks whether there is a valid thread-local SparkSession,
     * and if yes, return that one. It then checks whether there is a valid global
     * default SparkSession, and if yes, return that one. If no valid global default
     * SparkSession exists, the method creates a new SparkSession and assigns the
     * newly created SparkSession as the global default.
     *
     * In case an existing SparkSession is returned, the config options specified in
     * this builder will be applied to the existing SparkSession.
     *
     * @since EclairJS 0.7 Spark  2.0.0
     * @returns {SparkSession}
     */
    Builder.prototype.getOrCreate = function() {
      if (!gAppName) {
        throw 'Spark Session needs an Application Name';
      }

      server.start(gAppName);

      var SparkSession = require('./SparkSession')(gKernelP, server);

      var args = {
        target: this,
        method: 'getOrCreate',
        returnType: SparkSession
      };

      return Utils.generate(args);
    };

    //Builder.moduleLocation = '/sql/Builder';

    return Builder;
  })();
};