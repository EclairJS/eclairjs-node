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

var df;
var rows;

describe('Local Rows Test', function() {
  describe("dataFrame.collect()", function() {
    it("should return 3 rows", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          var rdd = sc.textFile(__dirname+"/../../data/people2.txt");

          var people = rdd.map(function(line) {
            var parts = line.split(",");
            return person = {
              name: parts[0],
              age: parseInt(parts[1].trim()),
              expense: parseInt(parts[2].trim()),
              DOB: parts[3].trim(),
              income: parts[4].trim(),
              married: parts[5].trim(),
              networth: parts[6].trim()
            };
          });

          var fields = [];
          fields.push(spark.sql.types.DataTypes.createStructField("name", spark.sql.types.DataTypes.StringType, true));
          fields.push(spark.sql.types.DataTypes.createStructField("age", spark.sql.types.DataTypes.IntegerType, true));
          fields.push(spark.sql.types.DataTypes.createStructField("expense", spark.sql.types.DataTypes.IntegerType, true));
          fields.push(spark.sql.types.DataTypes.createStructField("DOB", spark.sql.types.DataTypes.DateType, true));
          fields.push(spark.sql.types.DataTypes.createStructField("income", spark.sql.types.DataTypes.DoubleType, true));
          fields.push(spark.sql.types.DataTypes.createStructField("married", spark.sql.types.DataTypes.BooleanType, true));
          fields.push(spark.sql.types.DataTypes.createStructField("networth", spark.sql.types.DataTypes.DoubleType, true));

          var schema = spark.sql.types.DataTypes.createStructType(fields);

          // Convert records of the RDD (people) to Rows.
          var rowRDD = people.map(function(person, RowFactory, SqlDate){
            return RowFactory.create([(person.name ? person.name : null), person.age, person.expense, new SqlDate(person.DOB), parseFloat(person.income), person.married == "true" ? true : false, parseFloat(person.networth)]);
          }, [spark.sql.RowFactory, spark.sql.SqlDate]);

          // Apply the schema to the RDD.
          df = sqlContext.createDataFrame(rowRDD, schema);
          df.collect().then(callback).catch(error);
        }, function(result) {
          rows = result;

          expect(result.length).equals(3);
        },
        done
      );
    });
  });

  describe("Row.anyNull()", function() {
    it("should return true for row 3", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[2].anyNull().then(callback).catch(error);
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
    it("should return Michael", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].apply(0).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('Michael');
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

  describe("Row.fieldIndex()", function() {
    it("should return 5 for value isMarried", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].fieldIndex('married').then(callback).catch(error);
        }, function(result) {
          expect(result).equals(5);
        },
        done
      );
    });
  });

  describe("Row.fieldIndex()", function() {
    it("should return an exception for an non-existent field", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          try {
            rows[0].fieldIndex('notreal').then(callback).catch(error);
          } catch(e) {
            callback(e);
          }
        }, function(result) {
          expect(result instanceof Error).equals(true);
          expect(result.message).equals('field "notreal" does not exist');
        },
        done
      );
    });
  });

  describe("Row.get()", function() {
    it("should return an exception for an out of bounds index", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          try {
            rows[0].get(10).then(callback).catch(error);
          } catch(e) {
            callback(e);
          }
        }, function(result) {
          expect(result instanceof Error).equals(true);
          expect(result.message).equals('index is out of bounds');
        },
        done
      );
    });
  });

  describe("Row.get()", function() {
    it("should return Andy for row 2 index 2", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[1].get(0).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('Andy');
        },
        done
      );
    });
  });

  describe("Row.getBoolean()", function() {
    it("should return false for row 1 index 5", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[1].getBoolean(5).then(callback).catch(error);
        }, function(result) {
          expect(result).equals(false);
        },
        done
      );
    });
  });

  describe("Row.getBoolean()", function() {
    it("should throw an exception when called on a field that is not a boolean", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          try {
            rows[0].getBoolean(0).then(callback).catch(error);
          } catch(e) {
            callback(e);
          }
        }, function(result) {
          expect(result instanceof Error).equals(true);
          expect(result.message).equals('the type for index 0 is not a Boolean');
        },
        done
      );
    });
  });

  describe("Row.getDate()", function() {
    it("should throw an exception when called on a field that is not a date", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          try {
            rows[0].getDate(1).toString().then(callback).catch(error);
          } catch(e) {
            callback(e);
          }
        }, function(result) {
          expect(result instanceof Error).equals(true);
          expect(result.message).equals('the type for index 1 is not a Date');
        },
        done
      );
    });
  });

  describe("Row.getDate()", function() {
    it("should return 1996-03-06", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].getDate(3).toString().then(callback).catch(error);
        }, function(result) {
          expect(result).equals('1996-03-06');
        },
        done
      );
    });
  });

  describe("Row.getDouble()", function() {
    it("should return 1200.4", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].getDouble(4).then(callback).catch(error);
        }, function(result) {
          expect(result).equals(1200.4);
        },
        done
      );
    });
  });

  describe("Row.getInt()", function() {
    it("should return 29", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].getInt(1).then(callback).catch(error);
        }, function(result) {
          expect(result).equals(29);
        },
        done
      );
    });
  });

  describe("Row.getString()", function() {
    it("should return Michael", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          rows[0].getString(0).then(callback).catch(error);
        }, function(result) {
          expect(result).equals("Michael");
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
