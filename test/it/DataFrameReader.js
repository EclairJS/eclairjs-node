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

/*
  This test requires a local mysql database, int id, string name, int age with data 1, "batman", 44

  To get the mysql jdbc drivers to load, edit Kernel.json's env section and add:
 "SPARK_CLASSPATH": "/path/to/mysql-connector-java-5.1.36-bin.jar"

 */

var assert = require('assert');
var expect = require('chai').expect;
var path = require('path');

var spark = require('../../spark.js');

var sc = new spark.SparkContext("local[*]", "foo");
var sqlContext = new spark.SQLContext(sc);

var DataTypes = sqlContext.types.DataTypes;

function executeTest(run, checks, done) {
  try {
    run(function(result) {
        try {
          checks(result);
        } catch (e) {
          done(e);
          return;
        }

        done();
      },
      function(err) {
        done(new Error(err));
      });
  } catch (e) {
    done(e);
    return;
  }
}

var fileName = path.resolve(__dirname+'/../data/people.txt');

var dataFrame;

describe('sql.functions Test', function() {
  describe("DataFrameReader.jdbc(url, db, info)", function() {
    it("should connect to a running mysql db", function(done) {
      this.timeout(100000);

      executeTest(
        function(callback, error) {

          var url = "jdbc:mysql://localhost:3306/test";
          sqlContext.read().jdbc(url, "test", {user: "root", password: "mypass"}).take(10).then(callback).catch(error);
        }, function(result) {
          expect(result[0].values[1]).equals("batman");
        },
        done
      );
    });
  });

  describe("DataFrameReader.jdbc(url, db, predicates, info)", function() {
    it("should connect to a running mysql db", function(done) {
      this.timeout(100000);

      executeTest(
        function(callback, error) {

          var url = "jdbc:mysql://localhost:3306/test";
          sqlContext.read().jdbc(url, "test", ["age < 44"], {user: "root", password: "mypass"}).count().then(callback).catch(error);
        }, function(result) {
          expect(result).equals(0);
        },
        done
      );
    });
  });

  describe("DataFrameReader.load().format().option()", function() {
    it("should connect to a running mysql db", function(done) {
      this.timeout(100000);

      executeTest(
        function(callback, error) {
          sqlContext.read().format("jdbc").option("url", "jdbc:mysql://localhost:3306/test?user=root&password=mypass").option("dbtable", "test").load().count().then(callback).catch(error);
        }, function(result) {
          expect(result).equals(1);
        },
        done
      );
    });
  });

  describe("DataFrameReader.load().format().options()", function() {
    it("should connect to a running mysql db", function(done) {
      this.timeout(100000);

      executeTest(
        function(callback, error) {
          sqlContext.read().format("jdbc").options({url: "jdbc:mysql://localhost:3306/test?user=root&password=mypass", dbtable: "test"}).load().count().then(callback).catch(error);
        }, function(result) {
          expect(result).equals(1);
        },
        done
      );
    });
  });
});
