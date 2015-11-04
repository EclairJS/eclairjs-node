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

var spark = require('./lib/spark.js');
var sc = new spark.SparkContext("local[*]", "foo");

describe('Top 10 Test', function() {
  var rdd, rdd2, rdd3, rdd4, rdd5, rdd6, rdd7;

  function executeTest(run, checks, done) {
    function listener(msg) {
      sc.kernel.then(function(kernel) {
        kernel.removeExecuteListener();

        checks(msg);

        done();
      }).catch(done);
    }

    sc.kernel.then(function(kernel) {
      kernel.addExecuteListener(listener);

      run();
    });
  }

  describe("textFile", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd = sc.textFile("/tmp/examples/dream.txt");
        }, function(msg) {
          expect(msg.code).equals('var rdd1 = jsc.textFile("/tmp/examples/dream.txt");');
        },
        done
      );

    });
  });

  describe("flatMap", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd2 = rdd.flatMap(function(sentence) {
            return sentence.split(" ");
          });
        }, function(msg) {
          expect(msg.code).equals('var rdd2 = rdd1.flatMap(function (sentence) {\n            return sentence.split(" ");\n          });');
        },
        done
      );
    });
  });

  describe("filter", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd3 = rdd2.filter(function(word) {
            return word.trim().length > 0;
          });
        }, function(msg) {
          expect(msg.code).equals('var rdd3 = rdd2.filter(function (word) {\n            return word.trim().length > 0;\n          });');
        },
        done
      );
    });
  });

  describe("mapToPair", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd4 = rdd3.mapToPair(function(word) {
            return [word.toLowerCase(),1]
          });
        }, function(msg) {
          expect(msg.code).equals('var rdd4 = rdd3.mapToPair(function (word) {\n            return [word.toLowerCase(),1]\n          });');
        },
        done
      );
    });
  });

  describe("reduceByKey", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd5 = rdd4.reduceByKey(function(acc, v) {
            return acc + v;
          });
        }, function(msg) {
          expect(msg.code).equals('var rdd5 = rdd4.reduceByKey(function (acc, v) {\n            return acc + v;\n          });');
        },
        done
      );
    });
  });

  describe("second mapToPair", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd6 = rdd5.mapToPair(function(tuple) {
            return [tuple[1]+0.0, tuple[0]];
          });
        }, function(msg) {
          expect(msg.code).equals('var rdd6 = rdd5.mapToPair(function (tuple) {\n            return [tuple[1]+0.0, tuple[0]];\n          });');
        },
        done
      );
    });
  });

  describe("sortByKey", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd7 = rdd6.sortByKey(false);
        }, function(msg) {
          expect(msg.code).equals('var rdd7 = rdd6.sortByKey(false);');
        },
        done
      );
    });
  });

  describe("take(10)", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function() {
          rdd7.take(10);
        }, function(msg) {
          expect(msg.code).equals('JSON.stringify(rdd7.take(10));');
        },
        done
      );
    });
  });
});
