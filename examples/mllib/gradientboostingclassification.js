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

    // Split the data into training and test sets (30% held out for testing)
    data.randomSplit([0.7, 0.3]).then(function(splits) {
      var trainingData = splits[0];
      var testData = splits[1];

      // Train a GradientBoostedTrees model.
      // The defaultParams for Classification use LogLoss by default.
      var boostingStrategy = spark.mllib.tree.configuration.BoostingStrategy.defaultParams("Classification");

      // Note: Use more iterations in practice.
      boostingStrategy.setNumIterations(3).then(function() {
        var treeStrat = boostingStrategy.getTreeStrategy();

        var promises = [];

        promises.push(boostingStrategy.getTreeStrategy().setNumClasses(2));
        promises.push(boostingStrategy.getTreeStrategy().setMaxDepth(5));

        // Empty categoricalFeaturesInfo indicates all features are continuous.
        var categoricalFeaturesInfo = {};
        promises.push(boostingStrategy.getTreeStrategy().setCategoricalFeaturesInfo(categoricalFeaturesInfo));

        Promise.all(promises).then(function() {
          var model = spark.mllib.tree.GradientBoostedTrees.train(trainingData, boostingStrategy);

          var predictionAndLabel = testData.mapToPair(function (lp, model, Tuple2) {
            return new Tuple2(model.predict(lp.getFeatures()), lp.getLabel());
          }, [model, spark.Tuple2]);

          var filtered = predictionAndLabel.filter(function (tuple) {
            return tuple._1() != tuple._2();
          });

          var promises = [];
          promises.push(filtered.count());
          promises.push(testData.count());

          Promise.all(promises).then(resolve).catch(reject);
        }).catch(reject)
      }).catch(reject);
    }).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Gradient Boosting Classification");
  run(sc, spark).then(function(results) {
    console.log("Test Error:", results[0]/results[1]);
    stop();
  }).catch(stop);
}