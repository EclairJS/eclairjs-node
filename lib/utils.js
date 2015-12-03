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

var protocol = require('./kernel.js');

var Utils = {};

Utils.processTemplate = function(templateStr, replacements) {
  //return templateStr.replace(/\$[a-zA-Z0-9]*/g, function(match) {
  return templateStr.replace(/\{\{[a-zA-Z0-9]*\}\}/g, function(match) {
    var replacementId = match.substr(2, match.length-4)
    return replacements[replacementId];
  })
};

Utils.generateAssignment = function(inRef, classRef, templateStr, replacements) {
  var varName = classRef.name == 'RDD' ? 'rdd' : classRef.name.charAt(0).toLowerCase() + classRef.name.slice(1);

  var refId = protocol.genVariable(varName);

  if (!replacements) {
    replacements = {};
  }

  var promises = [inRef.kernelP, inRef.refIdP];
  var replacementPromiseNames = [];

  // Check for any promises inside replacements
  for (var name in replacements) {
    if (replacements[name] instanceof Promise) {
      replacementPromiseNames.push(name);

      promises.push(replacements[name]);
    }
  }

  return new classRef(inRef.kernelP, new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var inRefId = values[1];

      replacements["inRefId"] = inRefId;
      replacements["refId"] = refId;

      // handle any replacement promises
      for (var i = 0; i < replacementPromiseNames.length; i++) {
        var name = replacementPromiseNames[i];

        replacements[name] = values[2+i];
      }

      var code = Utils.processTemplate(templateStr, replacements);

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(function(e){console.log(e)});
  }));
};

Utils.generateResultPromise = function(inRef, templateStr, replacements, customResolve) {
  return new Promise(function(resolve, reject) {
    function _resolve(result) {
      // If a custom resolve is passed in, pass it the result and resolve/reject handles
      if (customResolve) {
        try {
          customResolve(result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      } else {
        resolve(result);
      }
    }

    Promise.all([inRef.kernelP, inRef.refIdP]).then(function(values) {
      var kernel = values[0];
      var inRefId = values[1];

      if (!replacements) {
        replacements = {};
      }

      replacements["inRefId"] = inRefId;

      var code = Utils.processTemplate(templateStr, replacements);

      protocol.verifyResult(kernel.execute({code: code}), _resolve, reject);
    }).catch(reject);
  })
};

Utils.generateVoidPromise = function(inRef, templateStr, replacements) {
  if (!replacements) {
    replacements = {};
  }

  var promises = [inRef.kernelP, inRef.refIdP];
  var replacementPromiseNames = [];

  // Check for any promises inside replacements
  for (var name in replacements) {
    if (replacements[name] instanceof Promise) {
      replacementPromiseNames.push(name);

      promises.push(replacements[name]);
    }
  }

  return new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var inRefId = values[1];

      replacements["inRefId"] = inRefId;

      // handle any replacement promises
      for (var i = 0; i < replacementPromiseNames.length; i++) {
        var name = replacementPromiseNames[i];

        replacements[name] = values[2+i];
      }

      var code = Utils.processTemplate(templateStr, replacements);

      protocol.verifyVoidResult(kernel.execute({code: code}), resolve, reject);
    }).catch(reject);
  })
};


module.exports = Utils;
