var spark = require('../spark.js');

var sc = new spark.SparkContext("local[*]", "foo");

var rdd = sc.textFile("/Users/doronrosenberg/mystuff/ibm/jsspark/git/eclair-node/examples/dream.txt");

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
  console.log("Success:", val);
}).catch(function(err) {
  console.log("Error:", err);
});
