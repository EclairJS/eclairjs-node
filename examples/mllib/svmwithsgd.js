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
    var data = spark.mllib.util.MLUtils.loadLibSVMFile(sc, __dirname + "/data/sample_libsvm_data.txt");

    // Split initial RDD into two... [60% training data, 40% testing data].
    var training = data.sample(false, 0.6, 11);
    training.cache();
    var test = data.subtract(training);

    // Run training algorithm to build the model.
    var numIterations = 100;
    var model = spark.mllib.classification.SVMWithSGD.train(training, numIterations);

    // Clear the default threshold.
    model.clearThreshold();

    // Compute raw scores on the test set.
    var scoreAndLabels = test.map(function (lp, model, Tuple2) {
      var score = model.predict(lp.getFeatures());
      return new Tuple2(score, lp.getLabel());
    }, [model, spark.Tuple2]);

    // Get evaluation metrics.
    var metrics = new spark.mllib.evaluation.BinaryClassificationMetrics(scoreAndLabels);

    metrics.areaUnderROC().then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "SVM With SGD");
  run(sc, spark).then(function(result) {
    console.log('Area under ROC:', result);
    stop();
  }).catch(stop);
}