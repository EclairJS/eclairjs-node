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

var Utils = require('./utils.js');

var gKernelP;

/**
 * An ordered collection. The user of this has precise control over where
 * in the list each element is inserted. The user can access elements by their integer index (position in the list),
 * and search for elements in the list.
 * @classdesc
 * @param obj
 * @constructor
 */
function List(obj) {
  this.obj = obj;
  /*if (arguments.length == 2 && arguments[0] instanceof Promise) {
    // Someone created an instance of this class for us
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    this.kernelP = gKernelP;

    var templateStr = 'var {{refId}} = new List({{data}});';

    var args = Array.prototype.slice.call(arguments);

    this.refIdP = Utils.evaluate(gKernelP, List, templateStr, {data: Utils.prepForReplacement(args, true)}, true);
  }*/
}

List.prototype.toString = function() {


  return 'new List(['+this.obj.join(',')+'])';
};

module.exports = List;