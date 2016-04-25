/*
 * Copyright 2016 IBM Corp.
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

/**
 * @memberof module:eclairjs/streaming/twitter
 * @constructor
 */
function TwitterUtils() {
}

/**
 * Create a input stream that returns tweets received from Twitter.
 * Storage level of the data will be the default StorageLevel.MEMORY_AND_DISK_SER_2.
 * @param {module:eclairjs/streaming.StreamingContext} jssc         JavaStreamingContext object
 * @param {module:eclairjs/streaming/twitter.TwitterAuthorization} twitterAuth  Twitter  Authorization
 * @param {string[]} filters      Set of filter strings to get only those tweets that match them
 * @returns {ReceiverInputDStream}
 */
TwitterUtils.createStream = function(ssc, zk, consumer_group, topic) {
  var DStream = require('./../dstream/DStream.js')(ssc.kernelP);

  var ReceiverInputDStream = require('../dstream/ReceiverInputDStream');

  var args = {
    target: TwitterUtils,
    method: 'createStream',
    kernelP: ssc.kernelP,
    static: true,
    args: Utils.wrapArguments(arguments),
    returnType: ReceiverInputDStream
  };

  return Utils.generate(args);
};

TwitterUtils.moduleLocation = '/streaming/twitter/TwitterUtils';

module.exports = TwitterUtils;