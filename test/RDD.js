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

var assert = require('assert');
var expect = require('chai').expect;

var eclairjs = require('./lib/spark.js');
var spark = new eclairjs();
var sc = new spark.SparkContext("local[*]", "foo");

var testOutput = [];
var listenerAdded = false;

function listener(msg) {
  testOutput.push(msg.code);
}

describe('Top 10 Test', function() {
  var rdd, rdd2, rdd3, rdd4, rdd5, rdd6, rdd7;

  before(function() {
    var protocol = require('../lib/kernel.js');
    protocol.resetVariables();
  });

  function onceDone(obj) {
    return new Promise(function(resolve, reject) {
      if (obj.kernelP && obj.refIdP) {
        Promise.all([obj.kernelP, obj.refIdP]).then(resolve).catch(reject);
      } else if (typeof obj.then == "function") {
        obj.then(resolve).catch(reject);
      }
    });
  }

  function executeTest(run, checks, done) {
    // called once the test is complete
    function callback() {
      checks(testOutput.length == 1 ? testOutput[0] : testOutput);
      done();
    }

    sc.kernelP.then(function(kernel) {
      if (!listenerAdded) {
        listenerAdded = true;
        kernel.addExecuteListener(listener);
      }

      // clear the output
      testOutput = [];

      run(callback);
    });
  }

  describe("textFile", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          rdd = sc.textFile("/tmp/examples/dream.txt");
          onceDone(rdd).then(callback);
        }, function(result) {
          expect(result).equals('var rdd1 = jsc.textFile("/tmp/examples/dream.txt");');
        },
        done
      );

    });
  });

  describe("flatMap", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          rdd2 = rdd.flatMap(function(sentence) {
            return sentence.split(" ");
          });

          onceDone(rdd2).then(callback);
        }, function(result) {
          expect(result).equals('var rdd2 = rdd1.flatMap(function (sentence) {\n            return sentence.split(" ");\n          });');
        },
        done
      );
    });
  });

  describe("filter", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          rdd3 = rdd2.filter(function(word) {
            return word.trim().length > 0;
          });

          onceDone(rdd3).then(callback);
        }, function(result) {
          expect(result).equals('var rdd3 = rdd2.filter(function (word) {\n            return word.trim().length > 0;\n          });');
        },
        done
      );
    });
  });

  describe("mapToPair", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          rdd4 = rdd3.mapToPair(function(word) {
            return [word.toLowerCase(),1]
          });

          onceDone(rdd4).then(callback);
        }, function(result) {
          expect(result).equals('var pairRDD1 = rdd3.mapToPair(function (word) {\n            return [word.toLowerCase(),1]\n          });');
        },
        done
      );
    });
  });

  describe("reduceByKey", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          rdd5 = rdd4.reduceByKey(function(acc, v) {
            return acc + v;
          });

          onceDone(rdd5).then(callback);
        }, function(result) {
          expect(result).equals('var pairRDD2 = pairRDD1.reduceByKey(function (acc, v) {\n            return acc + v;\n          });');
        },
        done
      );
    });
  });

  describe("second mapToPair", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          rdd6 = rdd5.mapToPair(function(tuple) {
            return [tuple[1]+0.0, tuple[0]];
          });

          onceDone(rdd6).then(callback);
        }, function(result) {
          expect(result).equals('var pairRDD3 = pairRDD2.mapToPair(function (tuple) {\n            return [tuple[1]+0.0, tuple[0]];\n          });');
        },
        done
      );
    });
  });

  describe("sortByKey", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          rdd7 = rdd6.sortByKey(false);

          onceDone(rdd7).then(callback);
        }, function(result) {
          expect(result).equals('var pairRDD4 = pairRDD3.sortByKey(false);');
        },
        done
      );
    });
  });

  describe("take(10)", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          rdd7.take(10).then(callback);
        }, function(result) {
          expect(result).equals('JSON.stringify(pairRDD4.take(10));');
        },
        done
      );
    });
  });
});
