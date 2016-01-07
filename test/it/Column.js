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

var DataTypes = sqlContext.types.DataTypes;

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
  fields.push(DataTypes.createStructField("hasJob", DataTypes.BooleanType, true));
  fields.push(DataTypes.createStructField("isOld", DataTypes.BooleanType, true));

  var schema = DataTypes.createStructType(fields);

  // Convert records of the RDD (people) to Rows.
  var rowRDD = people.map(function(person){
    return RowFactory.create([person.name, person.age, person.expense, person.hasJob, person.isOld]);
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
      done(e);
      return;
    }

    done();
  });
}

var fileName = path.resolve(__dirname+'/../data/people.txt');

var dataFrame;

describe('Column Test', function() {
  before(function(done) {
    this.timeout(100000);

    buildPeopleTable(fileName, function(df) {
      dataFrame = df;
      done();
    });
  });

  describe("Column.alias()", function() {
    it("should create an alias of age called newAge", function(done) {
      executeTest(
        function(callback) {
          var col = dataFrame.col("age");
          col.alias("newAge").toString().then(callback);
        }, function(result) {
          expect(result).contains("age AS newAge");
        },
        done
      );
    });
  });


  describe("Column.and()", function() {
    it("should work in a select()", function(done) {
      executeTest(
        function(callback) {
          dataFrame.select(dataFrame.col("isOld").and(dataFrame.col("hasJob"))).toString().then(callback);
        }, function(result) {
          expect(result).equals("[(isOld && hasJob): boolean]");
        },
        done
      );
    });
  });

  describe("Column.as()", function() {
    it("should create an ArrayBuffer alias", function(done) {
      executeTest(
        function(callback) {
          var col = dataFrame.col("age");
          col.as(["newAge", "ventage"]).toString().then(callback);
        }, function(result) {
          expect(result).equals('age AS ArrayBuffer(newAge, ventage)');
        },
        done
      );
    });
  });

  describe("Column.asc()", function() {
    it("should sort ascending", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("age").asc().toString().then(callback);

          //dataFrame.sort(dataFrame.col("age").asc()).take(10).then(callback);
        }, function(result) {
          expect(result).equals('age ASC');
        },
        done
      );
    });
  });

  describe("Column.between()", function() {
    it("should remove any datasets outside the range", function(done) {
      executeTest(
        function(callback) {
          dataFrame.select(dataFrame.col("age").between(10, 29)).take(10).then(callback);
        }, function(result) {
          expect(result[0].values[0]).equals(true);
          expect(result[1].values[0]).equals(false);
          expect(result[2].values[0]).equals(true);
        },
        done
      );
    });
  });

  describe("Column.bitwiseAnd()", function() {
    it("should create a Column of (age & expense)", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("age").bitwiseAND(dataFrame.col("expense")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(age & expense)');
        },
        done
      );
    });
  });

  describe("Column.bitwiseOR()", function() {
    it("should create a Column of (age | expense)", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("age").bitwiseOR(dataFrame.col("expense")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(age | expense)');
        },
        done
      );
    });
  });

  describe("Column.bitwiseXOR()", function() {
    it("should create a Column of (age ^ expense)", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("age").bitwiseXOR(dataFrame.col("expense")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(age ^ expense)');
        },
        done
      );
    });
  });


  describe("Column.cast(DataType.StringType)", function() {
    it("should cast to string", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("age").cast(DataTypes.StringType).toString().then(callback);
        }, function(result) {
          expect(result).equals('cast(age as string)');
        },
        done
      );
    });
  });

  describe("Column.cast(string)", function() {
    it("should cast to string", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("age").cast('string').toString().then(callback);
        }, function(result) {
          expect(result).equals('cast(age as string)');
        },
        done
      );
    });
  });


  describe("Column.contains(dog)", function() {
    it("should return a column of Contains(name, dog)", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("name").contains("dog").toString().then(callback);
        }, function(result) {
          expect(result).equals('Contains(name, dog)');
        },
        done
      );
    });
  });

  describe("Column.desc()", function() {
    it("should sort descending", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("age").desc().toString().then(callback);
        }, function(result) {
          expect(result).equals('age DESC');
        },
        done
      );
    });
  });

  describe("Column.divide()", function() {
    it("should divide", function(done) {
      executeTest(
        function(callback) {
          dataFrame.select(dataFrame.col("expense").divide(dataFrame.col("age"))).take(10).then(callback);
        }, function(result) {
          expect(result[0].values[0]).equals(0.034482758620689655);
        },
        done
      );
    });
  });


  describe("Column.endsWith('n')", function() {
    it("should return false,false,true", function(done) {
      executeTest(
        function(callback) {
          dataFrame.select(dataFrame.col('name').endsWith('n')).take(10).then(callback);
        }, function(result) {
          expect(result[0].values[0]).equals(false);
          expect(result[1].values[0]).equals(false);
          expect(result[2].values[0]).equals(true);
        },
        done
      );
    });
  });

  describe("Column.eqNullSafe()", function() {
    it("should generate (name <=> Andy)t", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("name").eqNullSafe("Andy").toString().then(callback);
        }, function(result) {
          expect(result).equals('(name <=> Andy)');
        },
        done
      );
    });
  })

  describe("Column.equals()", function() {
    it("should return true for any 2 columns", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("name").equals(dataFrame.col("age")).then(callback);
        }, function(result) {
          expect(result).equals(true);
        },
        done
      );
    });
  })

  describe("Column.equalTo()", function() {
    it("should generate a Column of value (name = age)", function(done) {
      executeTest(
        function(callback) {
          dataFrame.col("name").equalTo(dataFrame.col("age")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(name = age)');
        },
        done
      );
    });
  })
});

