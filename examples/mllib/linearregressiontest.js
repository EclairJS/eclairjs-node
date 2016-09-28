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
  sc.stop().then(exit).catch(exit)
}

function run(sc, spark) {
  return new Promise(function(resolve, reject) {
    var data = sc.textFile(__dirname + "/data/lpsa.txt");

    var parsedData = data.map(function (s, LabeledPoint, DenseVector) {
      var parts = s.split(",");
      var features = parts[1].split(" ");
      return new LabeledPoint(parts[0], new DenseVector(features));
    }, [spark.mllib.regression.LabeledPoint, spark.mllib.linalg.DenseVector]);

    var numIterations = 3;
    var linearRegressionModel = spark.mllib.regression.LinearRegressionWithSGD.train(parsedData, numIterations);

    var delta = 17;
    var valuesAndPreds = parsedData.mapToPair(function (lp, linearRegressionModel, Tuple) {
      var label = lp.getLabel();
      var f = lp.getFeatures();
      var prediction = linearRegressionModel.predict(f) + 17;
      return new Tuple(prediction, label);
    }, [linearRegressionModel, spark.Tuple2]); // end MapToPair

    valuesAndPreds.take(10).then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Linear Regression Test");
  run(sc, spark).then(function(result) {
    console.log(result);
    stop();
  }).catch(stop);
}