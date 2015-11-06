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

var protocol = require('./kernel.js');
var DataFrame = require('./DataFrame.js');

function jsonFromPath(sqlContext, path) {
    console.log("jsonFromPath");
    var refId = protocol.genVariable('dataframe');
    var kernelP = sqlContext.kernelP;
    var refIdP = sqlContext.refIdP;

    return new DataFrame(kernelP, new Promise(function(resolve, reject) {
        console.log("resolve sql context promises");
        Promise.all([kernelP, refIdP]).then(function(values) {
            console.log("YO!!!");
            var code = 
                'var '+refId+' = '+values[1]+'.read.json("'+path+'");';
            protocol.verifyAssign(values[0].execute({code: code, silent: false}), 
                                  resolve, 
                                  reject,
                                  refId);
        }).catch(function(err) { 
            console.log("new DataFrame error");
            console.log(err); 
        });
    }));
}

function jsonFromRDD(sc, rdd) {
}

function DataFrameReader(sqlContext) {
    this.sqlContext = sqlContext;
}

DataFrameReader.prototype.json = function() {
    console.log("DataFrameReader json");
    if(typeof arguments[0] === 'object')
        return jsonFromRDD(this.sqlContext, arguments[0]);

    return jsonFromPath(this.sqlContext, arguments[0]);
}

function SQLContext(sc) {
  var refId = protocol.genVariable('sql');
  this.kernelP = sc.kernel;
  this.refIdP = new Promise(function(resolve, reject) {
    sc.kernel.then(function(k) {
      protocol.verifyAssign(k.execute({
        code: 'var '+refId+' = new SQLContext(jsc);'
      }), resolve, reject, refId);
    })
  });

  this.read = new DataFrameReader(this);
}


module.exports = SQLContext;
/*
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
*/
