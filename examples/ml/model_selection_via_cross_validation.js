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
    console.log(e.stack);
  }
  sparkSession.stop().then(exit).catch(exit);
}



function run(sparkSession, spark) {
  return new Promise(function(resolve, reject) {



    function LabeledDocument(id, text, label)
    {
        this.id=id;
        this.text=text;
        this.label=label;
    }

    function Document(id, text)
    {
        this.id=id;
        this.text=text;
    }

    // Prepare training documents, which are labeled.
    var localTraining = [
        new LabeledDocument(0 , "a b c d e spark", 1.0),
        new LabeledDocument(1 , "b d", 0.0),
        new LabeledDocument(2 , "spark f g h", 1.0),
        new LabeledDocument(3 , "hadoop mapreduce", 0.0),
        new LabeledDocument(4 , "b spark who", 1.0),
        new LabeledDocument(5 , "g d a y", 0.0),
        new LabeledDocument(6 , "spark fly", 1.0),
        new LabeledDocument(7 , "was mapreduce", 0.0),
        new LabeledDocument(8 , "e spark program", 1.0),
        new LabeledDocument(9 , "a e c l", 0.0),
        new LabeledDocument(10 , "spark compile", 1.0),
        new LabeledDocument(11 , "hadoop software", 0.0)
    ];
    var training = sparkSession.createDataFrameFromJson(localTraining, {
        id:"Integer",
        text:"String",
        label:"Double"
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
        .setRegParam(0.01);
    var pipeline = new spark.ml.Pipeline()
        .setStages([tokenizer, hashingTF, lr]);

    // We use a ParamGridBuilder to construct a grid of parameters to search over.
    // With 3 values for hashingTF.numFeatures and 2 values for lr.regParam,
    // this grid will have 3 x 2 = 6 parameter settings for CrossValidator to choose from.
    new spark.ml.tuning.ParamGridBuilder()
        .addGrid(hashingTF.numFeatures(), [10, 100, 1000])
        .addGrid(lr.regParam(), [0.1, 0.01])
        .build().then(function(paramGrid) {

        // We now treat the Pipeline as an Estimator, wrapping it in a CrossValidator instance.
        // This will allow us to jointly choose parameters for all Pipeline stages.
        // A CrossValidator requires an Estimator, a set of Estimator ParamMaps, and an Evaluator.
        // Note that the evaluator here is a BinaryClassificationEvaluator and its default metric
        // is areaUnderROC.
        var cv = new spark.ml.tuning.CrossValidator()
            .setEstimator(pipeline)
            .setEvaluator(new spark.ml.evaluation.BinaryClassificationEvaluator())
            .setEstimatorParamMaps(paramGrid).setNumFolds(2);  // Use 3+ in practice

        // Run cross-validation, and choose the best set of parameters.
        var cvModel = cv.fit(training);

        // Prepare test documents, which are unlabeled.
        var localTest = [
            new Document(4, "spark i j k"),
            new Document(5, "l m n"),
            new Document(6, "mapreduce spark"),
            new Document(7, "apache hadoop")];
        var test = sparkSession.createDataFrameFromJson(localTest, {
            id:"Integer",
            text:"String"
        });

        // Make predictions on test documents. cvModel uses the best model found (lrModel).
        var predictions = cvModel.transform(test);

        var rows = predictions.select("id", "text", "probability", "prediction").take(10).then(resolve).catch(reject);
      });


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
            .appName("Model Selection Via Cross Validation")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    console.log("Results:", JSON.stringify(results));
    stop();
  }).catch(stop);
}
