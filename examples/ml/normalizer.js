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
    var dataFrame = sparkSession.read().format("libsvm").load(__dirname+"/../mllib/data/sample_libsvm_data.txt");

    // Normalize each Vector using $L^1$ norm.
    var normalizer = new spark.ml.feature.Normalizer()
      .setInputCol("features")
      .setOutputCol("normFeatures")
      .setP(1.0);

    // Normalize each Vector using $L^\infty$ norm.
    return normalizer.transform(dataFrame, normalizer.p().w(Number.POSITIVE_INFINITY)).toString().then(resolve).catch(reject);
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
            .appName("Normalizer")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    console.log("Result:", JSON.stringify(results));
    stop();
  }).catch(stop);
}
