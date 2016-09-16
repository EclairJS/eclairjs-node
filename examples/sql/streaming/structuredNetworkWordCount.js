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
 * Counts words in UTF8 encoded, '\n' delimited text received from the network.
 *
 * Usage: JavaStructuredNetworkWordCount <hostname> <port>
 * <hostname> and <port> describe the TCP server that Structured Streaming
 * would connect to receive data.
 *
 * To run this on your local machine, you need to first run a Netcat server
 *    `$ nc -lk 9999`
 * and then run the example
 *    `$ node examples/sql/streaming/structuredNetworkWordCount.js localhost 9999`
 */
var eclairjs = require('../../../lib/index.js');
if (process.argv.length < 4) {
 console.log("Usage: structuredNetworkWordCount <hostname> <port>");
    exit(1);
}


var host = process.argv[2];
var port = parseInt(process.argv[3]);

var sparkSession = eclairjs.SparkSession
	.builder()
	.appName("structuredNetworkWordCount")
	.master("local[*]")
	.getOrCreate();


// Create DataFrame representing the stream of input lines from connection to host:port
var reader = sparkSession
    .readStream()
    .format("socket")
    .option("host", host)
    .option("port", port);
var ds = reader.load();
var lines = ds
    .as(eclairjs.sql.Encoders.STRING());


// Split the lines into words
var words = lines.flatMap(function (sentence) {
    return sentence.split(" ");
}, eclairjs.sql.Encoders.STRING());

// Generate running word count
var wordCounts = words.groupBy("value")
    .count();

// Start running the query that prints the running counts to the console
var query = words.writeStream()
	.outputMode("append")
	.format("console")
    .start("/tmp/wordcount");

query.awaitTermination();