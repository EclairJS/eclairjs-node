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
    var data = sc.textFile(__dirname + "/data/sample_lda_data.txt");

    var parsedData = data.map(function (s, Vectors) {
      var sarray = s.trim().split(" ");
      var values = [];
      for (var i = 0; i < sarray.length; i++) {
        values[i] = parseFloat(sarray[i]);
      }
      return Vectors.dense(values);
    }, [spark.mllib.linalg.Vectors]);

      // Index documents with unique IDs
    var zipIndex = parsedData.zipWithIndex().map(function(doc_id, Tuple2) {
      return new Tuple2(doc_id._2(), doc_id._1()); // swap
    }, [spark.Tuple2]);

    var corpus = spark.rdd.PairRDD.fromRDD(zipIndex).cache();

      // Cluster the documents into three topics using LDA
    var ldaModel = new spark.mllib.clustering.LDA().setK(3).run(corpus);

    var promises = [];

    // Output topics. Each is a distribution over words (matching word count vectors)
    promises.push(createResulPromise('Vocab Size', ldaModel.vocabSize()));

    promises.push(createResulPromise('Topics Matrix', ldaModel.topicsMatrix().toArray()));

    Promise.all(promises).then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "LDA");
  run(sc, spark).then(function(results) {
    results.forEach(function(result) {
      console.log(result[0], '=', result[1])
    });
    stop();
  }).catch(stop);
}