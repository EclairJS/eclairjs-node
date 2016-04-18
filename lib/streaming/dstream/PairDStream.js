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

var Utils = require('../../utils.js');
var PairRDD = require('../../rdd/PairRDD.js');

/**
 * @constructor
 * @classdec Represents a Discretized Stream (DStream), the basic abstraction in Spark Streaming,
 * is a continuous sequence of RDDs (of the same type) representing a continuous stream of data.
 * @param {object} jDStream
 */
function PairDStream(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

var foreachRDDFunc = function(rdd, PairDStream) {
  var id = PairDStream.UUID.randomUUID().toString();

  PairDStream.foreachMap.put(id, rdd.getJavaObject());

  var refId = "PairDStream.unrefRDD(\""+id+"\")";
  var comm = commMap.get("foreachrdd:{{{id}}}");
  comm.send('foreachrdd', JSON.stringify({response: refId}));
};

PairDStream.prototype.foreachRDD = function(func) {
  var fn = foreachRDDFunc.toString().replace("{{{id}}}", "foo");
  var args = {
    target: this,
    method: 'foreachRDD',
    args: [
      {value: fn, type: 'lambda'},
      {value: Utils.wrapBindArgs([PairDStream])}
    ]
  };

  this.kernelP.then(function(kernel) {
    var comm = kernel.connectToComm('foreachrdd', 'foo');

    comm.onMsg = (msg) => {
      var refId = msg.content.data.response;

      if(!refId.startsWith("PairDStream")) {
        return;
      }

      var rdd = new PairRDD(Promise.resolve(kernel), Promise.resolve(refId));
      func(rdd);
    };

    comm.open('');
  });

  return Utils.generate(args);
};

PairDStream.moduleLocation = '/streaming/dstream/PairDStream';

module.exports = PairDStream;