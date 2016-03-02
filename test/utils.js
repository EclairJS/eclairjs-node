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

var testOutput = [];
var listenerAdded = false;

function listener(msg) {
  testOutput.push(msg.code);
}

describe('Utils Test', function() {
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
      try {
        checks(testOutput.length == 1 ? testOutput[0] : testOutput);
        done();
      } catch (e) {
        done(e);
      }
    }

    function error(e) {
      console.log(e)

      done(e);
    }

    sc.kernelP.then(function(kernel) {
      if (!listenerAdded) {
        listenerAdded = true;
        kernel.addExecuteListener(listener);
      }

      // clear the output
      testOutput = [];

      run(callback, error);
    });
  }

  describe("Basic method call", function() {
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

  describe("Lambda without lambda args test", function() {
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

  describe("Lambda and lambda args test", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          var x = rdd.flatMap(function(sentence) {
            return sentence.split(" ");
          }, [rdd, 2, 'test']);

          onceDone(x).then(callback);
        }, function(result) {
          expect(result).equals('var rdd3 = rdd1.flatMap(function (sentence) {\n            return sentence.split(" ");\n          }, [rdd1, 2, "test"]);');
        },
        done
      );
    });
  });

  describe("Retrieving a native result", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          onceDone(rdd2.count()).then(callback);
        }, function(result) {
          expect(result).equals('rdd2.count();');
        },
        done
      );
    });
  });

  describe("Void execution", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback) {
          global.ECLAIRJS_TEST_MODE = 'void';
          onceDone(rdd2.foreach(function(){})).then(callback);
        }, function(result) {
          delete global.ECLAIRJS_TEST_MODE;
          expect(result).equals('rdd2.foreach(function (){});');
        },
        done
      );
    });
  });

  describe("Static execution", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback, error) {
          onceDone(spark.storage.StorageLevel.NONE()).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('var storageLevel1 = StorageLevel.NONE();');
        },
        done
      );
    });
  });

});
