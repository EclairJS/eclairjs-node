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
 This test requires a local mysql

 To get the mysql jdbc drivers to load, edit Kernel.json's env section and add:
 "SPARK_CLASSPATH": "/path/to/mysql-connector-java-5.1.36-bin.jar"
 */

var assert = require('assert');
var expect = require('chai').expect;
var path = require('path');
var TestUtils = require('../../lib/utils.js');

var eclairjs = require('../../../lib/index.js');
var spark = new eclairjs();

var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "sql.DataFrameWriter Integration Tests");
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

var dataFrame;

describe('sql.functions Test', function() {
  before(function(done) {
    this.timeout(100000);

    var fileName = path.resolve(__dirname+'/../../data/people.txt');

    buildPeopleTable(fileName, function(df) {
      dataFrame = df;
      done();
    });
  });

  describe("DataFrameWriter.jdbc(url, db, info)", function() {
    it("should connect to a running mysql db", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          dataFrame.write().jdbc("jdbc:mysql://localhost:3306/test", "newdb", {user: "root", password: "mypass"}).then(
            function() {
              sqlContext.read().jdbc("jdbc:mysql://localhost:3306/test", "newdb", {user: "root", password: "mypass"}).count().then(callback).catch(error);
            }
          ).catch(error);
        }, function(result) {
          expect(result).equals(3);
        },
        done
      );
    });
  });

  after(function(done) {
    if (sc) {
      sc.stop().then(done).catch(done);
    }
  });
});
