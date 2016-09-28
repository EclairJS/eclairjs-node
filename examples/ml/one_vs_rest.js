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

var path = require('path');

function exit() {
  process.exit();
}

function stop(e) {
  if (e) {
    console.log(e.stack);
  }
  sparkSession.stop().then(exit).catch(exit);
}



var fileName = path.resolve(__dirname+'/../mllib/data/sample_multiclass_classification_data.txt');

function run(sparkSession, spark) {
  return new Promise(function(resolve, reject) {
    var inputdata = sparkSession.read().format("libsvm")
        .load(fileName);

    // Split the data into train and test
    inputdata.randomSplit([0.8, 0.2]).then(function(splits){
        var train = splits[0];
        var test = splits[1];

        // configure the base classifier.
        var classifier = new spark.ml.classification.LogisticRegression()
          .setMaxIter(10)
          .setTol(1E-6)
          .setFitIntercept(true);

        // instantiate the One Vs Rest Classifier.
        var ovr = new spark.ml.classification.OneVsRest().setClassifier(classifier);

        // train the multiclass model.
        var ovrModel = ovr.fit(train);


        // score the model on test data.
        var predictions = ovrModel.transform(test).select("prediction", "label");

        // obtain evaluator.
        var evaluator = new spark.ml.evaluation.MulticlassClassificationEvaluator().setMetricName("accuracy");

        // compute the classification error on test data.
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
            .appName("One vs Rest")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    console.log("Result:", JSON.stringify(results));
    stop();
  }).catch(stop);
}
