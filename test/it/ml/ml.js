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

var spark;
var sc;
var sparkSession;

var doWeOwnTheSC = false;

if (global.SC) {
  // we are being run inside another test, probably the main integration-test file
  sc = global.SC;
  sparkSession = global.SESSION;
  spark = global.SPARK;
} else {
  var eclairjs = require('../../../lib/index.js');
  spark = new eclairjs();
  doWeOwnTheSC = true;
  sparkSession = spark.sql.SparkSession
    .builder()
    .appName("ml Integration Tests")
    .getOrCreate();
  sc = sparkSession.sparkContext();
  global.SC = sc;
  global.SESSION = sparkSession;
  global.SPARK = spark;
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
      test(sparkSession, spark).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("AFT Survival Regression", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/aftsurvivalregression');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("Binarizer", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/binarizer');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(3);

        var promises = [];
        promises.push(results[0].getFloat(0));
        promises.push(results[1].getFloat(0));
        promises.push(results[2].getFloat(0));

        Promise.all(promises).then(function(results) {
          expect(results[0]).equals(0);
          expect(results[1]).equals(1);
          expect(results[2]).equals(0);
          done();
        }).catch(done);
      }).catch(done);
    });
  });

  describe("Bucketizer", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/bucketizer');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(4);
        done();
      }).catch(done);
    });
  });

  describe("Chi Sq Selector", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/chisqselector');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("Count Vectorizer", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/countvectorizer');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("DCT", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/dct');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("Decision Tree Classification", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/decisiontreeclassification');
      test(sparkSession, spark).then(function(results) {
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
      test(sparkSession, spark).then(function(results) {
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
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("Estimator Transformer Param", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/estimatortransformerparam');
      test(sparkSession, spark).then(function(results) {
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
      test(sparkSession, spark).then(function(results) {
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
      test(sparkSession, spark).then(function(results) {
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
      test(sparkSession, spark).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("KMeans", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/kmeans');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("LDA", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/lda');
      test(sparkSession, spark).then(function(results) {
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
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(5);
        done();
      }).catch(done);
    });
  });

  describe("Logistic Regression Summary", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/logisticregressionsummary');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(1);
        done();
      }).catch(done);
    });
  });

  describe("Logistic Regression With Elastic Net", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/logisticregressionwithelasticnet');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("Min Max Scaler", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/minmaxscaler');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(10);
        done();
      }).catch(done);
    });
  });

  describe("Model Selection Via Train Validation Split", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/modelselectionviatrainvalidationsplit');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(10);
        done();
      }).catch(done);
    });
  });

  describe("Multi Layer Perceptron Classifier", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/multilayerperceptronclassifier');
      test(sparkSession, spark).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Naive Bayes", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/naivebayes');
      test(sparkSession, spark).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("NGram", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/ngram');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("Normalizer", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/normalizer');
      test(sparkSession, spark).then(function(results) {
        expect(results).to.be.an('String');
        done();
      }).catch(done);
    });
  });

  describe("One Hot Encoder", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/onehotencoder');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(6);
        done();
      }).catch(done);
    });
  });

  describe("PCA", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/pca');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("Pipeline", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/pipeline');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(4);
        done();
      }).catch(done);
    });
  });

  describe("Polynomial Expansion", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/polynomialexpansion');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("Quantile Discretizer", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/quantilediscretizer');
      test(sparkSession, spark).then(function(results) {
        expect(results.length).equals(5);
        done();
      }).catch(done);
    });
  });

  describe("Random Forest Regressor", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/randomforestregressor');
      test(sparkSession, spark).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Random Forest Classifier", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/ml/randomforestclassifier');
      test(sparkSession, spark).then(function(results) {
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