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
var Utils = require('../lib/utils');
var sc = new spark.SparkContext("local[*]", "foo");

var testOutput = [];
var listenerAdded = false;

function listener(msg) {
  testOutput.push(msg.code);
}


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

function TestClass(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

var testClassInstance = new TestClass(sc.kernelP, Promise.resolve('tci'));

describe('Utils Test', function() {
  before(function() {
    var protocol = require('../lib/kernel.js');
    protocol.resetVariables();
  });

  describe("Basic method call without arguments", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback, error) {
          var args = {
            target: testClassInstance,
            method: 'agg',
            returnType: TestClass
          };

          onceDone(Utils.generate(args)).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('var testClass1 = tci.agg();');
        },
        done
      );
    });
  });

  describe("Basic method call with arguments", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback, error) {
          var args = {
            target: testClassInstance,
            method: 'agg',
            args: [
              {value: 'a string', type: 'string'},
              {value: 1, type: 'number'},
              {value: {foo: 'bar'}, type: 'map'},
              {value: testClassInstance}
            ],
            returnType: TestClass
          };

          onceDone(Utils.generate(args)).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('var testClass2 = tci.agg("a string", 1, {"foo":"bar"}, tci);');
        },
        done
      );
    });
  });

  describe("Basic method call with array argument", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback, error) {
          var args = {
            target: testClassInstance,
            method: 'agg',
            args: [
              {value: [
                {value: 1, type: 'number'},
                {value: '1', type: 'string'},
                {value: testClassInstance}
              ]}
            ],
            returnType: TestClass
          };

          onceDone(Utils.generate(args)).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('var testClass3 = tci.agg([1,\"1\",tci]);');
        },
        done
      );
    });
  });

  describe("Basic method call with optional arguments", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback, error) {
          var args = {
            target: testClassInstance,
            method: 'agg',
            args: [
              {value: 1, type: 'number'},
              {value: null, type: 'string', optional: true},
              {value: 3, type: 'string', optional: true}
            ],
            returnType: TestClass
          };

          onceDone(Utils.generate(args)).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('var testClass4 = tci.agg(1);');
        },
        done
      );
    });
  });

  describe("Basic method call with lambda argument", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback, error) {
          var bindArgs = [1,'123',testClassInstance];

          var args = {
            target: testClassInstance,
            method: 'agg',
            args: [
              {value: function(){return 'foo'}, type: 'lambda'},
              {value: Utils.wrapArray(bindArgs), optional: true}
            ],
            returnType: TestClass
          };

          onceDone(Utils.generate(args)).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('var testClass5 = tci.agg(function (){return \'foo\'}, [1,"123",tci]);');
        },
        done
      );
    });
  });

  describe("Basic method call with [String] returntype", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback, error) {
          var bindArgs = [1,'123',testClassInstance];

          var args = {
            target: testClassInstance,
            method: 'agg',
            returnType: [String],
            stringify: true
          };

          onceDone(Utils.generate(args)).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('JSON.stringify(tci.agg());');
        },
        done
      );
    });
  });

  describe("Basic method call with [SparkClass] returntype", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback, error) {
          var bindArgs = [1,'123',testClassInstance];

          var args = {
            target: testClassInstance,
            method: 'agg',
            returnType: [TestClass]
          };

          onceDone(Utils.generate(args)).then(callback).catch(error);
        }, function(result) {
          expect(result.length).equals(2);
          expect(result[0]).equals('var testClassArray1 = tci.agg();');
          expect(result[1]).equals('testClassArray1.length;');
        },
        done
      );
    });
  });

  describe("Basic static method call", function() {
    it("should generate the correct output", function(done) {
      executeTest(
        function(callback, error) {
          var bindArgs = [1,'123',testClassInstance];

          var args = {
            kernelP: sc.kernelP,
            target: TestClass,
            method: 'agg',
            static: true,
            returnType: TestClass
          };

          onceDone(Utils.generate(args)).then(callback).catch(error);
        }, function(result) {
          expect(result).equals('var testClass6 = TestClass.agg();');
        },
        done
      );
    });
  });
  
  /*
    Tests: resolver, wrapArray
   */

});