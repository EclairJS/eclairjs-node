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
    // Load and parse the data file, converting it to a DataFrame.
    var data = sparkSession.read().format("libsvm").load(__dirname+"/../mllib/data/sample_libsvm_data.txt");

    // Automatically identify categorical features, and index them.
    // Set maxCategories so features with > 4 distinct values are treated as continuous.
    var featureIndexer = new spark.ml.feature.VectorIndexer()
      .setInputCol("features")
      .setOutputCol("indexedFeatures")
      .setMaxCategories(4)
      .fit(data);


    // Split the data into training and test sets (30% held out for testing)
    data.randomSplit([0.7, 0.3]).then(function(splits) {
      var trainingData = splits[0];
      var testData = splits[1];

      // Train a RandomForest model.
      var rf = new spark.ml.regression.RandomForestRegressor()
        .setLabelCol("label")
        .setFeaturesCol("indexedFeatures");

      // Chain indexer and forest in a Pipeline
      var pipeline = new spark.ml.Pipeline()
        .setStages([featureIndexer, rf]);

      // Train model.  This also runs the indexer.
      var model = pipeline.fit(trainingData);

      // Make predictions.
      var predictions = model.transform(testData);

      var ret = {};
      // Select example rows to display.
      ret.predictionsDF = predictions.select("prediction", "label", "features");

      // Select (prediction, true label) and compute test error
      var evaluator = new spark.ml.evaluation.RegressionEvaluator()
        .setLabelCol("label")
        .setPredictionCol("prediction")
        .setMetricName("rmse");

      evaluator.evaluate(predictions).then(resolve).catch(reject);
    }).catch(reject);
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
            .appName("Random Forest Regressor Example")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    console.log("Root Mean Squared Error (RMSE) on test data:", results);
    stop();
  }).catch(stop);
}
