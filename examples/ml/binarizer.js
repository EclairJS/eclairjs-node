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
  sparkSession.stop().then(exit).catch(exit);
}



function run(sparkSession, spark) {
  return new Promise(function(resolve, reject) {
    var data = [
      spark.sql.RowFactory.create([0, 0.1]),
      spark.sql.RowFactory.create([1, 0.8]),
      spark.sql.RowFactory.create([2, 0.2])
    ];

    var schema = new spark.sql.types.StructType([
      new spark.sql.types.StructField("label", spark.sql.types.DataTypes.DoubleType, false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("feature", spark.sql.types.DataTypes.DoubleType, false, spark.sql.types.Metadata.empty())
    ]);

    var continuousDataFrame = sparkSession.createDataFrame(data, schema);

    var binarizer = new spark.ml.feature.Binarizer()
      .setInputCol("feature")
      .setOutputCol("binarized_feature")
      .setThreshold(0.5);
    var binarizedDataFrame = binarizer.transform(continuousDataFrame);
    var binarizedFeatures = binarizedDataFrame.select("binarized_feature");

    binarizedFeatures.take(10).then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sparkSession = spark.sql.SparkSession
            .builder()
            .appName("Binarizer")
            .getOrCreate();
  run(sparkSession, spark).then(function(results) {
    console.log('Binarizer result', results);
    stop();
  }).catch(stop);
}
