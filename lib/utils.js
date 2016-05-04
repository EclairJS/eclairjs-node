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

var moduleRequireCache = {};

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

/**
 * Prepares a variable to be used as a template replacement.  Null safe.
 *
 * - If its a Spark object, will return its refIdP (promise that resolves to the id of the object onces its been generated in the kernel
 * - If its a string, returns "stringvalue"
 * - If its an array, returns '[x,y,x]'.  Applies prepForReplacement on each array item.
 *   - If skipArrayCreation is set, returns 'x,y,z' instead.
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


function serializeLambda(func) {
  return (typeof func === 'function') ? serializeFunction(func) : Promise.resolve(func);
}

//var bs = require('browserify-string');

function serializeFunction(func, opts) {
  /*
   
   
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
}

function isNativeType(obj) {
  return (obj === Number || obj === String || obj === Boolean || obj === Object);
}

function generateVarName(name) {
  var upperCaseCount = name.match(/[A-Z]*/)[0].length;

  return name.substr(0, upperCaseCount).toLowerCase() + name.substr(upperCaseCount);
}

function generateRequires(requires) {
  var code = '';

  requires.forEach(function(r) {
    var loc = r.moduleLocation;

    if (!moduleRequireCache[loc]) {
      moduleRequireCache[loc] = true;

      var subExport = null;

      // A file can export multiple modules, denoted by Foo/Bar#Baz
      var subModuleLoc = loc.indexOf('#');
      if (subModuleLoc >= 0) {
        subExport = loc.substr(subModuleLoc + 1);
        loc = loc.substr(0, subModuleLoc);
      }

      if (subExport) {
        code += 'var ' + r.name + ' = require(EclairJS_Globals.NAMESPACE + \'' + loc + '\').' + subExport + ';\n';
      } else {
        code += 'var ' + r.name + ' = require(EclairJS_Globals.NAMESPACE + \'' + loc + '\');\n';
      }
    }
  });

  return code;
}

/**
 * Handles calling a remote Spark method on EclairJS-nashorn.
 *
 * @param args {object} - A map that has the following members:
 *     - target      {object} The target class or class instance to call a method on.
 *     - method      {string} The method name we are calling.
 *     - returnType  {object} The return type for the method.
 *         - null for void methods
 *         - SparkClass (RDD for example)
 *         - Native JavaScript types (Number, String, Boolean, etc)
 *         - Array (either Native or Spark type, so [Number] or [RDD])
 *
 *     - [args]      {array}  Arguments for the method. Each argument needs to look like this:
 *         - value      {object}   The actual value
 *         - [type]     {string}   The type
 *         - [optional] {boolean}
 *
 *     - [resolver]  {function} A resolver function
 */
Utils.generate = function(args) {
  var target = args.target;
  var method = args.method;
  var returnType = args.returnType;
  var callArgs = args.args ? args.args : null;
  var customResolver = args.resolver;

  var type;

  var EXECUTION = {
    RESULT_TYPE: 'result',
    RESULT_ARRAY_TYPE: 'resultarray',
    RESULT_NATIVE_ARRAY_TYPE: 'resultnativearray',
    ASSIGNMENT_TYPE: 'assignment',
    VOID_TYPE: 'void'
  };

  // TODO: certain cases should auto stringify (returning an array of native types for example)
  var shouldStringify = false;

  var executionType;
  if (returnType === null || typeof returnType === 'undefined') {
    // Calling a void method
    executionType = EXECUTION.VOID_TYPE;
  } else if (isNativeType(returnType) || args.stringify || Array.isArray(returnType)) {
    // Calling a method that returns a built in JS type
    executionType = EXECUTION.RESULT_TYPE;

    if (args.stringify) {
      shouldStringify = true;
    }

    if (Array.isArray(returnType)) {
      if (isNativeType(returnType[0])) {
        executionType = EXECUTION.RESULT_NATIVE_ARRAY_TYPE;
      } else {
        // An array of Spark objects so special case it here
        executionType = EXECUTION.RESULT_ARRAY_TYPE;
      }
    }
  } else {
    // Basic assignment, so returning a Spark object instance
    executionType = EXECUTION.ASSIGNMENT_TYPE;
  }

  var promises = [];

  var kernelP;

  if (args.static) {
    // static alls pass in a kernelP through args
    type = 'staticMethodCall';
    promises.push(args.kernelP);

    kernelP = args.kernelP;
  } else {
    type = 'methodCall';

    // we have a class reference, so we have kernelP/refIdP
    promises.push(target.kernelP);
    promises.push(target.refIdP);

    kernelP = target.kernelP;
  }

  promises.push(handleArguments(callArgs));

  var refId;

  // Generate the variable id before we go into promise land to make sure we create them in the order of definition.
  if (executionType == EXECUTION.ASSIGNMENT_TYPE) {
    refId = protocol.genVariable(generateVarName(returnType.name));
  } else if (executionType == EXECUTION.RESULT_ARRAY_TYPE) {
    refId = protocol.genVariable(generateVarName(returnType[0].name)+"Array");
  }

  // This is our main promise that handles generating and executing code remotely on Toree.
  var refIdP = new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      // Kernel is always there
      var kernel = values[0];

      function _resultTypeResolver(result) {
        if (customResolver) {
          // custom resolver
          customResolver(result, resolve, reject);
        } else if ((executionType == EXECUTION.RESULT_NATIVE_ARRAY_TYPE || (executionType == EXECUTION.RESULT_TYPE && returnType !== String)) && args.stringify) {
          // Array of native type or native, non-string type and we stringified
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            var err = new Error("Parse Error: "+ e.message);
            reject(err);
          }
        } else if (returnType === Number) {
          try {
            var parsed = parseFloat(result);
            resolve(parsed);
          } catch (e) {
            reject(e);
          }
        } else if (returnType === Boolean) {
          resolve(result === 'true');
        } else {
          resolve(result);
        }
      }

      function _resultArrayResolver(result) {
        function _countResolve(result) {
          var count = parseInt(result);

          var resultArr = [];

          for (var i = 0; i < count; i++) {
            // we know the refId is going to be called refId[i]
            var clazz = new returnType[0](kernelP, Promise.resolve(refId+"["+i+"]"));
            resultArr.push(clazz);
          }

          resolve(resultArr);
        }

        // now that we generated the array, get the length of the array
        protocol.verifyResult(kernel.execute({code: refId+".length;"}), _countResolve, reject);
      }

      var code = '';

      // For static calls, we need to make sure we generate the require for the class.
      if (type == 'staticMethodCall') {
        var moduleLocation = target.moduleLocation ? target.moduleLocation : target.constructor ? target.constructor.moduleLocation : null;
        if (moduleLocation) {
          var targetClassName = typeof target == 'object' ? target.constructor.name : target.name;

          code += generateRequires([{name: targetClassName, moduleLocation: moduleLocation}]);
        }
      }

      if (callArgs) {
        var requires = values[values.length - 1].requires;

        code += generateRequires(requires);
      }

      if (executionType == EXECUTION.ASSIGNMENT_TYPE || executionType == EXECUTION.RESULT_ARRAY_TYPE) {
        code += 'var ' + refId + ' = ';
      }

      if (shouldStringify) {
        code += 'JSON.stringify(';
      }

      // we had a refId promise resolved
      if (type == 'methodCall') {
        code += values[1] + '.';
      } else if (type == 'staticMethodCall') {
        // Static method call
        code += target.name + '.';
      }

      // method name
      code += method + '(';

      // arguments
      if (callArgs) {
        var finalArgs = values[values.length-1].args;

        code += finalArgs.join(', ')
      }

      // close the method call
      if (shouldStringify) {
        code += '));';
      } else {
        code += ');';
      }

      //console.log(code);

      if (executionType == EXECUTION.RESULT_TYPE || executionType == EXECUTION.RESULT_NATIVE_ARRAY_TYPE) {
        protocol.verifyResult(kernel.execute({code: code}), _resultTypeResolver, reject);
      } else if (executionType == EXECUTION.RESULT_ARRAY_TYPE) {
        protocol.verifyAssign(kernel.execute({code: code}), _resultArrayResolver, reject);
      } else if (executionType == EXECUTION.VOID_TYPE) {
        protocol.verifyVoidResult(kernel.execute({code: code}), resolve, reject);
      } else if (executionType == EXECUTION.ASSIGNMENT_TYPE) {
        protocol.verifyAssign(kernel.execute({code: code, silent: false}), resolve, reject, refId);
      } 
    }).catch(reject);
  });

  // handle target
  if (executionType == EXECUTION.RESULT_TYPE || executionType == EXECUTION.RESULT_NATIVE_ARRAY_TYPE || executionType == EXECUTION.RESULT_ARRAY_TYPE || executionType == EXECUTION.VOID_TYPE) {
    return refIdP;
  } else if (executionType == EXECUTION.ASSIGNMENT_TYPE) {
    // we have a class reference
    return new returnType(kernelP, refIdP);
  }
};

Utils.generateConstructor = function(args) {
  var target = args.target;
  var callArgs = args.args ? args.args : null;
  var kernelP = args.kernelP;

  var promises = [];
  promises.push(kernelP);

  promises.push(handleArguments(callArgs));

  var refId;

  if (args.refId) {
    refId = args.refId
  } else {
    var varName = generateVarName(target.name);
    refId = protocol.genVariable(varName);
  }

  var refIdP = new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var code = '';

      // get the class name of the target
      var moduleLocation = target.moduleLocation ? target.moduleLocation : target.constructor ? target.constructor.moduleLocation : null;
      if (moduleLocation) {
        var targetClassName = typeof target == 'object' ? target.constructor.name : target.name;

        code += generateRequires([{name: targetClassName, moduleLocation: moduleLocation}]);
      }

      // requires from arguments
      if (callArgs) {
        var requires = values[values.length - 1].requires;

        code += generateRequires(requires);
      }

      code += 'var ' + refId + ' = new ' + target.name + '(';

      // arguments
      if (callArgs) {
        var finalArgs = values[values.length-1].args;

        code += finalArgs.join(', ')
      }

      code += ');';

      protocol.verifyAssign(kernel.execute({code: code, silent: false}), resolve, reject, refId);
    }).catch(reject);
  });

  return refIdP;
};

/**
 * Returns a promise that resolves once all the arguments have been resolved.
 */
function handleArguments(args) {
  return new Promise(function(resolve, reject) {
    var requires = [];
    var promises = [];

    // check for Promises in args
    if (args && args instanceof Array) {
      args.some(function (arg, i) {
        if ((arg.value === null || typeof(arg.value) == 'undefined') && arg.optional) {
          return true;
        }

        if (arg.value && Array.isArray(arg.value) && arg.optional && arg.value.length == 0) {
          return true;
        }

        if (arg.type == 'string') {
          var s = '"' + arg.value.replace(/"/g, '\\\"') + '"';
          promises.push(Promise.resolve(s));
        } else if (arg.type == 'lambda') {
          promises.push(serializeLambda(arg.value));
        } else if (arg.type == 'lambdaArgs') {
          promises.push(new Promise(function (resolve, reject) {
            handleArrayArgument(arg.value).then(function (result) {
              resolve(result);
            }).catch(reject);
          }));
        } else if (arg.type == 'map') {
          promises.push(Promise.resolve(JSON.stringify(arg.value)));
        } else if (arg.value.refIdP) {
          promises.push(arg.value.refIdP);
        } else if (arg.type == 'List') {
          promises.push(Promise.resolve(arg.value.toString()));
        } else if (arg.type == 'array') {
          // simple array argument
          promises.push(handleArrayArgument(arg.value));
        } else if (arg.type == '_eclairSerialize') {
          if (arg.value._eclairSerialize == 'staticProperty') {
            var val = arg.value.ref.name + '.' + arg.value.value;
            promises.push(Promise.resolve(val));
            requires.push({name: arg.value.ref.name, moduleLocation: arg.value.ref.moduleLocation});
          }
        } else if (Array.isArray(arg.value)) {
          // TODO: should we try to wrap the array if it isn't?
          promises.push(new Promise(function(resolve, reject) {
            handleArguments(arg.value).then(function(result) {
              if (result.requires.length > 0) {
                result.requires.forEach(function(r) {
                  requires.push(r)
                });
              }

              resolve('[' + result.args + ']');
            }).catch(reject);
          }));
        } else if (arg.type == 'sparkclassref') {
          // we have a spark class reference, so return its name
          promises.push(Promise.resolve(arg.value.name));
          // add the class to the requires list
          requires.push({name: arg.value.name, moduleLocation: arg.value.moduleLocation});
        } else {
          promises.push(Promise.resolve(arg.value));
        }

        return false;
      });
    }

    Promise.all(promises).then(function(finalArgs) {
      resolve({args: finalArgs, requires: requires});
      //resolve(finalArgs);
    }).catch(function(e) {
      console.log(e);
      reject(e)
    });
  });
}

function handleArrayArgument(arg) {
  // go through array and return a promise
  return new Promise(function(resolve, reject) {
    var promises = [];

    for (var i = 0; i < arg.length; i++) {
      var a = arg[i];
      promises.push(Utils.prepForReplacement(a));
    }

    Promise.all(promises).then(function(result) {
      var arr = '[';

      arr += result.join(', ');

      arr += ']';

      resolve(arr);
    }).catch(reject);
  });
}

Utils.wrapArray = function(arr, sparkType) {
  var wrapArr = [];

  if (arr && arr.length > 0) {
    arr.forEach(function(item) {
      var type;

      if (sparkType && item instanceof sparkType) {
        type = sparkType;
      } else {
        if (item.refIdP) {
          // spark class instance
          type = undefined;
        } else if (typeof(item) == 'function' && item.moduleLocation) {
          // spark class reference
          type = 'sparkclassref';
        } else if (typeof(item) == 'object' && item.constructor.name == 'List') {
          type = 'List';
        } else if (typeof(item) == 'number') {
          type = 'number';
        } else if (Array.isArray(item)) {
          type = 'array';
        } else if (typeof(item) == 'boolean') {
          type = 'boolean';
        } else if (typeof(item) == 'object') {
          if (item._eclairSerialize) {
            type = '_eclairSerialize';
          } else {
            type = 'map';
          }
        } else {
          type = 'string';
        }
      }

      if (type) {
        wrapArr.push({value: item, type: type});
      } else {
        wrapArr.push({value: item});
      }
    });
  }

  return wrapArr;
};

Utils.wrapArguments = function(args) {
  var params = Array.prototype.slice.call(args);

  return Utils.wrapArray(params);
};

Utils.wrapBindArgs = function(bindArgs) {
  return Utils.wrapArray(bindArgs);
};

// Executes js code on Toree, use for testing only!
Utils.execute = function(args) {
  var code = args.code;
  var returnType = args.returnType;
  var kernelP = args.kernelP;

  var promises = [];
  promises.push(kernelP);

  var refIdP = new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var kernel = values[0];

      if (returnType) {
        protocol.verifyResult(kernel.execute({code: code}), resolve, reject);
      } else {
        protocol.verifyVoidResult(kernel.execute({code: code}), resolve, reject);
      }
    }).catch(reject);
  });

  return refIdP;
};

module.exports = Utils;