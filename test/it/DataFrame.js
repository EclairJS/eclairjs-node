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

var spark = require('../../spark.js');

var sc = new spark.SparkContext("local[*]", "foo");
var sqlContext = new spark.SQLContext(sc);

function buildPeopleTable(file, callback) {
  var rdd = sc.textFile(file);

  var people = rdd.map(function(line) {
    var parts = line.split(",");
    return person = {
      name: parts[0],
      age: parseInt(parts[1].trim())
    };
  });

  var DataTypes = sqlContext.types.DataTypes;

  var fields = [];
  fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
  fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
  var schema = DataTypes.createStructType(fields);

  // Convert records of the RDD (people) to Rows.
  var rowRDD = people.map(function(person){
    return RowFactory.create([person.name, person.age]);
  });

  //Apply the schema to the RDD.
  var peopleDataFrame = sqlContext.createDataFrame(rowRDD, schema);

  // Register the DataFrame as a table.
  peopleDataFrame.registerTempTable("people").then(function() {
    callback(peopleDataFrame);
  }).catch(function(e) {
    console.log("Error", e);
  });
}

function executeTest(run, checks, done) {
  run(function(result) {
    try {
      checks(result);
    } catch(e) {
      done(e)
      return;
    }

    done();
  });
}

var fileName = path.resolve(__dirname+'/../../examples/people.txt');

var dataFrame;

describe('DataFrame Test', function() {
  describe("programmaticallySpecifyingSchema", function() {
    it("should generate the correct output", function(done) {
      // Starting the kernel is slow
      this.timeout(100000);

      executeTest(
        function(callback) {
          buildPeopleTable(fileName, function(df) {
            dataFrame = df;

            var results = sqlContext.sql("SELECT name FROM people");

            var names = results.toRDD().map(function(row) {
              return "Name: " + row.getString(0);
            });

            names.take(10).then(callback);
          });

        }, function(result) {
          expect(result.toString()).equals("Name: Michael,Name: Andy,Name: Justin");
        },
        done
      );
    });
  });

  describe("dataFrame.col()", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          var col = dataFrame.col("age");
          col.toString().then(callback);
        }, function(result) {
          expect(result).equals("age");
        },
        done
      );
    });
  });

  describe("dataFrame.filter()", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          var result = dataFrame.filter("age > 20");

          var names = result.toRDD().map(function(row) {
            return "Name: " + row.getString(0);
          });

          names.take(10).then(callback);
        }, function(result) {
          expect(result).deep.equals(["Name: Michael","Name: Andy"]);
        },
        done
      );
    });
  });

  describe("dataFrame.filterWithColumn()", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          var col = dataFrame.col("age");
          var testCol = col.gt("20");
          var result = dataFrame.filterWithColumn(testCol);

          var names = result.toRDD().map(function(row) {
            return "Name: " + row.getString(0);
          });

          names.take(10).then(callback);
        }, function(result) {
          expect(result).deep.equals(["Name: Michael","Name: Andy"]);
        },
        done
      );
    });
  });

  describe("dataFrame.flatMap()", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          var result = dataFrame.flatMap(function(row) {
            var r = [];
            r.push(row.getString(0));
            return r
          });

          result.take(10).then(callback);
        }, function(result) {
          expect(result).deep.equals(["Michael", "Andy", "Justin"]);
        },
        done
      );
    });
  });

  describe("dataFrame.groupBy(column)", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          var gd = dataFrame.groupBy(dataFrame.col("name"));
          var df2 = gd.count();

          df2.count().then(callback);
        }, function(result) {
          expect(result).equals(3);
        },
        done
      );
    });
  });

  describe("dataFrame.groupBy(columnName)", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          var gd = dataFrame.groupBy("name");
          var df2 = gd.count();

          df2.count().then(callback);
        }, function(result) {
          expect(result).equals(3);
        },
        done
      );
    });
  });
});
