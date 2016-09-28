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
  sparkSession.stop().then(exit).catch(exit);
}



function run(sparkSession, spark) {
  return new Promise(function(resolve, reject) {

    var data = sparkSession.read().format("libsvm").load("examples/mllib/data/sample_libsvm_data.txt");

    var indexer = new spark.ml.feature.VectorIndexer()
      .setInputCol("features")
      .setOutputCol("indexed")
      .setMaxCategories(10);
    var indexerModel = indexer.fit(data);

    // Create new column "indexed" with categorical values transformed to indices
    var indexedData = indexerModel.transform(data);

    var promises = [];
    promises.push(indexedData.take(5));
    promises.push(indexerModel.categoryMaps());

    Promise.all(promises).then(resolve).catch(reject);


  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sparkSession = spark.sql.SparkSession
            .builder()
            .appName("vectorindexer")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    // console.log('VectorIndexer result', JSON.stringify(results[0]));

    for (var feature in results[1])
      console.log('Catagory Maps feature ['+feature+'] : ', results[1][feature]);
    stop();
  }).catch(stop);
}
