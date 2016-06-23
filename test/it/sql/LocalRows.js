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

// This is an Integration test and requires a running Notebook/Spark Kernel/EclairJS-nashorn setup

var assert = require('assert');
var expect = require('chai').expect;
var path = require('path');
var TestUtils = require('../../lib/utils.js');

var spark = require('../../../lib/index.js');

var sc;

if (global.SC) {
  sc = global.SC;
} else {
  sc = new spark.SparkContext("local[*]", "sql.Local Rows Integration Tests");
}

var sqlContext = new spark.sql.SQLContext(sc);

var df = sqlContext.read().json(__dirname+"/../../data/people.json");
var rows;

describe('Local Rows Test', function() {
  describe("dataFrame.collect()", function() {
    it("should return 3 rows", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          df.collect().then(callback).catch(error);
        }, function(result) {
          rows = result;

          expect(result.length).equals(4);
        },
        done
      );
    });
  });

  describe("Row.anyNull()", function() {
    it("should return true for row 4", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[3].anyNull().then(callback).catch(error);
        }, function(result) {
          expect(result).equals(true);
        },
        done
      );
    });
  });

  describe("Row.anyNull()", function() {
    it("should return false for row 1", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].anyNull().then(callback).catch(error);
        }, function(result) {
          expect(result).equals(false);
        },
        done
      );
    });
  });

  describe("Row.apply(0)", function() {
    it("should return 29", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].apply(0).then(callback).catch(error);
        }, function(result) {
          expect(result).equals(29);
        },
        done
      );
    });
  });

  describe("Row.isEqual()", function() {
    it("should return true when comparing to itself", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].equals(rows[0]).then(callback).catch(error);
        }, function(result) {
          expect(result).equals(true);
        },
        done
      );
    });
  });

  describe("Row.isEqual()", function() {
    it("should return false when comparing to another row", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].equals(rows[1]).then(callback).catch(error);
        }, function(result) {
          expect(result).equals(false);
        },
        done
      );
    });
  });

  after(function(done) {
    if (!global.SC && sc) {
      sc.stop().then(done).catch(done);
    } else {
      // global sc, so don't stop it
      done();
    }
  });
});
