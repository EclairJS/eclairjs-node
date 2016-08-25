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

var eclairjs = require('../lib/index.js');

var spark1 = new eclairjs();
var spark2 = new eclairjs();

var sc1 = new spark1.SparkContext("local[*]", "Job 1");
var sc2 = new spark2.SparkContext("local[*]", "Job 2");

var p1 = sc1.parallelize([1,2,3,4]).collect();
var p2 = sc2.parallelize([5,6,7,8]).collect();

Promise.all([p1,p2]).then(function(results) {
  console.log("Success:", results);
  stop();
}).catch(function(err) {
  stop(err);
});

// stop spark streaming when we stop the node program
process.on('SIGTERM', stop);
process.on('SIGINT', stop);

function exit() {
  process.exit(0);
}

function stop(e) {
  if (e) {
    console.log('Error:', e);
  }

  var p = [];
  p.push(sc1.stop());
  p.push(sc2.stop());

  Promise.all(p).then(exit).catch(exit);
}