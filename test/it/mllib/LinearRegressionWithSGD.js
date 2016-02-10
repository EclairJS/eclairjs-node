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

var spark = require('../../../lib/index.js');

var sc = new spark.SparkContext("local[*]", "mllib.regression.LinearRegressionWithSGD Integration Tests");

var fileName = path.resolve(__dirname+'/../../../examples/lpsa.txt');

function onceDone(obj) {
  return new Promise(function(resolve, reject) {
    if (obj.kernelP && obj.refIdP) {
      Promise.all([obj.kernelP, obj.refIdP]).then(resolve).catch(reject);
    } else if (typeof obj.then == "function") {
      obj.then(resolve).catch(reject);
    }
  });
}

var parsedData;

describe('LinearRegressionWithSGD Test', function() {
  before(function(done) {
    this.timeout(100000);

    var data = sc.textFile(fileName);

    parsedData = data.map(function(s) {
      var parts = s.split(",");
      var features = parts[1].split(" ");
      return new LabeledPoint(parts[0], new DenseVector(features));
    });

    onceDone(parsedData).then(function() {
      done();
    }).catch(done);
  });

  describe("LinearRegressionWithSGD.train()", function() {
    it("should return the correct result", function(done) {
      TestUtils.executeTest(
        function(callback, error) {
          var numIterations = 3;
          var linearRegressionModel = spark.mllib.regression.LinearRegressionWithSGD.train(parsedData, numIterations);
          onceDone(linearRegressionModel).then(callback).catch(error);
        }, function(result) {
          expect(result).to.exist;
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

