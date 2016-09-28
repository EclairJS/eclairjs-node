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
      spark.sql.RowFactory.create([1.218, 1.0, spark.ml.linalg.Vectors.dense(1.560, -0.605)]),
      spark.sql.RowFactory.create([2.949, 0.0, spark.ml.linalg.Vectors.dense(0.346, 2.158)]),
      spark.sql.RowFactory.create([3.627, 0.0, spark.ml.linalg.Vectors.dense(1.380, 0.231)]),
      spark.sql.RowFactory.create([0.273, 1.0, spark.ml.linalg.Vectors.dense(0.520, 1.151)]),
      spark.sql.RowFactory.create([4.199, 0.0, spark.ml.linalg.Vectors.dense(0.795, -0.226)])
    ];
    var schema = new spark.sql.types.StructType([
      new spark.sql.types.StructField("label", spark.sql.types.DataTypes.DoubleType, false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("censor", spark.sql.types.DataTypes.DoubleType, false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("features", new spark.ml.linalg.VectorUDT(), false, spark.sql.types.Metadata.empty())
    ]);
    
    var training = sparkSession.createDataFrame(data, schema);
    
    var quantileProbabilities = [0.3, 0.6];
    
    var aft = new spark.ml.regression.AFTSurvivalRegression()
      .setQuantileProbabilities(quantileProbabilities)
      .setQuantilesCol("quantiles");

    var model = aft.fit(training);

    var promises = [];
    promises.push(model.coefficients());
    promises.push(model.intercept());
    promises.push(model.scale());

    Promise.all(promises).then(resolve).catch(reject);
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
            .appName("AFT Survival Regression")
            .getOrCreate();
  run(sparkSession, spark).then(function(results) {
    console.log('Coefficients:', results[0]);
    console.log('Intercept:', results[1]);
    console.log('Scale:', results[2]);
    stop();
  }).catch(stop);
}
