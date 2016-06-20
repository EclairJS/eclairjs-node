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

var SparkContext = require('../../lib/SparkContext.js');


var MODE_RESULT = 0;
var MODE_ASSIGN = 1;
var MODE_VOID_ASSIGN = 2;

function FakeKernelExecuteHandle(mode) {
  var self = this;

  setTimeout(function() {
    if (self.onDone) {
      if (mode == MODE_RESULT) {
        var msg = {msg_type: 'execute_result', content: {data: {"text/plain": "{}"}}};
        self.onIOPub(msg)
      }

      self.onDone()
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

  var mode = -1;
  if (global.ECLAIRJS_TEST_MODE && global.ECLAIRJS_TEST_MODE == 'void') {
    mode = MODE_VOID_ASSIGN;
  }

  // TODO: use futures
  // TODO: registerTempTable is an exception here, need a better way
  if (msg.code.indexOf("var ") == 0) {
    return new FakeKernelExecuteHandle(MODE_ASSIGN);
  } else {
    if (mode == MODE_VOID_ASSIGN) {
      return new FakeKernelExecuteHandle(MODE_VOID_ASSIGN);
    } else {
      return new FakeKernelExecuteHandle(MODE_RESULT);
    }
  }
};

var kernelP = new Promise(function(resolve, reject) {
  resolve(new FakeKernel());
});

function FakeSparkContext(master, name, foo) {
  this.kernelP = new Promise(function(resolve, reject) {
    kernelP.then(function(k) {
      //console.log("res");
      resolve(k);
    }).catch(reject);
  });

  this.refIdP = new Promise(function(resolve, reject) {
    this.kernelP.then(function() {
      resolve('jsc');
    }).catch(reject);
  }.bind(this));
}

FakeSparkContext.prototype = SparkContext()[1].prototype;

module.exports = function() {
  return [kernelP, FakeSparkContext];
};
