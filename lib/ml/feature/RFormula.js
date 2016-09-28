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
    var Estimator = require('../Estimator.js');

    var gKernelP = kernelP;


    /**
     * @classdesc
     * :: Experimental ::
     * Implements the transforms required for fitting a dataset against an R model formula. Currently
     * we support a limited subset of the R operators, including '~', '.', ':', '+', and '-'. Also see
     * the R formula docs here: http://stat.ethz.ch/R-manual/R-patched/library/stats/html/formula.html
     *
     * The basic operators are:
     *  - `~` separate target and terms
     *  - `+` concat terms, "+ 0" means removing intercept
     *  - `-` remove a term, "- 1" means removing intercept
     *  - `:` interaction (multiplication for numeric values, or binarized categorical values)
     *  - `.` all columns except target
     *
     * Suppose `a` and `b` are double columns, we use the following simple examples
     * to illustrate the effect of `RFormula`:
     *  - `y ~ a + b` means model `y ~ w0 + w1 * a + w2 * b` where `w0` is the intercept and `w1, w2`
     * are coefficients.
     *  - `y ~ a + b + a:b - 1` means model `y ~ w1 * a + w2 * b + w3 * a * b` where `w1, w2, w3`
     * are coefficients.
     *
     * RFormula produces a vector column of features and a double or string column of label.
     * Like when formulas are used in R for linear regression, string input columns will be one-hot
     * encoded, and numeric columns will be cast to doubles.
     * If the label column is of type string, it will be first transformed to double with
     * `StringIndexer`. If the label column does not exist in the Dataset, the output label column
     * will be created from the specified response variable in the formula.
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function RFormula() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }
    RFormula.prototype = Object.create(Estimator.prototype);

    RFormula.prototype.constructor = RFormula;



    /**
     * Sets the formula to use for this transformer. Must be called before use.
     * @param {string} value  an R formula in string form (e.g. "y ~ x + z")
     * @returns {RFormula}
     */
    RFormula.prototype.setFormula = function(value) {
      var args ={
        target: this,
        method: 'setFormula',
        args: Utils.wrapArguments(arguments),
        returnType: RFormula

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string>}
     */
    RFormula.prototype.getFormula = function() {
      var args ={
        target: this,
        method: 'getFormula',
        returnType: String

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {RFormula}
     */
    RFormula.prototype.setFeaturesCol = function(value) {
      var args ={
        target: this,
        method: 'setFeaturesCol',
        args: Utils.wrapArguments(arguments),
        returnType: RFormula

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {RFormula}
     */
    RFormula.prototype.setLabelCol = function(value) {
      var args ={
        target: this,
        method: 'setLabelCol',
        args: Utils.wrapArguments(arguments),
        returnType: RFormula

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {RFormulaModel}
     */
    RFormula.prototype.fit = function(dataset) {
      var RFormulaModel = require('./RFormulaModel.js')();
      var args ={
        target: this,
        method: 'fit',
        args: Utils.wrapArguments(arguments),
        returnType: RFormulaModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {StructType} schema
     * @returns {StructType}
     */
    RFormula.prototype.transformSchema = function(schema) {
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
     * @returns {RFormula}
     */
    RFormula.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: RFormula

      };

      return Utils.generate(args);
    };


    /**
     * @returns {Promise.<string>}
     */
    RFormula.prototype.toString = function() {
      var args ={
        target: this,
        method: 'toString',
        returnType: String

      };

      return Utils.generate(args);
    };


    //
    // static methods
    //


    /**
     * @param {string} path
     * @returns {RFormula}
     */
    RFormula.load = function(path) {
      var RFormula = require('../../ml/feature/RFormula.js');
      var args ={
        target: RFormula,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: RFormula

      };

      return Utils.generate(args);
    };

    RFormula.moduleLocation = '/ml/feature/RFormula';

    return RFormula;
  })();
};