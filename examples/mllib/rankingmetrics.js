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

function run(sc, spark) {
  return new Promise(function(resolve, reject) {
    var data = sc.textFile(__dirname + "/data/sample_movielens_data.txt");

    var ratings = data.map(function(line, Rating) {
      var arr = line.split("::");
      var r = new Rating(parseInt(arr[0]),
        parseInt(arr[1]),
        parseFloat(arr[2]) - 2.5);
      return r;
    }, [spark.mllib.recommendation.Rating]).cache();

    var model = spark.mllib.recommendation.ALS.train(ratings, 10, 10, 0.01);

    var userRecs = model.recommendProductsForUsers(10);

    var userRecommendedScaled = userRecs.map(function(val, Tuple2, Rating) {
      var newRatings = val._2().map(function (r) {
        var newRating = Math.max(Math.min(r.rating(), 1.0), 0.0);
        return new Rating(r.user(), r.product(), newRating);
      });

      return new Tuple2(val._1(), newRatings);
    }, [spark.Tuple2, spark.mllib.recommendation.Rating]);

    var userRecommended = spark.rdd.PairRDD.fromRDD(userRecommendedScaled);

    var binarizedRatings = ratings.map(function(r) {
      var binaryRating = 0.0;
      if (r.rating() > 0.0) {
        binaryRating = 1.0;
      }

      return new Rating(r.user(), r.product(), binaryRating);
    });

    var userMovies = binarizedRatings.groupBy(function(r) {
      return r.user();
    });

    var userMoviesList = userMovies.mapValues(function(docs, List) {
      var products = new List();
      docs.forEach(function (r) {
        if (r.rating() > 0.0) {
          products.add(r.product());
        }
      });
      return products;
    }, [spark.List]);

    var userRecommendedList = userRecommended.mapValues(function(docs) {
      var products = new List();
      docs.forEach(function (r) {
        products.add(r.product());
      });
      return products;
    });

    var relevantDocs = userMoviesList.join(userRecommendedList).values();

    var metrics = spark.mllib.evaluation.RankingMetrics.of(relevantDocs);

    var userProducts = ratings.map(function(r, Tuple2) {
      return new Tuple2(r.user(), r.product());
    }, [spark.Tuple2]);

    var predictions = spark.rdd.PairRDD.fromRDD(model.predict(userProducts).map(function(r, Tuple2) {
      return new Tuple2(new Tuple2(r.user(), r.product()), r.rating());
    }, [spark.Tuple2]));

    var ratesAndPreds = spark.rdd.PairRDD.fromRDD(ratings.map(function(r, Tuple2) {
      return new Tuple2(new Tuple2(r.user(), r.product()), r.rating());
    }, [spark.Tuple2])).join(predictions).values();

    // Create regression metrics object
    var regressionMetrics = new spark.mllib.evaluation.RegressionMetrics(ratesAndPreds);
    function createResulPromise(label, promise) {
      return new Promise(function(resolve, reject) {
        promise.then(function(result) {
          resolve([label, result])
        }).catch(reject);
      });
    }

    var promises = [];

    promises.push(createResulPromise("Precision at 1", metrics.precisionAt(1)));
    promises.push(createResulPromise("NDCG at 1", metrics.ndcgAt(1)));
    promises.push(createResulPromise("Precision at 3", metrics.precisionAt(3)));
    promises.push(createResulPromise("NDCG at 3", metrics.ndcgAt(3)));
    promises.push(createResulPromise("Precision at 5", metrics.precisionAt(5)));
    promises.push(createResulPromise("NDCG at 5", metrics.ndcgAt(5)));
    promises.push(createResulPromise("Mean average precision", metrics.meanAveragePrecision()));
    promises.push(createResulPromise("RMSE", regressionMetrics.rootMeanSquaredError()));
    promises.push(createResulPromise("R-squared", regressionMetrics.r2()));

    Promise.all(promises).then(resolve).catch(reject);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();
  var sc =  new spark.SparkContext("local[*]", "Ranking Metrics");
  run(sc, spark).then(function(results) {
    results.forEach(function(result) {
      console.log(result[0], '=', result[1])
    });
    stop();
  }).catch(stop);
}