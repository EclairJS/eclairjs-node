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

var protocol = require('./kernel.js');
var serialize = require('./serialize.js');
var Utils = require('./utils.js');

function genCallPromise(refId, rdd, templateStr, arg) {
  return new Promise(function(resolve, reject) {
    var argP = (typeof arg === 'function') ? serialize.serializeFunction(arg) : Promise.resolve(arg)
    var p = Promise.all([rdd.kernelP, rdd.refIdP, argP]);
    p.then(function(values) {
      var replacements = {refId: refId, inRefId: values[1]};

      if (typeof(values[2]) == "string") {
        replacements.udf = values[2];
      } else {
        for (var item in values[2]) {
          replacements[item] = values[2][item];
        }
      }

      var code = Utils.processTemplate(templateStr, replacements);

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
      var templateStr = 'JSON.stringify({{inRefId}}.collect());';
      var code = Utils.processTemplate(templateStr, {inRefId: values[0]});
      protocol.verifyResult(values[1].execute({code: code}), resolve, reject);
    }).catch(function(err) {
      reject(err);
    });
  })
}

RDD.prototype.take = function(num) {
  var self = this;
  return new Promise(function(resolve, reject) {
    function _resolve(result) {
      try {
        // take returns a stringified json result so parse it here
        resolve(JSON.parse(result));
      } catch (e) {
        var err = new Error("Parse Error: "+ e.message);
        reject(err);
      }
    }

    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      //var templateStr = '{{inRefId}}.take({{num}});';
      var templateStr = 'JSON.stringify({{inRefId}}.take({{num}}));';
      var code = Utils.processTemplate(templateStr, {inRefId: values[0], num: num});
      protocol.verifyResult(values[1].execute({code: code}), _resolve, reject);
    }).catch(function(err) {
      reject(err);
    });
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
  var templateStr = 'var {{refId}} = {{inRefId}}.sortByKey({{ascending}});';
  return new RDD(this.kernelP,
                 genCallPromise(refId, this, templateStr, {ascending: ascending}))
}

module.exports = RDD;
