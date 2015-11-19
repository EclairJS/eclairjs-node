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

var SparkContext = require('../../lib/sparkcontext.js');

function FakeKernelExecuteHandle(execution) {
  var self = this;

  setTimeout(function() {
    if (self.handleMsg) {
      var msg = execution ? {msg_type: 'execute_result', content: {data: {"text/plain": "{}"}}} : {msg_type: 'status', content: {execution_state: 'idle'}};
      self.handleMsg(msg);
    }
  }, 10);
}

function FakeKernel() {
  this._listener = null;
}

FakeKernel.prototype.addExecuteListener = function(listener) {
  this._listener = listener;
}

FakeKernel.prototype.removeExecuteListener = function(listener) {
  this._listener = null;
}

FakeKernel.prototype.execute = function(msg) {
  if (this._listener) {
    this._listener(msg);
  }

  // TODO: use futures
  // TODO: registerTempTable is an exception here, need a better way
  if (msg.code.indexOf("var ") == 0 || msg.code.indexOf("registerTempTable") >= 0) {
    return new FakeKernelExecuteHandle();
  } else {
    return new FakeKernelExecuteHandle(true);
  }
}

function FakeSparkContext(master, name) {
  this.kernel = new Promise(function(resolve, reject) {
    resolve(new FakeKernel());
  });
}

FakeSparkContext.prototype = SparkContext.prototype;

module.exports = FakeSparkContext;
