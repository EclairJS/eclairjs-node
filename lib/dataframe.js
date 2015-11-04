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
var serialize = require('./serialize.js');
var Utils = require('./utils.js');
var RDD = require('./rdd.js');

var Row = function() { }


Row.prototype.get = function(i) {
};

Row.prototype.mkString = function(sep) {
};

Row.prototype.length = function() {
};

Row.prototype.size = function() {
};

Row.prototype.getValuesMap = function(fields) {
};

  
var Column = function() { }

Column.prototype.equalTo = function(obj) {
};

var GroupedData = function() { }

GroupedData.prototype.count = function() {
};

GroupedData.prototype.avg = function(cols) {
};

GroupedData.prototype.mean = function(cols) {
};

GroupedData.prototype.sum = function(cols) {
};

GroupedData.prototype.min = function(cols) {
};

GroupedData.prototype.max = function(cols) {
};


var DataFrameWriter = function() { }

DataFrameWriter.prototype.mode = function(mode) {
};

DataFrameWriter.prototype.saveAsTable = function(tableName) {
};


var groupByWithColumns = function(args) {
    var jCols = args.map(function(v) {
        return v.java;
    });

    var jArr = _jvm.newArray("org.apache.spark.sql.Column", jCols);

    var jGroupedData = jvmDataFrame.groupBySync(jArr);
    var gd = new GroupedData(jGroupedData);

    return gd;
};

var groupByWithStrings = function(args) {
    var jArr = _jvm.newArray("java.lang.String", args);
    var jGroupedData = jvmDataFrame.groupBySync(jArr);
    var gd = new GroupedData(jGroupedData);

    return gd;
};

var selectWithStrings = function(args) {
    var jArr = _jvm.newArray("java.lang.String", args);
    var jdf = jvmDataFrame.selectSync(jArr);
    var df = new DataFrame(jdf);

    return df;
};

var filterWithString = function(columnExpr) {
    return new DataFrame(jvmDataFrame.filterSync(columnExpr));
};

var filterWithColumn = function(col) {
    return new DataFrame(jvmDataFrame.filterSync(col.java));
};

var DataFrame = function(kernelP, refIdP) {
    this.kernelP = kernelP;
    this.refIdP = refIdP;
}

DataFrame.prototype.as = function(alias) {
};

DataFrame.prototype.cache = function() {
};

DataFrame.prototype.col = function(name) {
};

DataFrame.prototype.select = function() {
    var args = Array.prototype.slice.call(arguments);
    var len = args.length;

    if(args.length == 0)
        return self;

    if(typeof args[0] === 'object') 
        return selectWithColumns(args);
    else 
        return selectWithStrings(args);
};

DataFrame.prototype.filter = function(arg) {
      if(typeof arg === 'object') 
        return filterWithColumn(arguments[0]);
      else 
        return filterWithString(arguments[0]);
    };

DataFrame.prototype.show = function() {
    Promise.all([this.kernelP, this.refIdP]).then(function(values) {
        console.log("calling show()");
        console.log(values[1]+'.show();');
        var handle = values[0].execute({code: values[1]+'.show();'})
        handle.handleMsg = msg => {
            console.log(msg);
        }
    }).catch(function(err) { 
        console.log("DataFrame.show Error");
        console.log(err); 
    });
};

DataFrame.prototype.count = function() {
};

DataFrame.prototype.columns = function() {
};

DataFrame.prototype.groupBy = function() {
      var args = Array.prototype.slice.call(arguments);
      var len = args.length;

      if(args.length == 0)
        return self;

      if(typeof args[0] === 'object') 
        return groupByWithColumns(args);
      else 
        return groupByWithStrings(args);
    };

DataFrame.prototype.flatMap = function(func) {
};

DataFrame.prototype.where = function(condition) {
};

DataFrame.prototype.withColumn = function(name, col) {
};

DataFrame.prototype.head = function() {
};

DataFrame.prototype.registerTempTable = function(name) {
};

DataFrame.prototype.take = function(num) {
};

DataFrame.prototype.toJSON = function() {
};

DataFrame.prototype.write = function() {
};

module.exports = DataFrame

