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
var TestUtils = require('../../lib/utils.js');

var spark;
var session;

if (global.SESSION) {
  session = global.SESSION;
  spark = glboal.SPARK;
} else {
  var eclairjs = require('../../../lib/index.js');
  spark = new eclairjs();

  session = spark.sql.SparkSession.builder().appName("sql.Dataset Integration tests").master("local[*]").getOrCreate();
}

describe('Dataset Test', function() {
  describe("String Encoder", function() {
    it("should work as expected", function(done) {
      // Starting the kernel is slow
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          var ds = session.createDataset(["1","2","3"], spark.sql.Encoders.STRING());
          ds.collect().then(callback).catch(error);
        }, function(result) {
          expect(result).deep.equals(["1", "2", "3"]);
        },
        done
      );
    });
  });

  describe("Float Encoder", function() {
    it("should work as expected", function(done) {
      // Starting the kernel is slow
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          var ds = session.createDataset([1,0, 2.2, 3.45], spark.sql.Encoders.FLOAT());
          ds.collect().then(callback).catch(error);
        }, function(result) {
          expect(result).deep.equals([1,0, 2.2, 3.45]);
        },
        done
      );
    });
  });

  describe("Double Encoder", function() {
    it("should work as expected", function(done) {
      // Starting the kernel is slow
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          var ds = session.createDataset([1,0, 2.2, 3.45], spark.sql.Encoders.DOUBLE());
          ds.collect().then(callback).catch(error);
        }, function(result) {
          expect(result).deep.equals([1,0, 2.2, 3.45]);
        },
        done
      );
    });
  });

  describe("Boolean Encoder", function() {
    it("should work as expected", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var ds = session.createDataset([false, true], spark.sql.Encoders.BOOLEAN());
          ds.collect().then(callback).catch(error);
        }, function(result) {
          expect(result).deep.equals([false, true]);
        },
        done
      );
    });
  });

  describe("Tuple Encoder", function() {
    it("should work as expected", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var ds = session.createDataset([new spark.Tuple2(1, "two")], spark.sql.Encoders.tuple2(spark.sql.Encoders.INT(), spark.sql.Encoders.STRING()));
          ds.collect().then(callback).catch(error);
        }, function(result) {
          expect(result).deep.equals([{ '0': 1, '1': 'two', length: 2 }]);
        },
        done
      );
    });
  });

  after(function(done) {
    if (!global.SESSION && session) {
      session.stop().then(done).catch(done);
    } else {
      // global session, so don't stop it
      done();
    }
  });
});
