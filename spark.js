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

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
global.WebSocket = require('ws');

module.exports.SparkContext = require('./lib/SparkContext.js');
module.exports.SQLContext = require('./lib/sql/SQLContext.js');
module.exports.StreamingContext = require('./lib/streaming/StreamingContext.js');
module.exports.KafkaUtils = require('./lib/streaming/KafkaUtils.js');
module.exports.Duration = require('./lib/streaming/Duration.js');
