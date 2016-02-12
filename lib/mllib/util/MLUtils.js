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

var RDD = require('../../RDD.js');

var kernelP;

var MLUtils = {};

MLUtils.loadLibSVMFile = function(sc, path, numFeatures, minPartitions, multiclass) {
  if (arguments.length == 2) {
    var templateStr = 'var {{refId}} = MLUtils.loadLibSVMFile({{sc}}, {{path}});';

    return Utils.evaluate(kernelP, RDD, templateStr, {sc: Utils.prepForReplacement(sc), path: Utils.prepForReplacement(path)});
  }
};

module.exports = function(kP) {
  kernelP = kP;
  return MLUtils;
};




