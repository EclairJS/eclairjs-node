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
    console.log(e);
  }
  sparkSession.stop().then(exit).catch(exit);
}



function run(sparkSession, spark) {
  return new Promise(function(resolve, reject) {

    // Loads training data
    var dataset = sparkSession.read().format("libsvm").load(__dirname + '/../mllib/data/sample_kmeans_data.txt');

    // Trains a GaussianMixture model
    var gmm = new spark.ml.clustering.GaussianMixture().setK(2);

    var model = gmm.fit(dataset);

    function createResultPromise(label, promise, stringify) {
      return new Promise(function(resolve, reject) {
        promise.then(function(result) {
          resolve([label, stringify ? JSON.stringify(result) : result]);
        }).catch(reject);
      });
    }


    var promises = [];
    promises.push(createResultPromise("Weights:", model.weights()));
    promises.push(createResultPromise("gaussiansDF:", model.gaussiansDF().take(5), true));

    // Shows the result
    Promise.all(promises).then(resolve).catch(reject);
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
            .appName("GaussianMixture")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    results.forEach(function (result) {
      console.log(result[0], result[1]);
    });
    stop();
  }).catch(stop);
}
