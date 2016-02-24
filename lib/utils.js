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
    var replacementId = match.substr(2, match.length-4);

    var replacement = replacements[replacementId];

    if (Array.isArray(replacement)) {
      // if an array we generate a,b,c
      return replacement.join(',');
    } else {
      return replacement;
    }
  })
};

function handleReplacements(replacements, finalReplacements, replacementPromiseNames, promises) {
  if (replacements) {
    // Check for any promises inside replacements
    for (var name in replacements) {
      var replacement = replacements[name];

      if (replacement instanceof Promise) {
        replacementPromiseNames.push(name);

        promises.push(replacement);
      } else if (Array.isArray(replacement) && replacement[0] instanceof Promise) {
        // we have an array of promises
        replacement.forEach(function(promise) {
          // each promise gets the same name
          replacementPromiseNames.push(name);

          promises.push(promise);
        });
      } else {
        finalReplacements[name] = replacement;
      }
    }
  }
}

function handlePromiseReplacements(finalReplacements, replacementPromiseNames, promiseResults, promiseResultsOffset) {
  // handle any replacement promises
  for (var i = 0; i < replacementPromiseNames.length; i++) {
    var name = replacementPromiseNames[i];

    // handle arrays of replacements
    if (finalReplacements[name]) {
      // if a Promise's name already is in the finalReplacements then we have an array of Promises so make the replacement
      // an array of the results.
      if (!Array.isArray(finalReplacements[name])) {
        // make it an array
        finalReplacements[name] = [finalReplacements[name]];
      }

      finalReplacements[name].push(promiseResults[promiseResultsOffset + i]);
    } else {
      finalReplacements[name] = promiseResults[promiseResultsOffset + i];
    }
  }
}

/**
 * Handles running assignments (var x = inRef.foo(...)).  Will return a new instance of classRef.
 * @param {object} inRef - the reference we are using to generate the result.  Expected to be a class that has kernelP/refIdP members.
 * @param {Class} classRef - the class object that corresponds to the returned type.
 * @param {string} templateStr - the template string to use when generating the assignment.
 * @param {object} replacements - replacements to use in templateStr.  If the value of a replacement is a Promise, that
 *                 promise is resolved and the resolved value is used to replace the promise in replacements.  A member
 *                 of replacements can also be an array of promises.
 * @returns {object}
 */
Utils.generateAssignment = function(inRef, classRef, templateStr, replacements) {
  var varName = classRef.name == 'RDD' ? 'rdd' : classRef.name.charAt(0).toLowerCase() + classRef.name.slice(1);

  var refId = protocol.genVariable(varName);

  var finalReplacements = {};

  var promises = [inRef.kernelP, inRef.refIdP];
  var replacementPromiseNames = [];

  handleReplacements(replacements, finalReplacements, replacementPromiseNames, promises);

  return new classRef(inRef.kernelP, new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var inRefId = values[1];

      finalReplacements["inRefId"] = inRefId;
      finalReplacements["refId"] = refId;

      handlePromiseReplacements(finalReplacements, replacementPromiseNames, values, 2);

      var code = Utils.processTemplate(templateStr, finalReplacements);

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Handles executing a statement (use for Static method calls for example).  Will return a Promise for the execution.
 * @param {string} templateStr - the template string to use when generating the assignment.
 * @param {object} replacements - replacements to use in templateStr.  If the value of a replacement is a Promise, that
 *                 promise is resolved and the resolved value is used to replace the promise in replacements.  A member
 *                 of replacements can also be an array of promises.
 * @returns {Promise}
 */
Utils.execute = function(kernelP, templateStr, replacements) {
  var finalReplacements = {};

  var promises = [kernelP];

  var replacementPromiseNames = [];

  handleReplacements(replacements, finalReplacements, replacementPromiseNames, promises);

  return new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var kernel = values[0];

      handlePromiseReplacements(finalReplacements, replacementPromiseNames, values, 1);

      var code = Utils.processTemplate(templateStr, finalReplacements);

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject);
    }).catch(reject);
  });
};

/**
 * Handles evaluating a statement (use for Static method calls for example).  Will return a new instance of classRef.
 * @param {Class} classRef - the class object that corresponds to the returned type.
 * @param {string} templateStr - the template string to use when generating the assignment.
 * @param {object} replacements - replacements to use in templateStr.  If the value of a replacement is a Promise, that
 *                 promise is resolved and the resolved value is used to replace the promise in replacements.  A member
 *                 of replacements can also be an array of promises.
 * @param {boolean} returnRefIdP - Optional, if true returns a refId Promise and not a class reference.
 * @returns {object}
 */
Utils.evaluate = function(kernelP, classRef, templateStr, replacements, returnRefIdP) {
  var varName = classRef.name == 'RDD' ? 'rdd' : classRef.name.charAt(0).toLowerCase() + classRef.name.slice(1);

  var refId = protocol.genVariable(varName);

  var finalReplacements = {};

  var promises = [kernelP];

  var replacementPromiseNames = [];

  handleReplacements(replacements, finalReplacements, replacementPromiseNames, promises);

  var refIdP = new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var kernel = values[0];

      finalReplacements["refId"] = refId;

      handlePromiseReplacements(finalReplacements, replacementPromiseNames, values, 1);

      var code = Utils.processTemplate(templateStr, finalReplacements);

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  });

  if (returnRefIdP) {
    return refIdP;
  } else {
    return new classRef(kernelP, refIdP);
  }
};

/**
 * Handles running calls that return a Promise which resolves to an JavaScript primitive value (RDD.count()).
 * @param {object} inRef - the reference we are using to generate the result.  Expected to be a class that has kernelP
 *                         member. If it has a refIdP member, that value is resolved and added to replacements as inRefId.
 * @param {string} templateStr - the template string to use when generating the assignment.
 * @param {object} replacements - replacements to use in templateStr.  If the value of a replacement is a Promise, that
 *                 promise is resolved and the resolved value is used to replace the promise in replacements.
 * @param {function} customResolve - optional function that recieves the result value and the Promise resolve/reject handle as parameters.
 *                   Allows modifying the Promise result (parse an integer, handle JSON data for example) before it gets passed to the caller.
 * @returns {Promise}
 */
Utils.generateResultPromise = function(inRef, templateStr, replacements, customResolve) {
  var finalReplacements = {};

  var promises = [inRef.kernelP];
  if (inRef.refIdP) {
    promises.push(inRef.refIdP);
  }

  var replacementPromiseNames = [];

  handleReplacements(replacements, finalReplacements, replacementPromiseNames, promises);

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

    Promise.all(promises).then(function(values) {
      var kernel = values[0];

      var replacementVariablesStart = 1;

      if (inRef.refIdP) {
        finalReplacements["inRefId"] = values[1];
        replacementVariablesStart = 2;
      }

      handlePromiseReplacements(finalReplacements, replacementPromiseNames, values, replacementVariablesStart);

      var code = Utils.processTemplate(templateStr, finalReplacements);

      protocol.verifyResult(kernel.execute({code: code}), _resolve, reject);
    }).catch(reject);
  })
};

/**
 * Handles running calls that return a Promise which resolves to nothing.  The Promise can be used to wait for the action to finish.
 * @param {object} inRef - the reference we are using to generate the result.  Expected to be a class that has kernelP/refIdP members.
 * @param {string} templateStr - the template string to use when generating the assignment.
 * @param {object} replacements - replacements to use in templateStr.  If the value of a replacement is a Promise, that
 *                 promise is resolved and the resolved value is used to replace the promise in replacements.
 * @returns {Promise}
 */
Utils.generateVoidPromise = function(inRef, templateStr, replacements) {
  if (!replacements) {
    replacements = {};
  }

  var finalReplacements = {};
  var promises = [inRef.kernelP, inRef.refIdP];
  var replacementPromiseNames = [];

  handleReplacements(replacements, finalReplacements, replacementPromiseNames, promises);

  return new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var inRefId = values[1];

      finalReplacements["inRefId"] = inRefId;

      handlePromiseReplacements(finalReplacements, replacementPromiseNames, values, 2);

      var code = Utils.processTemplate(templateStr, finalReplacements);

      protocol.verifyVoidResult(kernel.execute({code: code}), resolve, reject);
    }).catch(reject);
  })
};

/**
 * Handles running calls that return a Promise which resolves to an array of Spark objects (RDD.randomSplit()).
 * @param {object} inRef - the reference we are using to generate the result.  Expected to be a class that has kernelP
 *                         member. If it has a refIdP member, that value is resolved and added to replacements as inRefId.
 * @param {Class} classRef - the class object that corresponds to the returned type.
 * @param {string} templateStr - the template string to use when generating the assignment.
 * @param {object} replacements - replacements to use in templateStr.  If the value of a replacement is a Promise, that
 *                 promise is resolved and the resolved value is used to replace the promise in replacements.
 * @returns {Promise}
 */
Utils.generateResultArrayPromise = function(inRef, classRef, templateStr, replacements) {
  var varName = classRef.name == 'RDD' ? 'rdd' : classRef.name.charAt(0).toLowerCase() + classRef.name.slice(1);

  var refId = protocol.genVariable(varName+"Array");

  var finalReplacements = {};
  finalReplacements["refId"] = refId;

  var promises = [inRef.kernelP];
  if (inRef.refIdP) {
    promises.push(inRef.refIdP);
  }

  var replacementPromiseNames = [];

  handleReplacements(replacements, finalReplacements, replacementPromiseNames, promises);

  return new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var kernel = values[0];

      function _countResolve(result) {
        var count = parseInt(result);

        var resultArr = [];

        for (var i = 0; i < count; i++) {
          // we know the refId is going to be called refId[i]
          var clazz = new classRef(inRef.kernelP, Promise.resolve(refId+"["+i+"]"));
          resultArr.push(clazz);
        }

        resolve(resultArr);
      }

      function _resolve(result) {
        // now that we generated the array, get the length of the array
        protocol.verifyResult(kernel.execute({code: refId+".length;"}), _countResolve, reject);
      }

      var replacementVariablesStart = 1;

      if (inRef.refIdP) {
        finalReplacements["inRefId"] = values[1];
        replacementVariablesStart = 2;
      }

      handlePromiseReplacements(finalReplacements, replacementPromiseNames, values, replacementVariablesStart);

      var code = Utils.processTemplate(templateStr, finalReplacements);

      protocol.verifyAssign(kernel.execute({code: code}), _resolve, reject);
    }).catch(reject);
  })
};

/**
 * Prepares a variable to be used as a template replacement.  Null safe.
 *
 * - If its a Spark object, will return its refIdP (promise that resolves to the id of the object onces its been generated in the kernel
 * - If its a string, returnss "stringvalue"
 * - If its an array, returns '[x,y,x]'.  Applies prepForReplacement on each array item.
 *
 * @param {object} obj
 * @returns {object}
 */
Utils.prepForReplacement = function(obj, skipArrayCreation) {
  if (obj && obj.refIdP) {
    return obj.refIdP;
  } else if (typeof(obj) == "string") {
    return '"' + obj.replace(/"/g, '\\\"') + '"';
  } else if (Array.isArray(obj)) {
    var newArr = [];

    obj.forEach(function(item) {
      newArr.push(Utils.prepForReplacement(item));
    });

    if (newArr.length > 0 && newArr[0] instanceof Promise) {
      return newArr;
    } else {
      if (skipArrayCreation) {
        return newArr.join(',');
      } else {
        return '[' + newArr.join(',') + ']';
      }
    }
  } else {
    return obj;
  }
};

Utils.prepBindArgs = function(bindArgs) {
  var newArr = [];

  if (bindArgs) {
    bindArgs.forEach(function (item) {
      newArr.push(Utils.prepForReplacement(item));
    });
  }

  return newArr;
};

Utils.serializeLambda = function(func) {
  return (typeof func === 'function') ? Utils.serializeFunction(func) : Promise.resolve(func);
};

//var bs = require('browserify-string');

Utils.serializeFunction = function(func, opts) {
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


module.exports = Utils;
