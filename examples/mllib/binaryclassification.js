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
    var data = spark.mllib.util.MLUtils.loadLibSVMFile(sc, __dirname + "/data/sample_binary_classification_data.txt");

    // Split data into training (60%) and test (40%)
    data.randomSplit([0.6, 0.4], 11).then(function(split) {
      //var training = split[0].cache();
      var training = split[0];
      var test = split[1];

      var model = new spark.mllib.classification.LogisticRegressionWithLBFGS()
        .setNumClasses(2)
        .run(training);

      var predictionAndLabels = test.mapToPair(function(lp, model, Tuple2) {
        return new Tuple2(model.predict(lp.getFeatures()), lp.getLabel());
      }, [model, spark.Tuple2]);

      var metrics = new spark.mllib.evaluation.BinaryClassificationMetrics(predictionAndLabels);

      var promises = [];

      promises.push(metrics.precisionByThreshold().collect());
      promises.push(metrics.recallByThreshold().collect());
      promises.push(metrics.fMeasureByThreshold().collect());
      promises.push(metrics.fMeasureByThreshold(2.0).collect());
      promises.push(metrics.pr().collect());

      Promise.all(promises).then(resolve).catch(reject);
    }).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Binary Classification Metrics");
  run(sc, spark).then(function(results) {
    console.log("Precision By Threshold:", results[0]);
    console.log("Recall By Threshold:", results[1]);
    console.log("Measure By Threshold:", results[2]);
    console.log("Measure By Threshold (Beta of 2.0):", results[3]);
    console.log("Precision-recall curve:", results[4]);

    stop();
  }).catch(stop);
}