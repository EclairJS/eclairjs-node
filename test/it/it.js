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

// This is an Integration test and requires a running Notebook/Spark Kernel/EclairJS-nashorn setup

var assert = require('assert');
var expect = require('chai').expect;
var path = require('path');
var TestUtils = require('../lib/utils.js');

var eclairjs = require('../../lib/index.js');
var spark = new eclairjs();

var sparkSession = spark.sql.SparkSession
  .builder()
  .appName("EclairJS Integration Tests")
  .master("local[*]")
  .getOrCreate();

var sc = sparkSession.sparkContext();

global.SESSION = sparkSession;
global.SC = sc;
global.SPARK = spark;

describe('SparkContext Integration Test', function() {
  before(function(done) {
    this.timeout(100000);

    sc.refIdP.then(function() {
      done();
    }).catch(done);
  });

  describe("SparkContext tests", function() {
    require('./SparkContext');
  });


  describe("SQL tests", function() {
    require('./sql/Column');
    require('./sql/DataFrame');
    require('./sql/DataFrameNaFunctions');
    require('./sql/DataFrameReader');
    require('./sql/DataFrameStatFunctions');
    //require('./sql/functions');
    require('./sql/GroupedData');
    require('./sql/Row');
  });

  describe("Streaming tests", function() {
    require('./streaming/DStream');
  });

  describe("ML tests", function() {
    require('./ml/ml.js');
  });

  describe("MLLib tests", function() {
    require('./mllib/mllib.js');
  });
  after(function(done) {
    if (sc) {
      sc.stop().then(done).catch(done);
    }
  });
});