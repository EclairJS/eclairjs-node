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

/**
 * ML param module
 * @module eclairjs/ml/param
 */
module.exports = function(kernelP) {
  return {
    BooleanParam: require('./BooleanParam.js')(kernelP),
    DoubleParam: require('./DoubleParam.js')(kernelP),
    IntParam: require('./IntParam.js')(kernelP),
    Param: require('./Param.js')(kernelP),
    ParamMap: require('./ParamMap.js')(kernelP),
    ParamPair: require('./ParamPair.js')(kernelP)
  };
};