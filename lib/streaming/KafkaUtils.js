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

var DStream = require('./DStream.js');
var protocol = require('../kernel.js');
var Utils = require('../utils.js');
var request = require('request');

var KafkaUtils = {};

KafkaUtils.createStream = function(ssc, zk, consumer_group, topic) {
  var refId = protocol.genVariable('dstream');
  return new DStream(ssc.context.kernel, new Promise(function(resolve, reject) {
    Promise.all([ssc.context.kernel, ssc.streamingContextP]).then(function(values) {
      var templateStr = 'var {{refId}} = KafkaUtils.createStream({{ssc}},"{{zk}}","{{consumer}}","{{topic}}")';
      var code = Utils.processTemplate(templateStr, 
                                       {refId: refId, 
                                        ssc: values[1],
                                        zk: zk,
                                        consumer: consumer_group,
                                        topic: topic});
      console.log("code");
      console.log(code);
      protocol.verifyAssign(values[0].execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(function(err) {
      reject(err)
    })
  }))
}

module.exports = KafkaUtils
