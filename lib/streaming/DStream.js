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

var protocol = require('../kernel.js');
var serialize = require('../serialize.js');
var Utils = require('../utils.js');

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
    }).catch(function(err) {
      console.log("genCallPromise Error:");
      console.log(err);
      reject(err);
    })
  })
}

/**
 * @constructor
 * @classdec Represents a Discretized Stream (DStream), the basic abstraction in Spark Streaming, 
 * is a continuous sequence of RDDs (of the same type) representing a continuous stream of data.
 */
function DStream(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * Return a new DStream by first applying a function to all elements of this DStream, and then flattening the results.
 * @param func
 * @returns {DStream}
 */
DStream.prototype.flatMap = function(func) {
  var refId = protocol.genVariable('dstream');
  var templateStr = 'var {{refId}} = {{inRefId}}.flatMap({{udf}});';
  return new DStream(this.kernelP,
                     genCallPromise(refId, this, templateStr, func))
}

/**
 * Return a new DStream by applying a function to all elements of this DStream.
 * @param func
 * @returns {DStream}
 */
DStream.prototype.map = function(func) {
  var refId = protocol.genVariable('dstream');
  var templateStr = 'var {{refId}} = {{inRefId}}.map({{udf}});';
  return new DStream(this.kernelP,
                     genCallPromise(refId, this, templateStr, func))
}

/**
 * Return a new DStream in which each RDD contains all the elements in seen in a sliding window of time over this DStream. 
 * The new DStream generates RDDs with the same interval as this DStream.
 * @param duration - width of the window; must be a multiple of this DStream's interval.
 * @returns {DStream}
 */
DStream.prototype.window = function(duration) {
  var refId = protocol.genVariable('dstream');
  var templateStr = 'var {{refId}} = {{inRefId}}.window(new Duration({{millis}}));';
  return new DStream(this.kernelP,
                     genCallPromise(refId, this, templateStr, duration.millis))
}


/**
 * Print the first ten elements of each RDD generated in this DStream. This is an output operator, so this DStream will be 
 * registered as an output stream and there materialized.
 * @returns {void}
 */
DStream.prototype.print = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var templateStr = '{{inRefId}}.print();';
      var code = Utils.processTemplate(templateStr, {inRefId: values[0]});
      protocol.verifyVoidResult(values[1].execute({code: code}), resolve, reject);
    }).catch(function(err) {
      reject(err);
    });
  })
}

module.exports = DStream;
