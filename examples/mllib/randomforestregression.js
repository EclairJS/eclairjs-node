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
    var k = 3;
    var iterations = 10;
    var runs = 1;
    var data =  spark.mllib.util.MLUtils.loadLibSVMFile(sc, __dirname + "/data/sample_libsvm_data.txt");

    data.randomSplit([0.7, 0.3]).then(function(splits) {
      var trainingData = splits[0];
      var testData = splits[1];

      // Set parameters.
      // Empty categoricalFeaturesInfo indicates all features are continuous.
      var categoricalFeaturesInfo = {};
      var numTrees = 3; // Use more in practice.
      var featureSubsetStrategy = "auto"; // Let the algorithm choose.
      var impurity = "variance";
      var maxDepth = 4;
      var maxBins = 32;
      var seed = 12345;

      // Train a RandomForest model.
      var model = spark.mllib.tree.RandomForest.trainRegressor(
        trainingData,
        categoricalFeaturesInfo,
        numTrees,
        featureSubsetStrategy,
        impurity,
        maxDepth,
        maxBins,
        seed
      );

      // Evaluate model on test instances and compute test error
      var predictionAndLabel = testData.mapToPair(function(p, model, Tuple2) {
        return new Tuple2(model.predict(p.getFeatures()), p.getLabel());
      }, [model, spark.Tuple2]);

      var reduce = predictionAndLabel.map(function(tup) {
        var diff = tup[0] - tup[1];
        return diff * diff;
      }).reduce(function(a, b) {
        return a + b;
      });

      var promises = [];
      promises.push(reduce);
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
  var sc =  new spark.SparkContext("local[*]", "Random Forest Regression");
  run(sc, spark).then(function(results) {
    console.log("Test Mean Squared Error:", results[0]/results[1]);
    stop();
  }).catch(stop);
}