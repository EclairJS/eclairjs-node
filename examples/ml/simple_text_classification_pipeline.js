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
  sparkSession.stop().then(exit).catch(exit);
}



function run(sparkSession, spark) {
  return new Promise(function(resolve, reject) {
    // Prepare training documents, which are labeled.
    var localTraining = [
      { "id" : 0 , "text" : "a b c d e spark", "label" : 1.0},
      { "id" : 1 , "text" : "b d", "label" : 0.0},
      { "id" : 2 , "text" : "spark f g h", "label" : 1.0},
      { "id" : 3 , "text" : "hadoop mapreduce", "label" : 0.0}];

    var training = sparkSession.createDataFrameFromJson(localTraining, {
        "id" :"Integer",
        "text" :"String",
        "label" :"Double"
    });

    // Configure an ML pipeline, which consists of three stages: tokenizer, hashingTF, and lr.
    var tokenizer = new spark.ml.feature.Tokenizer()
      .setInputCol("text")
     .setOutputCol("words");

    var hashingTF = new spark.ml.feature.HashingTF()
      .setNumFeatures(1000)
      .setInputCol(tokenizer.getOutputCol())
      .setOutputCol("features");
    var lr = new spark.ml.classification.LogisticRegression()
      .setMaxIter(10)
      .setRegParam(0.001);
    var pipeline = new spark.ml.Pipeline()
      .setStages([tokenizer, hashingTF, lr]);

    // Fit the pipeline to training documents.
    var model = pipeline.fit(training);

    // Prepare test documents, which are unlabeled.
    localTest = [
      {"id": 4, "text": "spark i j k"},
      {"id": 5, "text": "l m n"},
      {"id": 6, "text": "spark hadoop spark"},
      {"id": 7, "text": "apache hadoop"}];
    var test = sparkSession.createDataFrameFromJson(localTest, {
      "id": "Integer",
      "text": "String"
    });

    // Make predictions on test documents.
    var predictions = model.transform(test);
    var rows = predictions.select("id", "text", "probability", "prediction");

    rows.take(5).then(resolve).catch(reject);
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
            .appName("simple text classification")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
        console.log(JSON.stringify(results));
    stop();
  }).catch(stop);
}
