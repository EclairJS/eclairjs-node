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

function createResultPromise(label, promise) {
  return new Promise(function(resolve, reject) {
    promise.then(function(result) {
      resolve([label, result])
    }).catch(reject);
  });
}

function run(sc, spark) {
  return new Promise(function(resolve, reject) {
    var rows = sc.parallelize([
      spark.mllib.linalg.Vectors.dense([1.12, 2.05, 3.12]),
      spark.mllib.linalg.Vectors.dense([5.56, 6.28, 8.94]),
      spark.mllib.linalg.Vectors.dense([10.2, 8.0, 20.5])
    ]);

    // Create a RowMatrix from JavaRDD<Vector>.
    var mat = new spark.mllib.linalg.distributed.RowMatrix(rows);

    // Compute the top 3 singular values and corresponding singular vectors.
    var svd = mat.computeSVD(3, true, 0.000000001);

    var promises = [];
    promises.push(createResultPromise('U Factor', svd.U()));
    promises.push(createResultPromise('Singular values are:', svd.s().toJSON()));
    promises.push(createResultPromise('V factor is:', svd.V()));

    Promise.all(promises).then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "SVD");
  run(sc, spark).then(function(results) {
    results.forEach(function(result) {
      console.log(result[0], '=', result[1])
    });

    stop();
  }).catch(stop);
}