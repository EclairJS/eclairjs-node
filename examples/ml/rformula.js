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

function exit() {
  process.exit();
}

function stop(e) {
  if (e) {
    console.log(e);
  }
  sc.stop().then(exit).catch(exit);
}

var spark = require('../../lib/index.js');

function run(sc) {
  return new Promise(function(resolve, reject) {
    var sqlContext = new spark.sql.SQLContext(sc);



    var schema = spark.sql.types.DataTypes.createStructType([
        spark.sql.types.DataTypes.createStructField("id", spark.sql.types.DataTypes.IntegerType, false),
        spark.sql.types.DataTypes.createStructField("country", spark.sql.types.DataTypes.StringType, false),
        spark.sql.types.DataTypes.createStructField("hour", spark.sql.types.DataTypes.IntegerType, false),
        spark.sql.types.DataTypes.createStructField("clicked", spark.sql.types.DataTypes.DoubleType, false)
    ]);

    var rdd = sc.parallelize([
        spark.sql.RowFactory.create(7, "US", 18, 1.0),
        spark.sql.RowFactory.create(8, "CA", 12, 0.0),
        spark.sql.RowFactory.create(9, "NZ", 15, 0.0)
    ]);

    var dataset = sqlContext.createDataFrame(rdd, schema);
    var formula = new spark.ml.feature.RFormula()
        .setFormula("clicked ~ country + hour")
        .setFeaturesCol("features")
        .setLabelCol("label");
    var output = formula.fit(dataset).transform(dataset);
    output.select("features", "label").take(10).then(resolve).catch(reject);

  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var sc = new spark.SparkContext("local[*]", "rformula");
  run(sc).then(function(results) {
        spark.sql.DataFrame.show(results);
    stop();
  }).catch(stop);
}
