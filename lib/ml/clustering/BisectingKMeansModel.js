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
     * Model fitted by BisectingKMeans.
     *
     * @param parentModel a model trained by {@link BisectingKMeans}.
     * @class
     * @memberof module:eclairjs/ml/clustering
     * @extends module:eclairjs/ml.Model
     */
    function BisectingKMeansModel() {
      Utils.handleConstructor(this, arguments, gKernelP);
    };

    BisectingKMeansModel.prototype = Object.create(Model.prototype);

    BisectingKMeansModel.prototype.constructor = BisectingKMeansModel;

    /**
     * An immutable unique ID for the object and its derivatives.
     * @returns {Promise.<string>}
     */
    BisectingKMeansModel.prototype.uid = function () {
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
     * @returns {BisectingKMeansModel} 
     */
    BisectingKMeansModel.prototype.copy = function(extra) {
      var args ={
        target: this, 
        method: 'copy', 
        args: Utils.wrapArguments(arguments),
        returnType: BisectingKMeansModel

      };

      return Utils.generate(args);
    };


    /**
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {module:eclairjs/sql.Dataset} 
     */
    BisectingKMeansModel.prototype.transform = function(dataset) {
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
     * @returns {module:eclairjs/sql/types.StructType}
     */
    BisectingKMeansModel.prototype.transformSchema = function(schema) {
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
     * @returns {Vector[]} 
     */
    BisectingKMeansModel.prototype.clusterCenters = function() {
      var Vector = require('../linalg/Vector');

      var args ={
        target: this, 
        method: 'clusterCenters', 
        returnType: [Vector]

      };

      return Utils.generate(args);
    };


    /**
     * Computes the sum of squared distances between the input points and their corresponding cluster
     * centers.
     * @param {module:eclairjs/sql.Dataset} dataset
     * @returns {Promise.<number>} 
     */
    BisectingKMeansModel.prototype.computeCost = function(dataset) {
      var args ={
        target: this, 
        method: 'computeCost', 
        args: Utils.wrapArguments(arguments),
        returnType: Number

      };

      return Utils.generate(args);
    };


    /**
     * @returns {MLWriter} 
     */
    BisectingKMeansModel.prototype.write = function() {
      throw "not implemented by ElairJS";
    //  var MLWriter = require('../../ml/util/MLWriter.js');
    //
    //  var args ={
    //    target: this, 
    //    method: 'write', 
    //    returnType: MLWriter
    //
    //  };
    //
    //  return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @returns {MLReader} 
     */
    BisectingKMeansModel.read = function() {
      throw "not implemented by ElairJS";
    //  var MLReader = require('../../ml/util/MLReader.js');
    //
    //  var args ={
    //    target: BisectingKMeansModel, 
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
     * @returns {BisectingKMeansModel} 
     */
    BisectingKMeansModel.load = function(path) {
      var args ={
        target: BisectingKMeansModel, 
        method: 'load', 
        args: Utils.wrapArguments(arguments),
        static: true,
        returnType: BisectingKMeansModel

      };

      return Utils.generate(args);
    };

    BisectingKMeansModel.moduleLocation = '/ml/clustering/BisectingKMeansModel';

    return BisectingKMeansModel;
  })();
};