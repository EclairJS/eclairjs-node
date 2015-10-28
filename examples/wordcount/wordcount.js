var eclairjs = require('../../spark.js');

function WordCount() {
}

WordCount.prototype.do = function(callback) {
  var sc = new eclairjs.SparkContext("local[*]", "foo");
  var rdd = sc.textFile(__dirname + "/../dream.txt");

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

  rdd7.take(20).then(function(val) {
    // we get a string version of an array of tuples, so parse them
    var matches = val.match(/\([a-zA-Z0-9,.]*\)/g)
    var results = [];
    matches.forEach(function(match) {
      var values = match.match(/[a-zA-Z0-9.]+/g);
      results.push({word: values[1], count: values[0]})
    });
    callback(null, results)
  }).catch(function(err) {
    console.log(err);
    callback(err)
  });
}

module.exports = WordCount;