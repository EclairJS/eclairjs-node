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
  sc.stop().then(exit).catch(exit);
}

var k = 3;

function run(sc, spark) {
  return new Promise(function(resolve, reject) {
    var sqlContext = new spark.sql.SQLContext(sc);

    var points = sc.textFile(__dirname + '/../mllib/data/kmeans_data.txt').map(function(line, RowFactory, Vectors) {
      var tok = line.split(" ");
      var point = [];
      for (var i = 0; i < tok.length; ++i) {
        point[i] = parseFloat(tok[i]);
      }
      var points = Vectors.dense(point);
      return RowFactory.create(points);
    }, [spark.sql.RowFactory, spark.mllib.linalg.Vectors]);


    var fields = [new spark.sql.types.StructField("features", new spark.mllib.linalg.VectorUDT(), false, spark.sql.types.Metadata.empty())];
    var schema = new spark.sql.types.StructType(fields);
    var dataset = sqlContext.createDataFrame(points, schema);

    // Trains a k-means model
    var kmeans = new spark.ml.clustering.KMeans()
      .setK(k);
    var model = kmeans.fit(dataset);

    // Shows the result
    model.clusterCenters().then(resolve).catch(stop);
  });
}

if (global.SC) {
  // we are being run as part of a test
  module.exports = run;
} else {
  var eclairjs = require('../../lib/index.js');
  var spark = new eclairjs();

  var sc = new spark.SparkContext("local[*]", "KMeans");
  run(sc, spark).then(function(results) {
    console.log('Cluster Centers:', results);
    stop();
  }).catch(stop);
}