var gw = require('../jupyter-js-services');
var RDD = require('./rdd.js');
var protocol = require('./kernel.js');
var Utils = require('./utils.js');

var JUPYTER_HOST = process.env.JUPYTER_HOST || "127.0.0.1"
var JUPYTER_PORT = process.env.JUPYTER_PORT || 8888
var ECLAIR_JAR = process.env.ECLAIR_JAR

function SparkContext(master, name) {
  this.kernel = new Promise(function(resolve, reject) {
    //start the kernel
    gw.startNewKernel({
      baseUrl: "http://" + JUPYTER_HOST + ":" + JUPYTER_PORT,
      wsUrl: "ws://" + JUPYTER_HOST + ":" + JUPYTER_PORT,
      name: "eclair"
    }).then(function(k) {
      console.log("got kernel");
      //when we have kernel info we know the spark kernel is ready.
      k.kernelInfo().then(function(info) {
        console.log("got kernel info");
        //load our jar into the spark kernel
        k.execute({
          code: [
            'loader.load("'+ECLAIR_JAR+'", "com.ibm.eclair.SparkBootstrap");',
            'var jsc = new SparkContext()'
          ].join('\n')
        }).handleMsg = msg => {
          if(msg.msg_type === 'status' &&
             msg.content.execution_state === 'idle') {
            resolve(k);
          }
        }
      });
    }).catch(function(err) {
      reject(err);
    })
  })
}

SparkContext.prototype.parallelize = function(arr) {
  var refId = kernel.genVariable();
  var self = this;
  return new RDD(this.kernel, new Promise(function(resolve, reject) {
    self.kernel.then(kernel => {
      var templateStr = 'var {{refId}} = jsc.parallelize("{{arr}}");';
      var code = Utils.processTemplate(templateStr, {refId: refId, arr: arr.join(",")});

      protocol.verifyAssign(kernel.execute({code: code }),
                            resolve, 
                            reject,
                            refId);
    })
  }))
}

SparkContext.prototype.textFile = function(path) {
  var refId = protocol.genVariable();
  var self = this;
  return new RDD(this.kernel, new Promise(function(resolve, reject) {
    self.kernel.then(kernel => {
      var templateStr = 'var {{refId}} = jsc.textFile("{{path}}");';
      var code = Utils.processTemplate(templateStr, {refId: refId, path: path});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
                            resolve, 
                            reject,
                            refId);
    })
  }))
}

module.exports = SparkContext;
