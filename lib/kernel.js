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

var jjs = require('jupyter-js-services');
var request = require('request');

/**
 * Takes a jupyter-js-services execution future and calls a Promise resolve/reject once the execute completes.
 *
 * Should be used either when creating a new Spark object or a no-op.
 *
 * @param {KernelFutureHandler} handle
 * @param {Promise.resolve} resolve
 * @param {Promise.reject} reject
 * @param {object[]} [extraArgs] Optional extra arguments to be passed to the resolve.
 *
 * @ignore
 */
module.exports.verifyKernelExecution = function(future, resolve, reject, extraArgs) {
  var error = null;
  var args = [];

  future.onReply = function(msg) {
    //console.log("onReply,", msg);

    if (msg.content.status === 'error') {
      error = [msg.content.evalue].concat(msg.content.traceback).join('\n');
    }
  };

  future.onIOPub = msg => {
    //console.log("onIOPub,", msg.content);

    if (msg.content.data) {
      args.push(msg.content.data['text/plain']);
    }
  };

  future.onDone = msg => {
    //console.log("onDone,", msg.content);

    if (error) {
      if (reject) {
        reject(error);
      }
    } else if (resolve) {
      if (extraArgs) {
        args = args.concat(extraArgs)
      }

      resolve.apply(this, args);
    }
  };
};

var variableCounter = {};

module.exports.genVariable = function(name) {
  if (!variableCounter[name]) {
    variableCounter[name] = 1;
  } else {
    variableCounter[name]++;
  }

  return name + variableCounter[name];
};

module.exports.resetVariables = function() {
  variableCounter = {};
};

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

module.exports.createKernelSession = function(jobName) {
  return new Promise(function(resolve, reject) {
    // We build our Spark Kernel connection here and share it when any classes that need it
    _getURL().then(function(hostURL) {
      //start the kernel
      /*
       jjs.startNewKernel({
       baseUrl: "http://" + hostURL,
       wsUrl: "ws://" + hostURL,
       name: "eclair"
       }).then(function(k) {
       console.log("got kernel");
       //when we have kernel info we know the spark kernel is ready.
       k.kernelInfo().then(function(info) {
       kernelPResolve(k);
       });
       });
       */

      jjs.startNewSession({
        baseUrl: "http://" + hostURL,
        wsUrl: "ws://" + hostURL,
        kernelName: "eclair",
        notebookPath: jobName
      }).then(function(session) {
        console.log("got kernel");
        //when we have kernel info we know the spark kernel is ready.
        session.kernel.kernelInfo().then(function(info) {
          resolve(session);
        });
      });

    }).catch(function(err) {
      reject(err);
    })
  });
};