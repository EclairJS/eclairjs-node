EclairJS Node
===================
EclairJS Node provides Node.js language bindings for [Apache Spark](https://spark.apache.org).

## Installation

```
$ npm install eclairjs
```

EclairJS Node requires Node 0.12 or higher and also requires a running instance of [EclairJS Nashorn](https://github.com/EclairJS/eclairjs-nashorn/).

Supported Spark versions can be found in the [Version](#version) section below.

## Example
```node
var eclairjs = require('eclairjs');

var sc = new eclairjs.SparkContext("local[*]", "Simple Word Count");

var textFile = sc.textFile('foo.txt');

var words = textFile.flatMap(function(sentence) {
  return sentence.split(" ");
});

var wordsWithCount = words.mapToPair(function(word, Tuple) {
  return new Tuple(word, 1);
}, [eclairjs.Tuple]);

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

```
node --harmony examples/rddtop10.js ./dream.txt
```

Please see [Using-the-Docker-Container](https://github.com/EclairJS/eclairjs-node/wikis/Using-the-Docker-Container) for more about the Docker container.
You can also try out EclairJS in Jupyter notebooks running under the [IBM Bluemix Cloud](https://github.com/EclairJS/eclairjs-node/wikis/EclairJS-with-IBM-Bluemix).

## Documentation
* [API Docs](https://github.com/EclairJS/eclairjs-node/wiki/API-Documentation)
* [Wiki](https://github.com/EclairJS/eclairjs-node/wiki)
* [Presentations](https://github.com/EclairJS/eclairjs-node/wiki/Project-and-Community#presentations)
* [Examples](https://github.com/EclairJS/eclairjs-node/tree/master/examples)

## Community
* [Google Group](https://groups.google.com/forum/#!forum/eclairjs)
* [Slack](https://eclairjs.slack.com)

## Build & Package
If you would like to take the manual route in lieu of using the Dockerfile you can build the EclairJS components from source and setup your own local environment.  Please see [Build and Package](https://github.com/EclairJS/eclairjs-node/wikis/Build-and-Package) for more information.

## Progress

|Spark Feature    |EclairJS Node Status|
|-----------------|--------------------|
|RDD              | Partial Support    |
|SQL/Dataframes   | Partial Support    |
|Streaming        | Partial Support    |
|ml               | Partial Support    |
|mllib             | Partial Support    |
|GraphX           | Unsupported        |

Refer to the [API Documentation](https://github.com/EclairJS/eclairjs-node/wikis/API-Documentation) for a list of what is currently implemented.  Please note as new APIs are implemented for EclairJS Node they will be added to the master branch.

Contributions are always welcome via pull requests.

## Versions
Our goal is to keep the EclairJS master branch up to date with the latest version of Spark. When new versions of Spark require code changes, we create a separate branch. The table below shows what is available now.

|EclairJS Version/Tag | Apache Spark Version |
| -------- | -------- |
| 0.1            | 1.5.1 |
| 0.2 - 0.4      | 1.6.0 |
| 0.5  (master)  | 1.6.0 |
