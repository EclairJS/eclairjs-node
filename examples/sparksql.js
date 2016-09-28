/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var spark = require('../lib/index.js');

var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Spark SQL Example");
var sqlContext = new spark.sql.SQLContext(sc);

// Load a text file and convert each line to a JavaScript Object.
var rdd = sc.textFile(__dirname + '/people.txt');

var people = rdd.map(function(line) {
  var parts = line.split(",");
  return person = {
    name: parts[0],
    age: parseInt(parts[1].trim())
  };
});

//Generate the schema
var DataTypes = spark.sql.types.DataTypes;

var fields = [];
fields.push(DataTypes.createStructField("name", DataTypes.StringType, true));
fields.push(DataTypes.createStructField("age", DataTypes.IntegerType, true));
var schema = DataTypes.createStructType(fields);

// Convert records of the RDD (people) to Rows.
var rowRDD = people.map(function(person, RowFactory){
  return RowFactory.create([person.name, person.age]);
}, [spark.sql.RowFactory]);

//Apply the schema to the RDD.
var peopleDataFrame = sqlContext.createDataFrame(rowRDD, schema);

peopleDataFrame.toJSON().then(function(res){
    console.log("peopleDataFrame.toJSON(): ",res);
});

// Register the DataFrame as a table.
peopleDataFrame.registerTempTable("people").then(function() {
  // SQL can be run over RDDs that have been registered as tables.
  var results = sqlContext.sql("SELECT name FROM people");

  //The results of SQL queries are DataFrames and support all the normal RDD operations.
  //The columns of a row in the result can be accessed by ordinal.
  var names = results.toRDD().map(function(row) {
    return "Name: " + row.getString(0);
  });

  names.take(10).then(function(results) {
    console.log("results:", results)

    sc.stop().then(function() {
      process.exit();
    }).catch(function(e) {
      console.log(e);
      process.exit();
    });
  }).catch(function(e) {
    console.log("Error:", err);

    sc.stop().then(function() {
      process.exit();
    });
  });
});

