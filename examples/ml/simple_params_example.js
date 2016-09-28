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

    var schema = new spark.sql.types.StructType([
      new spark.sql.types.StructField("label", spark.sql.types.DataTypes.DoubleType, false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("features", new spark.ml.linalg.VectorUDT(), false, spark.sql.types.Metadata.empty())
    ]);


    // Prepare training data.
    // We use LabeledPoint, which is a JavaBean.  Spark SQL can convert RDDs of JavaBeans
    // into DataFrames, where it uses the bean metadata to infer the schema.
    var localTraining = [
       spark.sql.RowFactory.create([1.0, spark.ml.linalg.Vectors.dense(0.0, 1.1, 0.1)]),
       spark.sql.RowFactory.create([0.0, spark.ml.linalg.Vectors.dense(2.0, 1.0, -1.0)]),
       spark.sql.RowFactory.create([0.0, spark.ml.linalg.Vectors.dense(2.0, 1.3, 1.0)]),
       spark.sql.RowFactory.create([1.0, spark.ml.linalg.Vectors.dense(0.0, 1.2, -0.5)])];
    var training = sparkSession.createDataFrame(localTraining, schema);

    // Create a LogisticRegression instance.  This instance is an Estimator.
    var lr = new spark.ml.classification.LogisticRegression();

    // We may set parameters using setter methods.
    lr.setMaxIter(10)
      .setRegParam(0.01);

    // Learn a LogisticRegression model.  This uses the parameters stored in lr.
    var model1 = lr.fit(training);

    // We may alternatively specify parameters using a ParamMap.
    var paramMap = new spark.ml.param.ParamMap();
    paramMap.put(lr.maxIter().w(20)); // Specify 1 Param.
    paramMap.put(lr.maxIter(), 30); // This overwrites the original maxIter.
    var thresholds  = [0.45, 0.55];
    paramMap.put(lr.regParam().w(0.1), lr.thresholds().w(thresholds)); // Specify multiple Params.

    // One can also combine ParamMaps.
    var paramMap2 = new spark.ml.param.ParamMap();
    var paramMap3 = paramMap2.put(lr.probabilityCol().w("myProbability")); // Change output column name
    var paramMapCombined = paramMap.$plus$plus(paramMap3);

    // Now learn a new model using the paramMapCombined parameters.
    // paramMapCombined overrides all parameters set earlier via lr.set* methods.
    var model2 = lr.fit(training, paramMapCombined);

    // Prepare test documents.
    var localTest = [
        spark.sql.RowFactory.create([1.0, spark.ml.linalg.Vectors.dense(-1.0, 1.5, 1.3)]),
        spark.sql.RowFactory.create([0.0, spark.ml.linalg.Vectors.dense(3.0, 2.0, -0.1)]),
        spark.sql.RowFactory.create([1.0, spark.ml.linalg.Vectors.dense(0.0, 2.2, -1.5)])];
    var test = sparkSession.createDataFrame(localTest, schema);
    // Make predictions on test documents using the Transformer.transform() method.
    // LogisticRegressionModel.transform will only use the 'features' column.
    // Note that model2.transform() outputs a 'myProbability' column instead of the usual
    // 'probability' column since we renamed the lr.probabilityCol parameter previously.
    var results = model2.transform(test);

    var rows=results.select("features", "label", "myProbability", "prediction").collect().then(resolve).catch(reject);

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
            .appName("simpleparams")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
        console.log(JSON.stringify(results));
    stop();
  }).catch(stop);
}
