var spark = require('eclairjs');

var sparkMaster = process.env.SPARK_MASTER || "local[*]";
console.log("spark master = " + sparkMaster);
var sc = new spark.SparkContext(sparkMaster, "Airline Demo");
var sqlContext = new spark.SQLContext(sc);
var ssc;

// rdu,aa,234,sfo,3
function startStream() {
  ssc = new spark.StreamingContext(sc, new spark.streaming.Duration(2000));
  var kafkaHost = process.env.KAFKA_HOST || "169.54.140.107:2181"
  var dstream = spark.streaming.KafkaUtils
    .createStream(ssc, kafkaHost, "floyd", "airline")
    //.createStream(ssc, "10.11.19.101:2181", "floyd", "airline")
    .window(new spark.streaming.Duration(1000 * 60 * 15))
    .flatMap(function(chunk) {
      return chunk[1].split('\n');
    })
    .map(function(line) {
      var lineArr = line.split(",");
      var str = JSON.stringify({
        "origin": lineArr[16],
        "carrier": lineArr[8],
        "flight_num": lineArr[9],
        "destination": lineArr[17],
        "take_off_delay_mins": parseInt(lineArr[15])
      })

      return str;
    });

  dstream.foreachRDD(function(rdd) {
     // RDD.isEmpty() doesn't exist anymore - Was this a mistake?? It still exists on Nashorn side.
     //if(!rdd.isEmpty()) {
        var df = sqlContext.read().json(rdd);
        //if (df.count() > 0) {
            print("got data from stream: "+ df.count());
            df.registerTempTable("airlinedata");
        //}
    //}
  }).then(function() {
    ssc.start().catch(function(err) {
      console.log("error starting streaming context");
      console.log(err);
    })
  }).catch(function(err) {
    console.log("error sending print command");
    console.log(err);
  })
}

function getTodaysFlights() {
    var file = process.env.FLIGHT_DATA || 'file:' + __dirname + '/public/data/2008bd.json';
    //console.log('Getting static data from file: ',file);

    var dfAllFlights = sqlContext.read().json(file);
    dfAllFlights.count().then(function(count){
        console.log('Num all US flights: ',count);
    });

    var today = new Date();
    var month = today.getMonth()+1; // 0 indexed e.g. 0-11
    var day = today.getDate(); // 1 indexed e.g. 1-31

    var dfFlightsForToday = 
        dfAllFlights.filter("month='"+month+"' AND day='"+day+"'");
    dfFlightsForToday.count().then(function(count){
        console.log('Num all flights for today '+month+'-'+day+': ',JSON.stringify(count));
        dfFlightsForToday.registerTempTable('flightstoday').then(function(){
            console.log('Temptable flightstoday registered');
        });
    });
}

function AirportDemo() {
}


AirportDemo.prototype.start = function() {
  startStream();
  getTodaysFlights();
}

AirportDemo.prototype.stop = function(callback) {
  if (sc) {
    console.log('stop - SparkContext exists');
    if (ssc) {
        console.log('stop - SparkStreamingContext exists');
        ssc.stop();
        ssc.awaitTerminationOrTimeout(5000).then(function() {
            sc.stop().then(callback).catch(callback);
            //callback();
        }).catch(function(err) {
            console.log("error stopping stream");
            //console.log(err);
            sc.stop().then(callback).catch(callback);
        });
    } else {
        sc.stop().then(callback).catch(callback);
    }
  }
}

AirportDemo.prototype.query = function(sql) {
  return sqlContext.sql(sql);
}

module.exports = new AirportDemo();
