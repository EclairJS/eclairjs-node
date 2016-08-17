/*
 * Copyright 2016 IBM Corp.
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

var Utils = require('./utils.js');
var kernel = require('./kernel.js');

// our shared kernel promise
// TODO: is there a better way to create a Promise and resolve it from the outside?
var kernelPResolve;
var kernelPReject;

var session;

console.log("create")
var gKernelP = new Promise(function(resolve, reject) {
  kernelPResolve = function(kernelSession) {
    session = kernelSession;
    resolve(kernelSession.kernel)
  };

  kernelPReject = function(e) {
    reject(e)
  };
});

module.exports = {
  getKernelPromise: function() {
    return gKernelP;
  },

  start: function(appName) {
    // TODO: handle no app name
    kernel.createKernelSession(appName).then(kernelPResolve).catch(kernelPReject);
  },

  stop: function() {
    return new Promise(function(resolve, reject) {
      gKernelP.then(function(kernel) {
        session.shutdown().then(resolve).catch(reject);
      });
    });
  }
};