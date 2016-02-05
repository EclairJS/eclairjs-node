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
var TestUtils = require('../lib/utils.js');

var spark = require('../../lib/index.js');

var sc = new spark.SparkContext("local[*]", "SparkContext Integration Tests");

var accumulator;

describe('SparkContext Test', function() {

  describe("SparkContext.accumulator()", function() {
    it("should equal 10", function(done) {
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
          accumulator = sc.accumulator(0, new spark.AccumulableParam.IntAccumulatorParam());
          sc.parallelize([1, 2, 3, 4]).foreach(function(x, accumulator1) {
            accumulator1.add(x);
          }).then(function() {
            accumulator.value().then(callback).catch(error);
          }).catch(error);
        }, function(result) {
          expect(result).equals(10);
        },
        done
      );
    });
  });

  describe("accumulator.add(5)", function() {
    it("should equal 15", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          accumulator.add(5).then(function() {
            accumulator.localValue().then(callback).catch(error);
          }).catch(error);
        }, function(result) {
          expect(result).equals(15);
        },
        done
      );
    });
  });

  describe("SparkContext.accumulable()", function(FloatAccumulatorParam) {
    it("should equal 11", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var floatAccumParam = new spark.AccumulableParam.FloatAccumulatorParam();

          floatAccumable = sc.accumulable(0, floatAccumParam);
          sc.parallelize([1.10, 2.2, 3.3, 4.4]).foreach(function(x, accumulable1) {
            accumulable1.add(x);
          }).then(function() {
            floatAccumable.value().then(callback).catch(error);
          }).catch(error);
        }, function(result) {
          expect(result).equals(11);
        },
        done
      );
    });
  });


  describe("SparkContext.accumulable(IntAccumulatorParam)", function() {
    it("should equal 10", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var intAccumParam = new spark.AccumulableParam.IntAccumulatorParam();

          intAccumable = sc.accumulable(0, intAccumParam);
          sc.parallelize([1, 2, 3, 4]).foreach(function(x, accumulable2) {
            accumulable2.add(x);
          }).then(function() {
            intAccumable.value().then(callback).catch(error);
          }).catch(error);
        }, function(result) {
          expect(result).equals(10);
        },
        done
      );
    });
  });

  after(function(done) {
    if (sc) {
      sc.stop().then(done).catch(done);
    }
  });

});

