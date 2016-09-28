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

function FakeServer() {
  this.kernelP = new Promise(function(resolve, reject) {
    resolve(new FakeKernel());
  });
}

FakeServer.prototype.getKernelPromise = function() {
  return this.kernelP;
};

FakeServer.prototype.start = function(appName) {
};

FakeServer.prototype.stop = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};

function EclairJS() {

  var server = new FakeServer();
  var kernelP = server.getKernelPromise();

  return {
    SparkContext: require('../../lib/SparkContext.js')(kernelP, server),

    Accumulable: require('../../lib/Accumulable.js')(kernelP),
    AccumulableParam: require('../../lib/AccumulableParam.js')(kernelP),
    List: require('../../lib/List.js')(kernelP),
    Tuple: require('../../lib/Tuple.js')(kernelP),
    Tuple2: require('../../lib/Tuple2.js')(kernelP),
    Tuple3: require('../../lib/Tuple3.js')(kernelP),
    Tuple4: require('../../lib/Tuple4.js')(kernelP),
    SparkConf: require('../../lib/SparkConf.js')(kernelP),

    ml: require('../../lib/ml/module.js')(kernelP),
    mllib: require('../../lib/mllib/module.js')(kernelP),
    rdd: require('../../lib/rdd/module.js')(kernelP),
    sql: require('../../lib/sql/module.js')(kernelP, server),
    storage: require('../../lib/storage/module.js')(kernelP),
    streaming: require('../../lib/streaming/module.js')(kernelP),
  }
}

module.exports = EclairJS;
