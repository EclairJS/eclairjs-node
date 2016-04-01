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

var spark = require('../../../lib/index.js');

var sc;

if (global.SC) {
  sc = global.SC;
} else {
  sc = new spark.SparkContext("local[*]", "sql.DataFrame Integration Tests");
}

var sqlContext = new spark.SQLContext(sc);

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

  var DataTypes = sqlContext.types.DataTypes;

  var fields = [];
  fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
  fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
  fields.push(DataTypes.createStructField("expense", DataTypes.IntegerType, true));

  var schema = DataTypes.createStructType(fields);

  // Convert records of the RDD (people) to Rows.
  var rowRDD = people.map(function(person){
    return RowFactory.create([person.name, person.age, person.expense]);
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

var fileName = path.resolve(__dirname+'/../../data/people.txt');

var dataFrame, duplicateDataFrame;

describe('DataFrame Test', function() {
  describe("programmaticallySpecifyingSchema", function() {
    it("should generate the correct output", function(done) {
      // Starting the kernel is slow
      this.timeout(100000);

      TestUtils.executeTest(
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

  describe("dataFrame.columns()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          dataFrame.columns().then(callback).catch(error);
        }, function(result) {
          expect(result).deep.equals(["name", "age", "expense"]);
        },
        done
      );
    });
  });

  describe("dataFrame.col()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
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
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.filter("age > 20");

          var names = result.toRDD().map(function(row) {
            return "Name: " + row.getString(0);
          });

          names.take(10).then(callback);
        }, function(result) {
          expect(result).deep.equals(["Name: Michael", "Name: Andy"]);
        },
        done
      );
    });
  });

  describe("dataFrame.filter(column)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var col = dataFrame.col("age");
          var testCol = col.gt("20");
          var result = dataFrame.filter(testCol);

          var names = result.toRDD().map(function(row) {
            return "Name: " + row.getString(0);
          });

          names.take(10).then(callback);
        }, function(result) {
          expect(result).deep.equals(["Name: Michael", "Name: Andy"]);
        },
        done
      );
    });
  });

  describe("dataFrame.flatMap()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
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
      TestUtils.executeTest(
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
      TestUtils.executeTest(
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

  describe("dataFrame.head()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var row = dataFrame.head();
          row.mkString().then(callback);
        }, function(result) {
          expect(result).equals("Michael291");
        },
        done
      );
    });
  });

  describe("dataFrame.head(separator)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var row = dataFrame.head();
          row.mkString(" - ").then(callback);
        }, function(result) {
          expect(result).equals("Michael - 29 - 1");
        },
        done
      );
    });
  });

  describe("dataFrame.head(separator, start, end)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var row = dataFrame.head();
          row.mkString(" - ", "(", ")").then(callback);
        }, function(result) {
          expect(result).equals("(Michael - 29 - 1)");
        },
        done
      );
    });
  });

  describe("dataFrame.map", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var names = dataFrame.map(function(row) {
            return "Name: " + row.getString(0);
          });

          names.take(10).then(callback);
        }, function(result) {
          expect(result).deep.equals(["Name: Michael", "Name: Andy", "Name: Justin"]);
        },
        done
      );
    });
  });

  describe("dataFrame.map", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var names = dataFrame.map(function(row, prefix) {
            return prefix + row.getString(0);
          }, ["Name: "]);

          names.take(10).then(callback);
        }, function(result) {
          expect(result).deep.equals(["Name: Michael", "Name: Andy", "Name: Justin"]);
        },
        done
      );
    });
  });

  describe("dataFrame.select(columnName)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.select("name", "age");
          result.toString().then(callback);
        }, function(result) {
          expect(result).equals("[name: string, age: int]");
        },
        done
      );
    });
  });

  describe("dataFrame.select(column)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.select(dataFrame.col("name"), dataFrame.col("age"));
          result.toString().then(callback);
        }, function(result) {
          expect(result).equals("[name: string, age: int]");
        },
        done
      );
    });
  });

  describe("dataFrame.take()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.take(2).then(callback);
        }, function(result) {
          expect(result.length).equals(2);
        },
        done
      );
    });
  });

  describe("dataFrame.where(sql)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.where("age > 20");
          result.count().then(callback);
        }, function(result) {
          expect(result).equals(2);
        },
        done
      );
    });
  });

  describe("dataFrame.where(column)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.where(dataFrame.col("age").gt("20"));
          result.count().then(callback);
        }, function(result) {
          expect(result).equals(2);
        },
        done
      );
    });
  });

  describe("dataFrame.agg()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var results = sqlContext.sql("SELECT name, age, expense FROM people");

          var m = {};
          m["age"] = "max";
          m["expense"] = "sum";

          results.agg(m).take(10).then(callback);
        }, function(result) {
          expect(result[0].values).deep.equals([30, 6]);
        },
        done
      );
    });
  });

  describe("dataFrame.as()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.as("myAlias");
          result.toString().then(callback);
        }, function(result) {
          expect(result).equals("[name: string, age: int, expense: int]");
        },
        done
      );
    });
  });

  describe("dataFrame.apply()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.apply("name");
          result.toString().then(callback);
        }, function(result) {
          expect(result).equals("name");
        },
        done
      );
    });
  });

  describe("dataFrame.collect()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.filter('age > 20');
          result.collect().then(function(rows) {
            rows[0].mkString(" - ", "(", ")").then(callback);
          });
        }, function(result) {
          expect(result).equals('(Michael - 29 - 1)');
        },
        done
      );
    });
  });

  describe("dataFrame.cube(columnName)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var cube = dataFrame.cube("name", "expense");
          cube.avg("age").toString().then(callback);
        }, function(result) {
          expect(result).equals('[name: string, expense: int, avg(age): double]');
        },
        done
      );
    });
  });

  describe("dataFrame.cube(column)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var cube = dataFrame.cube(dataFrame.col("name"), dataFrame.col("expense"));
          cube.avg("age").toString().then(callback);
        }, function(result) {
          expect(result).equals('[name: string, expense: int, avg(age): double]');
        },
        done
      );
    });
  });

  describe("dataFrame.describe(columnName)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          dataFrame.describe("age", "expense").toJSON().toArray().then(callback).catch(error);
        }, function(result) {
          expect(result).deep.equals([
            {
              "age": "3",
              "expense": "3",
              "summary": "count"
            },
            {
              "age": "26.0",
              "expense": "2.0",
              "summary": "mean"
            },
            {
              "age": "6.082762530298219",
              "expense": "1.0",
              "summary": "stddev"
            },
            {
              "age": "19",
              "expense": "1",
              "summary": "min"
            },
            {
              "age": "30",
              "expense": "3",
              "summary": "max"
            }
          ]);
        },
        done
      );
    });
  });

  describe("dataFrame.drop(columnName)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.drop("age").toJSON().toArray().then(callback);
        }, function(result) {
          expect(result[0]).deep.equals({expense: 1, name: "Michael"});
        },
        done
      );
    });
  });

  describe("dataFrame.drop(column)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.drop(dataFrame.col("age")).toJSON().toArray().then(callback);
        }, function(result) {
          expect(result[0]).deep.equals({expense: 1, name: "Michael"});
        },
        done
      );
    });
  });

  describe("dataFrame.distinct()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var fileName = path.resolve(__dirname+'/../../data/duplicatePeople.txt');

          buildPeopleTable(fileName, function(df) {
            duplicateDataFrame = df;

            df.distinct().count().then(callback);
          });
        }, function(result) {
          expect(result).equals(3);
        },
        done
      );
    });
  });


  describe("dataFrame.dropDuplicates()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          duplicateDataFrame.dropDuplicates(["expense"]).count().then(callback);
        }, function(result) {
          expect(result).equals(2);
        },
        done
      );
    });
  });

  describe("dataFrame.dtypes()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.dtypes().then(callback);
        }, function(result) {
          expect(result).deep.equals([
            {
              "0": "name",
              "1": "StringType",
              "length": 2
            },
            {
              "0": "age",
              "1": "IntegerType",
              "length": 2
            },
            {
              "0": "expense",
              "1": "IntegerType",
              "length": 2
            }
          ]);
        },
        done
      );
    });
  });

  describe("dataFrame.except()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var df2 = dataFrame.filter("age > 20");

          dataFrame.except(df2).toJSON().toArray().then(callback);
        }, function(result) {
          expect(result).deep.equals([
            {
              "age": 19,
              "expense": 3,
              "name": "Justin"
            }
          ]);
        },
        done
      );
    });
  });

  describe("dataFrame.explain()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.explain().then(callback);
        }, function(result) {
          expect(result).equals(undefined);
        },
        done
      );
    });
  });

  describe("dataFrame.first()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var row = dataFrame.first();
          row.mkString().then(callback);
        }, function(result) {
          expect(result).equals("Michael291");
        },
        done
      );
    });
  });

  describe("dataFrame.foreach()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.foreach(function(row){}).then(callback);
        }, function(result) {
          expect(result).equals(undefined);
        },
        done
      );
    });
  });

  describe("dataFrame.foreachPartition()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.foreachPartition(function(partition){}).then(callback);
        }, function(result) {
          expect(result).equals(undefined);
        },
        done
      );
    });
  });

  describe("dataFrame.show()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.show().then(callback);
        }, function(result) {
          expect(result).equals(undefined);
        },
        done
      );
    });
  });

  describe("dataFrame.inputFiles()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var fileName = path.resolve(__dirname+'/../../data/test.json');

          sqlContext.read().json(fileName).inputFiles().then(callback);
        }, function(result) {
          expect(result).deep.equals(["file:"+path.resolve(__dirname+'/../../data/test.json')]);
        },
        done
      );
    });
  });


  describe("dataFrame.inputFiles()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var plus20s = dataFrame.filter("age > 20");

          dataFrame.intersect(plus20s).take(10).then(callback);
        }, function(result) {
          expect(result[0].values).deep.equals(["Andy", 30, 2]);
          expect(result[1].values).deep.equals(["Michael",29, 1]);
        },
        done
      );
    });
  });

  describe("dataFrame.isLocal()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.isLocal().then(callback);
        }, function(result) {
          expect(result).equals(false);
        },
        done
      );
    });
  });

  describe("dataFrame.join(df)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.join(dataFrame).take(1).then(callback);
        }, function(result) {
          expect(result[0].values).deep.equals(["Michael", 29,1,"Michael",29,1]);
        },
        done
      );
    });
  });

  describe("dataFrame.join(df, col)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.join(dataFrame, "name").take(1).then(callback);
        }, function(result) {
          expect(result[0].values).deep.equals([ 'Andy', 30, 2, 30, 2 ]);
        },
        done
      );
    });
  });

  describe("dataFrame.join(df, [col,col])", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var result = dataFrame.join(dataFrame, ["age", "expense"]).take(1).then(callback);
        }, function(result) {
          expect(result[0].values.length).equals(4);
        },
        done
      );
    });
  });

  describe("dataFrame.join(df, colExp)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var df1 = sqlContext.sql("SELECT name, age FROM people");
          var df2 = sqlContext.sql("SELECT name, expense FROM people");

          var colExpr = df1.col("name").equalTo(df2.col("name"));

          var joinedDF = df1.join(df2, colExpr);

          joinedDF.take(1).then(callback);
        }, function(result) {
          expect(result[0].values).deep.equals([ 'Andy', 30, 'Andy', 2 ]);
        },
        done
      );
    });
  });

  describe("dataFrame.limit()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.limit(1).count().then(callback)
        }, function(result) {
          expect(result).equals(1);
        },
        done
      );
    });
  });


  describe("dataFrame.mapPartitions()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.mapPartitions(function(rows) {
            return [rows.length];
          }).take(10).then(callback)
        }, function(result) {
          expect(result).deep.equals([2,1]);
        },
        done
      );
    });
  });

  describe("dataFrame.na()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var fileName = path.resolve(__dirname+'/../../data/peopleNullValues.txt');

          buildPeopleTable(fileName, function(df) {
            df.na().drop().take(10).then(callback)
          });

        }, function(result) {
          expect(result.length).equals(2);
        },
        done
      );
    });
  });

  describe("dataFrame.orderBy()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.orderBy("age", "name").take(10).then(callback);
        }, function(result) {
          expect(result[0].values[0]).equals("Justin");
        },
        done
      );
    });
  });

  describe("dataFrame.persist()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.persist(spark.storage.StorageLevel.MEMORY_ONLY()).head().mkString().then(callback);
        }, function(result) {
          expect(result).equals("Michael291");
        },
        done
      );
    });
  });


  describe("dataFrame.queryExecution()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.queryExecution().simpleString().then(callback);
        }, function(result) {
          expect(result).to.contain('== Physical Plan ==');
        },
        done
      );
    });
  });

  describe("dataFrame.rdd()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.rdd().count().then(callback);
        }, function(result) {
          expect(result).equals(3);
        },
        done
      );
    });
  });


  describe("dataFrame.rollup()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var df = dataFrame.repartition(1);
          df.rollup("age", "expense").count().count().then(callback);
        }, function(result) {
          expect(result).equals(7);
        },
        done
      );
    });
  });

  describe("dataFrame.rollup(col)", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var df = dataFrame.repartition(1);
          df.rollup(df.col("age"), df.col("expense")).count().count().then(callback);
        }, function(result) {
          expect(result).equals(7);
        },
        done
      );
    });
  });


  describe("dataFrame.sample()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var df = dataFrame.sample(true, 0.5).take(10).then(callback);
        }, function(result) {
          expect(result[0].values[0]).equals("Andy");
        },
        done
      );
    });
  });

  describe("dataFrame.schema()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var df = dataFrame.schema().simpleString().then(callback);
        }, function(result) {
          expect(result).equals("struct<name:string,age:int,expense:int>");
        },
        done
      );
    });
  });

  describe("dataFrame.sort()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.sort("age", "name").take(10).then(callback);
        }, function(result) {
          expect(result[0].values[0]).equals("Justin");
        },
        done
      );
    });
  });

  describe("dataFrame.toDF()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var nameAgeDF = dataFrame.select("name", "age");
          nameAgeDF.toDF("newName", "newAge").toString().then(callback);
        }, function(result) {
          expect(result).equals("[newName: string, newAge: int]");
        },
        done
      );
    });
  });

  describe("dataFrame.selectExpr()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.selectExpr("name", "age > 19").take(10).then(callback);
        }, function(result) {
          expect(result[0].values[1]).equals(true);
          expect(result[1].values[1]).equals(true);
          expect(result[2].values[1]).equals(false);
        },
        done
      );
    });
  });

  describe("dataFrame.unionAll()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var df1 = dataFrame.selectExpr("name", "age < 30");
          var df2 = dataFrame.selectExpr("name", "age > 20");
          var result = df1.unionAll(df2);

          result.take(10).then(callback);
        }, function(result) {
          expect(result.length).equals(6);
        },
        done
      );
    });
  });

  describe("dataFrame.randomSplit()", function() {
    it("should generate the correct output", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var df1 = dataFrame.randomSplit([0.6,0.4]).then(callback).catch(error);
        }, function(result) {
          expect(result.length).equals(2);
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
