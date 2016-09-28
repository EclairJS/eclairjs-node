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

    // Load training data
    var dataset = sparkSession.read().format("libsvm")
      .load(__dirname+"/../mllib/data/sample_linear_regression_data.txt");

    var glr = new spark.ml.regression.GeneralizedLinearRegression()
      .setFamily("gaussian")
      .setLink("identity")
      .setMaxIter(10)
      .setRegParam(0.3);

    // Fit the model
    var model = glr.fit(dataset);

    // Summarize the model over the training set and get some metrics to print out
    var summary = model.summary();

    function createResultPromise(label, promise, stringify) {
      return new Promise(function(resolve, reject) {
        promise.then(function(result) {
          resolve([label, stringify ? JSON.stringify(result) : result]);
        }).catch(reject);
      });
    }

    var promises = [];
    promises.push(createResultPromise("Coefficients:", model.coefficients()));
    promises.push(createResultPromise("Intercept:", model.intercept()));
    promises.push(createResultPromise("Coefficient Standard Errors:", summary.coefficientStandardErrors()));
    promises.push(createResultPromise("T Values:", summary.tValues()));
    promises.push(createResultPromise("P Values:", summary.pValues()));
    promises.push(createResultPromise("Dispersion:", summary.dispersion()));
    promises.push(createResultPromise("Null Deviance:", summary.nullDeviance()));
    promises.push(createResultPromise("Residual Degree Of Freedom Null:", summary.residualDegreeOfFreedomNull()));
    promises.push(createResultPromise("Deviance:", summary.deviance()));
    promises.push(createResultPromise("Residual Degree Of Freedom:", summary.residualDegreeOfFreedom()));
    promises.push(createResultPromise("AIC:", summary.aic()));
    promises.push(createResultPromise("Deviance Residuals:", summary.residuals().take(5), true));

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
            .appName("Generalized Linear Regression")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    results.forEach(function (result) {
      console.log(result[0], result[1]);
    });
    stop();
  }).catch(stop);
}
