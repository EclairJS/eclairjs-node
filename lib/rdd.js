var protocol = require('./kernel.js');
var serialize = require('./serialize.js');

function mapStr(a, t, arg) {
  return 'var '+a+' = '+t+'.map('+arg+')'
}

function mapToPairStr(a, t, arg) {
  return 'var '+a+' = '+t+'.mapToPair('+arg+')'
}

function flatMapStr(a, t, arg) {
  return 'var '+a+' = '+t+'.flatMap('+arg+')'
}

function filterStr(a, t, arg) {
  return 'var '+a+' = '+t+'.filter('+arg+')'
}

function reduceByKeyStr(a, t, arg) {
  return 'var '+a+' = '+t+'.reduceByKey('+arg+')'
}

function sortByKeyStr(a, t, arg) {
  return 'var '+a+' = '+t+'.sortByKey('+arg+')'
}

function genCallPromise(refId, rdd, codeFn, arg) {
  return new Promise(function(resolve, reject) {
    var argP = (typeof arg === 'function') ? serialize.serializeFunction(arg) : Promise.resolve(arg)
    var p = Promise.all([rdd.kernelP, rdd.refIdP, argP]);
    p.then(function(values) {
      var code = codeFn(refId,values[1],values[2]);
      protocol.verifyAssign(values[0].execute({code: code}), 
                            resolve, 
                            reject,
                            refId);
    }).catch((err) => { 
      console.log("genCallPromise Error:");
      console.log(err);
      reject(err);
    })
  })
}


function RDD(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

RDD.prototype.count = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var code = values[0] + ".count();"
      protocol.verifyResult(values[1].execute({code: code}), resolve, reject);
    })
  })
}

RDD.prototype.collect = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var code = values[0] + ".collect();"
      protocol.verifyResult(values[1].execute({code: code}), resolve, reject);
    })
  })
}

RDD.prototype.take = function(num) {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var code = values[0]+".take("+num+");"
      protocol.verifyResult(values[1].execute({code: code}), resolve, reject);
    })
  })
}


RDD.prototype.map = function(func) {
  var refId = protocol.genVariable();
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, mapStr, func))
}

RDD.prototype.flatMap = function(func) {
  var refId = protocol.genVariable();
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, flatMapStr, func))
}

RDD.prototype.filter = function(func) {
  var refId = protocol.genVariable();
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, filterStr, func))
}

RDD.prototype.mapToPair = function(func) {
  var refId = protocol.genVariable();
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, mapToPairStr, func))
}

RDD.prototype.reduceByKey = function(func) {
  var refId = protocol.genVariable();
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, reduceByKeyStr, func))
}

RDD.prototype.sortByKey = function(ascending) {
  var refId = protocol.genVariable();
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, sortByKeyStr, ascending))
}

module.exports = RDD;
