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

   var data = [
      spark.sql.RowFactory.create(0, "a"),
      spark.sql.RowFactory.create(1, "b"),
      spark.sql.RowFactory.create(2, "c"),
      spark.sql.RowFactory.create(3, "a"),
      spark.sql.RowFactory.create(4, "a"),
      spark.sql.RowFactory.create(5, "c")
    ];
    var schema = new spark.sql.types.StructType([
      spark.sql.types.DataTypes.createStructField("id",
          spark.sql.types.DataTypes.IntegerType, false),
      spark.sql.types.DataTypes.createStructField("category",
          spark.sql.types.DataTypes.StringType, false)
    ]);
    var df = sparkSession.createDataFrame(data, schema);
    var indexer = new spark.ml.feature.StringIndexer()
      .setInputCol("category")
      .setOutputCol("categoryIndex");
    var indexed = indexer.fit(df).transform(df);

   indexed.take(10).then(resolve).catch(reject);
   // output.select("userFeatures", "features").take(1).then(resolve).catch(stop);

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
            .appName("string indexer")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
        spark.sql.DataFrame.show(results);
    stop();
  }).catch(stop);
}
