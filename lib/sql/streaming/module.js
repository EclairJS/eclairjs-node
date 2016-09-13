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
 * sql.streaming module
 * @module eclairjs/sql/streaming
 */
module.exports = function(kernelP) {
  return {
	DataStreamReader: require('./DataStreamReader.js')(kernelP),
    DataStreamWriter: require('./DataStreamWriter.js')(kernelP),
    ProcessingTime: require('./ProcessingTime.js')(kernelP),
    StreamingQuery: require('./StreamingQuery.js')(kernelP),
    SinkStatus: require('./SinkStatus.js'),
    SourceStatus: require('./SourceStatus.js'),
    StreamingQueryInfo: require('./StreamingQueryInfo.js'),
    StreamingQueryManager: require('./StreamingQueryManager.js')(kernelP)
  };
};