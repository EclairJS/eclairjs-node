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


    var rows = [
        spark.sql.RowFactory.create(["Hi I heard about Spark".split(" ")]),
        spark.sql.RowFactory.create(["I wish Java could use case classes".split(" ")]),
        spark.sql.RowFactory.create(["Logistic regression models are neat".split(" ")])
    ];
    var sf = new spark.sql.types.StructField("text",
          new spark.sql.types.ArrayType(spark.sql.types.DataTypes.StringType, true),
          false, spark.sql.types.Metadata.empty());
    var sfa = [sf];
    var schema = new spark.sql.types.StructType(sfa);
    var documentDF = sparkSession.createDataFrame(rows, schema);

// Learn a mapping from words to Vectors.
    var word2Vec = new spark.ml.feature.Word2Vec()
        .setInputCol("text")
        .setOutputCol("result")
        .setVectorSize(3)
        .setMinCount(0);
    var model = word2Vec.fit(documentDF);
    var result=model.transform(documentDF);
    result.select("result").take(3).then(resolve).catch(reject);


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
            .appName("word2Vec")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    spark.sql.DataFrame.show(results);
    stop();
  }).catch(stop);
}
