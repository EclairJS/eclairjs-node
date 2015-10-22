var protocol = require('./kernel.js');
var serialize = require('./serialize.js');
var Utils = require('./utils.js');

function genCallPromise(refId, rdd, templateStr, arg) {
  return new Promise(function(resolve, reject) {
    var argP = (typeof arg === 'function') ? serialize.serializeFunction(arg) : Promise.resolve(arg)
    var p = Promise.all([rdd.kernelP, rdd.refIdP, argP]);
    p.then(function(values) {
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: values[1], udf: values[2]});

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
      console.log(values)
      var templateStr = '{{inRefId}}.count();';
      var code = Utils.processTemplate(templateStr, {inRefId: values[0]});
      protocol.verifyResult(values[1].execute({code: code}), resolve, reject);
    })
  })
}

RDD.prototype.collect = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var templateStr = '{{inRefId}}.collect();';
      var code = Utils.processTemplate(templateStr, {inRefId: values[0]});
      protocol.verifyResult(values[1].execute({code: code}), resolve, reject);
    })
  })
}

RDD.prototype.take = function(num) {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var templateStr = '{{inRefId}}.take({{{num}}});';
      var code = Utils.processTemplate(templateStr, {inRefId: values[0], num: num});
      protocol.verifyResult(values[1].execute({code: code}), resolve, reject);
    })
  })
}


RDD.prototype.map = function(func) {
  var refId = protocol.genVariable('rdd');
  var templateStr = 'var {{refId}} = {{inRefId}}.map({{udf}});';
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, templateStr, func))
}

RDD.prototype.flatMap = function(func) {
  var refId = protocol.genVariable('rdd');
  var templateStr = 'var {{refId}} = {{inRefId}}.flatMap({{udf}});';
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, templateStr, func))
}

RDD.prototype.filter = function(func) {
  var refId = protocol.genVariable('rdd');
  var templateStr = 'var {{refId}} = {{inRefId}}.filter({{udf}});';
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, templateStr, func))
}

RDD.prototype.mapToPair = function(func) {
  var refId = protocol.genVariable('rdd');
  var templateStr = 'var {{refId}} = {{inRefId}}.mapToPair({{udf}});';
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, templateStr, func))
}

RDD.prototype.reduceByKey = function(func) {
  var refId = protocol.genVariable('rdd');
  var templateStr = 'var {{refId}} = {{inRefId}}.reduceByKey({{udf}});';
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, templateStr, func))
}

RDD.prototype.sortByKey = function(ascending) {
  var refId = protocol.genVariable('rdd');
  var templateStr = 'var {{refId}} = {{inRefId}}.sortByKey({{udf}});';
  return new RDD(this.kernelP, 
                 genCallPromise(refId, this, templateStr, ascending))
}

module.exports = RDD;
