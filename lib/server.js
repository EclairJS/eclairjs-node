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

function Server() {
  this.session = null;

  var scope = this;

  this.kernelP = new Promise(function(resolve, reject) {
    scope.kernelPResolve = function(kernelSession) {
      scope.session = kernelSession;
      resolve(kernelSession.kernel)
    };

    scope.kernelPReject = function(e) {
      reject(e)
    };
  });
}

Server.prototype.getKernelPromise = function() {
  return this.kernelP;
};

Server.prototype.start = function(appName) {
  kernel.createKernelSession(appName).then(this.kernelPResolve).catch(this.kernelPReject);
};

Server.prototype.stop = function() {
  var scope = this;

  return new Promise(function(resolve, reject) {
    scope.kernelP.then(function(kernel) {
      scope.session.shutdown().then(resolve).catch(reject);
    });
  });
};

module.exports = Server;