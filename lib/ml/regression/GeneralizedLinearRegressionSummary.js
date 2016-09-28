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


    /**
     * @classdesc
     * :: Experimental ::
     * Summary of {@link GeneralizedLinearRegression} model and predictions.
     *
     * @param dataset Dataset to be summarized.
     * @param origModel Model to be summarized.  This is copied to create an internal
     *                  model which cannot be modified from outside.
     * @class
     * @memberof module:eclairjs/ml/regression
     */
    function GeneralizedLinearRegressionSummary(kernelP, refIdP) {
      Utils.handleConstructor(this, arguments, gKernelP); 
    };

    /**
     * Akaike Information Criterion (AIC) for the fitted model.
     * @returns {Promise.<number>}
     */
    GeneralizedLinearRegressionSummary.prototype.aic = function () {
      var args = {
        target: this,
        method: 'aic',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Degrees of freedom.
     * @returns {Promise.<number>}
     */
    GeneralizedLinearRegressionSummary.prototype.degreesOfFreedom = function () {
      var args = {
        target: this,
        method: 'degreesOfFreedom',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    }; 

    /**
     * The deviance for the fitted model.
     * @returns {Promise.<number>}
     */
    GeneralizedLinearRegressionSummary.prototype.deviance = function () {
      var args = {
        target: this,
        method: 'deviance',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * The dispersion of the fitted model.
     * @returns {Promise.<number>}
     */
    GeneralizedLinearRegressionSummary.prototype.dispersion = function () {
      var args = {
        target: this,
        method: 'dispersion',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * The deviance for the null model.
     * @returns {Promise.<number>}
     */
    GeneralizedLinearRegressionSummary.prototype.nullDeviance = function () {
      var args = {
        target: this,       
        method: 'nullDeviance',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Field in "predictions" which gives the predicted value of each instance.
     * @returns {Promise.<string>}
     */
    GeneralizedLinearRegressionSummary.prototype.predictionCol = function () {
      var args = {
        target: this,
        method: 'predictions',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * Predictions output by the model's `transform` method.
     * @returns {module:eclairjs/sql.Dataset}
     */
    GeneralizedLinearRegressionSummary.prototype.predictions = function () {
      var Dataset = require('../../sql/Dataset');

      var args = {
        target: this,
        method: 'predictions',
        args: Utils.wrapArguments(arguments),
        returnType: Dataset
      };

      return Utils.generate(args);
    };

    /**
     * The numeric rank of the fitted linear model.
     * @returns {Promise.<number>}
     */
    GeneralizedLinearRegressionSummary.prototype.rank = function () {
      var args = {
        target: this,     
        method: 'rank',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * The residual degrees of freedom.
     * @returns {Promise.<number>}
     */
    GeneralizedLinearRegressionSummary.prototype.residualDegreeOfFreedom = function () {
      var args = {
        target: this,
        method: 'residualDegreeOfFreedom',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * The residual degrees of freedom for the null model.
     * @returns {Promise.<number>}
     */
    GeneralizedLinearRegressionSummary.prototype.residualDegreeOfFreedomNull = function () {
      var args = {
        target: this,
        method: 'residualDegreeOfFreedomNull',
        args: Utils.wrapArguments(arguments),
        returnType: Number
      };

      return Utils.generate(args);
    };

    /**
     * Get the residuals of the fitted model by type.
     *
     * @param {string} [residualsType]  The type of residuals which should be returned.
     *                      Supported options: deviance, pearson, working and response.
     * @returns {module:eclairjs/sql.Dataset} 
     */
    GeneralizedLinearRegressionSummary.prototype.residuals = function(residualsType) {
      var Dataset = require('../../sql/Dataset.js');

      var args ={
        target: this, 
        method: 'residuals', 
        args: Utils.wrapArguments(arguments),
        returnType: Dataset

      };

      return Utils.generate(args);
    };

    GeneralizedLinearRegressionSummary.moduleLocation = '/ml/regression/GeneralizedLinearRegressionSummary';

    return GeneralizedLinearRegressionSummary;
  })();
};