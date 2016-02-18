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

var rank = 12;
var iterations = 4;
var blocks = -1;

function featuresToString(tuple) {
  return tuple[0] + "," + tuple[2];
}

var sc = new spark.SparkContext("local[*]", "JavaScript ALS");

var lines = sc.textFile(__dirname + "/alsdata.txt");

var ratings = lines.map(function(line){
  var tok = line.split(",");
  var x = parseInt(tok[0]);
  var y = parseInt(tok[1]);
  var rating = parseFloat(tok[2]);
  return new Rating(x, y, rating);
});

var model = spark.mllib.recommendation.ALS.train(ratings, rank, iterations, 0.01, blocks);

var userFeatureRDD = model.userFeatures()
  .map(featuresToString)
  .saveAsTextFile(__dirname + "/userFeatures").then(function() {
    stop();
  }).catch(stop);
