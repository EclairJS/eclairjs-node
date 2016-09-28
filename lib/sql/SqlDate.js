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
     * @classdesc A thin wrapper around a millisecond value that allows JDBC to identify this as an SQL DATE value.
     * A milliseconds value represents the number of milliseconds that have passed since January 1, 1970 00:00:00.000 GMT.
     * To conform with the definition of SQL DATE, the millisecond values wrapped by a java.sql.Date instance must be 'normalized'
     * by setting the hours, minutes, seconds, and milliseconds to zero in the particular time zone with which the instance is associated.
     * @param {number | string | Date} number of millisecond, string date representation, or Date object
     */
    function SqlDate() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     * Tests if this date is after the specified date.
     * @param {module:eclairjs/sql.SqlDate} when
     * @returns {boolean}
     */
    SqlDate.prototype.after = function(when) {
      var args = {
        target: this,
        method: 'after',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Tests if this date is before the specified date.
     * @param {module:eclairjs/sql.SqlDate} when
     * @returns {boolean}
     */
    SqlDate.prototype.before = function(when) {
      var args = {
        target: this,
        method: 'before',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Return a copy of this object.
     * @returns {module:eclairjs/sql.SqlDate}
     */
    SqlDate.prototype.clone = function() {
      var args = {
        target: this,
        method: 'clone',
        returnType: SqlDate
      };

      return Utils.generate(args);
    };

    /**
     * Compares two Dates for ordering
     * @param {module:eclairjs/sql.SqlDate} anotherDate
     * @returns {integer}
     */
    SqlDate.prototype.compareTo = function(anotherDate) {
      var args = {
        target: this,
        method: 'compareTo',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Compares two dates for equality.
     * @param {module:eclairjs/sql.SqlDate} when
     * @returns {boolean}
     */
    SqlDate.prototype.equals = function(when) {
      var args = {
        target: this,
        method: 'equals',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };

    /**
     * Sets an existing Date object using the given milliseconds time value.
     * @param milliseconds
     */
    SqlDate.prototype.setTime = function(milliseconds) {
      var args = {
        target: this,
        method: 'setTime',
        args: Utils.wrapArguments(arguments)
      };

      return Utils.generate(args);
    };

    /**
     * Formats a date in the date escape format yyyy-mm-dd.
     * @returns {string}
     */
    SqlDate.prototype.toJSON = function() {
      var args = {
        target: this,
        method: 'toJSON',
        returnType: Object
      };

      return Utils.generate(args);
    };

    /**
     * Formats a date in the date escape format yyyy-mm-dd.
     * @returns {string}
     */
    SqlDate.prototype.toString = function() {
      var args = {
        target: this,
        method: 'toString',
        returnType: String
      };

      return Utils.generate(args);
    };

    SqlDate.moduleLocation = '/sql/SqlDate';

    return SqlDate;
  })();
};