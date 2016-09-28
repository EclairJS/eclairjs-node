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
    var Utils = require('../utils.js');

    var gKernelP = kernelP;

    /**
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     * @class
     * @memberof module:eclairjs/sql
     */
    function Encoders() {
    }

    /**
     * An encoder for nullable boolean type.
     * The Scala primitive encoder is available as {@link scalaBoolean}.
     * @since EclairJS 0.7 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.BOOLEAN = function() {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'BOOLEAN',
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for nullable int type.
     * The Scala primitive encoder is available as {@link scalaInt}.
     * @since EclairJS 0.7 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.INT = function() {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'INT',
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for nullable float type.
     * The Scala primitive encoder is available as {@link scalaFloat}.
     * @since EclairJS 0.7 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.FLOAT = function() {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'FLOAT',
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for nullable double type.
     * The Scala primitive encoder is available as {@link scalaDouble}.
     * @since EclairJS 0.7 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.DOUBLE = function() {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'DOUBLE',
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for nullable string type.
     *
     * @since EclairJS 0.7 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.STRING = function() {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'STRING',
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for nullable date type.
     *
     * @since EclairJS 0.7 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.DATE = function() {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'DATE',
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for nullable timestamp type.
     *
     * @since EclairJS 0.7 Spark  1.6.0
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.TIMESTAMP = function() {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'TIMESTAMP',
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for 2-ary tuples.
     *
     * @since EclairJS 0.7 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.tuple2 = function(e1,e2) {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'tuple2',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for 3-ary tuples.
     *
     * @since EclairJS 0.7 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.tuple3 = function(e1,e2,e3) {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'tuple3',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for 4-ary tuples.
     *
     * @since EclairJS 0.7 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @param {module:eclairjs/sql.Encoder} e4
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.tuple4 = function(e1,e2,e3,e4) {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'tuple4',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for 5-ary tuples.
     *
     * @since EclairJS 0.7 Spark  1.6.0
     * @param {module:eclairjs/sql.Encoder} e1
     * @param {module:eclairjs/sql.Encoder} e2
     * @param {module:eclairjs/sql.Encoder} e3
     * @param {module:eclairjs/sql.Encoder} e4
     * @param {module:eclairjs/sql.Encoder} e5
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.tuple5 = function(e1,e2,e3,e4,e5) {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'tuple5',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    /**
     * An encoder for 4-ary tuples.
     *
     * @since EclairJS 0.7 Spark  1.6.0
     * @param {object} schema - object with keys corresponding to JSON field names (or getter functions), and values indicating Datatype
     * @returns {module:eclairjs/sql.Encoder}
     */
    Encoders.json = function() {
      var Encoder = require('./Encoder')(gKernelP);

      var args = {
        target: Encoders,
        method: 'json',
        args: Utils.wrapArguments(arguments),
        static: true,
        kernelP: gKernelP,
        returnType: Encoder
      };

      return Utils.generate(args);
    };

    Encoders.moduleLocation = '/sql/Encoders';

    return Encoders;
  })();
};