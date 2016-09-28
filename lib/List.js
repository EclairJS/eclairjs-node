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
    var Utils = require('./utils.js');

    var gKernelP = kernelP;

    /**
     * An ordered collection. The user of this has precise control over where
     * in the list each element is inserted. The user can access elements by their integer index (position in the list),
     * and search for elements in the list.
     * @classdesc
     * @param obj
     * @constructor
     * @memberof module:eclairjs
     */
    function List() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    List.moduleLocation = '/List';

    return List;
  })();
};