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

module.exports.verifyAssign = function(handle, resolve, reject, refId) {
  handle.handleMsg = msg => {
    //console.log(msg);
    if(msg.msg_type === 'status' &&
       msg.content.execution_state === 'idle') {
        console.log("calling resolve for " + refId);
        resolve(refId);
    }
  }
}


module.exports.verifyResult = function(handle, resolve, reject) {
  handle.handleMsg = msg => {
    if(msg.msg_type === 'execute_result') {
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
