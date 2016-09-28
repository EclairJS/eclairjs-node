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
    var data = sparkSession.read().format("libsvm")
      .load(__dirname+"/../mllib/data/sample_multiclass_classification_data.txt");


    // Prepare training and test data.
    data.randomSplit([0.6, 0.4], 1234).then(function(splits) {
      var train = splits[0];
      var test = splits[1];

      // specify layers for the neural network:
      // input layer of size 4 (features), two intermediate of size 5 and 4
      // and output of size 3 (classes)
      var layers = [4, 5, 4, 3];
      // create the trainer and set its parameters
      var trainer = new spark.ml.classification.MultilayerPerceptronClassifier()
        .setLayers(layers)
        .setBlockSize(128)
        .setSeed(1234)
        .setMaxIter(100);
      // train the model
      var model = trainer.fit(train);
      // compute precision on the test set
      var result = model.transform(test);
      var predictionAndLabels = result.select("prediction", "label");
      var evaluator = new spark.ml.evaluation.MulticlassClassificationEvaluator()
        .setMetricName("accuracy");

      evaluator.evaluate(predictionAndLabels).then(resolve).catch(reject);
    }).catch(reject)
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
            .appName("Multi Layer Perceptron Classifier")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    console.log("Accuracy:", results);
    stop();
  }).catch(stop);
}
