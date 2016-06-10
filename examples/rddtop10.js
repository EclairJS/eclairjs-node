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

var spark = require('../lib/index.js');

var sc = new spark.SparkContext("local[*]", "foo");

var file = __dirname + '/dream.txt';

// first argument is a new filename
if (process.argv.length > 2) {
  file = process.argv[2];
}

var rdd = sc.textFile(file);

var rdd2 = rdd.flatMap(function(sentence) {
  return sentence.split(" ");
});

var rdd3 = rdd2.filter(function(word) {
  return word.trim().length > 0;
});

var rdd4 = rdd3.mapToPair(function(word, Tuple2) {
  return new Tuple2(word.toLowerCase(), 1);
}, [spark.Tuple2]);

var rdd5 = rdd4.reduceByKey(function(value1, value2) {
  return value1 + value2;
});

var rdd6 = rdd5.mapToPair(function(tuple, Tuple2) {
  return new Tuple2(tuple._2() + 0.0, tuple._1());
}, [spark.Tuple2]);

var rdd7 = rdd6.sortByKey(false);

rdd7.take(10).then(function(val) {
  console.log("Success:", val);

  sc.stop().then(function() {
    process.exit();
  }).catch(function(e) {
    console.log(e);
    process.exit();
  });

}).catch(function(err) {
  console.log("Error:", err);
  sc.stop().then(function() {
    process.exit();
  });
});