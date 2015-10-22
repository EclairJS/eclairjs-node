var SparkContext = require('../../lib/sparkcontext.js');

function FakeKernelExecuteHandle() {
  var self = this;

  setTimeout(function() {
    if (self.handleMsg) {
      var msg = {msg_type: 'status', content: {execution_state: 'idle'}};
      self.handleMsg(msg);
    }
  }, 1000);
}

function FakeKernel() {
}

FakeKernel.prototype.execute = function() {
  console.log(arguments)
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