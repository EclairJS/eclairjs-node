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

  sc = new spark.SparkContext("local[*]", "sql.Row Integration Tests");
}

var sqlContext = new spark.sql.SQLContext(sc);

function buildRockstarsTable(file, callback) {
  var rdd = sc.textFile(file);

  var rockers = rdd.map(function(line) {
    var parts = line.split(",");
    return rocker = {
      surname: parts[0],
      forename: parts[1],
      age: parts[2] ? parseInt(parts[2]) : null,
      birthday: parts[3] ? parts[3] : null,
      numkids: parts[4] ? parseInt(parts[4]) : null,
      married: parts[5] ? JSON.parse(parts[5]) : null,
      networth: parts[6] ? parseFloat(parts[6]) : null,
      weight: parts[7] ? parseFloat(parts[7]) : null,
      percent: parts[8] ? parseFloat(parts[8]) : null
    };
  });

  var DataTypes = spark.sql.types.DataTypes;

  var fields = [];
  fields.push(DataTypes.createStructField("surname", DataTypes.StringType, true));
  fields.push(DataTypes.createStructField("forename", DataTypes.StringType, true));
  fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
  fields.push(DataTypes.createStructField("birthday", DataTypes.DateType, true));
  fields.push(DataTypes.createStructField("numkids", DataTypes.IntegerType, true));
  fields.push(DataTypes.createStructField("married", DataTypes.BooleanType, true));
  fields.push(DataTypes.createStructField("networth", DataTypes.DoubleType, true));
  fields.push(DataTypes.createStructField("weight", DataTypes.FloatType, true));
  fields.push(DataTypes.createStructField("percent", DataTypes.DoubleType, true));
  fields.push(DataTypes.createStructField("birthdaytime", DataTypes.TimestampType, true));
  var schema = DataTypes.createStructType(fields);

  // Convert records of the RDD (rocker) to Rows.
  var rowRDD = rockers.map(function(rocker, RowFactory, SqlDate, SqlTimestamp){
    //print('create rocker: ',JSON.stringify(rocker));
    // Have to convert the Date and Timestamp fields
    var bday = new SqlDate(rocker.birthday);
    var bdaytime = new SqlTimestamp(rocker.birthday);
    return RowFactory.create([rocker.surname, rocker.forename, rocker.age, bday, rocker.numkids, rocker.married, rocker.networth, rocker.weight, rocker.percent, bdaytime]);
  }, [spark.sql.RowFactory, spark.sql.SqlDate, spark.sql.SqlTimestamp]);

  //Apply the schema to the RDD.
  var rockstarsDataFrame = sqlContext.createDataFrame(rowRDD, schema);

  // Register the DataFrame as a table.
  rockstarsDataFrame.registerTempTable("rockstars").then(function() {
    callback(rockstarsDataFrame);
  }).catch(function(e) {
    console.log("Error", e);
  });
}

var fileName = path.resolve(__dirname+'/../../../examples/rockers.txt');

var dataFrame, firstrow;

describe('Row Test', function() {
  describe("programmaticallySpecifyingSchema", function() {
    it("should generate the correct output", function(done) {
      // Starting the kernel is slow
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback) {
          buildRockstarsTable(fileName, function(df) {
            dataFrame = df;

            var results = sqlContext.sql("SELECT * FROM rockstars");
            var names = results.toRDD().map(function(row) {
              //print('toRDD.map row: ',row);
              // surname is at index=0
              return "Surname: " + row.getString(0);
            });

            names.take(10).then(callback);
          });

        }, function(result) {
          expect(result.toString()).equals("Surname: Jovi,Surname: Tyler,Surname: Jagger,Surname: Springsteen");
        },
        done
      );
    });
  });

  describe("row.anyNull()", function() {
    it("should generate the correct output e.g. no nulls in header row", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Get the first row of the table.
          dataFrame.head().then(function(row) {
            firstrow = row;
            callback(row.anyNull());
          });
        }, function(result) {
          expect(result).equals(false);
        },
        done
      );
    });
  });

  describe("row.anyNull()", function() {
    it("should generate the correct output e.g. null found in Jagger row", function(done) {
      TestUtils.executeTest(
        function(callback) {
            var results = sqlContext.sql("SELECT * FROM rockstars WHERE surname = 'Jagger'");
            var mick = results.toRDD().map(function(row) {
              return row.anyNull();
            });
            mick.take(1).then(callback);
        }, function(result) {
          expect(result[0]).equals(true);
        },
        done
      );
    });
  });

  describe("row.copy()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.copy().mkString());
        }, function(result) {
          expect(result).equals('JoviBon531962-03-024true300000000.11161.60.451962-03-02 00:00:00.0');
        },
        done
      );
    });
  });

  describe("row.equals()", function() {
    it("should generate the correct output e.g. firstrow should equal itself", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.equals(firstrow));
        }, function(result) {
          expect(result).equals(true);
        },
        done
      );
    });
  });

  describe("row.fieldIndex()", function() {
    it("should generate the correct output e.g. should be index 1 for forename", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.fieldIndex('forename'));
        }, function(result) {
          expect(result).equals(1);
        },
        done
      );
    });
  });

  describe("row.get()", function() {
    it("should generate the correct output e.g. should be Bon Jovi's forename", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.get(1));
        }, function(result) {
          expect(result).equals('Bon');
        },
        done
      );
    });
  });

  describe("row.get()", function() {
    it("should generate the correct output e.g. should be Bon Jovi's weight", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.get(7));
        }, function(result) {
          expect(result).equals(161.6);
        },
        done
      );
    });
  });

  describe("row.getBoolean()", function() {
    it("should generate the correct output e.g. should be Bon Jovi is married", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.getBoolean(5));
        }, function(result) {
          expect(result).equals(true);
        },
        done
      );
    });
  });

  describe("row.getDate()", function() {
    it("should generate the correct output e.g. should be Bon Jovi's birthday as date", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.getDate(3));
        }, function(result) {
          expect(result.getFullYear()).equals(1962);
          expect(result.getMonth()).equals(2);
          expect(result.getUTCDate()).equals(2);
        },
        done
      );
    });
  });

  describe("row.getTimestamp()", function() {
    it("should generate the correct output e.g. should be Bon Jovi's birthday as timestamp", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.getTimestamp(9));
        }, function(result) {
          expect(result.getFullYear()).equals(1962);
          expect(result.getMonth()).equals(2);
          expect(result.getUTCDate()).equals(2);
        },
        done
      );
    });
  });

  describe("row.getDouble()", function() {
    it("should generate the correct output e.g. should be Bon Jovi's networth", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.getDouble(6));
        }, function(result) {
          expect(result).equals(300000000.11);
        },
        done
      );
    });
  });

  describe("row.getFloat()", function() {
    it("should generate the correct output e.g. should be Bon Jovi's weight", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.getFloat(7));
        }, function(result) {
          expect(result).equals(161.6);
        },
        done
      );
    });
  });

  describe("row.getInt()", function() {
    it("should generate the correct output e.g. should be Bon Jovi's age", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.getInt(2));
        }, function(result) {
          expect(result).equals(53);
        },
        done
      );
    });
  });

  describe("row.isNullAt()", function() {
    it("should generate the correct output e.g. null found in Jagger row for networth", function(done) {
      TestUtils.executeTest(
        function(callback) {
            var results = sqlContext.sql("SELECT * FROM rockstars WHERE surname = 'Jagger'");
            var mick = results.toRDD().map(function(row) {
              return row.isNullAt(6);
            });
            mick.take(1).then(callback);
        }, function(result) {
          expect(result[0]).equals(true);
        },
        done
      );
    });
  });

  describe("row.length()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.length());
        }, function(result) {
          expect(result).equals(10);
        },
        done
      );
    });
  });

  describe("row.mkString()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.mkString(','));
        }, function(result) {
          expect(result).equals('Jovi,Bon,53,1962-03-02,4,true,300000000.11,161.6,0.45,1962-03-02 00:00:00.0');
        },
        done
      );
    });
  });

  describe("row.schema()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          firstrow.schema().simpleString().then(callback);
        }, function(result) {
          expect(result).equals('struct<surname:string,forename:string,age:int,birthday:date,numkids:int,married:boolean,networth:double,weight:double,percent:double,birthdaytime:timestamp>');
        },
        done
      );
    });
  });

  describe("row.size()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          // Use firstrow of table
          callback(firstrow.size());
        }, function(result) {
          expect(result).equals(10);
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