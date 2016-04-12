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

var sc = new spark.SparkContext("local[*]", "Regression Metrics Example");

var data = sc.textFile(__dirname + "/data/sample_linear_regression_data.txt");

var parsedData = data.map(function(line, LabeledPoint, Vectors) {
  var arr = line.split(" ");
  var features = arr.slice(1).map(function(item) {
    return parseFloat(item.split(":")[1]);
  });

  return new LabeledPoint(parseFloat(arr[0]), new Vectors.dense(features));
}, [spark.mllib.regression.LabeledPoint, spark.mllib.linalg.Vectors]).cache();

var numIterations = 100;
var model = spark.mllib.regression.LinearRegressionWithSGD.train(parsedData, numIterations);

var valuesAndPreds = parsedData.mapToPair(function(lp, model) {
  return new Tuple(
    model.predict(lp.getFeatures()),
    lp.getLabel()
  );
}, [model]); // end MapToPair

//Instantiate metrics object
var metrics = new spark.mllib.evaluation.RegressionMetrics(valuesAndPreds);

var promises = [];

promises.push(metrics.meanSquaredError());
promises.push(metrics.rootMeanSquaredError());
promises.push(metrics.r2());
promises.push(metrics.meanAbsoluteError());
promises.push(metrics.explainedVariance());

Promise.all(promises).then(function(results) {
  console.log("MSE:", results[0]);
  console.log("RMSE:", results[1]);
  console.log("R-squared:", results[2]);
  console.log("MAE:", results[3]);
  console.log("Explained variance:", results[3]);

  stop();
}).catch(stop);



