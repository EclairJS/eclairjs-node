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
var sc;

if (global.SC) {
  spark = global.SPARK;
  sc = global.SC;
} else {
  var eclairjs = require('../../../lib/index.js');
  spark = new eclairjs();

  sc = new spark.SparkContext("local[*]", "sql.GroupedData Integration Tests");
}

var sqlContext = new spark.sql.SQLContext(sc);

function buildPeopleTable(file, callback) {
  var rdd = sc.textFile(file);

  var people = rdd.map(function(line) {
    var parts = line.split(",");
    return person = {
      name: parts[0],
      age: parseInt(parts[1].trim()),
      expense: parseInt(parts[2].trim())
    };
  });

  var DataTypes = spark.sql.types.DataTypes;

  var fields = [];
  fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
  fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
  fields.push(DataTypes.createStructField("expense", DataTypes.IntegerType, true));

  var schema = DataTypes.createStructType(fields);

  // Convert records of the RDD (people) to Rows.
  var rowRDD = people.map(function(person, RowFactory){
    return RowFactory.create([person.name, person.age, person.expense]);
  }, [spark.sql.RowFactory]);

  //Apply the schema to the RDD.
  var peopleDataFrame = sqlContext.createDataFrame(rowRDD, schema);

  // Register the DataFrame as a table.
  peopleDataFrame.registerTempTable("people").then(function() {
    callback(peopleDataFrame);
  }).catch(function(e) {
    console.log("Error", e);
  });
}

var fileName = path.resolve(__dirname+'/../../data/people.txt');

var dataFrame;

describe('GroupedData Test', function() {
  describe("programmaticallySpecifyingSchema", function() {
    it("should generate the correct output", function(done) {
      // Starting the kernel is slow
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback) {
          buildPeopleTable(fileName, function(df) {
            dataFrame = df;
            dataFrame.columns().then(callback);
          });
        }, function(result) {
          expect(result).deep.equals(['name','age','expense']);
        },
        done
      );
    });
  });

  describe("GroupedData.agg()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var gd = dataFrame.groupBy("name");
          gd.agg(spark.sql.functions.max(dataFrame.col("age"))).toString().then(callback).catch(error);
        }, function(result) {
          expect(result).equals('[name: string, max(age): int]');
        },
        done
      );
    });
  });

  describe("GroupedData.avg()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var gd = dataFrame.groupBy("name");
          gd.avg("age").toString().then(callback);
        }, function(result) {
          expect(result).equals('[name: string, avg(age): double]');
        },
        done
      );
    });
  });

  describe("GroupedData.max()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var gd = dataFrame.groupBy("name");
          gd.max("age").toString().then(callback);
        }, function(result) {
          expect(result).equals('[name: string, max(age): int]');
        },
        done
      );
    });
  });

  describe("GroupedData.mean()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var gd = dataFrame.groupBy("name");
          gd.mean("age").toString().then(callback);
        }, function(result) {
          expect(result).equals('[name: string, avg(age): double]');
        },
        done
      );
    });
  });

  describe("GroupedData.min()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var gd = dataFrame.groupBy("name");
          gd.min("age").toString().then(callback);
        }, function(result) {
          expect(result).equals('[name: string, min(age): int]');
        },
        done
      );
    });
  });

  describe("GroupedData.sum()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var gd = dataFrame.groupBy("name");
          gd.sum("age").toString().then(callback);
        }, function(result) {
          expect(result).equals('[name: string, sum(age): bigint]');
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