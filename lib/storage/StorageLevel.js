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

var Utils = require('../utils.js');

var kernelP;

/**
 * @constructor
 * @classdesc Flags for controlling the storage of an RDD. Each StorageLevel records whether to use memory,
 * or ExternalBlockStore, whether to drop the RDD to disk if it falls out of memory or ExternalBlockStore,
 * whether to keep the data in memory in a serialized format, and whether to replicate the RDD partitions on multiple nodes.
 */
function StorageLevel(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

function generateStaticStorage(type) {
  var args = {
    target: StorageLevel,
    static: true,
    kernelP: kernelP,
    method: type,
    returnType: StorageLevel
  };

  return Utils.generate(args);
}

/**
 * @static
 * @returns {StorageLevel}
 */
StorageLevel.NONE = function() {
  return generateStaticStorage("NONE");
};

/**
 * @static
 * @returns {StorageLevel}
 */
StorageLevel.MEMORY_ONLY = function() {
  return generateStaticStorage("MEMORY_ONLY");
};

/**
 * @static
 * @returns {StorageLevel}
 */
StorageLevel.DISK_ONLY = function() {
  return generateStaticStorage("DISK_ONLY");
};

/**
 * @static
 * @returns {StorageLevel}
 */
StorageLevel.DISK_ONLY_2 = function() {
  return generateStaticStorage("DISK_ONLY_2");
};

/**
 * @static
 * @returns {StorageLevel}
 */
StorageLevel.MEMORY_AND_DISK_2 = function() {
  return generateStaticStorage("MEMORY_AND_DISK_2");
};

StorageLevel.moduleLocation = '/storage/StorageLevel';

module.exports = function(kP) {
  kernelP = kP;
  return StorageLevel;
};