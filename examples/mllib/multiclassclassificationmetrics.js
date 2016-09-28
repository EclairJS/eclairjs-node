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

function createResulPromise(label, promise) {
  return new Promise(function(resolve, reject) {
    promise.then(function(result) {
      resolve([label, result])
    }).catch(reject);
  });
}

function run(sc, spark) {
  return new Promise(function(resolve, reject) {

    var data = spark.mllib.util.MLUtils.loadLibSVMFile(sc, __dirname + "/data/sample_multiclass_classification_data.txt");

    data.randomSplit([0.6, 0.4], 11).then(function(splits) {
      var training = splits[0].cache();
      var test = splits[1];

      // Run training algorithm to build the model.
      var model = new spark.mllib.classification.LogisticRegressionWithLBFGS().setNumClasses(3).run(training);

      // Compute raw scores on the test set.
      var predictionAndLabels = test.map(function (lp, model, Tuple2) {
        var prediction = model.predict(lp.getFeatures());
        return new Tuple2(prediction, lp.getLabel());
      }, [model, spark.Tuple2]);

      var metrics = new spark.mllib.evaluation.MulticlassMetrics(predictionAndLabels);

      var promises = [];
      promises.push(createResulPromise('Confusion matrix', metrics.confusionMatrix().toArray()));
      promises.push(createResulPromise('Precision', metrics.precision()));
      promises.push(createResulPromise('Recall', metrics.recall()));
      promises.push(createResulPromise('F1 Score', metrics.fMeasure()));
      promises.push(createResulPromise('Labels', metrics.labels()));

      promises.push(createResulPromise('Weighted precision', metrics.weightedPrecision()));
      promises.push(createResulPromise('Weighted recall', metrics.weightedRecall()));
      promises.push(createResulPromise('Weighted F1 score', metrics.weightedFMeasure()));
      promises.push(createResulPromise('Weighted false positive rate', metrics.weightedFalsePositiveRate()));

      Promise.all(promises).then(resolve).catch(reject);
    }).catch(stop);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Multiclass Classification Metrics");
  run(sc, spark).then(function(results) {
    results.forEach(function (result) {
      console.log(result[0], ':', result[1])
    });

    stop();
  }).catch(stop);
}