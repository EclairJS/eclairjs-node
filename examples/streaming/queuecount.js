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
  process.exit(0);
}

function stop(e) {
  if (e) {
    console.log('Error:', e);
  }

  if (sparkContext) {
    sparkContext.stop().then(exit).catch(exit);
  }
}



var sparkContext = new spark.SparkContext("local[*]", "Queue Stream");
var ssc = new spark.streaming.StreamingContext(sparkContext, new spark.streaming.Duration(1000));

// Create the queue through which RDDs can be pushed to
// a QueueInputDStream
var rddQueue = [];

// Create and push some RDDs into the queue
var list = [];
for (var i = 0; i < 1000; i++) {
  list.push(i);
}
for (var i = 0; i < 30; i++) {
  rddQueue.push(ssc.sparkContext().parallelize(list));
}

// Create the QueueInputDStream and use it do some processing
var inputStream = ssc.queueStream(rddQueue);
var mappedStream = inputStream.mapToPair(
  function (i, Tuple2) {
    return new Tuple2(i % 10, 1);
  }, [spark.Tuple2]);

var reducedStream = mappedStream.reduceByKey(
  function (i1, i2) {
    return i1 + i2;
  });

reducedStream.foreachRDD(function(rdd) {
  return rdd.collect()
}, null, function(res) {
  console.log('Results: ', res)
}).then(function () {
  ssc.start();
}).catch(stop);

// stop spark streaming when we stop the node program
process.on('SIGTERM', stop);
process.on('SIGINT', stop);