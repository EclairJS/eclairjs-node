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

    var rdd = sc.parallelize(
      [
        spark.sql.RowFactory.create(0, 18.0),
        spark.sql.RowFactory.create(1, 19.0),
        spark.sql.RowFactory.create(2, 8.0),
        spark.sql.RowFactory.create(3, 5.0),
        spark.sql.RowFactory.create(4, 2.2)
      ]
    );

    var schema = new spark.sql.types.StructType([
      new spark.sql.types.StructField("id", spark.sql.types.DataTypes.IntegerType, false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("hour", spark.sql.types.DataTypes.DoubleType, false, spark.sql.types.Metadata.empty())
    ]);

    var df = sqlContext.createDataFrame(rdd, schema);

    var discretizer = new spark.ml.feature.QuantileDiscretizer()
      .setInputCol("hour")
      .setOutputCol("result")
      .setNumBuckets(3);

    discretizer.fit(df).transform(df).take(10).then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var sc = new spark.SparkContext("local[*]", "Quantile Discretizer");
  run(sc).then(function(results) {
    console.log("Result:", JSON.stringify(results));
    stop();
  }).catch(stop);
}