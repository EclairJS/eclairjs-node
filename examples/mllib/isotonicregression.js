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

var sc = new spark.SparkContext("local[*]", "Isotonic Regression Example");

var data = sc.textFile(__dirname + "/data/sample_isotonic_regression_data.txt");

// Create label, feature, weight tuples from input data with weight set to default value 1.0.
var parsedData = data.map(function(line, Tuple) {
  var parts = line.split(",");
  return new Tuple(parseFloat(parts[0]), parseFloat(parts[1]), 1.0);
}, [spark.Tuple]);

// Split data into training (60%) and test (40%) sets.
parsedData.randomSplit([0.6, 0.4], 11).then(function(splits) {
  var training = splits[0];
  var test = splits[1];

  // Create isotonic regression model from training data.
  // Isotonic parameter defaults to true so it is only shown for demonstration
  var model = new spark.mllib.regression.IsotonicRegression().setIsotonic(true).run(training);

  // Create tuples of predicted and real labels.
  var predictionAndLabel = test.mapToPair(function (point, model, Tuple) {
    var predictedLabel = model.predict(point[1]);
    return new Tuple(predictedLabel, point[0]);
  }, [model, spark.Tuple]);

  // Calculate mean squared error between predicted and real labels.
  new spark.rdd.FloatRDD(predictionAndLabel.map(function (pl) {
    return Math.pow(pl[0] - pl[1], 2);
  })).mean().then(function(mean) {
    console.log("Mean Squared Error:", mean);
    stop();
  }).catch(stop);

}).catch(stop);
