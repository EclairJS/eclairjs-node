EclairJS Node
===================
EclairJS Node provides Node.js language bindings for [Apache Spark](https://spark.apache.org).

Learn more about the larger [EclairJS project](http://www.eclairjs.org).

## Installation

```bash
$ npm install eclairjs
```

EclairJS Node requires Node 0.12 or higher and also requires a running instance of [EclairJS Nashorn](https://github.com/EclairJS/eclairjs-nashorn/).

Supported Spark versions can be found in the [Versions](#version) section below.

## Example
EclairJS Node's api mirrors the Spark api.  Here is the classic word count example:

```node
var eclairjs = require('eclairjs');

var spark = new eclairjs();

var sc = new spark.SparkContext("local[*]", "Simple Word Count");

var textFile = sc.textFile('foo.txt');

var words = textFile.flatMap(function(sentence) {
  return sentence.split(" ");
});

var wordsWithCount = words.mapToPair(function(word, Tuple2) {
  return new Tuple2(word, 1);
}, [eclairjs.Tuple2]);

var reducedWordsWithCount = wordsWithCount.reduceByKey(function(value1, value2) {
  return value1 + value2;
});

reducedWordsWithCount.collect().then(function(results) {
  console.log('Word Count:', results);
  sc.stop();
});
```

## Try It
EclairJS Node provides a Docker container that contains all of its dependencies on [Dockerhub](https://hub.docker.com/r/eclairjs/minimal-gateway/).

The Docker image supports the latest released version of EclairJS Node and may not work with `master`.   You can simply check out the appropriate branch (` git checkout branch-0.7` for example).

```bash
docker pull eclairjs/minimal-gateway
docker run -p 8888:8888 eclairjs/minimal-gateway
```

After retrieving Docker's IP address (`docker-machine ip`), you will need to set two environment variables:

```bash
export JUPYTER_HOST=??.??.??.?? (your docker ip)
export JUPYTER_PORT=8888
```

Now you can run the Word count example:

```bash
node --harmony examples/rddtop10.js ./dream.txt
```

You can learn more about the Docker container [here](https://github.com/EclairJS/eclairjs-node/wikis/Using-the-Docker-Container).
You can also try out EclairJS in Jupyter notebooks running under the [IBM Bluemix Cloud](https://github.com/EclairJS/eclairjs-node/wikis/EclairJS-with-IBM-Bluemix).

## Documentation
* [Developing with EclairJS](https://github.com/EclairJS/eclairjs-node/wiki/Developing-With-EclairJS)
* [API Docs](https://github.com/EclairJS/eclairjs-node/wiki/API-Documentation)
* [Wiki](https://github.com/EclairJS/eclairjs-node/wiki)
* [Presentations](https://github.com/EclairJS/eclairjs-node/wiki/Project-and-Community#presentations)
* [API Examples](https://github.com/EclairJS/eclairjs-node/tree/master/examples)
* [Example Applications](https://github.com/EclairJS/eclairjs-examples)

## Community
* [EclairJS Project](http://eclairjs.org/)
* [Google Group](https://groups.google.com/forum/#!forum/eclairjs)
* [Slack](https://eclairjs.slack.com)

## Deploy
You can choose to either deploy using Docker ([Using the Docker Container](https://github.com/EclairJS/eclairjs-node/wikis/Using-the-Docker-Container)) 
or manually build and setup your own environment ([Build and Package](https://github.com/EclairJS/eclairjs-node/wikis/Build-and-Package)).

## Progress

|Spark Feature    |EclairJS Node Status|
|-----------------|--------------------|
|RDD              | Partial Support    |
|SQL/DataFrames   | Partial Support    |
|Streaming        | Partial Support    |
|ml               | Partial Support    |
|mllib            | Partial Support    |
|GraphX           | Unsupported        |

Refer to the [API Documentation](https://github.com/EclairJS/eclairjs-node/wikis/API-Documentation) for a list of what is currently implemented.  Please note as new APIs are implemented for EclairJS Node they will be added to the master branch.

Contributions are always welcome via pull requests.

## Versions
Our goal is to keep the EclairJS master branch up to date with the latest version of Spark. When new versions of Spark require code changes, we create a separate branch. The table below shows what is available now.

|EclairJS Version/Tag | Apache Spark Version |
| ---------------| ----- |
| 0.1            | 1.5.1 |
| 0.2 - 0.7      | 1.6.0 |
| 0.8  (master)  | 2.0.0 |