EclairJS
===================
**EclairJS** is a JavaScript client for Apache Spark which is made up of two components, each with it's own project. [EclairJS Node](https://github.com/EclairJS/eclairjs-node) and [EclairJS Nashorn](https://github.com/EclairJS/eclairjs-nashorn/).

## EclairJS Node
The purpose of **EclairJS Node** is to enable JavaScript/NodeJS developers to program against [Apache Spark](http://spark.apache.org/).  **EclairJS Node** provides an API in NodeJS for the [Apache Spark API](http://spark.apache.org/docs/latest/api/java/index.html) and a remote client for a node application.  **EclairJS Node** is dependent on the **EclairJS Nashorn** component.

## EclairJS Nahorn
The purpose of **EclairJS Nashorn** is to expose the [Apache Spark](http://spark.apache.org/) programming model to JavaScript.  **EclairJS Nashorn** provides support for JavaScript in [Spark](http://spark.apache.org/) and a framework that supports various applications including **Eclairjs Node**, a REPL and Jupyter Notebooks. 

![EclairJS Overview](https://github.com/EclairJS/eclairjs-node/blob/master/images/overviewEclairJS.png)

TryIt
===================
Everything you need to run **EclairJS** is setup in Dockerfile which, with minimal overhead, allows you to run a simple "hello world" example which does a word count of the top ten most occurring words found in a text file, run the REPL and create new Notebooks using the JavaScript Spark API.  Please see [Using-the-Docker-Container](https://github.com/EclairJS/eclairjs-node/wikis/Using-the-Docker-Container).

Build & Package
===================
If you would like to take the manual route in lieu of using the Dockerfile you can build from source and setup your local environment.  Please see [Build and Package](https://github.com/EclairJS/eclairjs-node/wikis/Build-and-Package) for more information.

Version
===================
Our goal is to keep master up to date with the latest version of Spark. When new versions of Spark require code changes, we create a separate branch. The table below shows what is available now.

| Branch | EclairJS Version | Apache Spark Version |
| -------- | -------- | -------- |
| master   | 0.1   | 1.5.1 |

Please note as new APIs are implemented for **EclairJS** they will be added to the master branch.  Refer to the [Guide to Using the JavaScript Spark API](https://github.com/EclairJS/eclairjs-node/wikis/Guide-to-using-the-JavaScript-Spark-API) for a list of what is currently implemented.  **EclairJS** has been tested on OSX and Linux.

Resources
===================
More detailed information is available in the Eclair Node [Wiki](https://github.com/EclairJS/eclairjs-node/wikis/home) and find out how to get involved under [Project and Community](https://github.com/EclairJS/eclairjs-node/wikis/Project-and-Community).
