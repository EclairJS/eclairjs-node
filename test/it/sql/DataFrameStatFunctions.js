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
  sc = global.SC;
  spark = global.SPARK;
} else {
  var eclairjs = require('../../../lib/index.js');
  spark = new eclairjs();

  sc = new spark.SparkContext("local[*]", "sql.DataFrameStatFunctions Integration Tests");
}

var sqlContext = new spark.sql.SQLContext(sc);

var DataTypes = spark.sql.types.DataTypes;

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

  var fields = [];
  fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
  fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
  fields.push(DataTypes.createStructField("expense", DataTypes.IntegerType, true));

  var schema = DataTypes.createStructType(fields);

  // Convert records of the RDD (people) to Rows.
  var rowRDD = people.map(function(person, RowFactory) {
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

describe('DataFrameStatFunctions Test', function() {
  before(function(done) {
    this.timeout(100000);

    buildPeopleTable(fileName, function(df) {
      dataFrame = df;
      done();
    });
  });

  describe("DataFrameNaFunctions.cov()", function() {
    it("should generate -5 for the columns age,expense", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var stat = dataFrame.stat();
          stat.cov("age", "expense").then(callback).catch(error);
        }, function(result) {
          expect(result).equals(-5);
        },
        done
      );
    });
  });

  describe("DataFrameNaFunctions.corr()", function() {
    it("should generate -0 for the columns age,expense", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var stat = dataFrame.stat();
          stat.corr("age", "expense").then(callback).catch(error);
        }, function(result) {
          expect(result).equals(-0.8219949365267865);
        },
        done
      );
    });
  });

  describe("DataFrameStatFunctions.crosstab()", function() {
    it("should generate a dataFrame with count 3", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          var fields = [];
          fields.push(DataTypes.createStructField("key", DataTypes.IntegerType, true));
          fields.push(DataTypes.createStructField("value", DataTypes.IntegerType, true));
          var schema = DataTypes.createStructType(fields);
          var df = sqlContext.createDataFrame([[1,1], [1,2], [2,1], [2,1], [2,3], [3,2], [3,3]], schema);

          var ct = df.stat().crosstab("key", "value").count().then(callback).catch(error)
        }, function(result) {
          expect(result).equals(3);
        },
        done
      );
    });
  });

  describe("DataFrameStatFunctions.freqItems()", function() {
    it("should generate a dataFrame with value [name_freqItems: array<string>, age_freqItems: array<int>]", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          dataFrame.stat().freqItems(["name", "age"]).toString().then(callback).catch(error);
        }, function(result) {
          expect(result).equals("[name_freqItems: array<string>, age_freqItems: array<int>]");
        },
        done
      );
    });
  });

  describe("DataFrameStatFunctions.freqItems()", function() {
    it("should generate a dataFrame with value [name_freqItems: array<string>, age_freqItems: array<int>]", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          var fields = [];
          fields.push(DataTypes.createStructField("key", DataTypes.IntegerType, true));
          fields.push(DataTypes.createStructField("value", DataTypes.IntegerType, true));
          var schema = DataTypes.createStructType(fields);
          var df = sqlContext.createDataFrame([[1,1], [1,2], [2,1], [2,1], [2,3], [3,2], [3,3]], schema);

          var fractions = {"1": 1.0, "3": 0.5};
          df.stat().sampleBy("key", fractions, 36).collect().then(callback).catch(error)
        }, function(result) {
          expect(result.length).equals(3);
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

