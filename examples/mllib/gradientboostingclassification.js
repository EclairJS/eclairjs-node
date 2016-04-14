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

var spark = require('../../lib/index.js');

var sc = new spark.SparkContext("local[*]", "Gradient Boosting Classification");

var data =  spark.mllib.util.MLUtils.loadLibSVMFile(sc, __dirname + "/data/sample_libsvm_data.txt");

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

    promises.push(treeStrat.setNumClasses(2));
    promises.push(treeStrat.setMaxDepth(5));

    // Empty categoricalFeaturesInfo indicates all features are continuous.
    var categoricalFeaturesInfo = {};
    promises.push(treeStrat.setCategoricalFeaturesInfo(categoricalFeaturesInfo));

    Promise.all(promises).then(function() {
      var model = spark.mllib.tree.GradientBoostedTrees.train(trainingData, boostingStrategy);

      var predictionAndLabel = testData.mapToPair(function (lp, model, Tuple) {
        return new Tuple(model.predict(lp.getFeatures()), lp.getLabel());
      }, [model, spark.Tuple]);

      var filtered = predictionAndLabel.filter(function (tuple) {
        return tuple[0] != tuple[1];
      });

      var promises = [];
      promises.push(filtered.count());
      promises.push(testData.count());

      Promise.all(promises).then(function(results) {
        console.log("Test Error:", results[0]/results[1]);
        stop();
      }).catch(stop);
    }).catch(stop)
  });
}).catch(stop);
