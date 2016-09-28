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
  sc.stop().then(exit).catch(exit);
}


function run(sc, spark) {
  return new Promise(function(resolve, reject) {
    var examples = spark.mllib.util.MLUtils.loadLibSVMFile(sc, __dirname + "/data/sample_binary_classification_data.txt");

    examples.count().then(function(numExamples) {
      if (numExamples > 0) {
        var fraction = 0.1;  // fraction of data to sample

        var expectedSampleSize = parseInt(numExamples * fraction);

        var sampledRDD = examples.sample(true, fraction);

        var promises = [];

        promises.push(sampledRDD.count());
        promises.push(examples.takeSample(true, expectedSampleSize));

        Promise.all(promises).then(resolve).catch(stop);
      } else {
        resolve();
      }
    }).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Sampled RDDs");
  run(sc, spark).then(function(results) {
    console.log('RDD.sample(): sample has ' + results[0] + ' examples');
    console.log('RDD.takeSample(): sample has ' + results[1].length + ' examples');
    stop();
  }).catch(stop);
}