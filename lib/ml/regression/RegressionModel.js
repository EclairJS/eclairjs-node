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

    var PredictionModel = require('../PredictionModel')();

    /**
     * @classdesc
     *
     * Model
     *
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml.PredictionModel
     */
    function RegressionModel(kernelP, refIdP) {
      Utils.handleAbstractConstructor(this, arguments);
    }

    RegressionModel.prototype = Object.create(PredictionModel.prototype);

    RegressionModel.prototype.constructor = RegressionModel;

    return RegressionModel;
  })();
};