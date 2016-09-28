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

    var fields = [
      spark.sql.types.DataTypes.createStructField("label", spark.sql.types.DataTypes.DoubleType, false),
      spark.sql.types.DataTypes.createStructField("features", new spark.ml.linalg.VectorUDT(), true)
    ];

    var schema = spark.sql.types.DataTypes.createStructType(fields);

    // Prepare training data.
    // DataFrames, where it uses the bean metadata to infer the schema.
    var training = sparkSession.createDataFrame(
      [
        spark.sql.RowFactory.create(1.0, spark.ml.linalg.Vectors.dense(0.0, 1.1, 0.1)),
        spark.sql.RowFactory.create(0.0, spark.ml.linalg.Vectors.dense(2.0, 1.1, -1.0)),
        spark.sql.RowFactory.create(0.0, spark.ml.linalg.Vectors.dense(2.0, 1.3, 1.0)),
        spark.sql.RowFactory.create(1.0, spark.ml.linalg.Vectors.dense(0.0, 1.2, -0.5))
      ], schema);

    // Create a LogisticRegression instance. This instance is an Estimator.
    var lr = new spark.ml.classification.LogisticRegression();

    // We may set parameters using setter methods.
    lr.setMaxIter(10).setRegParam(0.01);

    // Learn a LogisticRegression model. This uses the parameters stored in lr.
    var model1 = lr.fit(training);

    // We may alternatively specify parameters using a ParamMap.
    var paramMap = new spark.ml.param.ParamMap()
      .put(lr.maxIter().w(20))  // Specify 1 Param.
      .put(lr.maxIter(), 30)  // This overwrites the original maxIter.
      .put(lr.regParam().w(0.1), lr.threshold().w(0.55));  // Specify multiple Params.

    // Prepare test documents.
    var test = sparkSession.createDataFrame([
      spark.sql.RowFactory.create(1.0, spark.ml.linalg.Vectors.dense(-1.0, 1.5, 1.3)),
      spark.sql.RowFactory.create(0.0, spark.ml.linalg.Vectors.dense(3.0, 2.0, -0.1)),
      spark.sql.RowFactory.create(1.0, spark.ml.linalg.Vectors.dense(0.0, 2.2, -1.5))
    ], schema);

    var promises = [];
    promises.push(lr.explainParams());

    // Since model1 is a Model (i.e., a Transformer produced by an Estimator),
    // we can view the parameters it used during fit().
    // This prints the parameter (name: value) pairs, where names are unique IDs for this
    // LogisticRegression instance.
    promises.push(model1.parent().extractParamMap().size());

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
            .appName("Estimator Transformer Param")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
    console.log('LogisticRegression parameters:', results[0]);
    console.log('Model 1 was fit using parameters:', results[1]);
    stop();
  }).catch(stop);
}
