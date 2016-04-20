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
 * MLLib module
 * @module eclairjs/mllib
 */
module.exports = function(kernelP) {
  return {
    classification: require('./classification/module.js')(kernelP),
    clustering: require('./clustering/module.js')(kernelP),
    evaluation: require('./evaluation/module.js')(kernelP),
    feature: require('./feature/module.js')(kernelP),
    fpm: require('./fpm/module.js')(kernelP),
    linalg: require('./linalg/module.js')(kernelP),
    optimization: require('./optimization/module.js')(kernelP),
    random: require('./random/module.js')(kernelP),
    recommendation: require('./recommendation/module.js')(kernelP),
    regression: require('./regression/module.js')(kernelP),
    tree: require('./tree/module.js')(kernelP),
    util: require('./util/module.js')(kernelP)
  };
};