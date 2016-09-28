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

    data.randomSplit([0.7, 0.3]).then(function(splits) {
      var trainingData = splits[0];
      var testData = splits[1];

      // Set parameters.
      //  Empty categoricalFeaturesInfo indicates all features are continuous.
      var numClasses = 2;
      var categoricalFeaturesInfo = {};
      var impurity = "gini";
      var maxDepth = 5;
      var maxBins = 32;

      // Train a DecisionTree model for classification.
      var model = spark.mllib.tree.DecisionTree.trainClassifier(trainingData, numClasses, categoricalFeaturesInfo, impurity, maxDepth, maxBins);

      // Evaluate model on test instances and compute test error
      var predictionAndLabel = testData.mapToPair(function (labeledPoint, model, Tuple2) {
        return new Tuple2(model.predict(labeledPoint.getFeatures()), labeledPoint.getLabel());
      }, [model, spark.Tuple2]);

      var result = predictionAndLabel.filter(function (tuple2) {
        return (tuple2[0] != tuple2[1]);
      });

      var promises = [];

      promises.push(result.count());
      promises.push(testData.count());

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
  var sc =  new spark.SparkContext("local[*]", "Decision Tree Classification");
  run(sc, spark).then(function(results) {
    console.log("Test Error:", results[0] / results[1]);
    stop();
  }).catch(stop);
}