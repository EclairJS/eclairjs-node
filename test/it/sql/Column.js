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
  var spark = new eclairjs();

  sc = new spark.SparkContext("local[*]", "sql.Column Integration Tests");
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
  var rowRDD = people.map(function(person, RowFactory){
    return RowFactory.create([person.name, person.age, person.expense, person.hasJob, person.isOld]);
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
var fileName = path.resolve(__dirname+'/../../data/people.txt');

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
      TestUtils.executeTest(
        function(callback) {
          var col = dataFrame.col("age");
          col.alias("newAge").toString().then(callback);
        }, function(result) {
          expect(result).contains("age AS `newAge`");
        },
        done
      );
    });
  });

  describe("Column.and()", function() {
    it("should work in a select()", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.select(dataFrame.col("isOld").and(dataFrame.col("hasJob"))).toString().then(callback);
        }, function(result) {
          expect(result).equals("[(isOld AND hasJob): boolean]");
        },
        done
      );
    });
  });

  describe("Column.as()", function() {
    it("should create an ArrayBuffer alias", function(done) {
      TestUtils.executeTest(
        function(callback) {
          var col = dataFrame.col("age");
          col.as(["newAge", "ventage"]).toString().then(callback);
        }, function(result) {
          expect(result).equals('multialias(age)');
        },
        done
      );
    });
  });

  describe("Column.asc()", function() {
    it("should sort ascending", function(done) {
      TestUtils.executeTest(
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
      TestUtils.executeTest(
        function(callback) {
          dataFrame.select(dataFrame.col("age").between(10, 29)).collect().then(function(rows) {
            callback(rows[1].getBoolean(0));
          });
        }, function(result) {
          expect(result).equals(false);
        },
        done
      );
    });
  });

  describe("Column.bitwiseAnd()", function() {
    it("should create a Column of (age & expense)", function(done) {
      TestUtils.executeTest(
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
      TestUtils.executeTest(
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
      TestUtils.executeTest(
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
      TestUtils.executeTest(
        function(callback, error) {
          dataFrame.col("age").cast(DataTypes.StringType).toString().then(callback).catch(error);
        }, function(result) {
          expect(result).contain('CAST(age AS STRING)');
        },
        done
      );
    });
  });

  describe("Column.cast(string)", function() {
    it("should cast to string", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").cast('string').toString().then(callback);
        }, function(result) {
          expect(result).contain('CAST(age AS STRING)');
        },
        done
      );
    });
  });


  describe("Column.contains(dog)", function() {
    it("should return a column of Contains(name, dog)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("name").contains("dog").toString().then(callback);
        }, function(result) {
          expect(result).equals('contains(name, dog)');
        },
        done
      );
    });
  });

  describe("Column.desc()", function() {
    it("should sort descending", function(done) {
      TestUtils.executeTest(
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
      TestUtils.executeTest(
        function(callback) {
          dataFrame.select(dataFrame.col("expense").divide(dataFrame.col("age"))).collect().then(function(rows) {
            callback(rows[0].getFloat(0));
          });
        }, function(result) {
          expect(result).equals(0.034482758621);
        },
        done
      );
    });
  });


  describe("Column.endsWith('n')", function() {
    it("should return false,false,true", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.select(dataFrame.col('name').endsWith('n')).collect().then(function(rows) {
            callback(rows[1].getBoolean(0));
          });
        }, function(result) {
          expect(result).equals(false);
        },
        done
      );
    });
  });

  describe("Column.eqNullSafe()", function() {
    it("should generate (name <=> Andy)", function(done) {
      TestUtils.executeTest(
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
    it("should return false for any 2 columns", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("name").equals(dataFrame.col("age")).then(callback);
        }, function(result) {
          expect(result).equals(false);
        },
        done
      );
    });
  })

  describe("Column.equals()", function() {
    it("should return ture for the same column", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("name").equals(dataFrame.col("name")).then(callback);
        }, function(result) {
          expect(result).equals(true);
        },
        done
      );
    });
  })

  describe("Column.equalTo()", function() {
    it("should generate a Column of value (name = age)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("name").equalTo(dataFrame.col("age")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(name = age)');
        },
        done
      );
    });
  })

  describe("Column.geq(21)", function() {
    it("should generate a Column of value (age >= 21)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").geq(21).toString().then(callback);
        }, function(result) {
          expect(result).equals('(age >= 21)');
        },
        done
      );
    });
  })

  describe("Column.geq(column)", function() {
    it("should generate a Column of value (name >= expense)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").geq(dataFrame.col("expense")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(age >= expense)');
        },
        done
      );
    });
  })

  describe("Column.getField()", function() {
    it("should generate a Column of value (age[expense])", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").getField("expense").toString().then(callback);
        }, function(result) {
          expect(result).equals('age["expense"]');
        },
        done
      );
    });
  })

  describe("Column.getItem()", function() {
    it("should generate a Column of value (age[expense])", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").getItem("expense").toString().then(callback);
        }, function(result) {
          expect(result).equals('age["expense"]');
        },
        done
      );
    });
  })

  describe("Column.gt(20)", function() {
    it("should generate a Column of value (age > 20)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").gt(20).toString().then(callback);
        }, function(result) {
          expect(result).equals('(age > 20)');
        },
        done
      );
    });
  })

  describe("Column.hashCode()", function() {
    it("should return an int", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").hashCode().then(callback);
        }, function(result) {
          expect(Number.isInteger(result)).equals(true);
        },
        done
      );
    });
  })

  describe("Column.isin([20,19])", function() {
    it("should false,false,true", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.select(dataFrame.col("age").isin([20,19])).collect().then(function(rows) {
            callback(rows[2].getBoolean(0));
          });
        }, function(result) {
          expect(result).equals(true);
        },
        done
      );
    });
  })


  describe("Column.isNaN(age)", function() {
    it("should generate a Column of value isnan(age)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").isNaN().toString().then(callback);
        }, function(result) {
          expect(result).equals("isnan(age)");
        },
        done
      );
    });
  })


  describe("Column.isNull(age)", function() {
    it("should generate a Column of value isnull(age)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").isNull().toString().then(callback);
        }, function(result) {
          expect(result).equals("(age IS NULL)");
        },
        done
      );
    });
  })

  describe("Column.isNotNull(age)", function() {
    it("should generate a Column of value isnotnull(age)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").isNotNull().toString().then(callback);
        }, function(result) {
          expect(result).equals("(age IS NOT NULL)");
        },
        done
      );
    });
  })

  describe("Column.leq(21)", function() {
    it("should generate a Column of value (age <= 21)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").leq(21).toString().then(callback);
        }, function(result) {
          expect(result).equals('(age <= 21)');
        },
        done
      );
    });
  })


  describe("Column.like(3)", function() {
    it("should generate a Column of value age LIKE 3", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").like("3").toString().then(callback);
        }, function(result) {
          expect(result).equals('age LIKE 3');
        },
        done
      );
    });
  })

  describe("Column.lt(21)", function() {
    it("should generate a Column of value (age < 21)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("age").lt(21).toString().then(callback);
        }, function(result) {
          expect(result).equals('(age < 21)');
        },
        done
      );
    });
  })

  describe("Column.minus(age)", function() {
    it("should generate a Column of value (expense - age)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("expense").minus(dataFrame.col("age")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(expense - age)');
        },
        done
      );
    });
  })

  describe("Column.mod(age)", function() {
    it("should generate a Column of value (expense % age)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("expense").mod(dataFrame.col("age")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(expense % age)');
        },
        done
      );
    });
  })


  describe("Column.multiply(age)", function() {
    it("should generate a Column of value (expense * age)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("expense").multiply(dataFrame.col("age")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(expense * age)');
        },
        done
      );
    });
  })

  describe("Column.notEqual(age)", function() {
    it("should generate a Column of value NOT (expense = age)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("expense").notEqual(dataFrame.col("age")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(NOT (expense = age))');
        },
        done
      );
    });
  })

  describe("Column.or(age)", function() {
    it("should generate a Column of value (expense|| age)", function(done) {
      TestUtils.executeTest(
        function(callback) {
          dataFrame.col("expense").or(dataFrame.col("age")).toString().then(callback);
        }, function(result) {
          expect(result).equals('(expense OR age)');
        },
        done
      );
    });
  })

  describe("Column.otherwise()", function() {
    it("should when with sql.functions.when correctly", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var select = spark.sql.functions.when(dataFrame.col("age").notEqual(19), true).otherwise(false);
          dataFrame.select(select).collect().then(function(rows) {
            callback(rows[2].getBoolean(0));
          }).catch(error);
        }, function(result) {
          expect(result).equals(false);
        },
        done
      );
    });
  })

  describe("Column.when()", function() {
    it("should generate a Column", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var whenCol = spark.sql.functions.when(dataFrame.col("name").equalTo("Andy"), 0);
          whenCol.when(dataFrame.col("age").equalTo(10), 100).toString().then(callback).catch(error);
        }, function(result) {
          expect(result).equals('CASE WHEN (name = Andy) THEN 0 WHEN (age = 10) THEN 100 END');
        },
        done
      );
    });
  })

  after(function(done) {
    if (!global.SC && sc) {
      sc.stop().then(done).catch(done);
    } else {
      // global sc, so don't stop it
      done();
    }
  });
});