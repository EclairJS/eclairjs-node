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



var sc;

function WordCount() {
}

WordCount.prototype.do = function(callback) {
  sc = new spark.SparkContext("local[*]", "Wordcount Demo");
  var rdd = sc.textFile(__dirname + "/../dream.txt");

  var rdd2 = rdd.flatMap(function(sentence) {
    return sentence.split(" ");
  });

  var rdd3 = rdd2.filter(function(word) {
    // http://tagcrowd.com/languages/English
    var stopWords = ["january","february","march","april","may","june","july","august","september","october","november","december","monday","tuesday","wednesday","thursday","friday","saturday","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","-","--","''","we've","we'll","we're","who'll","who've","who's","you'll","you've","you're","i'll","i've","i'm","i'd","he'll","he'd","he's","she'll","she'd","she's","it'll","it'd","it's","they've","they're","they'll","didn't","don't","can't","won't","isn't","wasn't","couldn't","should't","wouldn't","ve","ll","re","th","rd","st","doing","allow","examining","using","during","within","across","among","whether","especially","without","actually","another","am","because","cannot","the","of","to","and","a","in","is","it","you","that","he","was","for","on","are","with","as","I","his","they","be","at","one","have","this","from","or","had","by","hot","word","but","what","some","we","yet","can","out","other","were","all","there","when","up","use","your","how","said","an","each","she","which","do","their","time","if","will","shall","way","about","many","then","them","would","like","so","these","her","long","make","thing","see","him","two","has","look","more","day","could","go","come","did","no","yes","most","my","over","know","than","call","first","who","may","down","side","been","now","find","any","new","part","take","get","place","made","where","after","back","little","only","came","show","every","good","me","our","under","upon","very","through","just","great","say","low","cause","much","mean","before","move","right","too","same","tell","does","set","three","want","well","also","put","here","must","big","high","such","why","ask","men","went","kind","need","try","again","near","should","still","between","never","last","let","though","might","saw","left","late","run","don't","while","close","few","seem","next","got","always","those","both","often","thus","won't","not","into","inside","its","makes","tenth","trying","i","me","my","myself","we","us","our","ours","ourselves","you","your","yours","yourself","yourselves","he","him","his","himself","she","her","hers","herself","it","its","itself","they","them","their","theirs","themselves","what","which","who","whom","this","that","these","those","am","is","are","was","were","be","been","being","have","has","had","having","do","does","did","doing","will","would","shall","should","can","could","may","might","must","ought","i'm","you're","he's","she's","it's","we're","they're","i've","you've","we've","they've","i'd","you'd","he'd","she'd","we'd","they'd","i'll","you'll","he'll","she'll","we'll","they'll","isn't","aren't","wasn't","weren't","hasn't","haven't","hadn't","doesn't","don't","didn't","won't","wouldn't","shan't","shouldn't","can't","cannot","couldn't","mustn't","let's","that's","who's","what's","here's","there's","when's","where's","why's","how's","daren't","needn't","oughtn't","mightn't","a","an","the","and","but","if","or","because","as","until","while","of","at","by","for","with","about","against","between","into","through","during","before","after","above","below","to","from","up","down","in","out","on","off","over","under","again","further","then","once","here","there","when","where","why","how","all","any","both","each","few","more","most","other","some","such","no","nor","not","only","own","same","so","than","too","very","one","every","least","less","many","now","ever","never","say","says","said","also","get","go","goes","just","made","make","put","see","seen","whether","like","well","back","even","still","way","take","since","another","however","two","three","four","five","first","second","new","old","high","long"];

    var notFound = stopWords.indexOf(word.toLowerCase().trim()) == -1

    return word.trim().length > 0 && notFound;
  });

  var rdd4 = rdd3.mapToPair(function(word) {
    var newWord = word.trim().toLowerCase();

    // remove trailing punctuation
    newWord = newWord.replace(/(\.|\"|\'|\,)*$/g, "");

    return new Tuple(newWord,1);
  });

  var rdd5 = rdd4.reduceByKey(function(acc, v) {
    return acc + v;
  });

  var rdd6 = rdd5.mapToPair(function(tuple) {
    return new Tuple(tuple[1]+0.0, tuple[0]);
  });

  var rdd7 = rdd6.sortByKey(false);

  rdd7.take(20).then(function(results) {
    var response = [];

    results.forEach(function(tuple) {
      response.push({word: tuple[1], count: tuple[0]})
    });
    callback(null, response)

  }).catch(function(err) {
    console.log(err);
    callback(err)
  });
};

WordCount.prototype.stop = function(callback) {
  if (sc) {
    sc.stop().then(callback).catch(callback);
  } else {
    callback();
  }
};


module.exports = WordCount;
