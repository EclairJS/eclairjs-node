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

function run(sc, spark) {
  return new Promise(function(resolve, reject) {
    var Vectors = spark.mllib.linalg.Vectors;

    var data = sc.textFile(__dirname + "/data/random.data");

    var rowsList = [Vectors.dense([1.12, 2.05, 3.12]), Vectors.dense([5.56, 6.28, 8.94]), Vectors.dense([10.2, 8.0, 20.5])];

    var rows = sc.parallelize(rowsList);

    // Create a RowMatrix from JavaRDD<Vector>.
    var mat = new spark.mllib.linalg.distributed.RowMatrix(rows);

    // Compute the top 3 principal components.
    var pc = mat.computePrincipalComponents(3);
    var projected = mat.multiply(pc);

    projected.rows().collect().then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "PCA");
  run(sc, spark).then(function(results) {
    console.log('Projected vector of principal component:', results);
    stop();
  }).catch(stop);
}