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

function run(sc) {
  return new Promise(function(resolve, reject) {
    var sqlContext = new spark.sql.SQLContext(sc);

    var remover = new spark.ml.feature.StopWordsRemover()
      .setInputCol("raw")
      .setOutputCol("filtered");

    var rdd = sc.parallelize([
      spark.sql.RowFactory.create([["I", "saw", "the", "red", "baloon"]]),
      spark.sql.RowFactory.create([["Mary", "had", "a", "little", "lamb"]])
    ]);

    var schema = new spark.sql.types.StructType([
      new spark.sql.types.StructField(
        "raw", spark.sql.types.DataTypes.createArrayType(spark.sql.types.DataTypes.StringType),
         false, spark.sql.types.Metadata.empty())
    ]);

    var dataset = sqlContext.createDataFrame(rdd, schema);
    remover.transform(dataset).take(3).then(resolve).catch(reject);

  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var sc = new spark.SparkContext("local[*]", "vectorslicer");
  run(sc).then(function(results) {
        console.log(JSON.stringify(results));
    stop();
  }).catch(stop);
}
