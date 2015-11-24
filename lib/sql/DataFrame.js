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

var protocol = require('../kernel.js');
var Utils = require('../utils.js');
var serialize = require('../serialize.js');

var RDD = require('../RDD.js');
var Column = require('./Column.js');
var Row = require('./Row.js');

/**
 * @constructor
 * @classdesc A distributed collection of data organized into named columns. A DataFrame is equivalent to a relational table in Spark SQL.
 */
function DataFrame(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;
}

/**
 * aggregates on the entire DataFrame without groups.
 * @example
 * // df.agg(...) is a shorthand for df.groupBy().agg(...)
 * var map = {};
 * map["age"] = "max";
 * map["salary"] = "avg";
 * df.agg(map)
 * df.groupBy().agg(map)
 * @param {hashMap} - hashMap<String,String> exprs
 * @returns {DataFrame}
 */
DataFrame.prototype.agg = function(hashMap) {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // different template for string or object
      var templateStr = 'var {{refId}} = {{inRefId}}.agg({{aggMap}});';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, aggMap: JSON.stringify(hashMap)});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns a new DataFrame with an alias set.
 * @param {string} alias
 * @returns {DataFrame}
 */
DataFrame.prototype.as = function(alias) {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // different template for string or object
      var templateStr = 'var {{refId}} = {{inRefId}}.as("{{alias}}");';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, alias: alias});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Selects column based on the column name and return it as a Column.
 * Note that the column name can also reference to a nested column like a.b.
 * @param {string} colName
 * @returns {Column}
 */
DataFrame.prototype.apply = function(colName) {
  var refId = protocol.genVariable('column');
  var self = this;

  return new Column(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.apply("{{name}}");';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, name: colName});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Persist this DataFrame with the default storage level (`MEMORY_ONLY`).
 * @returns {DataFrame}
 */
DataFrame.prototype.cache = function() {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // different template for string or object
      var templateStr = 'var {{refId}} = {{inRefId}}.cache();';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns a new DataFrame that has exactly numPartitions partitions.
 * Similar to coalesce defined on an RDD, this operation results in a narrow dependency,
 * e.g. if you go from 1000 partitions to 100 partitions, there will not be a shuffle,
 * instead each of the 100 new partitions will claim 10 of the current partitions.
 * @param {integer} numPartitions
 * @returns {DataFrame}
 */
DataFrame.prototype.coalesce = function(numPartitions) {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // different template for string or object
      var templateStr = 'var {{refId}} = {{inRefId}}.coalesce({{numPartitions}});';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, numPartitions: numPartitions});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));};

/**
 * Selects column based on the column name and return it as a Column.
 * @param {string} name
 * @returns {Column}
 */
DataFrame.prototype.col = function(name) {
  var refId = protocol.genVariable('column');
  var self = this;

  return new Column(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.col("{{name}}");';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, name: name});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }), name);
};

/**
 * Returns an array that contains all of Rows in this DataFrame.
 * @returns {Promise.<Row[]>} A Promise that resolves to an array containing all Rows.
 */
DataFrame.prototype.collect = function() {
  var self = this;

  return new Promise(function(resolve, reject) {
    function _resolve(result) {
      try {
        // columns() returns a stringified json result so parse it here
        var res = JSON.parse(result);

        var RowFactory = require('./RowFactory')(self.kernelP);

        var rows = [];

        if (Array.isArray(res)) {
          res.forEach(function(rowData) {
            rows.push(RowFactory.create(rowData.values))
          });
        }

        resolve(rows);
      } catch (e) {
        var err = new Error("Parse Error: "+ e.message);
        reject(err);
      }
    }

    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var refId = values[0];
      var kernel = values[1];

      var templateStr = 'JSON.stringify({{inRefId}}.collect());';
      var code = Utils.processTemplate(templateStr, {inRefId: refId});
      protocol.verifyResult(kernel.execute({code: code}), _resolve, reject);
    }).catch(reject);
  })
};

/**
 * Returns all column names as an array.
 * @returns {Promise.<string[]>} A Promise that resolves to an array containing all column names.
 */
DataFrame.prototype.columns = function() {
  var self = this;

  return new Promise(function(resolve, reject) {
    function _resolve(result) {
      try {
        // columns() returns a stringified json result so parse it here
        resolve(JSON.parse(result));
      } catch (e) {
        var err = new Error("Parse Error: "+ e.message);
        reject(err);
      }
    }

    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var refId = values[0];
      var kernel = values[1];

      var templateStr = 'JSON.stringify({{inRefId}}.columns());';
      var code = Utils.processTemplate(templateStr, {inRefId: refId});
      protocol.verifyResult(kernel.execute({code: code}), _resolve, reject);
    }).catch(reject);
  })
};

/**
 * Returns the number of rows in the DataFrame.
 * @returns {Promise.<integer>} A Promise that resolves to the number of rows in the DataFrame.
 */
DataFrame.prototype.count = function() {
  var self = this;

  return new Promise(function(resolve, reject) {

    function _resolve(count) {
      resolve(parseInt(count));
    }

    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var refId = values[0];
      var kernel = values[1];

      var templateStr = '{{inRefId}}.count();';
      var code = Utils.processTemplate(templateStr, {inRefId: refId});
      protocol.verifyResult(kernel.execute({code: code}), _resolve, reject);
    }).catch(reject);
  })
};

/**
 * Create a multi-dimensional cube for the current DataFrame using the specified columns, so we can run aggregation on them.
 * @param {string| Column} cols...
 * @example
 * var df = dataFrame.cube("age", "expense");
 * @returns {GroupedData}
 */
DataFrame.prototype.cube = function() {
  var args = Array.prototype.slice.call(arguments);
  var refId = protocol.genVariable('groupedData');
  var self = this;

  var GroupedData = require('./GroupedData.js');

  return new GroupedData(this.kernelP, new Promise(function(resolve, reject) {
    var promises = [self.kernelP, self.refIdP];

    // we have an Column[], so we need to resolve their refIds
    if(typeof args[0] === 'object') {
      args.forEach(function(arg) {
        promises.push(arg.refIdP);
      });
    } else {
      // we have an string[], so we autoresolve each string with " around it
      args.forEach(function(arg) {
        promises.push(Promise.resolve('"'+arg+'"'));
      });
    }

    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // if not a Column then its a sql string
      var colIds = [];

      // resolved columns are in position 2 and above
      if (values[2]) {
        for (var i = 2; i < values.length; i++) {
          colIds.push(values[i]);
        }
      }

      // different template for string or object
      var templateStr = 'var {{refId}} = {{inRefId}}.cube({{groupByArgs}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, groupByArgs: colIds.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Computes statistics for numeric columns, including count, mean, stddev, min, and max.
 * If no columns are given, this function computes statistics for all numerical columns.
 * This function is meant for exploratory data analysis, as we make no guarantee about the backward
 * compatibility of the schema of the resulting DataFrame. If you want to programmatically compute
 * summary statistics, use the agg function instead.
 * @param {string} cols....
 * @example
 * var df = peopleDataFrame.describe("age", "expense");
 * @returns {DataFrame}
 */
DataFrame.prototype.describe = function() {
  var args = Array.prototype.slice.call(arguments);
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    var promises = [self.kernelP, self.refIdP];

    var cols = [];

    args.forEach(function(arg) {
      cols.push('"'+arg+'"');
    });

    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // different template for string or object
      var templateStr = 'var {{refId}} = {{inRefId}}.describe({{cols}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, cols: cols.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns a new DataFrame that contains only the unique rows from this DataFrame. This is an alias for dropDuplicates.
 * @returns {DataFrame}
 */
DataFrame.prototype.distinct = function() {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{inRefId}}.distinct();';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns a new DataFrame with a column dropped.
 * @param {string | Column} col
 * @returns {DataFrame}
 */
DataFrame.prototype.drop = function(arg) {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    // If we have a Column, we need to resolve its refId
    var argP = (typeof arg === 'object') ? arg.refIdP : Promise.resolve(arg);

    Promise.all([self.kernelP, self.refIdP, argP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];
      var col = values[2];

      // different template for string or Column reference
      var templateStr = typeof arg == 'object' ? 'var {{refId}} = {{inRefId}}.drop({{col}});' : 'var {{refId}} = {{inRefId}}.drop("{{col}}");';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, col: col});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns a new DataFrame that contains only the unique rows from this DataFrame, if colNames then considering only the subset of columns.
 * @param {string[]} colNames
 * @returns {DataFrame}
 */
DataFrame.prototype.dropDuplicates = function(colNames) {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var colIds = [];

      if (colNames) {
        colNames.forEach(function(colName) {
          colIds.push('"' + colName + '"');
        });
      }

      // different template for string or object
      var templateStr = colNames.length > 0 ? 'var {{refId}} = {{inRefId}}.dropDuplicates([{{colNames}}]);' : 'var {{refId}} = {{inRefId}}.dropDuplicates([]);';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, colNames: colIds.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns all column names and their data types as an array of arrays. ex. [["name","StringType"],["age","IntegerType"],["expense","IntegerType"]]
 * @returns {Promise.<Array>} A Promise that resolves to an Array of Array[2].
 */
DataFrame.prototype.dtypes = function() {
  var self = this;

  return new Promise(function(resolve, reject) {

    function _resolve(result) {
      try {
        resolve(JSON.parse(result));
      } catch (e) {
        var err = new Error("Parse Error: "+ e.message);
        reject(err);
      }
    }

    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'JSON.stringify({{dataFrameId}}.dtypes());';
      var code = Utils.processTemplate(templateStr, {dataFrameId: dataFrameId});

      protocol.verifyResult(kernel.execute({code: code}), _resolve, reject);
    }).catch(reject);
  });
};

/**
 * Filters rows using the given SQL expression string or Filters rows using the given Column..
 * @param {string | Column}
 * @returns {DataFrame}
 */
DataFrame.prototype.filter = function(arg) {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    // If we have a Column, we need to resolve its refId
    var argP = (typeof arg === 'object') ? arg.refIdP : Promise.resolve(arg);

    Promise.all([self.kernelP, self.refIdP, argP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];
      var filterArg = values[2];

      // different template for string or Column reference
      var templateStr = typeof arg == 'object' ? 'var {{refId}} = {{inRefId}}.filter({{filterArg}});' : 'var {{refId}} = {{inRefId}}.filter("{{filterArg}}");';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, filterArg: filterArg});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns a new RDD by first applying a function to all rows of this DataFrame, and then flattening the results.
 * @param {function} func
 * @returns {RDD}
 */
DataFrame.prototype.flatMap = function(func) {
  var refId = protocol.genVariable('rdd');
  var self = this;

  return new RDD(this.kernelP, new Promise(function(resolve, reject) {
    var udfP = (typeof func === 'function') ? serialize.serializeFunction(func) : Promise.resolve(func);

    Promise.all([self.kernelP, self.refIdP, udfP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];
      var udf = values[2];

      var templateStr = 'var {{refId}} = {{dataFrameId}}.flatMap({{udf}});';
      var code = Utils.processTemplate(templateStr, {refId: refId, dataFrameId: dataFrameId, udf: udf});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Groups the DataFrame using the specified columns, so we can run aggregation on them
 * @param {string[] | Column[]} - Array of Column objects of column name strings
 * @returns {GroupedData}
 */
DataFrame.prototype.groupBy = function() {
  var args = Array.prototype.slice.call(arguments);
  var refId = protocol.genVariable('groupedData');
  var self = this;

  var GroupedData = require('./GroupedData.js');

  return new GroupedData(this.kernelP, new Promise(function(resolve, reject) {
    var promises = [self.kernelP, self.refIdP];

    // we have an Column[], so we need to resolve their refIds
    if(typeof args[0] === 'object') {
      args.forEach(function(arg) {
        promises.push(arg.refIdP);
      });
    } else {
      // we have an string[], so we autoresolve each string with " around it
      args.forEach(function(arg) {
        promises.push(Promise.resolve('"'+arg+'"'));
      });
    }

    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // if not a Column then its a sql string
      var colIds = [];

      // resolved columns are in position 2 and above
      if (values[2]) {
        for (var i = 2; i < values.length; i++) {
          colIds.push(values[i]);
        }
      }

      // different template for string or object
      var templateStr = 'var {{refId}} = {{inRefId}}.groupBy({{groupByArgs}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, groupByArgs: colIds.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns the first row.
 * @returns {Row}
 */
DataFrame.prototype.head = function() {
  var refId = protocol.genVariable('row');
  var self = this;

  return new Row(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{dataFrameId}}.head();';
      var code = Utils.processTemplate(templateStr, {refId: refId, dataFrameId: dataFrameId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns a new RDD by applying a function to all rows of this DataFrame.
 * @param {function} func
 * @returns {RDD}
 */
DataFrame.prototype.map = function(func) {
  var refId = protocol.genVariable('rdd');
  var self = this;

  return new RDD(this.kernelP, new Promise(function(resolve, reject) {
    var udfP = (typeof func === 'function') ? serialize.serializeFunction(func) : Promise.resolve(func);

    Promise.all([self.kernelP, self.refIdP, udfP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];
      var udf = values[2];

      var templateStr = 'var {{refId}} = {{dataFrameId}}.map({{udf}});';
      var code = Utils.processTemplate(templateStr, {refId: refId, dataFrameId: dataFrameId, udf: udf});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
}

/**
 * Registers this DataFrame as a temporary table using the given name.
 * @param {string} tableName
 * @returns {Promise.<Array>} A Promise that resolves when the temp tample has been created.
 */
DataFrame.prototype.registerTempTable = function(tableName) {
  var self = this;

  return new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = '{{dataFrameId}}.registerTempTable("{{tableName}}");';
      var code = Utils.processTemplate(templateStr, {
        dataFrameId: dataFrameId,
        tableName: tableName
      });

      protocol.verifyAssign(kernel.execute({code: code, silent: false}), resolve, reject);
    }).catch(reject);
  });
};

/**
 * Selects a set of column based expressions.
 * @param {Column[] | string[]}
 * @returns  {DataFrame}
 */
DataFrame.prototype.select = function() {
  var args = Array.prototype.slice.call(arguments);

  if (args.length == 0) {
    return this;
  }

  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    var promises = [self.kernelP, self.refIdP];

    // we have an Column[], so we need to resolve their refIds
    if(typeof args[0] === 'object') {
      args.forEach(function(arg) {
        promises.push(arg.refIdP);
      });
    } else {
      // we have an string[], so we autoresolve each string with " around it
      args.forEach(function(arg) {
        promises.push(Promise.resolve('"'+arg+'"'));
      });
    }

    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var colIds = [];

      // resolved columns are in position 2 and above
      if (values[2]) {
        // we had an array of cols
        for (var i = 2; i < values.length; i++) {
          colIds.push(values[i]);
        }
      }

      // different template for string or object
      var templateStr = 'var {{refId}} = {{inRefId}}.select({{groupByArgs}});';

      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, groupByArgs: colIds.join(',')});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

/**
 * Returns the first n rows in the DataFrame.
 * @param {integer} num
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the first num elements in this DataFrame.
 */
DataFrame.prototype.take = function(num) {
  var self = this;
  return new Promise(function(resolve, reject) {
    function _resolve(result) {
      try {
        // take returns a stringified json result so parse it here
        resolve(JSON.parse(result));
      } catch (e) {
        var err = new Error("Parse Error: "+ e.message);
        reject(err);
      }
    }

    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'JSON.stringify({{dataFrameId}}.take({{num}}));';
      var code = Utils.processTemplate(templateStr, {dataFrameId: dataFrameId, num: num});
      protocol.verifyResult(kernel.execute({code: code}), _resolve, reject);
    }).catch(function(err) {
      reject(err);
    });
  })
};

/**
 * Returns the content of the DataFrame as a RDD of JSON strings.
 * @returns {RDD}
 */
DataFrame.prototype.toJSON = function() {
  var refId = protocol.genVariable('rdd');
  var self = this;

  return new RDD(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{dataFrameId}}.toJSON();';
      var code = Utils.processTemplate(templateStr, {refId: refId, dataFrameId: dataFrameId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));};

/**
 * Returns a RDD object.
 * @returns {RDD}
 */
DataFrame.prototype.toRDD = function() {
  var refId = protocol.genVariable('rdd');
  var self = this;

  return new RDD(this.kernelP, new Promise(function(resolve, reject) {
    Promise.all([self.kernelP, self.refIdP]).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      var templateStr = 'var {{refId}} = {{dataFrameId}}.toRDD();';
      var code = Utils.processTemplate(templateStr, {refId: refId, dataFrameId: dataFrameId});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

DataFrame.prototype.toString = function() {
  var self = this;

  return new Promise(function(resolve, reject) {
    Promise.all([self.refIdP, self.kernelP]).then(function(values) {
      var refId = values[0];
      var kernel = values[1];

      var templateStr = '{{inRefId}}.toString();';
      var code = Utils.processTemplate(templateStr, {inRefId: refId});
      protocol.verifyResult(kernel.execute({code: code}), resolve, reject);
    }).catch(reject);
  })
};

/**
 * Filters rows using the given Column or SQL expression.
 * @param {Column | string} condition - .
 * @returns {DataFrame}
 */
DataFrame.prototype.where = function(condition) {
  var refId = protocol.genVariable('dataFrame');
  var self = this;

  return new DataFrame(this.kernelP, new Promise(function(resolve, reject) {
    var promises = [self.kernelP, self.refIdP];

    // we have a column, so we need to resolve its refId
    if (typeof condition == 'object') {
      promises.push(condition.refIdP)
    }

    Promise.all(promises).then(function(values) {
      var kernel = values[0];
      var dataFrameId = values[1];

      // if not a Column then its a sql condition
      var filterArg = values[2] ? values[2] : condition;

      // different template for string or object
      var templateStr = typeof condition == 'object' ? 'var {{refId}} = {{inRefId}}.where({{filterArg}});' : 'var {{refId}} = {{inRefId}}.where("{{filterArg}}");';
      var code = Utils.processTemplate(templateStr, {refId: refId, inRefId: dataFrameId, filterArg: filterArg});

      protocol.verifyAssign(kernel.execute({code: code, silent: false}),
        resolve,
        reject,
        refId);
    }).catch(reject);
  }));
};

module.exports = DataFrame;
