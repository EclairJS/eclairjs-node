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

var spark = require('../spark.js');

var sc = new spark.SparkContext("local[*]", "foo");

var rdd = sc.textFile("./dream.txt"); // Should be some file on your system

var rdd2 = rdd.flatMap(function(sentence) {
  return sentence.split(" ");
});

var rdd3 = rdd2.filter(function(word) {
  return word.trim().length > 0;
});

var rdd4 = rdd3.mapToPair(function(word) {
  return [word.toLowerCase(),1]
});

var rdd5 = rdd4.reduceByKey(function(acc, v) {
  return acc + v;
});

var rdd6 = rdd5.mapToPair(function(tuple) {
  return [tuple[1]+0.0, tuple[0]];
});

var rdd7 = rdd6.sortByKey(false);

rdd7.take(10).then(function(val) {
  console.log("Success:", val);
}).catch(function(err) {
  console.log("Error:", err);
});
