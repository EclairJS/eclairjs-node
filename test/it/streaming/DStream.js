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

// This is an Integration test and requires a running Notebook/Spark Kernel/EclairJS-nashorn setup

var assert = require('assert');
var expect = require('chai').expect;
var path = require('path');
var TestUtils = require('../../lib/utils.js');

var net = require('net');

var spark;
var sc;

if (global.SC) {
  spark = global.SPARK;
  sc = global.SC;
} else {
  var eclairjs = require('../../../lib/index.js');
  spark = new eclairjs();

  sc = new spark.SparkContext("local[*]", "DStream Integration Tests");
}

var EclairUtils = require('../../../lib/utils.js');

function execute(code, returnType) {
  var args = {
    kernelP: sc.kernelP,
    code: code,
    returnType: returnType
  };

  return EclairUtils.execute(args);
}

describe('DStream Test', function() {
  describe("DStream flatmap", function() {
    it("should equal 10", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          var interval;

          // create a basic socket stream on port 4000
          var server = net.createServer(function(socket) {
            interval = setInterval(function() {
              socket.write("1,2,3,4\n");
            }, 10000);
          }).listen(4000);

          var streamingContext = new spark.streaming.StreamingContext(sc, new spark.streaming.Duration(500));
          var dstream = streamingContext.socketTextStream("localhost", 4000);
          var ds1 = dstream.flatMap(function (line) {
            return line.split(",");
          });

          var data = [];

          ds1.foreachRDD(function (rdd) {
            return rdd.collect()
          }, null, function(results) {
            if (results && results.length > 0) {
              data.push(results);
            }
          }).then(function () {
            streamingContext.start();

            setTimeout(function () {
              clearInterval(interval);

              streamingContext.stop(false).then(function() {
                streamingContext.awaitTermination().then(function() {
                  callback(data);
                }).catch(error);
              }).catch(error);
            }, 30000);

          }).catch(error);
        }, function(results) {
          expect(results.length).above(1);
          expect(results[0]).deep.equals(['1', '2', '3', '4']);
        },
        done
      );
    });
  });

  after(function(done) {
    if (!global.SC && sc) {
      sc.stop().then(done).catch(done);
    } else {
      // global sc, so don't stop it
      done();
    }
  });
});