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
  sparkSession.stop().then(exit).catch(exit);
}



function run(sparkSession, spark) {
  return new Promise(function(resolve, reject) {

    var dataFrame = sparkSession.read().format("libsvm").load("examples/mllib/data/sample_libsvm_data.txt");

    var scaler = new spark.ml.feature.StandardScaler()
      .setInputCol("features")
      .setOutputCol("scaledFeatures")
      .setWithStd(true)
      .setWithMean(false);

    // Compute summary statistics by fitting the StandardScaler
    var scalerModel = scaler.fit(dataFrame);

    // Normalize each feature to have unit standard deviation.
    var scaledData = scalerModel.transform(dataFrame).take(20).then(resolve).catch(reject);


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
            .appName("StandardScaler")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
        spark.sql.DataFrame.show(results,true);
    stop();
  }).catch(stop);
}
