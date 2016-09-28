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

function run(sc, spark) {
  return new Promise(function(resolve, reject) {
    var k = 3;
    var iterations = 10;
    var runs = 1;

    var data = sc.textFile(__dirname + "/data/kmeans_data.txt");

    var points = data.map(function(line, Vectors) {
      var tok = line.split(" ");
      var point = [];
      tok.forEach(function (t) {
        point.push(parseFloat(t));
      });
      return Vectors.dense(point);
    }, [spark.mllib.linalg.Vectors]);

    var model = spark.mllib.clustering.KMeans.train(points, k, iterations, runs, spark.mllib.clustering.KMeans.K_MEANS_PARALLEL);

    function createResulPromise(label, promise) {
      return new Promise(function(resolve, reject) {
        promise.then(function(result) {
          resolve([label, result])
        }).catch(reject);
      });
    }

    var promises = [];
    promises.push(createResulPromise("Cluster Centers", model.clusterCenters()));
    promises.push(createResulPromise("Cost", model.computeCost(points)));

    Promise.all(promises).then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "K Means");
  run(sc, spark).then(function(results) {
    results.forEach(function(result) {
      console.log(result[0], '=', result[1])
    });

    stop();
  }).catch(stop);
}