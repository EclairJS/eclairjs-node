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

  sc = new spark.SparkContext("local[*]", "sql.functions Integration Tests");
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
var fileName = path.resolve(__dirname+'/../../data/people.txt');

var dataFrame;

function runTest(method, args, expected) {
  describe("function."+method+"()", function() {
    it("should return a Column with value "+expected, function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          spark.sql.functions[method].apply(this, typeof(args) == "function" ? args() : args).toString().then(callback).catch(error);
        }, function(result) {
          expect(result).equals(expected);
        },
        done
      );
    });
  });
}

describe('sql.functions Test', function() {
  before(function(done) {
    this.timeout(100000);

    buildPeopleTable(fileName, function(df) {
      dataFrame = df;
      done();
    });
  });

  runTest("col", ["name"], "name");
  runTest("lit", ["name"], "name");
  runTest("asc", ["name"], "name ASC");
  runTest("desc", ["name"], "name DESC");
  runTest("approxCountDistinct", ["name",0.2], "hyperloglogplusplus(name,0.2,0,0)");
  runTest("approxCountDistinct", function(){return [dataFrame.col("name")]}, "hyperloglogplusplus(name,0.05,0,0)");
  runTest("avg", ["name"], "avg(name)");
  runTest("count", ["name"], "count(name)");
  runTest("countDistinct", function(){return [dataFrame.col("name"), dataFrame.col("age")]}, "count(name,age)");
  runTest("first", ["name"], "first(name)()");
  runTest("last", ["name"], "last(name)()");
  runTest("max", ["name"], "max(name)");
  runTest("mean", ["name"], "avg(name)");
  runTest("min", ["name"], "min(name)");
  runTest("sum", ["name"], "sum(name)");
  runTest("sumDistinct", ["name"], "sum(name)");
  runTest("cumeDist", [], "'cume_dist()");
  runTest("denseRank", [], "'dense_rank()");
  runTest("lag", ["name", 4], "'lag(name,4,null)");
  runTest("lag", ["name", 4, 12], "'lag(name,4,12)");
  runTest("lead", ["name", 4, 12], "'lead(name,4,12)");
  runTest("ntile", [12], "'ntile(12)");
  runTest("percentRank", [], "'percent_rank()");
  runTest("rank", [], "'rank()");
  runTest("rowNumber", [], "'row_number()");
  runTest("abs", function(){return [dataFrame.col("name")]}, "abs(name)");
  runTest("array", ["name", "age"], "array(name,age)");
  runTest("broadcast", function(){return [dataFrame]}, "[name: string, age: int, expense: int, hasJob: boolean, isOld: boolean]");
  runTest("coalesce", function(){return [dataFrame.col("name"), dataFrame.col("age")]}, "coalesce(name,age)");
  runTest("inputFileName", [], "INPUT_FILE_NAME()");
  runTest("isNaN", function(){return [dataFrame.col("name")]}, "isnan(name)");
  runTest("monotonicallyIncreasingId", [], "monotonicallyincreasingid()");
  runTest("nanvl", function(){return [dataFrame.col("name"), dataFrame.col("expense")]}, "nanvl(name,expense)");
  runTest("negate", function(){return [dataFrame.col("name")]}, "-name");
  runTest("not", function(){return [dataFrame.col("name")]}, "NOT name");
  runTest("rand", [4], "rand(4)");
  runTest("randn", [4], "randn(4)");
  runTest("sparkPartitionId", [], "SPARK_PARTITION_ID()");
  runTest("sqrt", ["name"], "SQRT(name)");
  runTest("struct", ["name", "age"], "struct(name,age)");
  runTest("bitwiseNOT", function(){return [dataFrame.col("name")]}, "~name");
  runTest("expr", ["length(name)"], "length(name)");
  runTest("acos", ["name"], "ACOS(name)");
  runTest("asin", ["name"], "ASIN(name)");
  runTest("atan", ["name"], "ATAN(name)");
  runTest("atan2", ["name", "age"], "ATAN2(name, age)");
  runTest("bin", ["name"], "bin(name)");
  runTest("cbrt", ["name"], "CBRT(name)");
  runTest("ceil", ["name"], "CEIL(name)");
  runTest("conv", function(){return [dataFrame.col("name"), 10, 8]}, "conv(name,10,8)");
  runTest("cos", ["name"], "COS(name)");
  runTest("cosh", ["name"], "COSH(name)");
  runTest("exp", ["name"], "EXP(name)");
  runTest("expm1", ["name"], "EXPM1(name)");
  runTest("factorial", function(){return [dataFrame.col("name")]}, "factorial(name)");
  runTest("floor", ["name"], "FLOOR(name)");
  runTest("greatest", ["name", "age"], "greatest(name,age)");
  runTest("hex", function(){return [dataFrame.col("name")]}, "hex(name)");
  runTest("unhex", function(){return [dataFrame.col("name")]}, "unhex(name)");
  runTest("hypot", ["name", 5.0], "HYPOT(name, 5.0)");
  runTest("least", ["name", "age"], "least(name,age)");
  runTest("log", ["age"], "LOG(age)");
  runTest("log10", ["age"], "LOG10(age)");
  runTest("log1p", ["age"], "LOG1P(age)");
  runTest("log2", ["age"], "LOG2(age)");
  runTest("pow", ["age", 4], "POWER(age, 4.0)");
  runTest("pmod", function(){return [dataFrame.col("age"), dataFrame.col("expense")]}, "pmod(age, expense)");
  runTest("round", function(){return [dataFrame.col("age")]}, "round(age,0)");
  runTest("shiftLeft", function(){return [dataFrame.col("age"), 3]}, "shiftleft(age,3)");
  runTest("shiftRight", function(){return [dataFrame.col("age"), 3]}, "shiftright(age,3)");
  runTest("shiftRightUnsigned", function(){return [dataFrame.col("age"), 3]}, "shiftrightunsigned(age,3)");
  runTest("signum", ["age"], "SIGNUM(age)");
  runTest("sin", ["age"], "SIN(age)");
  runTest("sinh", ["age"], "SINH(age)");
  runTest("tan", ["age"], "TAN(age)");
  runTest("tanh", ["age"], "TANH(age)");
  runTest("toDegrees", ["age"], "DEGREES(age)");
  runTest("toRadians", ["age"], "RADIANS(age)");
  runTest("md5", function(){return [dataFrame.col("name")]}, "md5(name)");
  runTest("sha1", function(){return [dataFrame.col("name")]}, "sha1(name)");
  runTest("sha2", function(){return [dataFrame.col("name"), 224]}, "sha2(name,224)");
  runTest("crc32", function(){return [dataFrame.col("name")]}, "crc32(name)");
  runTest("ascii", function(){return [dataFrame.col("name")]}, "ascii(name)");
  runTest("base64", function(){return [dataFrame.col("name")]}, "base64(name)");
  runTest("concat", ["name", "age"], "concat(name,age)");
  runTest("concat_ws", ["-","name", "age"], "concat_ws(-,-,name,age)");
  runTest("decode", function(){return [dataFrame.col("name"), "UTF-16"]}, "decode(name,UTF-16)");
  runTest("encode", function(){return [dataFrame.col("name"), "UTF-16"]}, "encode(name,UTF-16)");
  runTest("format_number", function(){return [dataFrame.col("age"), 4]}, "format_number(age,4)");
  runTest("format_string", ["%s","name", "age"], "format_string(%s,%s,name,age)");
  runTest("initcap", function(){return [dataFrame.col("name")]}, "initcap(name)");
  runTest("instr", function(){return [dataFrame.col("name"), "a"]}, "instr(name,a)");
  runTest("getLength", function(){return [dataFrame.col("name")]}, "length(name)");
  runTest("lower", function(){return [dataFrame.col("name")]}, "lower(name)");
  runTest("levenshtein", function(){return [dataFrame.col("expense"), dataFrame.col("age")]}, "levenshtein(expense,age)");
  runTest("locate", function(){return ["test", dataFrame.col("name")]}, "locate(test,name,0)");
  runTest("locate", function(){return ["test", dataFrame.col("name"), 4]}, "locate(test,name,4)");
  runTest("lpad", function(){return [dataFrame.col("name"), 5, "test"]}, "lpad(name,5,test)");
  runTest("ltrim", function(){return [dataFrame.col("name")]}, "ltrim(name)");
  runTest("regexp_extract", function(){return [dataFrame.col("name"), "regexp", 4]}, "regexp_extract(name,regexp,4)");
  runTest("regexp_replace", function(){return [dataFrame.col("name"), "regexp", "replacement"]}, "regexp_replace(name,regexp,replacement)");
  runTest("unbase64", function(){return [dataFrame.col("name")]}, "unbase64(name)");
  runTest("rpad", function(){return [dataFrame.col("name"), 5, "test"]}, "rpad(name,5,test)");
  runTest("repeat", function(){return [dataFrame.col("name"), 5]}, "repeat(name,5)");
  runTest("reverse", function(){return [dataFrame.col("name")]}, "reverse(name)");
  runTest("rtrim", function(){return [dataFrame.col("name")]}, "rtrim(name)");
  runTest("soundex", function(){return [dataFrame.col("name")]}, "soundex(name)");
  runTest("split", function(){return [dataFrame.col("name"), "pattern"]}, "split(name,pattern)");
  runTest("substring", function(){return [dataFrame.col("name"), 4, 7]}, "substring(name,4,7)");
  runTest("substring_index", function(){return [dataFrame.col("name"), "test", 4]}, "substring_index(name,test,4)");
  runTest("translate", function(){return [dataFrame.col("name"), "test", "test2"]}, "translate(name,test,test2)");
  runTest("trim", function(){return [dataFrame.col("name")]}, "trim(name)");
  runTest("upper", function(){return [dataFrame.col("name")]}, "upper(name)");
  runTest("add_months", function(){return [dataFrame.col("name"), 4]}, "addmonths(name,4)");
  runTest("current_date", [], "currentdate()");
  runTest("current_timestamp", [], "currenttimestamp()");
  runTest("date_format", function(){return [dataFrame.col("name"), "format"]}, "date_format(name,format)");
  runTest("date_add", function(){return [dataFrame.col("name"), 1]}, "dateadd(name,1)");
  runTest("date_sub", function(){return [dataFrame.col("name"), 1]}, "datesub(name,1)");
  runTest("datediff", function(){return [dataFrame.col("name"), dataFrame.col("name")]}, "datediff(name,name)");
  runTest("year", function(){return [dataFrame.col("name")]}, "year(name)");
  runTest("quarter", function(){return [dataFrame.col("name")]}, "quarter(name)");
  runTest("month", function(){return [dataFrame.col("name")]}, "month(name)");
  runTest("dayofmonth", function(){return [dataFrame.col("name")]}, "dayofmonth(name)");
  runTest("dayofyear", function(){return [dataFrame.col("name")]}, "dayofyear(name)");
  runTest("hour", function(){return [dataFrame.col("name")]}, "hour(name)");
  runTest("last_day", function(){return [dataFrame.col("name")]}, "last_day(name)");
  runTest("minute", function(){return [dataFrame.col("name")]}, "minute(name)");
  runTest("months_between", function(){return [dataFrame.col("name"), dataFrame.col("age")]}, "monthsbetween(name,age)");
  runTest("next_day", function(){return [dataFrame.col("name"), "Mon"]}, "next_day(name,Mon)");
  runTest("second", function(){return [dataFrame.col("name")]}, "second(name)");
  runTest("weekofyear", function(){return [dataFrame.col("name")]}, "weekofyear(name)");
  runTest("from_unixtime", function(){return [dataFrame.col("name")]}, "fromunixtime(name,yyyy-MM-dd HH:mm:ss)");
  runTest("from_unixtime", function(){return [dataFrame.col("name"), "%d"]}, "fromunixtime(name,%d)");
  runTest("unix_timestamp", function(){return [dataFrame.col("name")]}, "unixtimestamp(name,yyyy-MM-dd HH:mm:ss)");
  runTest("unix_timestamp", function(){return [dataFrame.col("name"), "%d"]}, "unixtimestamp(name,%d)");
  runTest("unix_timestamp", function(){return []}, "unixtimestamp(currenttimestamp(),yyyy-MM-dd HH:mm:ss)");
  runTest("to_date", function(){return [dataFrame.col("name")]}, "todate(name)");
  runTest("trunc", function(){return [dataFrame.col("name"), "yyyy"]}, "trunc(name,yyyy)");
  runTest("from_utc_timestamp", function(){return [dataFrame.col("name"), "tz"]}, "from_utc_timestamp(name,tz)");
  runTest("to_utc_timestamp", function(){return [dataFrame.col("name"), "tz"]}, "to_utc_timestamp(name,tz)");
  runTest("array_contains", function(){return [dataFrame.col("name"), "needle"]}, "array_contains(name,needle)");
  runTest("explode", function(){return [dataFrame.col("name")]}, "explode(name)");
  runTest("size", function(){return [dataFrame.col("name")]}, "size(name)");
  runTest("sort_array", function(){return [dataFrame.col("name"), true]}, "sort_array(name,true)");

  after(function(done) {
    if (!global.SC && sc) {
      sc.stop().then(done).catch(done);
    } else {
      // global sc, so don't stop it
      done();
    }
  });
});

