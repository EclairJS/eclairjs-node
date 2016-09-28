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
    var UnaryTransformer = require('../UnaryTransformer')();

    var gKernelP = kernelP;

    /**
     * @classdesc
     * A tokenizer that converts the input string to lowercase and then splits it by white spaces.
     *
     * @see {@link RegexTokenizer}
     * @class
     * @memberof module:eclairjs/ml/feature
     */

    /**
     * @param {string} uid
     * @returns {Promise.<Void>} A Promise that resolves to nothing.
     * @constructor
     */
    function Tokenizer() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    Tokenizer.prototype = Object.create(UnaryTransformer.prototype);

    Tokenizer.prototype.constructor = Tokenizer;

    /**
     *
     * @returns {Promise.<string>}
     */
    Tokenizer.prototype.getOutputCol = function () {
      var args ={
        target: this,
        method: 'getOutputCol',
        args: Utils.wrapArguments(arguments),
        returnType: String

      };

      return Utils.generate(args);
    };

    /**
     * @param {module:eclairjs/ml/param.ParamMap} extra
     * @returns {Tokenizer}
     */
    Tokenizer.prototype.copy = function(extra) {
      var args ={
        target: this,
        method: 'copy',
        args: Utils.wrapArguments(arguments),
        returnType: Tokenizer

      };

      return Utils.generate(args);
    };

    //
    // static methods
    //

    /**
     * @param {string} path
     * @returns {Tokenizer}
     */
    Tokenizer.load = function(path) {
      var args ={
        target: Tokenizer,
        method: 'load',
        args: Utils.wrapArguments(arguments),
        kernelP: gKernelP,
        static: true,
        returnType: Tokenizer

      };

      return Utils.generate(args);
    };

    Tokenizer.moduleLocation = '/ml/feature/Tokenizer';

    return Tokenizer;
  })();
};