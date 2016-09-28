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
  return (function() {    var Utils = require('../../utils.js');

    var Estimator = require('../Estimator')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * :: Experimental ::
     * Gaussian Mixture clustering.
     *
     * This class performs expectation maximization for multivariate Gaussian
     * Mixture Models (GMMs).  A GMM represents a composite distribution of
     * independent Gaussian distributions with associated "mixing" weights
     * specifying each's contribution to the composite.
     *
     * Given a set of sample points, this class will maximize the log-likelihood
     * for a mixture of k Gaussians, iterating until the log-likelihood changes by
     * less than convergenceTol, or until it has reached the max number of iterations.
     * While this process is generally guaranteed to converge, it is not guaranteed
     * to find a global optimum.
     *
     * Note: For high-dimensional data (with many features), this algorithm may perform poorly.
     *       This is due to high-dimensional data (a) making it difficult to cluster at all (based
     *       on statistical/theoretical arguments) and (b) numerical issues with Gaussian distributions.
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/ml.Estimator
     * @param {string} uid
     * @constructor
     */
    function GaussianMixture() {
      Utils.handleConstructor(this, arguments, gKernelP);
    };

    GaussianMixture.prototype = Object.create(Estimator.prototype);

    GaussianMixture.prototype.constructor = GaussianMixture;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    GaussianMixture.prototype.uid = function () {
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
     * @returns {GaussianMixture} 
     */
    GaussianMixture.prototype.copy = function(extra) {
      var args ={
        target: this, 
        method: 'copy', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixture

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type} 
     */
    GaussianMixture.prototype.setFeaturesCol = function(value) {
      var args ={
        target: this, 
        method: 'setFeaturesCol', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixture

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type} 
     */
    GaussianMixture.prototype.setPredictionCol = function(value) {
      var args ={
        target: this, 
        method: 'setPredictionCol', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixture

      };

      return Utils.generate(args);
    };


    /**
     * @param {string} value
     * @returns {type} 
     */
    GaussianMixture.prototype.setProbabilityCol = function(value) {
      var args ={
        target: this, 
        method: 'setProbabilityCol', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixture

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type} 
     */
    GaussianMixture.prototype.setK = function(value) {
      var args ={
        target: this, 
        method: 'setK', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixture

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type} 
     */
    GaussianMixture.prototype.setMaxIter = function(value) {
      var args ={
        target: this, 
        method: 'setMaxIter', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixture

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type} 
     */
    GaussianMixture.prototype.setTol = function(value) {
      var args ={
        target: this, 
        method: 'setTol', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixture

      };

      return Utils.generate(args);
    };


    /**
     * @param {number} value
     * @returns {type} 
     */
    GaussianMixture.prototype.setSeed = function(value) {
      var args ={
        target: this, 
        method: 'setSeed', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixture

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {GaussianMixtureModel} 
     */
    GaussianMixture.prototype.fit = function(dataset) {
      var GaussianMixtureModel = require('./GaussianMixtureModel')();

      var args ={
        target: this, 
        method: 'fit', 
        args: Utils.wrapArguments(arguments),
        returnType: GaussianMixtureModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql/types.StructType} schema
     * @returns {StructType} 
     */
    GaussianMixture.prototype.transformSchema = function(schema) {
      var StructType = require('../../sql/types/StructType.js');

      var args ={
        target: this, 
        method: 'transformSchema', 
        args: Utils.wrapArguments(arguments),
        returnType: StructType

      };

      return Utils.generate(args);
    };

    //
    //static methods
    //

    /**
     * @param {string} path
     * @returns {GaussianMixture} 
     */
    GaussianMixture.load = function(path) {
      var args ={
        target: GaussianMixture, 
        method: 'load', 
        kernelP: gKernelP,
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: GaussianMixture

      };

      return Utils.generate(args);
    };

    GaussianMixture.moduleLocation = '/ml/clustering/GaussianMixture';

    return GaussianMixture;
  })();
};