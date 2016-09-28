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
    // $example on$
    var data = [
      spark.sql.RowFactory.create([0, 1.0, 3.0]),
      spark.sql.RowFactory.create([2, 2.0, 5.0])
    ];
    var schema = new spark.sql.types.StructType( [
      new spark.sql.types.StructField("id", spark.sql.types.DataTypes.IntegerType,
          false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("v1", spark.sql.types.DataTypes.DoubleType,
          false, spark.sql.types.Metadata.empty()),
      new spark.sql.types.StructField("v2", spark.sql.types.DataTypes.DoubleType,
          false, spark.sql.types.Metadata.empty())
    ]);
    var df = sparkSession.createDataFrame(data, schema);

    var sqlTrans = new spark.ml.feature.SQLTransformer().setStatement(
      "SELECT *, (v1 + v2) AS v3, (v1 * v2) AS v4 FROM __THIS__");

    var output=sqlTrans.transform(df);

    output.take(10).then(resolve).catch(reject);

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
            .appName("sqlTransformer")
            .getOrCreate();

  run(sparkSession, spark).then(function(results) {
        console.log(JSON.stringify(results));
    stop();
  }).catch(stop);
}
