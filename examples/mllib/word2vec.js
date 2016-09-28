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

/*

 This example uses text8 file from http://mattmahoney.net/dc/text8.zip
 The file was downloadded, unziped and split into multiple lines using

 wget http://mattmahoney.net/dc/text8.zip
 unzip text8.zip
 grep -o -E '\w+(\W+\w+){0,15}' text8 > text8_lines
 This was done so that the example can be run in local mode
 NOTE: this example can take 5-10 minutes to run

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

var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Word2Vec");

var rdd = sc.textFile(__dirname + '/text8_lines').map(function(s, List) {
  return new List(s.split(" "));
}, [spark.List]);

var word2vec = new spark.mllib.feature.Word2Vec();

var model = word2vec.fit(rdd);

var synonyms = model.findSynonyms('china', 40).then(function(result) {
  console.log(result);

  stop();
}).catch(stop);
