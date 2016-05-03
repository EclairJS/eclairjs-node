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

    var splits = [Number.NEGATIVE_INFINITY, -0.5, 0.0, 0.5, Number.POSITIVE_INFINITY];

    var data = sc.parallelize([
      spark.sql.RowFactory.create([-0.5]),
      spark.sql.RowFactory.create([-0.3]),
      spark.sql.RowFactory.create([0.0]),
      spark.sql.RowFactory.create([0.2])
    ]);
    var schema = new spark.sql.types.StructType([
      new spark.sql.types.StructField("features", spark.sql.types.DataTypes.DoubleType, false, spark.sql.types.Metadata.empty())
    ]);
    var dataFrame = sqlContext.createDataFrame(data, schema);

    var bucketizer = new spark.ml.feature.Bucketizer()
      .setInputCol("features")
      .setOutputCol("bucketedFeatures")
      .setSplits(splits);

    // Transform original data into its bucket index.
    bucketizer.transform(dataFrame).take(10).then(resolve).catch(stop);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var sc = new spark.SparkContext("local[*]", "Bucketizer");
  run(sc).then(function(results) {
    console.log('Bucketizer result', results);
    stop();
  }).catch(stop);
}