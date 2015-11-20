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


/**
 * Takes a jupyter-js-services execute handle and calls a Promise resolve/reject once the execute completes.
 *
 * Should be used either when creating a new Spark object or a no-op.
 *
 * @param {KernelFutureHandler} handle
 * @param {Promise.resolve} resolve
 * @param {Promise.reject} reject
 * @param {String} Optional id to pass to the resolve.  Should be the variable name for this assignment.
 */
module.exports.verifyAssign = function(handle, resolve, reject, refId) {
  handle.handleMsg = msg => {
    //console.log("verifyAssign");
    //console.log(msg);
    if(msg.msg_type === 'execute_reply' &&
       msg.content.status === 'error') {
      if(reject) {
        reject([msg.content.evalue].concat(msg.content.traceback).join('\n'))
      }
    } else if(msg.msg_type === 'status' &&
       msg.content.execution_state === 'idle') {
        //console.log("calling resolve for " + refId);
        if (resolve) {
          resolve(refId);
        }
    }
  }
}

/**
 * Takes a jupyter-js-services execute handle and calls a Promise resolve/reject once the execute completes
 *
 * Should be used when generating a void result
 *
 * @param {KernelFutureHandler} handle
 * @param {Promise.resolve} resolve
 * @param {Promise.reject} reject
 */
module.exports.verifyVoidResult = function(handle, resolve, reject) {
  handle.handleMsg = msg => {
    //console.log("verifyResult");
    //console.log(msg);
    if(msg.msg_type === 'execute_reply') {
      if(msg.content.status === 'error') {
        reject([msg.content.evalue].concat(msg.content.traceback).join('\n'))
      }
      else if(msg.content.status === 'ok') {
        //console.log("success");
        //console.log(resolve);
        resolve();
      }
    }
  }
}

/**
 * Takes a jupyter-js-services execute handle and calls a Promise resolve/reject once the execute completes
 *
 * Should be used when generating a JavaScript result that can be used on the Node side.  For example count().  Will
 * always return the JSON stringified version into the resolve handler.
 *
 * @param {KernelFutureHandler} handle
 * @param {Promise.resolve} resolve
 * @param {Promise.reject} reject
 */
module.exports.verifyResult = function(handle, resolve, reject) {
  handle.handleMsg = msg => {
    //console.log("verifyResult");
    //console.log(msg);
    if(msg.msg_type === 'execute_reply') {
      if(msg.content.status === 'error') {
        reject([msg.content.evalue].concat(msg.content.traceback).join('\n'))
      }
    } else if(msg.msg_type === 'execute_result') {
      //console.log("success");
      //console.log(resolve);
      resolve(msg.content.data['text/plain']);
    }
  }
}

var variableCounter = {};

module.exports.genVariable = function(name) {
  if (!variableCounter[name]) {
    variableCounter[name] = 1;
  } else {
    variableCounter[name]++;
  }

  return name + variableCounter[name];
}

module.exports.resetVariables = function() {
  variableCounter = {};
}