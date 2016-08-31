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
    var Utils = require('../utils.js');

    var gKernelP = kernelP;

    function generateStaticStorage(type) {
      var args = {
        target: StorageLevel,
        static: true,
        kernelP: gKernelP,
        method: type,
        returnType: StorageLevel
      };

      return Utils.generate(args);
    }

    /**
     * @memberof module:eclairjs/storage
     * @constructor
     * @classdesc Flags for controlling the storage of an RDD. Each StorageLevel records whether to use memory,
     * or ExternalBlockStore, whether to drop the RDD to disk if it falls out of memory or ExternalBlockStore,
     * whether to keep the data in memory in a serialized format, and whether to replicate the RDD partitions on multiple nodes.
     */
    function StorageLevel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.NONE = function() {
      return generateStaticStorage("NONE");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_ONLY = function() {
      return generateStaticStorage("MEMORY_ONLY");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_ONLY_2 = function() {
      return generateStaticStorage("MEMORY_ONLY_2");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_ONLY_SER = function() {
      return generateStaticStorage("MEMORY_ONLY_SER");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_ONLY_SER_2 = function() {
      return generateStaticStorage("MEMORY_ONLY_SER_2");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.DISK_ONLY = function() {
      return generateStaticStorage("DISK_ONLY");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.DISK_ONLY_2 = function() {
      return generateStaticStorage("DISK_ONLY_2");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_AND_DISK = function() {
      return generateStaticStorage("MEMORY_AND_DISK");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_AND_DISK_2 = function() {
      return generateStaticStorage("MEMORY_AND_DISK_2");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_AND_DISK_SER = function() {
      return generateStaticStorage("MEMORY_AND_DISK_SER");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.MEMORY_AND_DISK_SER_2 = function() {
      return generateStaticStorage("MEMORY_AND_DISK_SER_2");
    };

    /**
     * @static
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.OFF_HEAP = function() {
      return generateStaticStorage("OFF_HEAP");
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.useDisk = function() {
      var args = {
        target: this,
        method: "useDisk",
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.useMemory = function() {
      var args = {
        target: this,
        method: "useMemory",
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.useOffHeap = function() {
      var args = {
        target: this,
        method: "useOffHeap",
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.deserialized = function() {
      var args = {
        target: this,
        method: "deserialized",
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @returns {integer}
     */
    StorageLevel.prototype.replication = function() {
      var args = {
        target: this,
        method: "replication",
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @returns {module:eclairjs/storage.StorageLevel}
     */
    StorageLevel.prototype.clone = function() {
      var args = {
        target: this,
        method: "clone",
        returnType: StorageLevel
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/storage.StorageLevel} other
     * @returns {boolean}
     */
    StorageLevel.prototype.equals = function(other) {
      var args = {
        target: this,
        method: "equals",
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @returns {boolean}
     */
    StorageLevel.prototype.isValid = function() {
      var args = {
        target: this,
        method: "isValid",
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * @returns {integer}
     */
    StorageLevel.prototype.toInt = function() {
      var args = {
        target: this,
        method: "toInt",
        returnType: Integer
      };

      return Utils.generate(args);
    };

    /**
     * @returns {string}
     */
    StorageLevel.prototype.toString = function() {
      var args = {
        target: this,
        method: "toString",
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @returns {integer}
     */
    StorageLevel.prototype.hashCode = function() {
      var args = {
        target: this,
        method: "hashCode",
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * @returns {string}
     */
    StorageLevel.prototype.description = function() {
      var args = {
        target: this,
        method: "description",
        returnType: String
      };

      return Utils.generate(args);
    };

    StorageLevel.moduleLocation = '/storage/StorageLevel';

    return StorageLevel;
  })();
};