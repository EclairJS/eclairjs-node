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

    var polyExpansion = new spark.ml.feature.PolynomialExpansion()
      .setInputCol("features")
      .setOutputCol("polyFeatures")
      .setDegree(3);

    var data = [
      spark.sql.RowFactory.create(spark.ml.linalg.Vectors.dense(-2.0, 2.3)),
      spark.sql.RowFactory.create(spark.ml.linalg.Vectors.dense(0.0, 0.0)),
      spark.sql.RowFactory.create(spark.ml.linalg.Vectors.dense(0.6, -1.1))
    ];

    var schema = new spark.sql.types.StructType([
      new spark.sql.types.StructField("features", new spark.ml.linalg.VectorUDT(), false, spark.sql.types.Metadata.empty())
    ]);

    var df = sparkSession.createDataFrame(data, schema);
    var polyDF = polyExpansion.transform(df);

    polyDF.select("polyFeatures").take(3).then(resolve).catch(reject);
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
            .appName("Polynomial Expansion")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    console.log("Result:", JSON.stringify(results));
    stop();
  }).catch(stop);
}
