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

function run(sc, spark) {
  return new Promise(function(resolve, reject) {
    var sqlContext = new spark.sql.SQLContext(sc);

    var rdd = sc.parallelize([
      spark.sql.RowFactory.create([7, spark.mllib.linalg.Vectors.dense(0.0, 0.0, 18.0, 1.0), 1.0]),
      spark.sql.RowFactory.create([8, spark.mllib.linalg.Vectors.dense(0.0, 1.0, 12.0, 0.0), 0.0]),
      spark.sql.RowFactory.create([9, spark.mllib.linalg.Vectors.dense(1.0, 0.0, 15.0, 0.1), 0.0])
    ]);

    var schema = new spark.sql.types.StructType(
      [
        new spark.sql.types.StructField("id", spark.sql.types.DataTypes.IntegerType, false, spark.sql.types.Metadata.empty()),
        new spark.sql.types.StructField("features", new spark.mllib.linalg.VectorUDT(), false, spark.sql.types.Metadata.empty()),
        new spark.sql.types.StructField("clicked", spark.sql.types.DataTypes.DoubleType, false, spark.sql.types.Metadata.empty())
      ]);

    var df = sqlContext.createDataFrame(rdd, schema);

    var selector = new spark.ml.feature.ChiSqSelector()
      .setNumTopFeatures(1)
      .setFeaturesCol("features")
      .setLabelCol("clicked")
      .setOutputCol("selectedFeatures");

    var model = selector.fit(df);

    model.transform(df).take(10).then(resolve).catch(stop);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();

  var sc = new spark.SparkContext("local[*]", "Chi Sq Selector");
  run(sc, spark).then(function(results) {
    console.log('Chi Sq Selector result', results);
    stop();
  }).catch(stop);
}