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

var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

var airlineDemo = require('./airline.js');

app.get('/getFlights', function (request, response) {
  var airportCode = request.query.airport;
  // rdu,aa,234,sfo,3
  var rawData = [
    {origin: airportCode, carrier: 'aa', flight_num: 234, destination: 'PIR', take_off_delay_mins: 10},
    {origin: airportCode, carrier: 'aa', flight_num: 398, destination: 'SIK', take_off_delay_mins: 0},
    {origin: airportCode, carrier: 'aa', flight_num: 466, destination: 'HOU', take_off_delay_mins: 25},
    {origin: airportCode, carrier: 'aa', flight_num: 922, destination: 'HOU', take_off_delay_mins: 70},
    {origin: airportCode, carrier: 'aa', flight_num: 6004, destination: 'DFW', take_off_delay_mins: 65},
    {origin: airportCode, carrier: 'dl', flight_num: 499, destination: 'LGA', take_off_delay_mins: 120},
    {origin: airportCode, carrier: 'dl', flight_num: 1122, destination: 'SMF', take_off_delay_mins: 0},
    {origin: airportCode, carrier: 'dl', flight_num: 4555, destination: 'SFO', take_off_delay_mins: 9},
    {origin: airportCode, carrier: 'dl', flight_num: 870, destination: 'SMO', take_off_delay_mins: 25},
    {origin: airportCode, carrier: 'dl', flight_num: 6509, destination: 'HPN', take_off_delay_mins: 45},
    {origin: airportCode, carrier: 'dl', flight_num: 9694, destination: 'JFK', take_off_delay_mins: 240},
    {origin: airportCode, carrier: 'dl', flight_num: 1134, destination: 'LGA', take_off_delay_mins: 120}
  ];
  //response.json(rawData);
  //return;

  try {
    var df = airlineDemo.query("SELECT * FROM airlinedata WHERE origin='"+airportCode+"'");
  } catch (e) {
    console.log("e", e)
  }

  /*df.count().then(function(c) {
    console.log("count:", c)
  }).catch(function(e) {
    console.log(e)
  })*/

  df.toJSON().toArray().then(function(result) {
    //console.log(JSON.stringify(result))
    response.json(result);
  }).catch(function(e) {
    console.log(e)
  })
});

app.get('/getCarriers', function (request, response) {
    var airportCode = request.query.airport;
    try {
        var carriers = airlineDemo.query("SELECT DISTINCT carrier FROM flightstoday WHERE origin='"+airportCode+"'");
        carriers.cache().toJSON().toArray().then(function(result){
            console.log('distinct carriers for ',airportCode,': ',JSON.stringify(result));
            response.json(result);
        });
  } catch (e) {
    console.log("e", e)
  }
});

app.get('/getSchedule', function (request, response) {
    var airportCode = request.query.airport;
    var carrier = request.query.carrier;
    try {
    var flightsToday = airlineDemo.query("SELECT flight_num,destination FROM flightstoday WHERE origin='" + 
        airportCode + "' AND carrier='" + carrier + "'");
    flightsToday.cache().toJSON().toArray().then(function(result){
        console.log('schedule for carrier and airport ',airportCode,' ',carrier,': ',JSON.stringify(result));
        response.json(result);
    });
  } catch (e) {
    console.log("e", e)
  } 
});

var port = process.env.VCAP_APP_PORT || 3000;
var server = app.listen(port, function () {
    console.log('listening on *:'+port);
});

// start the demo
airlineDemo.start();

// stop spark streaming when we stop the node program
process.on('SIGTERM', function () {
  airlineDemo.stop(function() {
    console.log('SIGTERM - stream has been stopped');
    process.exit(0);
  });
});

process.on('SIGINT', function () {
  airlineDemo.stop(function() {
    console.log('SIGINT - stream has been stopped');
    process.exit(0);
  });
});
