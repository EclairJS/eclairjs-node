Javascript Spark
===================

Javascript client for Apache Spark

Setup
---------------

**Prerequisites**
- [node](http://nodejs.org/)


```bash
npm install
```

**jupyter-js-services fork**


```bash
git clone https://github.com/bpburns/jupyter-js-services.git
cd jupyter-js-services
git checkout startNewKernel
npm install
```

**Docker spark kernel and kernel_gateway**

```bash
docker build -t jsspark .
```

Modify ./gateway.sh with correct directory

```bash
./gateway.sh
```

**Java**

Build java jar and run web server to make jar available to kernel

```bash
cd java
python -m SimpleHTTPServer &
mvn package
```

Run Example
---------

```bash
node --harmony examples/rddtop10.js
```

Running Tests
-----

Install mocha first

```npm install -g mocha```

Then run the tests

```mocha --harmony test/```
