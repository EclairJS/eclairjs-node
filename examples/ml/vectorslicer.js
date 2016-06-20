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


    // $example on$
    var attrs = [
      spark.ml.attribute.NumericAttribute.defaultAttr().withName("f1"),
      spark.ml.attribute.NumericAttribute.defaultAttr().withName("f2"),
      spark.ml.attribute.NumericAttribute.defaultAttr().withName("f3")
    ];

    var group = new spark.ml.attribute.AttributeGroup("userFeatures", attrs);

    var  rdd = sc.parallelize([
      spark.sql.RowFactory.create(spark.mllib.linalg.Vectors.sparse(3, [0, 1], [-2.0, 2.3])),
      spark.sql.RowFactory.create(spark.mllib.linalg.Vectors.dense([-2.0, 2.3, 0.0]))
    ]);

    var dataset = sqlContext.createDataFrame(rdd,
      (new spark.sql.types.StructType()).add(group.toStructField()));

    var vectorSlicer = new spark.ml.feature.VectorSlicer()
      .setInputCol("userFeatures").setOutputCol("features");

    vectorSlicer.setIndices([1]).setNames(["f3"]);
    // or slicer.setIndices(new int[]{1, 2}), or slicer.setNames(new String[]{"f2", "f3"})

    var output = vectorSlicer.transform(dataset);
    var result=output.select("userFeatures", "features").first();
    result.mkString(",", "[", "]").then(resolve).catch(reject);
   // output.select("userFeatures", "features").take(1).then(resolve).catch(stop);

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
