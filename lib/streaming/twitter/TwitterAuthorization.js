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

var gKernelP;

/**
 * @constructor
 * @memberof module:eclairjs/streaming/twitter
 * @classdesc Twitter Authorization.
 * @param {string} oauthConsumerKey
 * @param {string} oauthConsumerSecret
 * @param {string} oauthAccessToken
 * @param {string} oauthAccessTokenSecret
 */
function TwitterAuthorization() {
  if (arguments.length == 2 && arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: TwitterAuthorization,
      args: Utils.wrapArguments(arguments),
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

TwitterAuthorization.moduleLocation = '/streaming/twitter/TwitterAuthorization';

module.exports = function(kP) {
  gKernelP = kP;

  return TwitterAuthorization;
};