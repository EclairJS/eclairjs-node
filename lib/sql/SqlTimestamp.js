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

    /**
     * @constructor
     * @memberof module:eclairjs/sql
     * @classdesc A thin wrapper around Date that allows the JDBC API to identify this as an SQL TIMESTAMP value.
     * It adds the ability to hold the SQL TIMESTAMP fractional seconds value, by allowing the specification of
     * fractional seconds to a precision of nanoseconds. A Timestamp also provides formatting and parsing operations
     * to support the JDBC escape syntax for timestamp values.
     * @param {number | string | Date} number of millisecond, string date representation, or Date object
     */
    function SqlTimestamp() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Indicates whether this Timestamp object is later than the given Timestamp object.
     * @param {module:eclairjs/sql.SqlTimestamp} when
     * @returns {boolean}
     */
    SqlTimestamp.prototype.after = function(when) {
      var args = {
        target: this,
        method: 'after',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Indicates whether this Timestamp object is earlier than the given Timestamp object.
     * @param {module:eclairjs/sql.SqlTimestamp} when
     * @returns {boolean}
     */
    SqlTimestamp.prototype.before = function(when) {
      var args = {
        target: this,
        method: 'before',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Compares this Timestamp object to the given Date or Timestamp object.
     * @param {SqlDate | SqlTimestamp} when
     * @returns {integer}
     */
    SqlTimestamp.prototype.compareTo = function(when) {
      var args = {
        target: this,
        method: 'compareTo',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Tests to see if this Timestamp object is equal to the given Timestamp object.
     * @param {module:eclairjs/sql.SqlTimestamp} when
     * @returns {boolean}
     */
    SqlTimestamp.prototype.equals = function(when) {
      var args = {
        target: this,
        method: 'equals',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Gets this Timestamp object's nanos value.
     * @returns {integer}
     */
    SqlTimestamp.prototype.getNanos = function() {
      var args = {
        target: this,
        method: 'getNanos',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT represented by this Timestamp object
     * @returns {integer}
     */
    SqlTimestamp.prototype.getTime = function() {
      var args = {
        target: this,
        method: 'getTime',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Returns a hash code value for this object.
     * @returns {integer}
     */
    SqlTimestamp.prototype.hashCode = function() {
      var args = {
        target: this,
        method: 'hashCode',
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Sets this Timestamp object's nanos field to the given value.
     * @param {integer}
     */
    SqlTimestamp.prototype.setNanos = function(n) {
      var args = {
        target: this,
        method: 'setNanos',
        args: Utils.wrapArguments(arguments)
      };

      return Utils.generate(args);
    };

    /**
     * Sets this Timestamp object to represent a point in time that is time milliseconds after January 1, 1970 00:00:00 GMT.
     * @param {integer}
     */
    SqlTimestamp.prototype.setTime = function(n) {
      var args = {
        target: this,
        method: 'setTime',
        args: Utils.wrapArguments(arguments)
      };

      return Utils.generate(args);
    };

    /**
     * Formats a timestamp in JDBC timestamp escape format.
     * @returns {string}
     */
    SqlTimestamp.prototype.toJSON = function() {
      var args = {
        target: this,
        method: 'toJSON',
        returnType: Object
      };

      return Utils.generate(args);
    };

    /**
     * Formats a timestamp in JDBC timestamp escape format.
     * @returns {string}
     */
    SqlTimestamp.prototype.toString = function() {
      var args = {
        target: this,
        method: 'toString',
        returnType: String
      };

      return Utils.generate(args);
    };

    SqlTimestamp.moduleLocation = '/sql/SqlTimestamp';

    return SqlTimestamp;
  })();
};