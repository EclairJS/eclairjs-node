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
 * SQL module
 * @module eclairjs/sql
 */
module.exports = function(kernelP, server) {
  return {
    DataFrame: require('./DataFrame.js'),
    Dataset: require('./Dataset.js')(kernelP),
    Encoders: require('./Encoders.js')(kernelP),
    functions: require('./functions.js')(kernelP),
    RowFactory: require('./RowFactory.js')(kernelP),
    SQLContext: require('./SQLContext.js'),
    SqlDate: require('./SqlDate.js')(kernelP),
    SqlTimestamp: require('./SqlTimestamp.js')(kernelP),
    SparkSession: require('./SparkSession.js')(kernelP, server),

    types: require('./types/module.js')(kernelP),
    streaming: require('./streaming/module.js')(kernelP)
  };
};
