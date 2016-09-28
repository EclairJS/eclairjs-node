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

    var Model = require('../Model')();

    var gKernelP = kernelP;


    /**
     * @classdesc
     * :: Experimental ::
     *
     * Multivariate Gaussian Mixture Model (GMM) consisting of k Gaussians, where points
     * are drawn from each Gaussian i with probability weights(i).
     *
     * @param weights Weight for each Gaussian distribution in the mixture.
     *                This is a multinomial probability distribution over the k Gaussians,
     *                where weights(i) is the weight for Gaussian i, and weights sum to 1.
     * @param gaussians Array of {@link MultivariateGaussian} where gaussians(i) represents
     *                  the Multivariate Gaussian (Normal) Distribution for Gaussian i
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/ml.Model
     */
    function GaussianMixtureModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    };

    GaussianMixtureModel.prototype = Object.create(Model.prototype);

    GaussianMixtureModel.prototype.constructor = GaussianMixtureModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    GaussianMixtureModel.prototype.uid = function () {
      var args = {
        target: this,
        method: 'uid',
        args: Utils.wrapArguments(arguments),
        returnType: String
      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {module:eclairjs/ml/clustering.GaussianMixtureModel} 
     */
    GaussianMixtureModel.prototype.copy = function(extra) {
      var args ={
        target: this, 
        method: 'copy', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixtureModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset}
     */
    GaussianMixtureModel.prototype.transform = function(dataset) {
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
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {StructType} 
     */
    GaussianMixtureModel.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js');

      var args ={
        target: this, 
        method: 'transformSchema', 
        args: Utils.wrapArguments(arguments),
        returnType: StructType

      };

      return Utils.generate(args);
    };


    /**
     * Retrieve Gaussian distributions as a DataFrame.
     * Each row represents a Gaussian Distribution.
     * Two columns are defined: mean and cov.
     * Schema:
     * @example 
     *  root
     *   |-- mean: vector (nullable = true)
     *   |-- cov: matrix (nullable = true)
     *  
     * @returns {module:eclairjs/sql.Dataset} 
     */
    GaussianMixtureModel.prototype.gaussiansDF = function() {
      var Dataset = require('../../sql/Dataset.js');

      var args ={
        target: this, 
        method: 'gaussiansDF', 
        returnType: Dataset

      };

      return Utils.generate(args);
    };

    /**
     * @returns {Promise.<Number[]>}
     */
    GaussianMixtureModel.prototype.weights = function() {
      //var Vector = require('../linalg/Vector');

      var args = {
        target: this,
        method: 'weights',
        args: Utils.wrapArguments(arguments),
        returnType: [Number]
      };

      return Utils.generate(args);
    };

    /**
     * Returns a {@link MLWriter} instance for this ML instance.
     *
     * For [[GaussianMixtureModel]], this does NOT currently save the training {@link summary}.
     * An option to save {@link summary} may be added in the future.
     *
     * @returns {MLWriter} 
     */
    GaussianMixtureModel.prototype.write = function() {
    throw "not implemented by ElairJS";
    // var MLWriter = require('../../ml/util/MLWriter.js');
    //  var args ={
    //    target: this, 
    //    method: 'write', 
    //    returnType: MLWriter
    //
    //  };
    //
    //  return Utils.generate(args);
    };


    /**
     * Return true if there exists summary of model.
     * @returns {Promise.<boolean>} 
     */
    GaussianMixtureModel.prototype.hasSummary = function() {
      var args = {
        target: this,
        method: 'hasSummary',
        args: Utils.wrapArguments(arguments),
        returnType: Boolean
      };

      return Utils.generate(args);
    };


    /**
     * Gets summary of model on training set. An exception is
     * thrown if `trainingSummary == None`.
     * @returns {module:eclairjs/ml/clustering.GaussianMixtureSummary} 
     */
    GaussianMixtureModel.prototype.summary = function() {
      var GaussianMixtureSummary = require('./GaussianMixtureSummary')();

      var args = {
        target: this,
        method: 'summary',
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixtureSummary
      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @returns {MLReader} 
     */
    GaussianMixtureModel.read = function() {
    throw "not implemented by ElairJS";
    // var MLReader = require('../../ml/util/MLReader.js');
    //  var args ={
    //    target: GaussianMixtureModel, 
    //    method: 'read', 
    //    static: true,
    //    returnType: MLReader
    //
    //  };
    //
    //  return Utils.generate(args);
    };

    /**
     * @param {string} path
     * @returns {GaussianMixtureModel} 
     */
    GaussianMixtureModel.load = function(path) {
      var args ={
        target: GaussianMixtureModel, 
        method: 'load', 
        kernelP: gKernelP,
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: GaussianMixtureModel

      };

      return Utils.generate(args);
    };

    GaussianMixtureModel.moduleLocation = '/ml/clustering/GaussianMixtureModel';

    return GaussianMixtureModel;
  })();
};