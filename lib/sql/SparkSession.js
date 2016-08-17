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

var gKernelP;

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
  var SparkContext = require('../SparkContext')(gKernelP);

  var args = {
    target: this,
    method: 'sparkContext',
    returnType: SparkContext
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
  var server = require('../server');

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
  var Builder = require('./Builder')(kernelP);

  var args = {
    target: SparkSession,
    method: 'builder',
    static: true,
    kernelP: gKernelP,
    returnType: Builder
  };

  return Utils.generate(args);
};

SparkSession.moduleLocation = '/sql/SparkSession';

module.exports = function(kP) {
  if (kP) gKernelP = kP;

  return SparkSession;
};