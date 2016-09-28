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
    var List = spark.List;

    var sequences = sc.parallelize([
      new List([new List([1, 2]), new List([3])]),
      new List([new List([1]), new List([3, 2]), new List([1, 2])]),
      new List([new List([1, 2]), new List([5])]),
      new List([new List([6])])
    ], 2);

    var prefixSpan = new spark.mllib.fpm.PrefixSpan()
      .setMinSupport(0.5)
      .setMaxPatternLength(5);
    var model = prefixSpan.run(sequences);

    model.freqSequences().collect().then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Prefix Span");
  run(sc, spark).then(function(result) {
    console.log(JSON.stringify(result));
    stop();
  }).catch(stop);
}