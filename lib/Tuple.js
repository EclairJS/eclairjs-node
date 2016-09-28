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

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('./utils.js');

    var gKernelP = kernelP;

    /**
     * Simple tuple implementation. This constructor will create new instances
     * and store immutable values within them.
     * @classdesc
     * @class
     * @memberof module:eclairjs
     * @param {objects[]} List of values to store within the tuple.
     */
    function Tuple() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    Tuple.moduleLocation = '/Tuple';

    return Tuple;
  })();
};