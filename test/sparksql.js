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

var assert = require('assert');
var expect = require('chai').expect;

var eclairjs = require('./lib/spark.js');
var spark = new eclairjs();
var ctx = new spark.SparkContext("local[*]", "foo");

describe('SQL Test', function() {
  var sqlContext, rdd, fields, schema, people, rowRDD, peopleDataFrame, results, rdd2, rdd3;

  before(function() {
    var protocol = require('../lib/kernel.js');
    protocol.resetVariables();
  });

  var resolved = false;

  function executeTest(run, checks, done) {
    var k;
    function listener(msg) {
      k.removeExecuteListener();
      try {
        checks(msg);
      } catch(e) {
        done(e)
        return;
      }

      done();
    }

    ctx.kernelP.then(function(kernel) {
      k = kernel;
      kernel.addExecuteListener(listener);

      run();
    });
  }

  describe("sqlContext", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          sqlContext = new spark.sql.SQLContext(ctx);
        }, function(msg) {
          expect(msg.code).equals('var SQLContext = require(EclairJS_Globals.NAMESPACE + \'/sql/SQLContext\');\nvar sqlcontext1 = new SQLContext(jsc);');
        },
        done
      );
    });
  });

  describe("textFile", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd = ctx.textFile("examples/data/people.txt");
        }, function(msg) {
          expect(msg.code).equals('var rdd1 = jsc.textFile("examples/data/people.txt");');
        },
        done
      );
    });
  });

  describe("DataTypes.createStructField", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          //Generate the schema
          var DataTypes = spark.sql.types.DataTypes;

          fields = [];
          fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
        }, function(msg) {
          expect(msg.code).equals('var DataTypes = require(EclairJS_Globals.NAMESPACE + \'/sql/types/DataTypes\');\nvar structField1 = DataTypes.createStructField("name", DataTypes.StringType, true);');
        },
        done
      );
    });
  });

  describe("Second DataTypes.createStructField", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          //Generate the schema
          var DataTypes = spark.sql.types.DataTypes;

          fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
        }, function(msg) {
          expect(msg.code).equals('var structField2 = DataTypes.createStructField("age", DataTypes.IntegerType, true);');
        },
        done
      );
    });
  });

  describe("DataTypes.createStructType", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          var DataTypes = spark.sql.types.DataTypes;
          schema = DataTypes.createStructType(fields);
        }, function(msg) {
          expect(msg.code).equals('var structType1 = DataTypes.createStructType([structField1, structField2]);');
        },
        done
      );
    });
  });

  describe("rdd map", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          people = rdd.map(function(line) {
            var parts = line.split(",");
            return person = {
              name: parts[0],
              age: parseInt(parts[1].trim())
            };
          });
        }, function(msg) {
          expect(msg.code).equals('var rdd2 = rdd1.map(function (line) {\n            var parts = line.split(",");\n            return person = {\n              name: parts[0],\n              age: parseInt(parts[1].trim())\n            };\n          });');
        },
        done
      );
    });
  });

  describe("people map", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          // Convert records of the RDD (people) to Rows.
          rowRDD = people.map(function(person){
            return RowFactory.create([person.name, person.age]);
          });
        }, function(msg) {
          expect(msg.code).equals('var rdd3 = rdd2.map(function (person){\n            return RowFactory.create([person.name, person.age]);\n          });');
        },
        done
      );
    });
  });

  describe("createDataFrame", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          peopleDataFrame = sqlContext.createDataFrame(rowRDD, schema);
        }, function(msg) {
          expect(msg.code).equals('var dataFrame1 = sqlcontext1.createDataFrame(rdd3, structType1);');
        },
        done
      );
    });
  });

  describe("registerTempTable", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          peopleDataFrame.registerTempTable("people");
        }, function(msg) {
          expect(msg.code).equals('dataFrame1.registerTempTable("people");');
        },
        done
      );
    });
  });

  describe("sqlContext.sql", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          results = sqlContext.sql("SELECT name FROM people");
        }, function(msg) {
          expect(msg.code).equals('var dataFrame2 = sqlcontext1.sql("SELECT name FROM people");');
        },
        done
      );
    });
  });

  describe("DataFrame.toRDD", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd2 = results.toRDD();
        }, function(msg) {
          expect(msg.code).equals('var rdd4 = dataFrame2.toRDD();');
        },
        done
      );
    });
  });

  describe("rdd2.map", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd3 = rdd2.map(function(row) {
            return "Name: " + row.getString(0);
          });
        }, function(msg) {
          expect(msg.code).equals('var rdd5 = rdd4.map(function (row) {\n            return "Name: " + row.getString(0);\n          });');
        },
        done
      );
    });
  });
});
