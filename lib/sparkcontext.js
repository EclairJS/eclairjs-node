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

var gw = require('jupyter-js-services');
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
        k.execute({
          code: [
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
  var refId = protocol.genVariable('rdd');
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
