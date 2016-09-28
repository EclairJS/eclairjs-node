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
      spark.sql.RowFactory.create(0, "Hi I heard about Spark"),
      spark.sql.RowFactory.create(1, "I wish Java could use case classes"),
      spark.sql.RowFactory.create(2, "Logistic,regression,models,are,neat")
    ];

    var schema = new spark.sql.types.StructType([
      new spark.sql.types.StructField("label", spark.sql.types.DataTypes.IntegerType,
          false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("sentence", spark.sql.types.DataTypes.StringType,
          false, spark.sql.types.Metadata.empty())
    ]);

    var sentenceDataFrame = sparkSession.createDataFrame(data, schema);

    var tokenizer = new spark.ml.feature.Tokenizer().setInputCol("sentence").setOutputCol("words");

    var wordsDataFrame = tokenizer.transform(sentenceDataFrame);
    var output="";
    wordsDataFrame.select("words", "label"). take(3).then(resolve).catch(reject);
    // for (var i=0;i<wordList.length;i++) {
    //   var words = wordList[i].getList(0);
    //   for (var inx=0;inx<words.length;inx++) output+=words[inx] + " ";
    //   output+="\n";
    // }

    // var regexTokenizer = new spark.ml.feature.RegexTokenizer()
    //   .setInputCol("sentence")
    //   .setOutputCol("words")
    //   .setPattern("\\W");  // alternatively .setPattern("\\w+").setGaps(false);



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
            .appName("tokenizer")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
        console.log("Results: ",JSON.stringify(results));
    stop();
  }).catch(stop);
}
