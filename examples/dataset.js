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

var eclairjs = require('../lib/index.js');

var sparkSession = eclairjs.SparkSession
  .builder()
  .appName("Dataset Test")
  .master("local[*]")
  .getOrCreate();

var ds = sparkSession.createDataset(["1","2","3"], eclairjs.sql.Encoders.STRING());

ds.collect().then(function(result) {
  console.log(result);
  stop();
}).catch(stop);

// stop spark streaming when we stop the node program
process.on('SIGTERM', stop);
process.on('SIGINT', stop);

function exit() {
  process.exit(0);
}

function stop(e) {
  if (e) {
    console.log('Error:', e);
  }

  if (sparkSession) {
    sparkSession.stop().then(exit).catch(exit);
  }
}