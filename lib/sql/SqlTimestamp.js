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

var protocol = require('../kernel.js');
var Utils = require('../utils.js');

/**
 *
 * @constructor
 * @classdesc A thin wrapper around Date that allows the JDBC API to identify this as an SQL TIMESTAMP value.
 * It adds the ability to hold the SQL TIMESTAMP fractional seconds value, by allowing the specification of
 * fractional seconds to a precision of nanoseconds. A Timestamp also provides formatting and parsing operations
 * to support the JDBC escape syntax for timestamp values.
 * @param {number | string | Date} number of millisecond, string date representation, or Date object
 */
function SqlTimestamp(kernelP, refIdP, sqltimestamp) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  this.sqltimestamp = sqltimestamp;
};

/**
 * Indicates whether this Timestamp object is later than the given Timestamp object.
 * @param {SqlTimeStamp} when
 * @returns {boolean}
 */
SqlTimestamp.prototype.after = function(when) {
  var templateStr = '{{inRefId}}.after({{when}});';

  return Utils.generateResultPromise(this, templateStr, {when: when});
};

/**
 * Indicates whether this Timestamp object is earlier than the given Timestamp object.
 * @param {SqlTimeStamp} when
 * @returns {boolean}
 */
SqlTimestamp.prototype.before = function(when) {
  var templateStr = '{{inRefId}}.before({{when}});';

  return Utils.generateResultPromise(this, templateStr, {when: when});
};

/**
 * Compares this Timestamp object to the given Date or Timestamp object.
 * @param {SqlDate | SqlTimestamp} when
 * @returns {integer}
 */
SqlTimestamp.prototype.compareTo = function(when) {
  var templateStr = '{{inRefId}}.compareTo({{when}});';

  return Utils.generateResultPromise(this, templateStr, {when: when});
};

/**
 * Tests to see if this Timestamp object is equal to the given Timestamp object.
 * @param {SqlTimestamp} when
 * @returns {boolean}
 */
SqlTimestamp.prototype.equals = function(when) {
  var templateStr = '{{inRefId}}.equals({{when}});';

  return Utils.generateResultPromise(this, templateStr, {when: when});
};

/**
 * Gets this Timestamp object's nanos value.
 * @returns {integer}
 */
SqlTimestamp.prototype.getNanos = function() {
  var templateStr = '{{inRefId}}.getNanos();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT represented by this Timestamp object
 * @returns {integer}
 */
SqlTimestamp.prototype.getTime = function() {
  var templateStr = '{{inRefId}}.getTime();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 * Returns a hash code value for this object.
 * @returns {integer}
 */
SqlTimestamp.prototype.hashCode = function() {
  var templateStr = '{{inRefId}}.hashCode();';

  return Utils.generateResultPromise(this, templateStr);
}

/**
 * Sets this Timestamp object's nanos field to the given value.
 * @param {integer}
 */
SqlTimestamp.prototype.setNanos = function(n) {
  var templateStr = '{{inRefId}}.setNanos({{n}});';

  return Utils.generateResultPromise(this, templateStr, {n: n});
};

/**
 * Sets this Timestamp object to represent a point in time that is time milliseconds after January 1, 1970 00:00:00 GMT.
 * @param {integer}
 */
SqlTimestamp.prototype.setTime = function(n) {
  var templateStr = '{{inRefId}}.setTime({{n}});';

  return Utils.generateResultPromise(this, templateStr, {n: n});
};

/**
 * Formats a timestamp in JDBC timestamp escape format.
 * @returns {string}
 */
SqlTimestamp.prototype.toJSON = function() {
  var templateStr = '{{inRefId}}.toJSON();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 * Formats a timestamp in JDBC timestamp escape format.
 * @returns {string}
 */
SqlTimestamp.prototype.toString = function() {
  var templateStr = '{{inRefId}}.toString();';

  return Utils.generateResultPromise(this, templateStr);
};

module.exports = SqlTimestamp;
