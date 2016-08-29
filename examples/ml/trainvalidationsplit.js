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
  sc.stop().then(exit).catch(exit);
}

function run(sc, spark) {
  return new Promise(function(resolve, reject) {
    var sqlContext = new spark.sql.SQLContext(sc);


    var data = sqlContext.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");

    // Prepare training and test data.
    data.randomSplit([0.9, 0.1], 12345).then(function(splits) {
      var training = splits[0];
      var test = splits[1];

      var lr = new spark.ml.regression.LinearRegression();

      // We use a ParamGridBuilder to construct a grid of parameters to search over.
      // TrainValidationSplit will try all combinations of values and determine best model using
      // the evaluator.
      new spark.ml.tuning.ParamGridBuilder()
        .addGrid(lr.regParam(), [ 0.1, 0.01])
        .addGrid(lr.fitIntercept())
        .addGrid(lr.elasticNetParam(), [ 0.0, 0.5, 1.0])
        .build().then(function(paramGrid) {

          // In this case the estimator is simply the linear regression.
          // A TrainValidationSplit requires an Estimator, a set of Estimator ParamMaps, and an Evaluator.
          var trainValidationSplit = new spark.ml.tuning.TrainValidationSplit()
            .setEstimator(lr)
            .setEvaluator(new spark.ml.evaluation.RegressionEvaluator())
            .setEstimatorParamMaps(paramGrid);

          // 80% of the data will be used for training and the remaining 20% for validation.
          trainValidationSplit.setTrainRatio(0.8);

          // Run train validation split, and choose the best set of parameters.
          var model = trainValidationSplit.fit(training);

          // Make predictions on test data. model is the model with combination of parameters
          // that performed best.
          var output=model.transform(test)
            .select("features", "label", "prediction").take(10).then(resolve).catch(reject);
        });
    }).catch(reject);

  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();

  var sc = new spark.SparkContext("local[*]", "trainvalidationsplit");
  run(sc, spark).then(function(results) {
        console.log(JSON.stringify(results));
    stop();
  }).catch(stop);
}
