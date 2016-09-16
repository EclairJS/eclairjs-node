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

// This is an Integration test and requires a running Notebook/Spark Kernel/EclairJS-nashorn setup

var assert = require('assert');
var expect = require('chai').expect;
var path = require('path');
var TestUtils = require('../../../lib/utils.js');
var net = require('net');
var eclairjs = require('../../../../lib/index.js');

var session;

if (global.SESSION) {
  session = global.SESSION;
} else {
  session = eclairjs.SparkSession.builder().appName("sql.streaming.structured").master("local[*]").getOrCreate();
}

describe('Structured Streaming Test', function() {
  describe("addListener and foreach Test", function() {
	  
    it("foreach received message", function(){
    	var server2 = net.createServer(function(socket) {
            socket.on('data', (data) => {
          	  console.log(data.toString());
          	  assert.ok(true);
          	});
        }).listen(9994);
    });
    
    it("addListener terminated event", function(done) {
    	
      // Starting the kernel is slow
      this.timeout(100000);

      TestUtils.executeTest(
        function(callback, error) {
        	// create a basic socket stream on port 9996
            var server = net.createServer(function(socket) {
              interval = setInterval(function() {
                socket.write("test me\n");
              }, 10000);
            }).listen(9996);
            
            var reader = session
	            .readStream()
	            .format("socket")
	            .option("host", "localhost")
	            .option("port", "9996");
           var ds = reader.load();
           var lines = ds
            .as(eclairjs.sql.Encoders.STRING());

           var queryManger = session.streams();
           var listener = queryManger.addListener(
										         function(event){
										             //console.log("queryEvent " + JSON.stringify(event));
										             if (event.type == 'start') {
										             	// event started
										             } else if (event.type == 'process') {
										             	queryManger.get(event.streamingQueryInfo.id()).stop().then(function(){
										             		// 
										             	});
										            	
										             } else if (event.type == 'terminated') {
										             	//session.stop();
										            	 queryManger.removeListener(listener);
										            	 callback();
										             }
										         }
										     );
           //Split the lines into words
           var words = lines.flatMap(function (sentence) {
               return sentence.split(" ");
           }, eclairjs.sql.Encoders.STRING());

           // Generate running word count
           var wordCounts = words.groupBy("value")
               .count();
           var query = wordCounts.writeStream()
           .outputMode("complete")
           //.format("console")
           .foreach(
				    function (partitionId, version) {
				    	var socket = new java.net.Socket("localhost", 9994);
				    	return socket
				    },
				    function (socket, value) {
				        //print("JS process: " + JSON.stringify(value));
				        var out = new java.io.PrintWriter(socket.getOutputStream(), true);
				        out.print("sockprocess: " + JSON.stringify(value));
				        out.close();
				        
				    },
				    function (socket) {
				    	socket.close();
				    })
           .start();
           
        }, function(result) {
        	assert.ok(true);
        },
        done
      );
    });
  });
    

  after(function(done) {
	  console.log("after")
    if (!global.SESSION && session) {
      session.stop().then(done).catch(done);
    } else {
      // global session, so don't stop it
      done();
    }
  });
});
