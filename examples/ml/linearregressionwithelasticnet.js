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



var k = 3;

function run(sparkSession, spark) {
  return new Promise(function(resolve, reject) {

    // Load training data
    var training = sparkSession.read().format("libsvm")
      .load(__dirname+"/../mllib/data/sample_linear_regression_data.txt");

    var lr = new spark.ml.regression.LinearRegression()
      .setMaxIter(10)
      .setRegParam(0.3)
      .setElasticNetParam(0.8);

    // Fit the model
    var lrModel = lr.fit(training);

    var trainingSummary = lrModel.summary();

    function createResulPromise(label, promise) {
      return new Promise(function(resolve, reject) {
        promise.then(function(result) {
          resolve([label, result])
        }).catch(reject);
      });
    }

    var promises = [];
    promises.push(createResulPromise("Coefficients:", lrModel.coefficients().toJSON()));
    promises.push(createResulPromise("Intercept:", lrModel.intercept()));
    promises.push(createResulPromise("totalIterations:", trainingSummary.totalIterations()));
    promises.push(createResulPromise("RMSE:", trainingSummary.rootMeanSquaredError()));
    promises.push(createResulPromise("r2:", trainingSummary.r2()));

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
            .appName("Linear Regression With Elastic Net")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    results.forEach(function (result) {
      console.log(result[0], result[1])
    });
    stop();
  }).catch(stop);
}
