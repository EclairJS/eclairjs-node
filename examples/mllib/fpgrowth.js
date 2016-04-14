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

var sc = new spark.SparkContext("local[*]", "FP Growth");

var minSupport = 0.3;
var numPartition = -1;

var data = sc.textFile(__dirname + "/data/sample_fpgrowth.txt")

var transactions = data.map(function(s, List) {
  return new List(s.split(" "));
}, [spark.List]);

var model = new spark.mllib.fpm.FPGrowth()
  .setMinSupport(minSupport)
  .setNumPartitions(numPartition)
  .run(transactions);

var freqItemsRDD = model.freqItemsets();
freqItemsRDD.collect().then(function(results) {
  results.forEach(function(itemSet) {
    console.log(itemSet.items, itemSet.freq)
  });

  stop();
}).catch(stop);
