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

var Utils = require('../../utils.js');

var Model = require('../Model')();

var gKernelP;

/**
 * @classdesc
 * Model fitted by KMeans.
 *
 * @class
 * @memberof module:eclairjs/ml/clustering
 * @extends module:eclairjs/ml.Model
 */
function KMeansModel() {
  if (arguments.length == 2) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var args = {
      target: KMeansModel,
      args: Utils.wrapArguments(arguments),
      kernelP: gKernelP
    };

    this.refIdP = Utils.generateConstructor(args);
  }
}

KMeansModel.prototype = Object.create(Model.prototype);

KMeansModel.prototype.constructor = KMeansModel;

/**
 * An immutable unique ID for the object and its derivatives.
 * @returns {Promise.<string>}
 */
KMeansModel.prototype.uid = function () {
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
 * @returns {module:eclairjs/mllib/clustering.KMeansModel}
 */
KMeansModel.prototype.copy = function(extra) {
  var args = {
    target: this,
    method: 'copy',
    args: Utils.wrapArguments(arguments),
    returnType: KMeansModel
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/sql.DataFrame} dataset
 * @returns {module:eclairjs/sql.DataFrame}
 */
KMeansModel.prototype.transform = function(dataset) {
  var DataFrame = require('../../sql/DataFrame');

  var args = {
    target: this,
    method: 'transform',
    args: Utils.wrapArguments(arguments),
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * @param {module:eclairjs/sql/types.StructType} schema
 * @returns {module:eclairjs/sql/types.StructType}
 */
KMeansModel.prototype.transformSchema = function(schema) {
  var StructType = require('../../sql/types/StructType')();

  var args = {
    target: this,
    method: 'transformSchema',
    args: Utils.wrapArguments(arguments),
    returnType: StructType
  };

  return Utils.generate(args);
};

/**
 * @returns {module:eclairjs/mllib/linalg.Vector[]}
 */
KMeansModel.prototype.clusterCenters = function() {
  var Vector = require('../../mllib/linalg/Vector');

  var args = {
    target: this,
    method: 'clusterCenters',
    args: Utils.wrapArguments(arguments),
    returnType: [Vector]
  };

  return Utils.generate(args);
};

/**
 * Return the K-means cost (sum of squared distances of points to their nearest center) for this
 * model on the given data.
 * @param {module:eclairjs/sql.DataFrame} dataset
 * @returns {Promise.<number>}
 */
KMeansModel.prototype.computeCost = function(dataset) {
  var args = {
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
KMeansModel.prototype.write = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: this, 
//     method: 'write', 
//     returnType: MLWriter
// 
//   };
// 
//   return Utils.generate(args);
};

//
// static methods
//

/**
 * @returns {MLReader}
 */
KMeansModel.read = function() {
  throw "not implemented by ElairJS";
//   var args ={
//     target: KMeansModel, 
//     method: 'read', 
//     returnType: MLReader
// 
//   };
// 
//   return Utils.generate(args);
};

/**
 * @param {string} path
 * @returns {module:eclairjs/mllib/clustering.KMeansModel}
 */
KMeansModel.load = function(path) {
  var args = {
    target: KMeansModel,
    method: 'load',
    kernelP: gKernelP,
    static: true,
    args: Utils.wrapArguments(arguments),
    returnType: KMeansModel
  };

  return Utils.generate(args);
};

KMeansModel.moduleLocation = '/ml/clustering/KMeansModel';

module.exports = function(kP) {
  gKernelP = kP;

  return KMeansModel;
};