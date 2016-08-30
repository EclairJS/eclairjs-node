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

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('../../utils.js');

    var RDD = require('../../rdd/RDD.js');

    var gKernelP = kernelP;

    /**
     * Model fitted by {@link PrefixSpan}
     * @memberof module:eclairjs/mllib/fpm
     * @classdesc
     * @param {module:eclairjs/rdd.RDD} freqSequences
     * @returns {??}
     * @class
     */
    function PrefixSpanModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    PrefixSpanModel.prototype.freqSequences = function() {
      var args = {
        target: this,
        method: 'freqSequences',
        returnType: RDD
      };

      return Utils.generate(args);
    };

    PrefixSpanModel.moduleLocation = '/mllib/fpm/PrefixSpanModel';

    return PrefixSpanModel;
  })();
};