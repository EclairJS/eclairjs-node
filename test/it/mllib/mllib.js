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
  sc = new spark.SparkContext("local[*]", "mllib Integration Tests");
  global.SC = sc;
}

describe('mllib Test', function() {
  before(function(done) {
    this.timeout(100000);

    sc.refIdP.then(function() {
      done();
    }).catch(done);
  });

  describe("Linear Regression", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/mllib/linearregressiontest');
      test(sc).then(function(results) {
        expect(results.length).equals(10);
        expect(results[0][0]).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Association Rules", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/associationrules');
      test(sc).then(function(results) {
        expect(results.length).equals(1);
        expect(results[0]).equals('{a} => {b}: 0.8');
        done();
      }).catch(done);
    });
  });

  describe("Binary Classification Metrics", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/binaryclassification');
      test(sc).then(function(results) {
        expect(results.length).equals(5);
        done();
      }).catch(done);
    });
  });

  describe("Bisecting K Mean", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/bisectingkmean');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        expect(results[1].length).equals(4);
        done();
      }).catch(done);
    });
  });

  describe("Decision Tree Classification", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/decisiontreeclassification');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("FP Growth", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/fpgrowth');
      test(sc).then(function(results) {
        expect(results.length).equals(54);
        done();
      }).catch(done);
    });
  });

  describe("Gradient Boosting Classification", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/gradientboostingclassification');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("Gradient Boosting Regression", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/gradientboostingregression');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("Isotonic Regression", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/isotonicregression');
      test(sc).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("K Means", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/kmeans');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("LBFGS", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/lbfgs');
      test(sc).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("LDA", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/lda');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("LR", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/lr');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("Multiclass Classification Metrics", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/multiclassclassificationmetrics');
      test(sc).then(function(results) {
        expect(results.length).equals(9);
        done();
      }).catch(done);
    });
  });

  describe("Naive Bayes", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/naivebayes');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("PCA", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/pca');
      test(sc).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });
/*
  describe("Power Iteration Clustering", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/poweriterationclustering');
      test(sc).then(function(results) {
        expect(results.length).equals(6);
        done();
      }).catch(done);
    });
  });
*/
  describe("Prefix Span", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/prefixspan');
      test(sc).then(function(results) {
        expect(results.length).equals(5);
        done();
      }).catch(done);
    });
  });

  describe("Random Forest Classification", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/randomforestclassification');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("Random Forest Regression", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/randomforestregression');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("Random RDD Generation", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/randomrddgeneration');
      test(sc).then(function(results) {
        expect(results.length).equals(4);
        done();
      }).catch(done);
    });
  });

  describe("Ranking Metrics", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/mllib/rankingmetrics');
      test(sc).then(function(results) {
        expect(results.length).equals(9);
        done();
      }).catch(done);
    });
  });

  describe("Recommendation", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/mllib/recommendation');
      test(sc).then(function(results) {
        expect(results).to.be.an('Number');
        done();
      }).catch(done);
    });
  });

  describe("Regression Metrics", function() {
    it("should return the expected result", function(done) {
      this.timeout(100000);

      var test = require('../../../examples/mllib/regressionmetrics');
      test(sc).then(function(results) {
        expect(results.length).equals(5);
        done();
      }).catch(done);
    });
  });

  describe("Sample RDDs", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/sampledrdd');
      test(sc).then(function(results) {
        expect(results.length).equals(2);
        done();
      }).catch(done);
    });
  });

  describe("SVD", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/svd');
      test(sc).then(function(results) {
        expect(results.length).equals(3);
        done();
      }).catch(done);
    });
  });

  describe("SVM With SGD", function() {
    it("should return the expected result", function(done) {
      var test = require('../../../examples/mllib/svmwithsgd');
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