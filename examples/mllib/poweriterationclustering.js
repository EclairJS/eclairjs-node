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

var sc = new spark.SparkContext("local[*]", "Power Iteration Clustering Example");

var similarities = sc.parallelize([
  new spark.Tuple(0, 1, 0.9),
  new spark.Tuple(1, 2, 0.9),
  new spark.Tuple(2, 3, 0.9),
  new spark.Tuple(3, 4, 0.1),
  new spark.Tuple(4, 5, 0.9)
]);

var pic = new spark.mllib.clustering.PowerIterationClustering()
  .setK(2)
  .setMaxIterations(10);
var model = pic.run(similarities);

model.assignments().collect().then(function(results) {
  console.log(results);
}).then().catch(stop);