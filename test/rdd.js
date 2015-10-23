var assert = require('assert');
var expect = require('chai').expect;

var spark = require('./lib/spark.js');
var sc = new spark.SparkContext("local[*]", "foo");

describe('Top 10 Test', function() {
  var rdd, rdd2, rdd3, rdd4, rdd5, rdd6, rdd7;

  function executeTest(done, run, checks) {
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
      executeTest(done,
        function() {
          rdd = sc.textFile("/tmp/examples/dream.txt");
        }, function(msg) {
          expect(msg.code).equals('var rdd1 = jsc.textFile("/tmp/examples/dream.txt");');
        }
      );

    });
  });

  describe("flatMap", function() {
    it("should generate the correct output", function(done) {
      executeTest(done,
        function() {
          rdd2 = rdd.flatMap(function(sentence) {
            return sentence.split(" ");
          });
        }, function(msg) {
          expect(msg.code).equals('var rdd2 = rdd1.flatMap(function (sentence) {\n            return sentence.split(" ");\n          });');
        }
      );
    });
  });
});

/*
var rdd = sc.textFile("/tmp/examples/dream.txt");

var rdd2 = rdd.flatMap(function(sentence) {
  return sentence.split(" ");
});
var rdd3 = rdd2.filter(function(word) {
  return word.trim().length > 0;
});
var rdd4 = rdd3.mapToPair(function(word) {
  return [word.toLowerCase(),1]
});
var rdd5 = rdd4.reduceByKey(function(acc, v) {
  return acc + v;
});
var rdd6 = rdd5.mapToPair(function(tuple) {
  return [tuple[1]+0.0, tuple[0]];
});
var rdd7 = rdd6.sortByKey(false);
rdd7.take(10).then(function(val) {
  console.log(val);
}).catch(function(err) {
  console.log(err);
});
*/