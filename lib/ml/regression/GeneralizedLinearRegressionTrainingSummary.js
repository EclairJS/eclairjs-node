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

    var GeneralizedLinearRegressionSummary = require('./GeneralizedLinearRegressionSummary')();

    /**
     * @classdesc
     * :: Experimental ::
     * Summary of {@link GeneralizedLinearRegression} fitting and model.
     *
     * @param dataset Dataset to be summarized.
     * @param origModel Model to be summarized.  This is copied to create an internal
     *                  model which cannot be modified from outside.
     * @param diagInvAtWA diagonal of matrix (A^T * W * A)^-1 in the last iteration
     * @param numIterations number of iterations
     * @param solver the solver algorithm used for model training
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml/regression.GeneralizedLinearRegressionTrainingSummary
     */
    function GeneralizedLinearRegressionTrainingSummary(kernelP, refIdP) {
        Utils.handleConstructor(this, arguments, gKernelP);
    };

    GeneralizedLinearRegressionTrainingSummary.prototype = Object.create(GeneralizedLinearRegressionSummary.prototype);

    GeneralizedLinearRegressionTrainingSummary.prototype.constructor = GeneralizedLinearRegressionTrainingSummary;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    GeneralizedLinearRegressionTrainingSummary.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Standard error of estimated coefficients and intercept.
     * @returns {Promise.<number[]>}
     */
    GeneralizedLinearRegressionTrainingSummary.prototype.coefficientStandardErrors = function () {
      var args = {
        target: this,
        method: 'coefficientStandardErrors',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * T-statistic of estimated coefficients and intercept.
     * @returns {Promise.<number[]>}
     */
    GeneralizedLinearRegressionTrainingSummary.prototype.tValues = function () {
      var args = {
        target: this,
        method: 'tValues',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * Two-sided p-value of estimated coefficients and intercept.
     * @returns {Promise.<number[]>}
     */
    GeneralizedLinearRegressionTrainingSummary.prototype.pValues = function () {
      var args = {
        target: this,
        method: 'pValues',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };


    GeneralizedLinearRegressionTrainingSummary.moduleLocation = '/ml/regression/GeneralizedLinearRegressionTrainingSummary';

    return GeneralizedLinearRegressionTrainingSummary;
  })();
};