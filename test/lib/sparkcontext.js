var SparkContext = require('../../lib/sparkcontext.js');

function FakeKernelExecuteHandle() {
  var self = this;

  setTimeout(function() {
    if (self.handleMsg) {
      var msg = {msg_type: 'status', content: {execution_state: 'idle'}};
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
  return new FakeKernelExecuteHandle();
}

function FakeSparkContext(master, name) {
  this.kernel = new Promise(function(resolve, reject) {
    resolve(new FakeKernel());
  });
}

FakeSparkContext.prototype = SparkContext.prototype;

module.exports = FakeSparkContext;