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

    function parseRating(str, RowFactory) {
      var fields = str.split("::");
      if (fields.length != 4) {
        throw("Each line must contain 4 fields");
      }
      var userId = parseInt(fields[0]);
      var movieId = parseInt(fields[1]);
      var rating = parseFloat(fields[2]);
      var timestamp = parseInt(fields[3]);

      return RowFactory.create([userId, movieId, rating, timestamp]);
    }

    var ratingsRDD = sparkSession
        .read().textFile(__dirname + '/data/sample_movielens_ratings.txt').toRDD()
        .map(parseRating, [spark.sql.RowFactory]);

    var schema = new spark.sql.types.StructType([
      new spark.sql.types.StructField("userId", spark.sql.types.DataTypes.IntegerType, false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("movieId", spark.sql.types.DataTypes.IntegerType, false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("rating", spark.sql.types.DataTypes.FloatType, false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("timestamp", spark.sql.types.DataTypes.DoubleType, false, spark.sql.types.Metadata.empty())
    ]);

    var ratings = sparkSession.createDataFrame(ratingsRDD, schema);
    ratings.randomSplit([0.8, 0.2]).then(function(splits) {
      var training = splits[0];
      var test = splits[1];

      var als = new spark.ml.recommendation.ALS()
        .setMaxIter(5)
        .setRegParam(0.01)
        .setUserCol("userId")
        .setItemCol("movieId")
        .setRatingCol("rating");
      var model = als.fit(training);

      // Evaluate the model by computing the RMSE on the test data
      var rawPredictions = model.transform(test);
      var predictions = rawPredictions
        .withColumn("rating", rawPredictions.col("rating").cast(spark.sql.types.DataTypes.DoubleType))
        .withColumn("prediction", rawPredictions.col("prediction").cast(spark.sql.types.DataTypes.DoubleType));

      var evaluator = new spark.ml.evaluation.RegressionEvaluator()
        .setMetricName("rmse")
        .setLabelCol("rating")
        .setPredictionCol("prediction");
      evaluator.evaluate(predictions).then(resolve).catch(reject);
    }).catch(stop);
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
            .appName("ALS")
            .getOrCreate();
  run(sparkSession, spark).then(function(results) {
    console.log('Root-mean-square error', results);
    stop();
  }).catch(stop);
}
