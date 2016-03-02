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

var Utils = require('../utils.js');

var RDD = require('../rdd/RDD.js');
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
  var args = {
    target: this,
    method: 'agg',
    args: [
      {value: hashMap, type: 'map'}
    ],
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Returns a new DataFrame with an alias set.
 * @param {string} alias
 * @returns {DataFrame}
 */
DataFrame.prototype.as = function(alias) {
  var args = {
    target: this,
    method: 'as',
    args: [
      {value: alias, type: 'string'}
    ],
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Selects column based on the column name and return it as a Column.
 * Note that the column name can also reference to a nested column like a.b.
 * @param {string} colName
 * @returns {Column}
 */
DataFrame.prototype.apply = function(colName) {
  var args = {
    target: this,
    method: 'apply',
    args: [
      {value: colName, type: 'string'}
    ],
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Persist this DataFrame with the default storage level (`MEMORY_ONLY`).
 * @returns {DataFrame}
 */
DataFrame.prototype.cache = function() {
  var args = {
    target: this,
    method: 'cache',
    returnType: DataFrame
  };

  return Utils.generate(args);
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
  var args = {
    target: this,
    method: 'coalesce',
    args: [
      {value: numPartitions, type: 'number'}
    ],
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Selects column based on the column name and return it as a Column.
 * @param {string} name
 * @returns {Column}
 */
DataFrame.prototype.col = function(name) {
  var args = {
    target: this,
    method: 'col',
    args: [
      {value: name, type: 'string'}
    ],
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Returns an array that contains all of Rows in this DataFrame.
 * @returns {Promise.<Row[]>} A Promise that resolves to an array containing all Rows.
 */
DataFrame.prototype.collect = function() {
  var self = this;

  function _resolve(result, resolve, reject) {
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

  var args = {
    target: this,
    method: 'collect',
    returnType: String,
    stringify: true,
    resolver: _resolve
  };

  return Utils.generate(args);
};

/**
 * Returns all column names as an array.
 * @returns {Promise.<string[]>} A Promise that resolves to an array containing all column names.
 */
DataFrame.prototype.columns = function() {
  function _resolve(result, resolve, reject) {
    try {
      // columns() returns a stringified json result so parse it here
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var args = {
    target: this,
    method: 'columns',
    returnType: String,
    stringify: true,
    resolver: _resolve
  };

  return Utils.generate(args);
};

/**
 * Returns the number of rows in the DataFrame.
 * @returns {Promise.<integer>} A Promise that resolves to the number of rows in the DataFrame.
 */
DataFrame.prototype.count = function() {
  var args = {
    target: this,
    method: 'count',
    returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Create a multi-dimensional cube for the current DataFrame using the specified columns, so we can run aggregation on them.
 * @param {string | Column} cols...
 * @example
 * var df = dataFrame.cube("age", "expense");
 * @returns {GroupedData}
 */
DataFrame.prototype.cube = function() {
  var GroupedData = require('./GroupedData.js');

  var cubeArgs = [];

  var params = Array.prototype.slice.call(arguments);

  if (params && params.length > 0) {
    var type = params[0] instanceof Column ? Column : 'string';

    params.forEach(function(a) {
      cubeArgs.push({value: a, type: type})
    });
  }

  var args = {
    target: this,
    method: 'cube',
    args: cubeArgs,
    returnType: GroupedData
  };

  return Utils.generate(args);
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
  var describeArgs = [];

  var params = Array.prototype.slice.call(arguments);

  if (params && params.length > 0) {
    params.forEach(function(a) {
      describeArgs.push({value: a, type: 'string'})
    });
  }

  var args = {
    target: this,
    method: 'describe',
    args: describeArgs,
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Returns a new DataFrame that contains only the unique rows from this DataFrame. This is an alias for dropDuplicates.
 * @returns {DataFrame}
 */
DataFrame.prototype.distinct = function() {
  var args = {
    target: this,
    method: 'distinct',
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Returns a new DataFrame with a column dropped.
 * @param {string | Column} column
 * @returns {DataFrame}
 */
DataFrame.prototype.drop = function(column) {
  var args = {
    target: this,
    method: 'drop',
    args: [
      (column instanceof Column) ? {value: column} : {value: column, type: 'string'}
    ],
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Returns a new DataFrame that contains only the unique rows from this DataFrame, if colNames then considering only the subset of columns.
 * @param {string[]} colNames
 * @returns {DataFrame}
 */
DataFrame.prototype.dropDuplicates = function(colNames) {
  var arr = [];

  if (colNames) {
    colNames.forEach(function(colName) {
      arr.push({value: colName, type: 'string'});
    });
  }

  var args = {
    target: this,
    method: 'dropDuplicates',
    args: [{value: arr}],
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Returns all column names and their data types as an array of arrays. ex. [["name","StringType"],["age","IntegerType"],["expense","IntegerType"]]
 * @returns {Promise.<Array>} A Promise that resolves to an Array of Array[2].
 */
DataFrame.prototype.dtypes = function() {
  function _resolve(result, resolve, reject) {
    try {
      // take returns a stringified json result so parse it here
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var args = {
    target: this,
    method: 'dtypes',
    stringify: true,
    returnType: String,
    resolver: _resolve
  };

  return Utils.generate(args);
};

/**
 * Returns a new DataFrame containing rows in this frame but not in another frame. This is equivalent to EXCEPT in SQL.
 * @param {DataFrame} otherDataFrame to compare to this DataFrame
 * @returns {DataFrame}
 */
DataFrame.prototype.except = function(otherDataFrame) {
  var args = {
    target: this,
    method: 'except',
    args: [{value: otherDataFrame}],
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Prints the plans (logical and physical) to the console for debugging purposes.
 * @parma {boolean} if false prints the physical plans only.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrame.prototype.explain = function(extended) {
  var args = {
    target: this,
    method: 'explain',
    args: [{value: extended, type: 'boolean', optional: true}],
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * Filters rows using the given SQL expression string or Filters rows using the given Column..
 * @param {string | Column}
 * @returns {DataFrame}
 */
DataFrame.prototype.filter = function(column) {
  var args = {
    target: this,
    method: 'filter',
    args: [{value: column, type: column instanceof Column ? Column : 'string'}],
    returnType: DataFrame
  };

  return Utils.generate(args);
};

/**
 * Returns the first row.
 * @returns {Row}
 */
DataFrame.prototype.first = function() {
  var args = {
    target: this,
    method: 'first',
    returnType: Row
  };

  return Utils.generate(args);
};

/**
 * Returns a new RDD by first applying a function to all rows of this DataFrame, and then flattening the results.
 * @param {function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
DataFrame.prototype.flatMap = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'flatMap',
    args: [
      {value: func, type: 'lambda'},
      {value: bindArgs, type: 'lambdaArgs', optional: true}
    ],
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Applies a function func to all rows.
 * @param {function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrame.prototype.foreach = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'foreach',
    args: [
      {value: func, type: 'lambda'},
      {value: bindArgs, type: 'lambdaArgs', optional: true}
    ],
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * Applies a function to each partition of this DataFrame.
 * @param {function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrame.prototype.foreachPartition = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'foreachPartition',
    args: [
      {value: func, type: 'lambda'},
      {value: bindArgs, type: 'lambdaArgs', optional: true}
    ],
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * Groups the DataFrame using the specified columns, so we can run aggregation on them
 * @param {string... | Column...} - Array of Column objects of column name strings
 * @returns {GroupedData}
 */
DataFrame.prototype.groupBy = function() {
  var GroupedData = require('./GroupedData.js');

  var groupByArgs = [];

  var params = Array.prototype.slice.call(arguments);

  if (params && params.length > 0) {
    var type = params[0] instanceof Column ? Column : 'string';

    params.forEach(function(a) {
      groupByArgs.push({value: a, type: type})
    });
  }

  var args = {
    target: this,
    method: 'groupBy',
    args: groupByArgs,
    returnType: GroupedData
  };

  return Utils.generate(args);
};

/**
 * Returns the first row.
 * @returns {Row}
 */
DataFrame.prototype.head = function() {
  var args = {
    target: this,
    method: 'head',
    returnType: Row
  };

  return Utils.generate(args);
};

/**
 * Returns a best-effort snapshot of the files that compose this DataFrame. This method simply asks each constituent
 * BaseRelation for its respective files and takes the union of all results. Depending on the source relations,
 * this may not find all input files. Duplicates are removed.
 * @returns {Promise.<string[]>} Promise which resolves to a list of files.
 */
DataFrame.prototype.inputFiles = function() {
  function _resolve(result, resolve, reject) {
    try {
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var args = {
    target: this,
    method: 'inputFiles',
    returnType: String,
    stringify: true,
    resolver: _resolve
  };

  return Utils.generate(args);
};

/**
 * Returns a new DataFrame containing rows only in both this frame and another frame. This is equivalent to INTERSECT in SQL
 * @param {DataFrame} other
 * @returns {DataFrame}
 */
DataFrame.prototype.intersect = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.intersect({{other}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {other: other.refIdP});
};

/**
 * Returns true if the collect and take methods can be run locally (without any Spark executors).
 * @returns {Promise.<boolean>}
 */
DataFrame.prototype.isLocal = function() {
  function _resolve(result, resolve, reject) {
    resolve(result === 'true');
  }

  var templateStr = '{{inRefId}}.isLocal();';

  return Utils.generateResultPromise(this, templateStr, {}, _resolve);
};

/**
 * Cartesian join with another DataFrame. Note that cartesian joins are very expensive without an extra filter that can be pushed down.
 * @param {DataFrame} Right side of the join operation.
 * @param {string | string[] | Column} columnNamesOrJoinExpr Optional: If string or array of strings column names, inner equi-join with another DataFrame using the given columns.
 * Different from other join functions, the join columns will only appear once in the output, i.e. similar to SQL's JOIN USING syntax.
 * If Column object, joinExprs inner join with another DataFrame, using the given join expression.
 * @param {string} joinType Optional, only valid if using Column joinExprs.
 * @returns {DataFrame}
 * @example
 * var joinedDf = df1.join(df2);
 * // or
 * var joinedDf = df1.join(df2,"age");
 * // or
 * var joinedDf = df1.join(df2, ["age", "DOB"]);
 * // or Column joinExpr
 * var joinedDf = df1.join(df2, df1.col("name").equalTo(df2.col("name")));
 * // or Column joinExpr
 * var joinedDf = df1.join(df2, df1.col("name").equalTo(df2.col("name")), "outer");
 */
DataFrame.prototype.join = function(right, usingColumns, joinType) {
  var templateStr;

  var usingColumnsData;
  var jType;

  if (usingColumns) {
    if (usingColumns instanceof Column) {
      usingColumnsData = usingColumns.refIdP;

      jType = joinType;
    } else if (Array.isArray(usingColumns)) {
      var cols = [];

      usingColumns.forEach(function(col) {
        cols.push('"'+col+'"');
      });

      usingColumnsData = '['+cols.join(',')+']';
    } else {
      usingColumnsData = '"'+usingColumns+'"';
    }

    if (jType) {
      templateStr = 'var {{refId}} = {{inRefId}}.join({{right}}, {{usingColumns}}, "{{joinType}}");';
    } else {
      templateStr = 'var {{refId}} = {{inRefId}}.join({{right}}, {{usingColumns}});';
    }
  } else {
    templateStr = 'var {{refId}} = {{inRefId}}.join({{right}});';
  }

  return Utils.generateAssignment(this, DataFrame, templateStr, {right: right.refIdP, usingColumns: usingColumnsData, joinType: jType});
};

/**
 * Returns a new DataFrame by taking the first n rows. The difference between this function and head is that head
 * returns an array while limit returns a new DataFrame.
 * @param {integer} number
 * @returns {DataFrame}
 */
DataFrame.prototype.limit = function(number) {
  var templateStr = 'var {{refId}} = {{inRefId}}.limit({{number}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {number: number});
};

/**
 * Returns a new RDD by applying a function to all rows of this DataFrame.
 * @param {function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
DataFrame.prototype.map = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.map({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.map({{udf}});';

  return Utils.generateAssignment(this, RDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Return a new RDD by applying a function to each partition of this DataFrame.
 * Similar to map, but runs separately on each partition (block) of the DataFrame, so func must accept an Array.
 * func should return a array rather than a single item.
 * @param {function} func
 * @param {Object[]} bindArgs - Optional array whose values will be added to func's argument list.
 * @returns {RDD}
 */
DataFrame.prototype.mapPartitions = function(func, bindArgs) {
  var templateStr = bindArgs ? 'var {{refId}} = {{inRefId}}.mapPartitions({{udf}}, [{{bindArgs}}]);' : 'var {{refId}} = {{inRefId}}.mapPartitions({{udf}});';

  return Utils.generateAssignment(this, RDD, templateStr, {udf: Utils.serializeLambda(func), bindArgs: Utils.prepBindArgs(bindArgs)});
};

/**
 * Returns a DataFrameNaFunctions for working with missing data.
 * @returns {DataFrameNaFunctions}
 */
DataFrame.prototype.na = function() {
  var DataFrameNaFunctions = require('./DataFrameNaFunctions.js');

  var templateStr = 'var {{refId}} = {{inRefId}}.na();';

  return Utils.generateAssignment(this, DataFrameNaFunctions, templateStr, {});
};

/**
 * Returns a new DataFrame sorted by the specified columns, if columnName is used sorted in ascending order.
 * This is an alias of the sort function.
 * @param {string | Column} columnName,...columnName or sortExprs,... sortExprs
 * @returns {DataFrame}
 */
DataFrame.prototype.orderBy = function() {
  var args = Array.prototype.slice.call(arguments);

  var orderByArgs = [];

  if (args && Array.isArray(args)) {
    // we have an Column[], so we need to resolve their refIds
    if(typeof args[0] === 'object') {
      args.forEach(function(arg) {
        orderByArgs.push(arg.refIdP);
      });
    } else {
      // we have an string[], so we autoresolve each string with " around it
      args.forEach(function(arg) {
        orderByArgs.push(Promise.resolve('"'+arg+'"'));
      });
    }
  }

  var templateStr = 'var {{refId}} = {{inRefId}}.orderBy({{orderByArgs}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {orderByArgs: orderByArgs});
};

/**
 * @param {StorageLevel} newLevel
 * @returns {DataFrame}
 */
DataFrame.prototype.persist = function(newLevel) {
  var templateStr = newLevel ? 'var {{refId}} = {{inRefId}}.persist({{newLevel}});' : 'var {{refId}} = {{inRefId}}.persist();';

  return Utils.generateAssignment(this, DataFrame, templateStr, {newLevel: newLevel ? newLevel.refIdP : null});
};

/**
 * Prints the schema to the console in a nice tree format.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrame.prototype.printSchema = function() {
  var templateStr = '{{inRefId}}.printSchema();';

  return Utils.generateVoidPromise(this, templateStr);
};

/**
 * @returns {SQLContextQueryExecution}
 */
DataFrame.prototype.queryExecution = function() {
  var SQLContextQueryExecution = require('./SQLContextQueryExecution.js');

  var templateStr = 'var {{refId}} = {{inRefId}}.queryExecution();';

  return Utils.generateAssignment(this, SQLContextQueryExecution, templateStr);
};

/**
 * Randomly splits this DataFrame with the provided weights.
 * @param {float[]} weights - weights for splits, will be normalized if they don't sum to 1.
 * @param {int} seed - Seed for sampling.
 * @returns {Promise.<DataFrame[]>} A Promise that resolves to an array containing the DataFrames.
 */
DataFrame.prototype.randomSplit = function(weights, seed) {
  var templateStr = 'var {{refId}} = {{inRefId}}.randomSplit({{weights}}, {{seed}});';

  return Utils.generateResultArrayPromise(this, DataFrame, templateStr, {weights: Utils.prepForReplacement(weights), seed: Utils.prepForReplacement(seed)});
};

/**
 * Represents the content of the DataFrame as an RDD of Rows.
 * @returns {RDD}
 */
DataFrame.prototype.rdd = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.rdd();';

  return Utils.generateAssignment(this, RDD, templateStr);
};

/**
 * Registers this DataFrame as a temporary table using the given name.
 * @param {string} tableName
 * @returns {Promise.<Void>} A Promise that resolves when the temp table has been created.
 */
DataFrame.prototype.registerTempTable = function(tableName) {
  var templateStr = '{{inRefId}}.registerTempTable("{{tableName}}");';

  return Utils.generateVoidPromise(this, templateStr, {tableName: tableName});
};

/**
 * Returns a new DataFrame that has exactly numPartitions partitions.
 * @param {integer} numPartitions
 * @returns {DataFrame}
 */
DataFrame.prototype.repartition = function(numPartitions) {
  var templateStr = 'var {{refId}} = {{inRefId}}.repartition({{numPartitions}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {numPartitions: numPartitions});
};

/**
 * Create a multi-dimensional rollup for the current DataFrame using the specified columns,
 * so we can run aggregation on them. See GroupedData for all the available aggregate functions.
 * @param {string | Column} columnName, .....columnName or sortExprs,... sortExprs
 * @returns {GroupedData}
 * @example
 *  var result = peopleDataFrame.rollup("age", "networth").count();
 *  // or
 *  var col = peopleDataFrame.col("age");
 *	var result = peopleDataFrame.rollup(col).count();
 */
DataFrame.prototype.rollup = function() {
  var args = Array.prototype.slice.call(arguments);

  var GroupedData = require('./GroupedData.js');

  var rollupArgs = [];

  if (args && Array.isArray(args)) {
    // we have an Column[], so we need to resolve their refIds
    if(typeof args[0] === 'object') {
      args.forEach(function(arg) {
        rollupArgs.push(arg.refIdP);
      });
    } else {
      // we have an string[], so we autoresolve each string with " around it
      args.forEach(function(arg) {
        rollupArgs.push(Promise.resolve('"'+arg+'"'));
      });
    }
  }

  var templateStr = 'var {{refId}} = {{inRefId}}.rollup({{rollupArgs}});';

  return Utils.generateAssignment(this, GroupedData, templateStr, {rollupArgs: rollupArgs});
};

/**
 * Returns a new DataFrame by sampling a fraction of rows, using a random seed.
 * @param {boolean} withReplacement
 * @param {float} fraction
 * @param {integer} seed Optional
 * @returns {DataFrame}
 */
DataFrame.prototype.sample = function(withReplacement, fraction, seed) {
  var templateStr = seed ? 'var {{refId}} = {{inRefId}}.sample({{withReplacement}}, {{fraction}}, {{seed}});' : 'var {{refId}} = {{inRefId}}.sample({{withReplacement}}, {{fraction}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {withReplacement: withReplacement, fraction: fraction, seed: seed});
};

/**
 * Returns the schema of this DataFrame.
 * @returns {StructType}
 */
DataFrame.prototype.schema = function() {
  var StructType = require('./types/StructType.js');

  var templateStr = 'var {{refId}} = {{inRefId}}.schema();';

  return Utils.generateAssignment(this, StructType, templateStr);
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

  var selectArgs = [];

  // we have an Column[], so we need to resolve their refIds
  if(typeof args[0] === 'object') {
    args.forEach(function(arg) {
      selectArgs.push(arg.refIdP);
    });
  } else {
    // we have an string[], so we autoresolve each string with " around it
    args.forEach(function(arg) {
      selectArgs.push(Promise.resolve('"'+arg+'"'));
    });
  }

  var templateStr = 'var {{refId}} = {{inRefId}}.select({{selectArgs}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {selectArgs: selectArgs});
};

/**
 * Selects a set of SQL expressions. This is a variant of select that accepts SQL expressions.
 * @param {string} exprs,...exprs
 * @returns {DataFrame}
 * @example
 * var result = peopleDataFrame.selectExpr("name", "age > 19");
 */
DataFrame.prototype.selectExpr = function() {
  var args = Array.prototype.slice.call(arguments);

  var selectArgs = [];

  args.forEach(function(arg) {
    selectArgs.push('"'+arg+'"');
  });

  var templateStr = 'var {{refId}} = {{inRefId}}.selectExpr({{selectArgs}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {selectArgs: selectArgs.join(',')});
};

/**
 * Displays the top 20 rows of DataFrame in a tabular form.
 *
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrame.prototype.show = function() {
  var templateStr = '{{inRefId}}.show();';

  return Utils.generateVoidPromise(this, templateStr);
};

/**
 * Returns a new DataFrame sorted by the specified columns, if columnName is used sorted in ascending order.
 * @param {string | Column} columnName,...columnName or sortExprs,... sortExprs
 * @returns {DataFrame}
 * @example
 *  var result = peopleDataFrame.sort("age", "name");
 *  // or
 *  var col = peopleDataFrame.col("age");
 *	var colExpr = col.desc();
 *	var result = peopleDataFrame.sort(colExpr);
 */
DataFrame.prototype.sort = function() {
  var args = Array.prototype.slice.call(arguments);

  var sortByArgs = [];

  if (args && Array.isArray(args)) {
    // we have an Column[], so we need to resolve their refIds
    if(typeof args[0] === 'object') {
      args.forEach(function(arg) {
        sortByArgs.push(arg.refIdP);
      });
    } else {
      // we have an string[], so we autoresolve each string with " around it
      args.forEach(function(arg) {
        sortByArgs.push(Promise.resolve('"'+arg+'"'));
      });
    }
  }

  var templateStr = 'var {{refId}} = {{inRefId}}.sort({{sortByArgs}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {sortByArgs: sortByArgs});
};

/**
 * Returns SQLContext
 * @returns {SQLContext}
 */
DataFrame.prototype.sqlContext = function() {
  var SQLContext = require('./SQLContext.js');

  // TODO: need a cleaner way
  return new SQLContext({context: this.kernelP});
};

/**
 * Returns a DataFrameStatFunctions for working statistic functions support.
 * @example
 * var stat = peopleDataFrame.stat().cov("income", "networth");
 *
 * @returns {DataFrameStatFunctions}
 */
DataFrame.prototype.stat = function() {
  var DataFrameStatFunctions = require('./DataFrameStatFunctions.js');

  var templateStr = 'var {{refId}} = {{inRefId}}.stat();';

  return Utils.generateAssignment(this, DataFrameStatFunctions, templateStr, {});
};

/**
 * Returns the first n rows in the DataFrame.
 * @param {integer} num
 * @returns {Promise.<Array>} A Promise that resolves to an array containing the first num elements in this DataFrame.
 */
DataFrame.prototype.take = function(num) {
  function _resolve(result, resolve, reject) {
    try {
      // take returns a stringified json result so parse it here
      resolve(JSON.parse(result));
    } catch (e) {
      var err = new Error("Parse Error: "+ e.message);
      reject(err);
    }
  }

  var templateStr = 'JSON.stringify({{inRefId}}.take({{num}}));';

  return Utils.generateResultPromise(this, templateStr, {num: num}, _resolve);
};

/**
 * Returns a new DataFrame with columns renamed. This can be quite convenient in conversion from a
 * RDD of tuples into a DataFrame with meaningful names. For example:
 * @param {string} colNames,...colNames
 * @return {DataFrame}
 * @example
 * var result = nameAgeDF.toDF("newName", "newAge");
 */
DataFrame.prototype.toDF = function() {
  var args = Array.prototype.slice.call(arguments);

  var cols = [];
  args.forEach(function(col) {
    cols.push('"'+col+'"');
  });

  var templateStr = 'var {{refId}} = {{inRefId}}.toDF({{cols}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {cols: cols.join(',')});
};

/**
 * Returns the content of the DataFrame as a RDD of JSON strings.
 * @returns {RDD}
 */
DataFrame.prototype.toJSON = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.toJSON();';

  return Utils.generateAssignment(this, RDD, templateStr);
};

/**
 * Returns a RDD object.
 * @returns {RDD}
 */
DataFrame.prototype.toRDD = function() {
  var templateStr = 'var {{refId}} = {{inRefId}}.toRDD();';

  return Utils.generateAssignment(this, RDD, templateStr);
};

DataFrame.prototype.toString = function() {
  var templateStr = '{{inRefId}}.toString();';

  return Utils.generateResultPromise(this, templateStr);
};

/**
 * Returns a new DataFrame containing union of rows in this frame and another frame. This is equivalent to UNION ALL in SQL.
 * @param {DataFrame} other
 * @returns {DataFrame}
 */
DataFrame.prototype.unionAll = function(other) {
  var templateStr = 'var {{refId}} = {{inRefId}}.unionAll({{other}});';

  return Utils.generateAssignment(this, DataFrame, templateStr, {other: other.refIdP});
};

/**
 * @param {boolean} blocking
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
DataFrame.prototype.unpersist = function(blocking) {
  var templateStr = '{{inRefId}}.unpersist({{blocking}});';

  return Utils.generateVoidPromise(this, templateStr, {blocking: blocking});
};

/**
 * Filters rows using the given Column or SQL expression.
 * @param {Column | string} condition - .
 * @returns {DataFrame}
 */
DataFrame.prototype.where = function(condition) {
  var conditionP = (condition instanceof Column) ? condition.refIdP : Promise.resolve(condition);

  var templateStr = (condition instanceof Column) ? 'var {{refId}} = {{inRefId}}.where({{filterArg}});' : 'var {{refId}} = {{inRefId}}.where("{{filterArg}}");';

  return Utils.generateAssignment(this, DataFrame, templateStr, {filterArg: conditionP});
};

/**
 * Interface for saving the content of the DataFrame out into external storage.
 * @returns {DataFrameWriter}
 */
DataFrame.prototype.write = function() {
  var DataFrameWriter = require('./DataFrameWriter.js');

  var templateStr = 'var {{refId}} = {{inRefId}}.write();';

  return Utils.generateAssignment(this, DataFrameWriter, templateStr);
};

module.exports = DataFrame;