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

function createResulPromise(label, promise) {
  return new Promise(function(resolve, reject) {
    promise.then(function(result) {
      resolve([label, result])
    }).catch(reject);
  });
}


var spark = require('../../lib/index.js');

var sc = new spark.SparkContext("local[*]", "LR Example");

var data = sc.textFile(__dirname + "/data/random.data");

var points = data.map(function (line) {
  var parts = line.split(",");
  var y = parseFloat(parts[0]);
  var tok = parts[1].split(" ");
  var x = [];
  for (var i = 0; i < tok.length; ++i) {
    x[i] = parseFloat(tok[i]);
  }

  return new LabeledPoint(y, Vectors.dense(x));
}).cache();

var stepSize = 3.0;
var iterations = 10;

var model = spark.mllib.classification.LogisticRegressionWithSGD.train(points, iterations, stepSize);

model.weights().then(function(weights) {
  console.log('Final weight:', weights);
}).catch(stop);