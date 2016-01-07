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

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
global.WebSocket = require('ws');

var gw = require('jupyter-js-services');

function _getURL() {
  // special processing for eclairjs.cloudet.xyz to follow redirect
  //  to spawned kernel
  var JUPYTER_HOST = process.env.JUPYTER_HOST || "127.0.0.1";
  var JUPYTER_PORT = process.env.JUPYTER_PORT || 8888;

  // used for remote urls where we need to handle redirects
  var ELAIRJS_HOST = process.env.ECLAIRJS_HOST || "";

  return new Promise(function(resolve, reject) {
    if (JUPYTER_HOST != ELAIRJS_HOST) {
      resolve(JUPYTER_HOST + ":" + JUPYTER_PORT);
    } else {
      request({
        followAllRedirects: true,
        url: "http://" + ELAIRJS_HOST + "/spawn"
      }, function(error, response, body) {
        if (!error) {
          // console.log(response.request.path);
          var userPath = response.request.path.split('/').slice(0, 3).join('/');
          var hostURL = ELAIRJS_HOST + userPath;
          // console.log(hostURL)
          resolve(hostURL);
        }
        else
          reject(error);
      });
    }
  });
}

// We build our Spark Kernel connection here and share it when any classes that need it
var kernelP = new Promise(function(resolve, reject) {
  _getURL().then(function(hostURL){
    //start the kernel
    gw.startNewKernel({
      baseUrl: "http://" + hostURL,
      wsUrl: "ws://" + hostURL,
      name: "eclair"
    }).then(function(k) {
      console.log("got kernel");
      //when we have kernel info we know the spark kernel is ready.
      k.kernelInfo().then(function(info) {
        resolve(k);
      });
    });

  }).catch(function(err) {
    reject(err);
  })
});

module.exports.SparkContext = require('./lib/SparkContext.js')(kernelP);
module.exports.SQLContext = require('./lib/sql/SQLContext.js');
module.exports.StreamingContext = require('./lib/streaming/StreamingContext.js');
module.exports.KafkaUtils = require('./lib/streaming/KafkaUtils.js');
module.exports.Duration = require('./lib/streaming/Duration.js');

module.exports.sql = {
  functions: require('./lib/sql/functions.js')(kernelP)
};

module.exports.storage = {
  StorageLevel: require('./lib/storage/StorageLevel.js')(kernelP)
};
