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
     * @classdesc A factory class used to construct Row objects.
     */
    function RowFactory() {
    }

    /**
     * Create a Row from the given arguments. Position i in the argument list becomes position i in the created Row object.
     * @param {object} values
     * @returns {module:eclairjs/sql.Row}
     */
    RowFactory.create = function() {
      var Row = require('./Row.js')(gKernelP);

      var values = Array.prototype.slice.call(arguments);

      if (values) {
        var row = values.length > 1 ? new Row(values) : new Row(values[0]);
        return row;
      } else {
        return null;
      }
    };

    RowFactory.createLocal = function(values, schema) {
      var Row = require('./Row.js')(gKernelP);

      if (values) {
        var row = new Row(values, schema);
        return row;
      } else {
        return null;
      }
    };

    RowFactory.createRemote = function(values, schema) {
      var Row = require('./Row.js')(gKernelP);

      var args = {
        target: this,
        method: 'create',
        args: Utils.wrapArguments(arguments),
        returnType: Row,
        static: true,
        kernelP: gKernelP
      };

      return Utils.generate(args);
    };

    RowFactory.moduleLocation = '/sql/RowFactory';

    return RowFactory;
  })();
};