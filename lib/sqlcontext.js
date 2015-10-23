var protocol = require('./kernel.js');
var DataFrame = require('./dataframe.js');

function jsonFromPath(sqlContext, path) {
  var refId = protocol.genVariable('rdd');
  return new DataFrame(this.kernel, new Promise(function(resolve, reject) {
    self.kernel.then(kernel => {
      var code = 
        'val '+refId+' = sc.textFile("'+path+'").map(_.asInstanceOf[Object]).toJavaRDD;';
      protocol.verifyAssign(kernel.execute({code: code, silent: false}), 
                            resolve, 
                            reject,
                            refId);
    })
  }))
}

function jsonFromRDD(sc, rdd) {
}

function DataFrameReader(sqlContext) {
}

DataFrameReader.prototype.json = function() {
  if(typeof arguments[0] === 'object')
    return jsonFromRDD(arguments[0]);

  return jsonFromPath(arguments[0]);
}

function SQLContext(sc) {
  var refId = protocol.genVariable('rdd');
  this.sc = sc;
  this.refIdP = new Promise(function(resolve, reject) {
    sc.kernel.then(function(k) {
      protocol.verifyAssign(k.execute({
        code: 'val '+refId+' = new SQLContext(sc);'
      }, resolve, reject, refId));
    })
  })
}

SQLContext.protoype.read = function() {
  return new DataFrameReader(this);
}

module.exports = SQLContext;
module.exports = function(_jvm) {
  var DataFrame = require('./DataFrame.js')(_jvm)
  var JavaSQLContext = _jvm.import('org.apache.spark.sql.SQLContext');
  var JavaDataFrameReader = _jvm.import('org.apache.spark.sql.DataFrameReader');

  var DataFrameReader = function(javaDataFrameReader) {
    this.javaDataFrameReader = javaDataFrameReader;
  }

  DataFrameReader.prototype.jsonFromPath = function(path) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.javaDataFrameReader.json(path, function(err, result) {
        if(err) { reject(err); }
        else { resolve(new DataFrame(result)); }
      })
    })
  }

  DataFrameReader.prototype.jsonFromRDD = function(rdd) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.javaDataFrameReader.json(rdd.java, function(err, result) {
        if(err) { reject(err); }
        else { resolve(new DataFrame(result)); }
      })
    })
  }

  DataFrameReader.prototype.json = function() {
    if(typeof arguments[0] === 'object')
      return this.jsonFromRDD(arguments[0]);

    return this.jsonFromPath(arguments[0]);
  }

  DataFrameReader.prototype.parquet = function(path) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.javaDataFrameReader.parquet(path, function(err, result) {
        if(err) { reject(err); }
        else { resolve(new DataFrame(result)); }
      })
    })
  }

  var SQLContext = function(sc) {
    console.log("==========SQLContext=================");
    console.log(sc.java);
    this.javaSQLContext = new JavaSQLContext(sc.java);
    this.read = new DataFrameReader(this.javaSQLContext.readSync());
  }

  SQLContext.prototype.table = function(name) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.javaSQLContext.table(name, function(err, result) {
        if(err) { reject(err); }
        else { resolve(new DataFrame(result)); }
      })
    })
  }

  SQLContext.prototype.sql = function(sqlString) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.javaSQLContext.sql(sqlString, function(err, result) {
        if(err) { reject(err); }
        else { resolve(new DataFrame(result)); }
      })
    })
  }

  return SQLContext;
}
