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
    var similarities = sc.parallelize([
      new spark.Tuple3(spark.forceFloat(0.0), spark.forceFloat(1.0), 0.9),
      new spark.Tuple3(spark.forceFloat(1.0), spark.forceFloat(2.0), 0.9),
      new spark.Tuple3(spark.forceFloat(2.0), spark.forceFloat(3.0), 0.9),
      new spark.Tuple3(spark.forceFloat(3.0), spark.forceFloat(4.0), 0.1),
      new spark.Tuple3(spark.forceFloat(4.0), spark.forceFloat(5.0), 0.9)
    ]);

    var pic = new spark.mllib.clustering.PowerIterationClustering()
      .setK(2)
      .setMaxIterations(10);

    var model = pic.run(similarities);

    model.assignments().collect().then(resolve).catch(stop);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Power Iteration Clustering");
  run(sc, spark).then(function(results) {
    console.log(results);
    stop();
  }).catch(stop);
}