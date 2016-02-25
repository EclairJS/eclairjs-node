var airportsUSFeatureCollection = null;

function getAirportsUSFeatureCollectionInstance() {
    if (airportsUSFeatureCollection === null) {
        airportsUSFeatureCollection = new AirportsUSFeatureCollection();
    }
    return airportsUSFeatureCollection;
}

function AirportsUSFeatureCollection() {
    this.airports = {
        "type": "FeatureCollection",
        "features": []
    };
}

AirportsUSFeatureCollection.prototype.load = function(callback) {
    if (this.airports.features.length === 0) {
        var me = this;
        //console.log("LOADING US AIRPORTS!");
        var rawdata = d3.csv('/data/airports_world.dat', function(d) {
            // Filter out anything that is not in USA or is a train station.
            // Note: Would be good place for spark filter call.
            if (d.country !== 'United States' || d.name.indexOf('Station') !== -1 || 
                d.name.indexOf('Train') !== -1 || d.name.indexOf('Amtrak') !== -1 || 
                d.airportCode === '')
                return null;
            else
                return {
                    "geometry": {
                        "type": "Point",
                        "coordinates": [ parseFloat(d.longitude), parseFloat(d.latitude) ]
                    },
                    "type": "Feature",
                    "properties": {
                        "popupContent": "<p>" + d.name 
                            + " <a href='http://airportcod.es/#airport/" 
                            + d.airportCode.toLowerCase() 
                            + "'>" + d.airportCode+"</a></p>" 
                            + "<div class='polar-chart' id="+d.airportCode+"_chart></div>"
                            + "<div class='polar-chart-options' id="+d.airportCode+"_options></div>"
                            + "<nav class='nav-fillpath'>"
                            + "<a id='"+d.airportCode+"_showopts' class='next' href='javascript:;'>"
                            + "<span class='icon-wrap'> </span>"
                            + "</a>"
                            + "<a id='"+d.airportCode+"_hideopts' class='prev' href='javascript:;'>"
                            + "<span class='icon-wrap'> </span>"
                            + "</a>"
                            + "</nav>",
                        "code": d.airportCode
                    },
                    "id": d.airportID
                };
        }, function(error, rows) {
            //console.log(rows);
            me.airports.features = rows;
            callback(me.airports);
        });
    } else {
        //console.log('AIRPORTS ALREADY LOADED!');
        callback(this.airports);
    }
}

AirportsUSFeatureCollection.prototype.getAirportFeature = function(airportCode, callback) {
    aiportCode = airportCode || 'ABC';
    this.load(function(airports) {
        airports = airports.features || [];
        var match = airports.filter(function(airport){
            return airport.properties.code === airportCode;
        });
        callback(match[0] || {});
    });
}

AirportsUSFeatureCollection.prototype.getAirportCoordinates = function(airportCode, callback) {
    aiportCode = airportCode || 'ABC';
    this.load(function(airports) {
        airports = airports.features || [];
        var match = airports.filter(function(airport){
            return airport.properties.code === airportCode;
        });
        var coords = match.length > 0 ? match[0].geometry.coordinates : [0, 0];
        //console.log('coords: ',coords);
        callback({longitude: coords[0], latitude: coords[1]});
    });
}

function Airport(options) {
    this.options = options || {};
}

Airport.prototype.getFlights = function(callback, delay_range) {
    var airportCode = this.options.airportCode || 'ABC';

    if (this['pending_'+airportCode]) {
        //console.log('Pending getFlights call already in progress for: ',airportCode);
        return;
    }

    // Longitude and Latitude for the origin airport the user selected from the map.
    var long = this.options.longitude || 0;
    var lat = this.options.latitude || 0;

    this['pending_'+airportCode] = true;
    console.log('Nothing pending getting flights for: ',airportCode);

    var me = this;
    $.get("/getFlights?airport="+airportCode, function(data) {

        //console.log('getFlights rawdata: ',data);

        var bearingFromCoordinates = function(lat1, long1, lat2, long2) {
            var brng = Math.atan2(lat2 - lat1, long2 - long1);
            brng = brng * (180/Math.PI);
            brng = (brng + 360) % 360;
            brng = 360 - brng;
            return brng;
        }

        var getRegionFromBearing = function(bearing) {
            var unadjustedRegion = Math.floor(bearing/30);
            // Note: Our chart re-orients labels so zero degrees is at label N
            // and region 0 is from N-3 degrees, but to get proper angle we have
            // to re-orient along x-axis.
            return unadjustedRegion < 9 ? unadjustedRegion+3 : unadjustedRegion-9;
        }

        delay_range = (delay_range && delay_range.length > 1) ? delay_range : [10, 60];
        var ONTIME_THRESHOLD = delay_range[0],
            MINOR_DELAY_THRESHOLD = delay_range[1];

        //console.log('Using an ontime threshold of: ', ONTIME_THRESHOLD, ' for: ',airportCode);
        //console.log('Using a minor delay threshold of: ', MINOR_DELAY_THRESHOLD, ' for: ',airportCode);

        var regiondata = [];
        var airportsUS = getAirportsUSFeatureCollectionInstance();
        var flights = data || [];
        flights = flights.filter(function(flight){ return flight.origin === airportCode });
        for (var i = 0; i < flights.length; i++) {
            airportsUS.getAirportCoordinates(flights[i].destination, function(coords){
                var bearing = bearingFromCoordinates(lat, long, coords.latitude, coords.longitude);
                var region = getRegionFromBearing(bearing);
                var status = flights[i].take_off_delay_mins <= ONTIME_THRESHOLD
                    ? 'ontime' : flights[i].take_off_delay_mins <= MINOR_DELAY_THRESHOLD
                    ? 'delay_minor' : 'delay_major';
                // Need to check if region/status combo already exists and update totals, otherwise add new one.
                var match = regiondata.filter(function(d){return d.region === region});
                if (match.length === 0) {
                    regiondata.push({region: region, ontime: 0, delay_minor: 0, delay_major: 0});
                    regiondata[regiondata.length-1][status]++;
                } else {
                    match[0][status]++;
                }
            });
        };

        // Note: For each region 0-11, chartdata will be in the form:
        //var chartdata = [
        //    {region:0, ontime:25},
        //    {region:0, delay_minor:50},
        //    {region:0, delay_major:25}
        //  ]

        // Calculate overall percentages for each region.
        var chartdata = [];
        for (var j = 0; j < regiondata.length; j++) {
            var total = regiondata[j].ontime + regiondata[j].delay_minor + regiondata[j].delay_major;
            chartdata.push({region: regiondata[j].region, ontime: Math.round((regiondata[j].ontime/total)*100)});
            chartdata.push({region: regiondata[j].region, delay_minor: Math.round((regiondata[j].delay_minor/total)*100)});
            chartdata.push({region: regiondata[j].region, delay_major: Math.round((regiondata[j].delay_major/total)*100)});
        }

        //console.log('chartdata: ',chartdata);

        me['pending_'+airportCode] = false;

        callback(chartdata);
    })
}

Airport.prototype.getCarriersForFlightsToday = function(callback) {
    var airportCode = this.options.airportCode || 'ABC';
    if (this.carriersForToday) {
        callback(this.carriersForToday);
    } else {
        var me = this;
        $.get("/getCarriers?airport="+airportCode, function(data) {
            //console.log('getCarriersForFlightsToday rawdata: ',data);
            this.carriersForToday = data || [];
            callback(this.carriersForToday);
        });
    }
}

Airport.prototype.getScheduleByCarrierForToday = function(callback, carrier) {
    var airportCode = this.options.airportCode || 'ABC';
    carrier = carrier || 'AA';
        if (this.schedulesForToday && this.schedulesForToday[carrier]) {
        callback(this.schedulesForToday[carrier]);
    } else {
        var me = this;
        $.get("/getSchedule?airport="+airportCode+"&carrier="+carrier, function(data) {
            //console.log('getScheduleByCarrier rawdata: ',data);
            this.schedulesForToday = this.schedulesForToday || [];
            this.schedulesForToday[carrier] = data;
            callback(this.schedulesForToday[carrier]);
        });
    }
}

Airport.prototype.getOriginAirportForFlight = function(callback, airline, flightnum) {
    airline = airline || 'DL';
    flightnum = flightnum || 3065;
    var airportCode = this.options.airportCode || 'ABC';

    var me = this;
    $.get("/getOriginAirportForFlight?airport="+airportCode+"&flight="+flightnum+"&airline="+airline, function(data) {
        //console.log('got origin airport for flightnum: ', flightnum);
        //console.log('data: ', data);
        callback(data);
    })
}
