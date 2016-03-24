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

var sc = new spark.SparkContext("local[*]", "Collaborative Filtering Example");

var data = sc.textFile(__dirname + "/data/alsdata.txt");

var ratings = data.map(function (s) {
  var sarray = s.split(",");
  return new Rating(parseInt(sarray[0]), parseInt(sarray[1]), parseFloat(sarray[2]));
});

// Build the recommendation model using ALS
var rank = 10;
var numIterations = 10;
var model = spark.mllib.recommendation.ALS.train(ratings, rank, numIterations, 0.01);

// Evaluate the model on rating data
var userProducts = ratings.map(function (r) {
  return new Tuple(r.user(), r.product());
});


var predictions = spark.rdd.PairRDD.fromRDD(model.predict(userProducts).map(function (r) {
  return new Tuple(new Tuple(r.user(), r.product()), r.rating());
}));

var ratesAndPreds = spark.rdd.PairRDD.fromRDD(ratings.map(function (r) {
  return new Tuple(new Tuple(r.user(), r.product()), r.rating());
})).join(predictions).values();

var MSE = spark.rdd.FloatRDD.fromRDD(ratesAndPreds.map(function (pair) {
  var err = pair[0] - pair[1];
  return err * err;
}))

var x = MSE.mean();

x.then(function(result) {
  console.log('Mean Squared Error:', result);
  stop();
}).catch(stop);