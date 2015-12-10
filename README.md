EclairJS
===================
**EclairJS** is a JavaScript client for Apache Spark which is made up of two components, each with it's own project, [EclairJS Node](https://github.com/EclairJS/eclairjs-node) and [EclairJS Nashorn](https://github.com/EclairJS/eclairjs-nashorn/).

## EclairJS Node
The purpose of **EclairJS Node** is to enable JavaScript/NodeJS developers to program against [Apache Spark](http://spark.apache.org/).  **EclairJS Node** provides an API in NodeJS for the [Apache Spark API](http://spark.apache.org/docs/latest/api/java/index.html) and a remote client for a node application.  **EclairJS Node** is dependent on the **EclairJS Nashorn** component.

## EclairJS Nashorn
The purpose of **EclairJS Nashorn** is to expose the [Apache Spark](http://spark.apache.org/) programming model to JavaScript.  **EclairJS Nashorn** provides support for JavaScript in [Spark](http://spark.apache.org/) and a framework that supports various applications including **Eclairjs Node**, a REPL and Jupyter Notebooks. 

![EclairJS Overview](https://github.com/EclairJS/eclairjs-node/blob/master/images/overviewEclairJS.png)

TryIt
===================
Everything you need to run **EclairJS** is setup in a Dockerfile. This provides you with several easy-to-use options: run a simple "hello world" example which counts the ten most frequently occurring words in a text file, run the REPL, and create new Notebooks using the JavaScript Spark API.  Please see [Using-the-Docker-Container](https://github.com/EclairJS/eclairjs-node/wikis/Using-the-Docker-Container).

You can also try out **EclairJS** in Jupyter notebooks running under the [IBM Bluemix Cloud](https://github.com/EclairJS/eclairjs-node/wikis/EclairJS-with-IBM-Bluemix). 

Build & Package
===================
If you would like to take the manual route in lieu of using the Dockerfile you can build the **EclairJS** components from source and setup your own local environment.  Please see [Build and Package](https://github.com/EclairJS/eclairjs-node/wikis/Build-and-Package) for more information.

Version
===================
Our goal is to keep the **EclairJS** master branch up to date with the latest version of Spark. When new versions of Spark require code changes, we create a separate branch. The table below shows what is available now.

| Branch | EclairJS Version | Apache Spark Version |
| -------- | -------- | -------- |
| master   | 0.1   | 1.5.1 |

Please note as new APIs are implemented for **EclairJS** they will be added to the master branch.  Refer to the [API Documentation](https://github.com/EclairJS/eclairjs-node/wikis/API-Documentation) for a list of what is currently implemented.  **EclairJS** has been tested on OSX and Linux.

Resources
===================
More detailed information is available in the Eclair Node [Wiki](https://github.com/EclairJS/eclairjs-node/wikis/home) and find out how to get involved under [Project and Community](https://github.com/EclairJS/eclairjs-node/wikis/Project-and-Community).
