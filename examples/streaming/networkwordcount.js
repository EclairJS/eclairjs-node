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


var net = require('net');

var server = net.createServer(function(socket) {
  setInterval(function() {
    socket.write("Words are great\n");
  }, 1000);
}).listen(4000);

var sparkContext = new spark.SparkContext("local[*]", "Network Word Count");
var ssc = new spark.streaming.StreamingContext(sparkContext, new spark.streaming.Duration(2000));

var lines = ssc.socketTextStream('localhost', 4000);
var words = lines.flatMap(function(x) {
  return x.split(/\s+/);
});
var wordCounts = words.mapToPair( function(s, Tuple2) {
  return new Tuple2(s, 1);
}, [spark.Tuple2]).reduceByKey(function(i1,i2) {
  return i1 + i2;
});

wordCounts.foreachRDD(function(rdd) {
  return rdd.collect()
}, null, function(res) {
  console.log('Results: ', res)
}).then(function () {
  ssc.start();
}).catch(stop);

// stop spark streaming when we stop the node program
process.on('SIGTERM', stop);
process.on('SIGINT', stop);