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

//var bs = require('browserify-string');

function serializeFunction(func, opts) {
  /*
  return new Promise(function(resolve, reject) {
    var funcStr = "EXPORTEDFUNCTION=" + func.toString();

    var bsOpts = {};

    if (opts && opts.baseDir) {
      bsOpts.basedir = opts.baseDir;
    }

    bs(funcStr, bsOpts).bundle(function(err, src) {
      if (err) {
        reject(err);
      } else {
        var finalStr = src + '';
        resolve(JSON.stringify(finalStr));
      }
    });
  });
  */
  return Promise.resolve(func.toString());
};

module.exports.serializeFunction = serializeFunction
