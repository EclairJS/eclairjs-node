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
    var Transformer = require('../Transformer.js');

    var gKernelP = kernelP;


    /**
     * @classdesc
     * Implements the transformations which are defined by SQL statement.
     * Currently we only support SQL syntax like 'SELECT ... FROM __THIS__ ...'
     * where '__THIS__' represents the underlying table of the input dataset.
     * The select clause specifies the fields, constants, and expressions to display in
     * the output, it can be any select clause that Spark SQL supports. Users can also
     * use Spark SQL built-in function and UDFs to operate on these selected columns.
     * For example, {@link SQLTransformer} supports statements like:
     *  - SELECT a, a + b AS a_b FROM __THIS__
     *  - SELECT a, SQRT(b) AS b_sqrt FROM __THIS__ where a > 5
     *  - SELECT a, b, SUM(c) AS c_sum FROM __THIS__ GROUP BY a, b
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function SQLTransformer(kernelP, refIdP, uid) {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    SQLTransformer.prototype = Object.create(Transformer.prototype);

    SQLTransformer.prototype.constructor = SQLTransformer;



    /**
     * @param {string} value
     * @returns {SQLTransformer}
     */
    SQLTransformer.prototype.setStatement = function(value) {
      var args ={
        target: this,
        method: 'setStatement',
        args: Utils.wrapArguments(arguments),
        returnType: SQLTransformer

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string>}
     */
    SQLTransformer.prototype.getStatement = function() {
      var args ={
        target: this,
        method: 'getStatement',
        returnType: String

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Dataset}
     */
    SQLTransformer.prototype.transform = function(dataset) {
      var Dataset = require('../../sql/Dataset.js');

      var args ={
        target: this,
        method: 'transform',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset

      };

      return Utils.generate(args);
    };


    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    SQLTransformer.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js')();

      var args ={
        target: this,
        method: 'transformSchema',
        args: Utils.wrapArguments(arguments),
        returnType: StructType

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {SQLTransformer}
     */
    SQLTransformer.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: SQLTransformer

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {SQLTransformer}
     */
    SQLTransformer.load = function(path) {
      var args ={
        target: SQLTransformer,
        method: 'load',
        kernelP: gKernelP,
        static: true,
        args: Utils.wrapArguments(arguments),
        returnType: SQLTransformer

      };

      return Utils.generate(args);
    };


    SQLTransformer.moduleLocation = '/ml/feature/SQLTransformer';

    return SQLTransformer;
  })();
};