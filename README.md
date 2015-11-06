EclairJS 
===================
**EclairJS** is a JavaScript client for Apache Spark.  It is a work-in-progress so it is a good idea to frequently check the [Guide to Using the JavaScript Spark API](https://github.com/EclairJS/eclairjs-node/wikis/Guide-to-using-the-JavaScript-Spark-API) for a list of what is currently implemented.

Overview
===================
**EclairJS** is made up of two components.  The **EclairJS Node** API and the **EclairJS Nashorn** API.

## EclairJS Node
The purpose of **EclairJS Node** is to enable JacaScript/NodeJS developers to program against [Apache Spark](http://spark.apache.org/).  The **EclairJS Node** component provides the NodeJS developer direct JavaScript equivalents of the [Apache Spark API](http://spark.apache.org/docs/latest/api/java/index.html) and handles:
* resolving of variables
* stringifying of code

### When to Use EclairJS Node
The **EclairJS Node** API is the intended entry point for JavaScript/NodeJS programmers into the [Apache Spark](http://spark.apache.org/) world.  It should be used in a NodeJS application to get access to the vast sources of both batch and streaming data [Apache Spark](http://spark.apache.org/) can provide as well as allow transformations and actions to be taken upon the data.

**EclairJS Node is dependent on the EclairJS Nahorn component.**

## EclairJS Nahorn
The purpose of **EclairJS Nashorn** is to expose the [Apache Spark](http://spark.apache.org/) programming model to JavaScript.  **EclairJS Nashorn** is built on top of [Spark's Java API](http://spark.apache.org/docs/latest/api/java/index.html) and runs in the JVM.  The **EclairJS Nashorn** component servers as a Java wrapper and handles:
* execution of lambda functions
* type conversions on Spark Worker nodes

### When to Use EclairJS Node
The **EclairJS Nashorn** API can be used with either Jupyter/IPython Notebooks or the REPL that comes with the _Nashorn_ project to provide JavaScript as a language to the data scientist or developer that may want to explore their data and develop functions and algorithms for transforming and exposing their data before handing off it to the client-side developer.

**EclairJS Nashorn is independent on the EclairJS Node component** and can actually be used for exploration of data via [Apache Spark](http://spark.apache.org/) as mentioned above.

TryIt
===================
The easiest and fastest way to try things out is with the Dockerfile supplied for this project.  

**Please see [Using-the-Docker-Container](https://github.com/EclairJS/eclairjs-node/wikis/Using-the-Docker-Container).**

Develop
===================
If you are interested in becoming a collaborator and help in development of **EclairJS** please email blah@ibm.com to be granted collaborator access.

**Please see [Development for EclairJS](https://github.com/EclairJS/eclairjs-node/wikis/Development-for-EclairJS) for more information.**

Build & Package
===================
If you would like to take the manual route in lieu of using the Dockerfile you can build from source and setup your local environment.

**Please see [Build and Package](https://github.com/EclairJS/eclairjs-node/wikis/Build-and-Package) for more information.**

Version
===================
Our goal is to keep master up to date with the latest version of Spark. When new versions of Spark require code changes, we create a separate branch. The table below shows what is available now.

| Branch | EclairJS Version | Apache Spark Version |
| -------- | -------- | -------- |
| master   | 0.1   | 1.5.1 |

Please note that for the most part, as new APIs are implemented for **EclairJS** they will be added to the master branch.  **See the [Guide to Using the JavaScript Spark API](https://github.com/EclairJS/eclairjs-node/wikis/Guide-to-using-the-JavaScript-Spark-API) for a list of what is currently implemented.**

Resources
===================
There is more detailed information available in our [Wiki](https://github.com/EclairJS/eclairjs-node/wikis/home) and our [Getting Started](https://github.com/EclairJS/eclairjs-node/wikis/Getting-Started-With-EclairJS-Node) guide.
