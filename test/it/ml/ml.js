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

// This is an Integration test and requires a running Notebook/Spark Kernel/EclairJS-nashorn setup

var assert = require('assert');
var expect = require('chai').expect;
var TestUtils = require('../../lib/utils.js');

var spark = require('../../../lib/index.js');

var sc;

var doWeOwnTheSC = false;

if (global.SC) {
  // we are being run inside another test, probably the main integration-test file
  sc = global.SC;
} else {
  doWeOwnTheSC = true;
  sc = new spark.SparkContext("local[*]", "ml Integration Tests");
  global.SC = sc;
}

describe('ml Test', function() {
  before(function(done) {
    this.timeout(100000);

    sc.refIdP.then(function() {
      done();
    }).catch(done);
  });

  describe("ALS", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/als');
      test(sc).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("AFT Survival Regression", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/aftsurvivalregression');
      test(sc).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("Binarizer", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/binarizer');
      test(sc).then(function(results) {
        expect(results.length).equals(3);
        expect(results[0].values).deep.equals([0]);
        expect(results[1].values).deep.equals([1]);
        expect(results[2].values).deep.equals([0]);
        done();
      }).catch(done);
    });
  });

  describe("Bucketizer", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/bucketizer');
      test(sc).then(function(results) {
        expect(results.length).equals(4);
        done();
      }).catch(done);
    });
  });

  describe("Chi Sq Selector", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/chisqselector');
      test(sc).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("Count Vectorizer", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/countvectorizer');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("DCT", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/dct');
      test(sc).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("Decision Tree Classification", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/decisiontreeclassification');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        expect(results[1]).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Decision Tree Regression", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/decisiontreeregression');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        expect(results[1]).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Elementwise Product", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/elementwiseproduct');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("Estimator Transformer Param", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/estimatortransformerparam');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        expect(results[1]).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Gradient Boosted Tree Classifier", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/gradientboostedtreeclassifier');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        expect(results[0]).to.be.an('Number');
        expect(results[1]).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Gradient Boosted Tree Regressor", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/gradientboostedtreeregressor');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        expect(results[0]).to.be.an('Number');
        expect(results[1]).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Index To String", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/indextostring');
      test(sc).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("KMeans", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/kmeans');
      test(sc).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("LDA", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/lda');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        expect(results[0]).to.be.an('Number');
        expect(results[1]).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Linear Regression With Elastic Net", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/linearregressionwithelasticnet');
      test(sc).then(function(results) {
        expect(results.length).equals(5);
        done();
      }).catch(done);
    });
  });

  describe("Logistic Regression Summary", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/logisticregressionsummary');
      test(sc).then(function(results) {
        expect(results.length).equals(1);
        done();
      }).catch(done);
    });
  });

  describe("Logistic Regression With Elastic Net", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/logisticregressionwithelasticnet');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("Min Max Scaler", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/minmaxscaler');
      test(sc).then(function(results) {
        expect(results.length).equals(10);
        done();
      }).catch(done);
    });
  });

  describe("Model Selection Via Train Validation Split", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/modelselectionviatrainvalidationsplit');
      test(sc).then(function(results) {
        expect(results.length).equals(10);
        done();
      }).catch(done);
    });
  });

  describe("Multi Layer Perceptron Classifier", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/multilayerperceptronclassifier');
      test(sc).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  after(function(done) {
    if (sc && doWeOwnTheSC) {
      sc.stop().then(done).catch(done);
    } else {
      done();
    }
  });
});