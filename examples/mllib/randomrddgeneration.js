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
    var numExamples = 10000; // # number of examples to generate

    var promises = [];

    // Example: RandomRDDs.normalRDD
    var normalRDD = spark.mllib.random.RandomRDDs.normalRDD(sc, numExamples);

    promises.push(normalRDD.count());
    promises.push(normalRDD.take(5));

    // Example: RandomRDDs.normalVectorRDD
    var normalVectorRDD = spark.mllib.random.RandomRDDs.normalVectorRDD(sc, numExamples, 2);

    promises.push(normalVectorRDD.count());
    promises.push(normalVectorRDD.take(5));

    Promise.all(promises).then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Random RDD Generation");
  run(sc, spark).then(function(results) {
    console.log('Generated RDD examples sampled from the standard normal distribution:',results[0]);
    console.log('  First 5:',results[1]);

    console.log('Generated RDD examples of length-2 vectors:',results[2]);
    console.log('  First 5:',results[3]);
    stop();
  }).catch(stop);
}