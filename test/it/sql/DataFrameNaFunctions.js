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

  sc = new spark.SparkContext("local[*]", "sql.DataFrameNAFunctions Integration Tests");
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
      expense: parseInt(parts[2].trim()),
      hasJob: parts[3] == "true" ? true: false,
      isOld: parts[3] == "true" ? true: false
    };
  });

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

var fileName = path.resolve(__dirname+'/../../data/peopleNullValues.txt');

var dataFrame;

describe('sql.functions Test', function() {
  before(function(done) {
    this.timeout(100000);

    buildPeopleTable(fileName, function(df) {
      dataFrame = df;
      done();
    });
  });

  describe("DataFrameNaFunctions.drop()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var na = dataFrame.na();
          na.drop().count().then(callback);
        }, function(result) {
          expect(result).equals(2);
        },
        done
      );
    });
  });

  describe("DataFrameNaFunctions.drop(0)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var na = dataFrame.na();
          na.drop(0).count().then(callback).catch(error);
        }, function(result) {
          expect(result).equals(2);
        },
        done
      );
    });
  });

  describe("DataFrameNaFunctions.drop(0, [name,age])", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var na = dataFrame.na();
          na.drop(0, ["name", "age"]).count().then(callback).catch(error);
        }, function(result) {
          expect(result).equals(2);
        },
        done
      );
    });
  });

  describe("DataFrameNaFunctions.drop(1, [name,age])", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var na = dataFrame.na();
          na.drop(1, ["name", "age"]).count().then(callback).catch(error);
        }, function(result) {
          expect(result).equals(3);
        },
        done
      );
    });
  });

  describe("DataFrameNaFunctions.fill()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var na = dataFrame.na();
          na.fill(99).collect().then(function(rows) {
            callback(rows[0].getInt(1));
          }).catch(error);
        }, function(result) {
          expect(result).equals(99);
        },
        done
      );
    });
  });

  describe("DataFrameNaFunctions.fill(columns)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var na = dataFrame.na();
          na.fill(99, ["name", "age"]).collect().then(function(rows) {
            callback(rows[0].getInt(1));
          }).catch(error);
        }, function(result) {
          expect(result).equals(99);
        },
        done
      );
    });
  });

  describe("DataFrameNaFunctions.replace(hash)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var na = dataFrame.na();
          na.drop().na().replace(["name"], {"Andy": "Batman"}).take(10).then(function(rows) {
            callback(rows[0].getString(0));
          }).catch(error);
        }, function(result) {
          expect(result).equals("Batman");
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