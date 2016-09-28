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

var Utils = require('../utils.js');

/**
 * @classdesc
 * A Dataset is a strongly typed collection of domain-specific objects that can be transformed
 * in parallel using functional or relational operations. Each Dataset also has an untyped view
 * called a [[Dataset]], which is a Dataset of {@link Row}.
 *
 * Operations available on Datasets are divided into transformations and actions. Transformations
 * are the ones that produce new Datasets, and actions are the ones that trigger computation and
 * return results. Example transformations include map, filter, select, and aggregate (`groupBy`).
 * Example actions count, show, or writing data out to file systems.
 *
 * Datasets are "lazy", i.e. computations are only triggered when an action is invoked. Internally,
 * a Dataset represents a logical plan that describes the computation required to produce the data.
 * When an action is invoked, Spark's query optimizer optimizes the logical plan and generates a
 * physical plan for efficient execution in a parallel and distributed manner. To explore the
 * logical plan as well as optimized physical plan, use the `explain` function.
 *
 * To efficiently support domain-specific objects, an {@link Encoder} is required. The encoder maps
 * the domain specific type `T` to Spark's internal type system. For example, given a class `Person`
 * with two fields, `name` (string) and `age` (int), an encoder is used to tell Spark to generate
 * code at runtime to serialize the `Person` object into a binary structure. This binary structure
 * often has much lower memory footprint as well as are optimized for efficiency in data processing
 * (e.g. in a columnar format). To understand the internal binary representation for data, use the
 * `schema` function.
 *
 * There are typically two ways to create a Dataset. The most common way is by pointing Spark
 * to some files on storage systems, using the `read` function available on a `SparkSession`.
 * @example
 *   val people = spark.read.parquet("...").as[Person]  // Scala
 *   Dataset<Person> people = spark.read().parquet("...").as(Encoders.bean(Person.class)); // Java
 *
 *
 * Datasets can also be created through transformations available on existing Datasets. For example,
 * the following creates a new Dataset by applying a filter on the existing one:
 * @example
 *   val names = people.map(_.name)  // in Scala; names is a Dataset[String]
 *   Dataset<String> names = people.map((Person p) -> p.name, Encoders.STRING)); // in Java 8
 *
 *
 * Dataset operations can also be untyped, through various domain-specific-language (DSL)
 * functions defined in: Dataset (this class), [[Column]], and {@link functions}. These operations
 * are very similar to the operations available in the data frame abstraction in R or Python.
 *
 * To select a column from the Dataset, use `apply` method in Scala and `col` in Java.
 * @example
 *   val ageCol = people("age")  // in Scala
 *   Column ageCol = people.col("age"); // in Java
 *
 *
 * Note that the {@link Column} type can also be manipulated through its various functions.
 * @example
 *   // The following creates a new column that increases everybody's age by 10.
 *   people("age") + 10  // in Scala
 *   people.col("age").plus(10);  // in Java
 *
 *
 * A more concrete example in Scala:
 * @example
 *   // To create Dataset[Row] using SparkSession
 *   val people = spark.read.parquet("...")
 *   val department = spark.read.parquet("...")
 *
 *   people.filter("age > 30")
 *     .join(department, people("deptId") === department("id"))
 *     .groupBy(department("name"), "gender")
 *     .agg(avg(people("salary")), max(people("age")))
 *
 *
 * and in Java:
 * @example
 *   // To create Dataset<Row> using SparkSession
 *   Dataset<Row> people = spark.read().parquet("...");
 *   Dataset<Row> department = spark.read().parquet("...");
 *
 *   people.filter("age".gt(30))
 *     .join(department, people.col("deptId").equalTo(department("id")))
 *     .groupBy(department.col("name"), "gender")
 *     .agg(avg(people.col("salary")), max(people.col("age")));
 *
 *
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @class
 * @memberof module:eclairjs/sql
 */

/**
 * @param {module:eclairjs/sql.SQLContext} sqlContext
 * @param {module:eclairjs/sql/catalyst/plans/logical.LogicalPlan} logicalPlan
 * @param {module:eclairjs/sql.Encoder} encoder
 * @constructor
 */

function _resolveRows(result, resolve, reject) {
  try {
    var res = JSON.parse(result);

    var RowFactory = require('./RowFactory')(this.kernelP);

    var returnResult = null;

    if (Array.isArray(res)) {
      returnResult = [];
      res.forEach(function(rowData) {
        if (rowData.values) {
          //console.log("rd",JSON.stringify(rowData))
          returnResult.push(RowFactory.createLocal(rowData.values, rowData.schema))
        } else {
          returnResult.push(rowData);
        }
      });
    } else {
      returnResult = RowFactory.createLocal(res.values, res.schema);
    }

    resolve(returnResult);
  } catch (e) {
    var err = new Error("Parse Error: "+ e.message);
    reject(err);
  }
}

function Dataset(kernelP, refIdP) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  //Utils.handleConstructor(this, arguments, gKernelP);
}

/**
 * @returns {Promise.<string>}
 */
Dataset.prototype.toString = function() {
  var args = {
    target: this,
    method: 'toString',
    returnType: String
  };

  return Utils.generate(args);
};

/**
 * aggregates on the entire Dataset without groups.
 * @example
 * // df.agg(...) is a shorthand for df.groupBy().agg(...)
 * var map = {};
 * map["age"] = "max";
 * map["salary"] = "avg";
 * df.agg(map)
 * df.groupBy().agg(map)
 * @function
 * @name module:eclairjs/sql.Dataset#agg
 * @param {hashMap} - hashMap<String,String> exprs
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.agg = function() {
  var args = {
    target: this,
    method: 'agg',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * :: Experimental ::
 * Returns a new Dataset where each record has been mapped on to the specified type. The
 * method used to map columns depend on the type of `U`:
 *  - When `U` is a class, fields for the class will be mapped to columns of the same name
 *    (case sensitivity is determined by `spark.sql.caseSensitive`).
 *  - When `U` is a tuple, the columns will be be mapped by ordinal (i.e. the first column will
 *    be assigned to `_1`).
 *  - When `U` is a primitive type (i.e. String, Int, etc), then the first column of the
 *    {@link Dataset} will be used.
 *
 * If the schema of the Dataset does not match the desired `U` type, you can use `select`
 * along with `alias` or `as` to rearrange or rename as required.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.as = function() {
  var args = {
    target: this,
    method: 'as',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Converts this strongly typed collection of data to generic `Dataset` with columns renamed.
 * This can be quite convenient in conversion from a RDD of tuples into a {@link Dataset} with
 * meaningful names. For example:
 * @example
 *   val rdd: RDD[(Int, String)] = ...
 *   rdd.toDF()  // this implicit conversion creates a Dataset with column name `_1` and `_2`
 *   rdd.toDF("id", "name")  // this creates a Dataset with column name "id" and "name"
 *
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {...string} [colNames]
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.toDF = function(colNames) {
  var Dataset = require('./Dataset');

  var args = {
    target: this,
    method: 'toDF',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns the schema of this Dataset.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {StructType}
 */
Dataset.prototype.schema = function() {
  var StructType = require('./types/StructType.js')(this.kernelP);

  var args = {
    target: this,
    method: 'schema',
    returnType: StructType
  };

  return Utils.generate(args);
};

/**
 * Prints the schema to the console in a nice tree format.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Dataset.prototype.printSchema = function() {
  throw "not implemented by ElairJS";
};

/**
 * Prints the plans (logical and physical) to the console for debugging purposes.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {boolean} if false prints the physical plans only.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Dataset.prototype.explain = function(extended) {
  var args = {
    target: this,
    method: 'explain',
    args: Utils.wrapArguments(arguments),
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * Returns all column names and their data types as an array.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {Promise.<Array>} A Promise that resolves to an Array of Array[2].
 */
Dataset.prototype.dtypes = function() {
  var args = {
    target: this,
    method: 'dtypes',
    stringify: true,
    returnType: [String],
  };

  return Utils.generate(args);
};

/**
 * Returns all column names as an array.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {Promise.<string[]>}
 */
Dataset.prototype.columns = function() {
  var args = {
    target: this,
    method: 'columns',
    returnType: [String],
    stringify: true
  };

  return Utils.generate(args);
};

/**
 * Returns true if the `collect` and `take` methods can be run locally
 * (without any Spark executors).
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {Promise.<boolean>}
 */
Dataset.prototype.isLocal = function() {
  var args = {
    target: this,
    method: 'isLocal',
    returnType: Boolean
  };

  return Utils.generate(args);
};

/**
 * Returns true if this Dataset contains one or more sources that continuously
 * return data as it arrives. A Dataset that reads data from a streaming source
 * must be executed as a {@link StreamingQuery} using the `start()` method in
 * {@link DataStreamWriter}. Methods that return a single answer, e.g. `count()` or
 * `collect()`, will throw an {@link AnalysisException} when there is a streaming
 * source present.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Promise.<boolean>}
 */
Dataset.prototype.isStreaming = function() {
  var args = {
    target: this,
    method: 'isStreaming',
    returnType: Boolean
  };

  return Utils.generate(args);
};

/**
 * Displays the Dataset rows in a tabular form.
 * @function
 * @name module:eclairjs/sql.Dataset#show
 * @param {interger} [numberOfRows] defaults to 20.
 * @param {boolean] [truncate] defaults to false, Whether truncate long strings. If true, strings more than 20 characters will be
 * truncated and all cells will be aligned right
 */
Dataset.prototype.show = function(numRows) {
  throw "not implemented by ElairJS";
//   var args = {
//     target: this,
//     method: 'show',
//     args: Utils.wrapArguments(arguments),
//     returnType: null
//
//   };
//
//   return Utils.generate(args);
};

/**
 * Returns a {@link DataFrameNaFunctions} for working with missing data.
 * @example
 *   // Dropping rows containing any null values.
 *   ds.na.drop()
 *
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {module:eclairjs/sql.DataFrameNaFunctions}
 */
Dataset.prototype.na = function() {
  var DataFrameNaFunctions = require('./DataFrameNaFunctions.js');

  var args = {
    target: this,
    method: 'na',
    returnType: DataFrameNaFunctions
  };

  return Utils.generate(args);
};

/**
 * Returns a {@link DataFrameStatFunctions} for working statistic functions support.
 * @example
 *   // Finding frequent items in column with name 'a'.
 *   ds.stat.freqItems(Seq("a"))
 *
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {DataFrameStatFunctions}
 */
Dataset.prototype.stat = function() {
  var DataFrameStatFunctions = require('./DataFrameStatFunctions.js');

  var args = {
    target: this,
    method: 'stat',
    returnType: DataFrameStatFunctions
  };

  return Utils.generate(args);
};

/**
 * Cartesian join with another Dataset. Note that cartesian joins are very expensive without an extra filter that can be pushed down.
 * @function
 * @name module:eclairjs/sql.Dataset#join
 * @param {module:eclairjs/sql.Dataset} Right side of the join operation.
 * @param {string | string[] | module:eclairjs/sql.Column} [columnNamesOrJoinExpr] If string or array of strings column names, inner equi-join with another Dataset using the given columns.
 * Different from other join functions, the join columns will only appear once in the output, i.e. similar to SQL's JOIN USING syntax.
 * If Column object, joinExprs inner join with another Dataset, using the given join expression.
 * @param {string} [joinType] only valid if using Column joinExprs.
 * @returns {module:eclairjs/sql.Dataset}
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
Dataset.prototype.join = function() {
  var args = {
    target: this,
    method: 'join',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * :: Experimental ::
 * Joins this Dataset returning a {@link Tuple2} for each pair where `condition` evaluates to
 * true.
 *
 * This is similar to the relation `join` function with one important difference in the
 * result schema. Since `joinWith` preserves objects present on either side of the join, the
 * result schema is similarly nested into a tuple under the column names `_1` and `_2`.
 *
 * This type of join can be useful both for preserving type-safety with the original object
 * types as well as working with relational data where either side of the join has column
 * names in common.
 *
 * @param {module:eclairjs/sql.Dataset} other  Right side of the join.
 * @param {module:eclairjs/sql.Column} condition  Join expression.
 * @param {string} [joinType]  One of: `inner`, `outer`, `left_outer`, `right_outer`, `leftsemi`.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.joinWith = function(other,condition,joinType) {
  var args = {
    target: this,
    method: 'joinWith',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset with each partition sorted by the given expressions.
 *
 * This is the same operation as "SORT BY" in SQL (Hive QL).
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {...module:eclairjs/sql.Column} sortExprs
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.sortWithinPartitions = function(sortExprs) {
  var args = {
    target: this,
    method: 'sortWithinPartitions',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset sorted by the given expressions. For example:
 * @example
 *   ds.sort($"col1", $"col2".desc)
 *
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {...module:eclairjs/sql.Column} sortExprs
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.sort = function() {
  var args = {
    target: this,
    method: 'sort',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset sorted by the specified columns, if columnName is used sorted in ascending order.
 * This is an alias of the sort function.
 * @function
 * @name module:eclairjs/sql.Dataset#orderBy
 * @param {string | module:eclairjs/sql.Column} columnName,...columnName or sortExprs,... sortExprs
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.orderBy = function(sortExprs) {
  var args = {
    target: this,
    method: 'orderBy',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Selects column based on the column name and return it as a {@link Column}.
 * Note that the column name can also reference to a nested column like `a.b`.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} colName
 * @returns {module:eclairjs/sql.Column}
 */
Dataset.prototype.apply = function(colName) {
  var Column = require('./Column');

  var args = {
    target: this,
    method: 'apply',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Selects column based on the column name and return it as a {@link Column}.
 * Note that the column name can also reference to a nested column like `a.b`.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} colName
 * @returns {module:eclairjs/sql.Column}
 */
Dataset.prototype.col = function(colName) {
  var Column = require('./Column');

  var args = {
    target: this,
    method: 'col',
    args: Utils.wrapArguments(arguments),
    returnType: Column
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset with an alias set. Same as `as`.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} alias
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.alias = function(alias) {
  var args = {
    target: this,
    method: 'alias',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Selects a set of column based expressions.
 * @function
 * @name module:eclairjs/sql.Dataset#select
 * @param {module:eclairjs/sql.Column[] | module:eclairjs/sql.TypedColumn[] | string[]}
 * @returns  {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.select = function() {
  var args = {
    target: this,
    method: 'select',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Selects a set of SQL expressions. This is a variant of `select` that accepts
 * SQL expressions.
 *
 * @example
 *   // The following are equivalent:
 *   ds.selectExpr("colA", "colB as newName", "abs(colC)")
 *   ds.select(expr("colA"), expr("colB as newName"), expr("abs(colC)"))
 *
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {...string} exprs
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.selectExpr = function() {
  var args = {
    target: this,
    method: 'selectExpr',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Filters rows using the given condition.
 * @example
 *   // The following are equivalent:
 *   peopleDs.filter($"age" > 15)
 *   peopleDs.where($"age" > 15)
 *
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {string | module:eclairjs/sql.Column}
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.filter = function() {
  var args = {
    target: this,
    method: 'filter',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Filters rows using the given Column or SQL expression.
 * @function
 * @name module:eclairjs/sql.Dataset#where
 * @param {module:eclairjs/sql.Column | string} condition - .
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.where = function(condition) {
  var args = {
    target: this,
    method: 'where',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Groups the Dataset using the specified columns, so we can run aggregation on them. See
 * {@link RelationalGroupedDataset} for all the available aggregate functions.
 *
 * @example
 *   // Compute the average for all numeric columns grouped by department.
 *   ds.groupBy($"department").avg()
 *
 *   // Compute the max age and average salary, grouped by department and gender.
 *   ds.groupBy($"department", $"gender").agg(Map(
 *     "salary" -> "avg",
 *     "age" -> "max"
 *   ))
 *
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string[] | module:eclairjs/sql.Column[]} - Array of Column objects of column name strings
 * @returns {module:eclairjs/sql.RelationalGroupedDataset}
 */
Dataset.prototype.groupBy = function(cols) {
  var RelationalGroupedDataset = require('./RelationalGroupedDataset');

  var args = {
    target: this,
    method: 'groupBy',
    args: Utils.wrapArguments(arguments),
    returnType: RelationalGroupedDataset
  };

  return Utils.generate(args);
};

/**
 * Create a multi-dimensional rollup for the current Dataset using the specified columns,
 * so we can run aggregation on them.
 * See {@link RelationalGroupedDataset} for all the available aggregate functions.
 *
 * @example
 *   // Compute the average for all numeric columns rolluped by department and group.
 *   ds.rollup($"department", $"group").avg()
 *
 *   // Compute the max age and average salary, rolluped by department and gender.
 *   ds.rollup($"department", $"gender").agg(Map(
 *     "salary" -> "avg",
 *     "age" -> "max"
 *   ))
 *
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {...module:eclairjs/sql.Column} cols
 * @returns {module:eclairjs/sql.RelationalGroupedDataset}
 */
Dataset.prototype.rollup = function(cols) {
  var RelationalGroupedDataset = require('./RelationalGroupedDataset');

  var args = {
    target: this,
    method: 'rollup',
    args: Utils.wrapArguments(arguments),
    returnType: RelationalGroupedDataset
  };

  return Utils.generate(args);
};

/**
 * Create a multi-dimensional cube for the current Dataset using the specified columns,
 * so we can run aggregation on them.
 * See {@link RelationalGroupedDataset} for all the available aggregate functions.
 *
 * @example
 *   // Compute the average for all numeric columns cubed by department and group.
 *   ds.cube($"department", $"group").avg()
 *
 *   // Compute the max age and average salary, cubed by department and gender.
 *   ds.cube($"department", $"gender").agg(Map(
 *     "salary" -> "avg",
 *     "age" -> "max"
 *   ))
 *
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {...module:eclairjs/sql.Column} cols
 * @returns {module:eclairjs/sql.RelationalGroupedDataset}
 */
Dataset.prototype.cube = function(cols) {
  var RelationalGroupedDataset = require('./RelationalGroupedDataset');

  var args = {
    target: this,
    method: 'cube',
    args: Utils.wrapArguments(arguments),
    returnType: RelationalGroupedDataset
  };

  return Utils.generate(args);
};

/**
 * :: Experimental ::
 * Returns a {@link KeyValueGroupedDataset} where the data is grouped by the given key `func`.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {function} func
 * @param {module:eclairjs/sql.Encoder} encoder
 * @returns {module:eclairjs/sql.KeyValueGroupedDataset}
 */
Dataset.prototype.groupByKey = function(func) {
  throw "not implemented by ElairJS";
// var KeyValueGroupedDataset = require('../sql/KeyValueGroupedDataset.js');
//   var args = {
//     target: this,
//     method: 'groupByKey',
//     args: Utils.wrapArguments(arguments),
//     returnType: KeyValueGroupedDataset
//
//   };
//
//   return Utils.generate(args);
};

/**
 * Returns a new Dataset by taking the first `n` rows. The difference between this function
 * and `head` is that `head` is an action and returns an array (by triggering query execution)
 * while `limit` returns a new Dataset.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {number} n
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.limit = function(n) {
  var args = {
    target: this,
    method: 'limit',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset containing union of rows in this Dataset and another Dataset.
 * This is equivalent to `UNION ALL` in SQL.
 *
 * To do a SQL-style set union (that does deduplication of elements), use this function followed
 * by a {@link distinct}.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {module:eclairjs/sql.Dataset} other
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.unionAll = function(other) {
  var args = {
    target: this,
    method: 'unionAll',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset containing union of rows in this Dataset and another Dataset.
 * This is equivalent to `UNION ALL` in SQL.
 *
 * To do a SQL-style set union (that does deduplication of elements), use this function followed
 * by a {@link distinct}.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {module:eclairjs/sql.Dataset} other
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.union = function(other) {
  var args = {
    target: this,
    method: 'union',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset containing rows only in both this Dataset and another Dataset.
 * This is equivalent to `INTERSECT` in SQL.
 *
 * Note that, equality checking is performed directly on the encoded representation of the data
 * and thus is not affected by a custom `equals` function defined on `T`.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {module:eclairjs/sql.Dataset} other
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.intersect = function(other) {
  var args = {
    target: this,
    method: 'intersect',
    args: Utils.wrapArguments(arguments),
   returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset containing rows in this Dataset but not in another Dataset.
 * This is equivalent to `EXCEPT` in SQL.
 *
 * Note that, equality checking is performed directly on the encoded representation of the data
 * and thus is not affected by a custom `equals` function defined on `T`.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {module:eclairjs/sql.Dataset} other
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.except = function(other) {
  var args = {
    target: this,
    method: 'except',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset by sampling a fraction of rows.
 *
 * @param {boolean} withReplacement  Sample with replacement or not.
 * @param {number} fraction  Fraction of rows to generate.
 * @param {number} [seed]  Seed for sampling.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.sample = function(withReplacement,fraction,seed) {
  var args = {
    target: this,
    method: 'sample',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Randomly splits this Dataset with the provided weights.
 *
 * @param {number[]} weights  weights for splits, will be normalized if they don't sum to 1.
 * @param {number} [seed]  Seed for sampling.
 *
 * For Java API, use {@link randomSplitAsList}.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Dataset[]}
 */
Dataset.prototype.randomSplit = function(weights, seed) {
  var args = {
    target: this,
    method: 'randomSplit',
    args: [
      {value: Utils.wrapArray(weights)},
      {value: seed, type: 'number', optional: true}
    ],
    returnType: [Dataset]
  };

  return Utils.generate(args);
};

/**
 * (Scala-specific) Returns a new Dataset where each row has been expanded to zero or more
 * rows by the provided function. This is similar to a `LATERAL VIEW` in HiveQL. The columns of
 * the input row are implicitly joined with each row that is output by the function.
 *
 * Given that this is deprecated, as an alternative, you can explode columns either using
 * `functions.explode()` or `flatMap()`. The following example uses these alternatives to count
 * the number of books that contain a given word:
 *
 * @example
 *   case class Book(title: String, words: String)
 *   val ds: Dataset[Book]
 *
 *   val allWords = ds.select('title, explode(split('words, " ")).as("word"))
 *
 *   val bookCountPerWord = allWords.groupBy("word").agg(countDistinct("title"))
 *
 *
 * Using `flatMap()` this can similarly be exploded as:
 *
 * @example
 *   ds.flatMap(_.words.split(" "))
 *
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {...module:eclairjs/sql.Column} input
 * @param {func} f
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.explode = function(input,f) {
  throw "not implemented by ElairJS";
// // TODO: handle repeated parm 'input'
//   var args = {
//     target: this,
//     method: 'explode',
//     args: Utils.wrapArguments(arguments),
//     returnType: Dataset
//
//   };
//
//   return Utils.generate(args);
};


/**
 * (Scala-specific) Returns a new Dataset where a single column has been expanded to zero
 * or more rows by the provided function. This is similar to a `LATERAL VIEW` in HiveQL. All
 * columns of the input row are implicitly joined with each value that is output by the function.
 *
 * Given that this is deprecated, as an alternative, you can explode columns either using
 * `functions.explode()`:
 *
 * @example
 *   ds.select(explode(split('words, " ")).as("word"))
 *
 *
 * or `flatMap()`:
 *
 * @example
 *   ds.flatMap(_.words.split(" "))
 *
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} inputColumn
 * @param {string} outputColumn
 * @param {func} f
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.explodewithF = function(inputColumn,outputColumn,f) {
  throw "not implemented by ElairJS";
//   var args = {
//     target: this,
//     method: 'explode',
//     args: Utils.wrapArguments(arguments),
//     returnType: Dataset
//
//   };
//
//   return Utils.generate(args);
};

/**
 * Returns a new Dataset by adding a column or replacing the existing column that has
 * the same name.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} colName
 * @param {module:eclairjs/sql.Column} col
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.withColumn = function(colName,col) {
  var args = {
    target: this,
    method: 'withColumn',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset with a column renamed.
 * This is a no-op if schema doesn't contain existingName.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} existingName
 * @param {string} newName
 * @returns {module:eclairjs/sql/types.StructType}
 */
Dataset.prototype.withColumnRenamed = function(existingName,newName) {
  var args = {
    target: this,
    method: 'withColumnRenamed',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset with a columns dropped. This is a no-op if schema doesn't contain
 * column name(s).
 *
 * This method can only be used to drop top level columns. the colNames string is treated
 * literally without further interpretation.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} colNames...
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.drop = function() {
  var args = {
    target: this,
    method: 'drop',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset that contains only the unique rows from this Dataset, if colNames then considering only the subset of columns.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} colNames...
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.dropDuplicates = function() {
  var args = {
    target: this,
    method: 'dropDuplicates',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Computes statistics for numeric and string columns, including count, mean, stddev, min, and
 * max. If no columns are given, this function computes statistics for all numerical or string
 * columns.
 *
 * This function is meant for exploratory data analysis, as we make no guarantee about the
 * backward compatibility of the schema of the resulting Dataset. If you want to
 * programmatically compute summary statistics, use the `agg` function instead.
 *
 * @example
 *   ds.describe("age", "height").show()
 *
 *   // output:
 *   // summary age   height
 *   // count   10.0  10.0
 *   // mean    53.3  178.05
 *   // stddev  11.6  15.7
 *   // min     18.0  163.0
 *   // max     92.0  192.0
 *
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {string} cols...
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.describe = function(cols) {
  var args = {
    target: this,
    method: 'describe',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns the first `n` rows.
 *
 * @note this method should only be used if the resulting array is expected to be small, as
 * all the data is loaded into the driver's memory.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {number} [n]
 * @returns {module:eclairjs/sql.Row}
 */
Dataset.prototype.head = function(n) {
  var Row = require('./Row')();

  var args = {
    target: this,
    method: 'head',
    returnType: Row
  };

  return Utils.generate(args);
};

/**
 * Returns the first row. Alias for head().
 * @since EclairJS 0.7 Spark  1.6.0
 * returns {module:eclairjs/sql.Row}
 */
Dataset.prototype.first = function() {
  var Row = require('./Row')();

   var args = {
    target: this,
    method: 'first',
    returnType: String,
    stringify: true,
    resolver: _resolveRows.bind(this)
  };

  return Utils.generate(args);
};

/**
 * Concise syntax for chaining custom transformations.
 * @example
 *   def featurize(ds: Dataset[T]): Dataset[U] = ...
 *
 *   ds
 *     .transform(featurize)
 *     .transform(...)
 *
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {func} t
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.transform = function(t) {
  var args = {
    target: this,
    method: 'transform',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * :: Experimental ::
 * (Scala-specific)
 * Returns a new Dataset that contains the result of applying `func` to each element.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {function} func
 * @param {module:eclairjs/sql.Encoder} encoder
 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.map = function(func, encoder, bindArgs) {
  var args = {
    target: this,
    method: 'map',
    args: [
      {value: func, type: 'lambda'},
      {value: encoder},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * :: Experimental ::
 * (Scala-specific)
 * Returns a new Dataset that contains the result of applying `func` to each partition.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {function}
 * @param {module:eclairjs/sql.Encoder} encoder
 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.mapPartitions = function(func, encoder, bindArgs) {
  var args = {
    target: this,
    method: 'mapPartitions',
    args: [
      {value: func, type: 'lambda'},
      {value: encoder},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset by first applying a function to all elements of this Dataset,
 * and then flattening the results.
 * @function
 * @name module:eclairjs/sql.Dataset#flatMap
 * @param {function} func
 * @param {module:eclairjs/sql.Encoder} encoder
 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.flatMap = function(func, encoder, bindArgs) {
  var args = {
    target: this,
    method: 'flatMap',
    args: [
      {value: func, type: 'lambda'},
      {value: encoder},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Applies a function to all elements of this Dataset.
 * @example
 * rdd3.foreach(function(record) {
	 *    var connection = createNewConnection()
	 *    connection.send(record);
	 *    connection.close()
	 * });
 * @function
 * @name module:eclairjs/sql.Dataset#foreach
 * @param {function} Function with one parameter
 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Dataset.prototype.foreach = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'flatMap',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * Applies a function `f` to each partition of this Dataset.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {function} Function with one Array parameter
 * @param {Object[]} [bindArgs] array whose values will be added to func's argument list.
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Dataset.prototype.foreachPartition = function(func, bindArgs) {
  var args = {
    target: this,
    method: 'foreachPartition',
    args: [
      {value: func, type: 'lambda'},
      {value: Utils.wrapBindArgs(bindArgs), optional: true}
    ],
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * Returns the first `n` rows in the Dataset.
 *
 * Running take requires moving data into the application's driver process, and doing so with
 * a very large `n` can crash the driver process with OutOfMemoryError.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {number} n
 * @returns {Promise.<object[]>}
 */
Dataset.prototype.take = function(n) {
  var args = {
    target: this,
    method: 'take',
    args: Utils.wrapArguments(arguments),
    returnType: String,
    stringify: true,
    resolver: _resolveRows.bind(this)
  };

  return Utils.generate(args);
};

/**
 * Returns an array that contains all of {@link Row}s in this Dataset.
 *
 * Running collect requires moving all the data into the application's driver process, and
 * doing so on a very large dataset can crash the driver process with OutOfMemoryError.
 *
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {Promise.<object[]>}
 */
Dataset.prototype.collect = function() {
  var args = {
    target: this,
    method: 'collect',
    returnType: String,
    stringify: true,
    resolver: _resolveRows.bind(this)
  };

  return Utils.generate(args);
};

/**
 * Return an iterator that contains all of {@link Row}s in this Dataset.
 *
 * The iterator will consume as much memory as the largest partition in this Dataset.
 *
 * Note: this results in multiple Spark jobs, and if the input Dataset is the result
 * of a wide transformation (e.g. join with different partitioners), to avoid
 * recomputing the input Dataset should be cached first.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Iterator}
 */
Dataset.prototype.toLocalIterator = function() {
  throw "not implemented by ElairJS";
//   var args = {
//     target: this,
//     method: 'toLocalIterator',
//     returnType: Iterator
//
//   };
//
//   return Utils.generate(args);
};

/**
 * Returns the number of rows in the Dataset.
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {Promise.<number>}
 */
Dataset.prototype.count = function() {
   var args = {
     target: this,
     method: 'count',
     returnType: Number
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset that has exactly `numPartitions` partitions.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {number} numPartitions
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.repartition = function(numPartitions) {
  var args = {
    target: this,
    method: 'repartition',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset that has exactly `numPartitions` partitions.
 * Similar to coalesce defined on an {@link RDD}, this operation results in a narrow dependency, e.g.
 * if you go from 1000 partitions to 100 partitions, there will not be a shuffle, instead each of
 * the 100 new partitions will claim 10 of the current partitions.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {number} numPartitions
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.coalesce = function(numPartitions) {
  var args = {
    target: this,
    method: 'coalesce',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a new Dataset that contains only the unique rows from this Dataset.
 * This is an alias for `dropDuplicates`.
 *
 * Note that, equality checking is performed directly on the encoded representation of the data
 * and thus is not affected by a custom `equals` function defined on `T`.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.distinct = function() {
  var args = {
    target: this,
    method: 'distinct',
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Persist this Dataset with the default storage level (`MEMORY_ONLY`).
 * @function
 * @name module:eclairjs/sql.Dataset#cache
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.cache = function() {
  var args = {
    target: this,
    method: 'cache',
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Persist this Dataset with the given storage level.
 * @param {module:eclairjs/storage.StorageLevel} [newLevel]  One of: `MEMORY_ONLY`, `MEMORY_AND_DISK`, `MEMORY_ONLY_SER`,
 *                 `MEMORY_AND_DISK_SER`, `DISK_ONLY`, `MEMORY_ONLY_2`,
 *                 `MEMORY_AND_DISK_2`, etc.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.persist = function(newLevel) {
  var args = {
    target: this,
    method: 'persist',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Mark the Dataset as non-persistent, and remove all blocks for it from memory and disk.
 *
 * @param {boolean} [blocking]  Whether to block until all blocks are deleted.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.unpersist = function(blocking) {
  var args = {
    target: this,
    method: 'unpersist',
    args: Utils.wrapArguments(arguments),
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Registers this Dataset as a temporary table using the given name. The lifetime of this
 * temporary table is tied to the {@link SparkSession} that was used to create this Dataset.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @param {string} tableName
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Dataset.prototype.registerTempTable = function(tableName) {
  var args = {
    target: this,
    method: 'registerTempTable',
    args: Utils.wrapArguments(arguments),
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * Creates a temporary view using the given name. The lifetime of this
 * temporary view is tied to the {@link SparkSession} that was used to create this Dataset.
 *
 * @throws AnalysisException if the view name already exists
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} viewName
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Dataset.prototype.createTempView = function(viewName) {
  throw "not implemented by ElairJS";
//   var args = {
//     target: this,
//     method: 'createTempView',
//     args: Utils.wrapArguments(arguments),
//     returnType: null
//
//   };
//
//   return Utils.generate(args);
};

/**
 * Creates a temporary view using the given name. The lifetime of this
 * temporary view is tied to the {@link SparkSession} that was used to create this Dataset.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @param {string} viewName
 * @returns {Promise.<Void>} A Promise that resolves to nothing.
 */
Dataset.prototype.createOrReplaceTempView = function(viewName) {
  var args = {
    target: this,
    method: 'createOrReplaceTempView',
    args: Utils.wrapArguments(arguments),
    returnType: null
  };

  return Utils.generate(args);
};

/**
 * :: Experimental ::
 * Interface for saving the content of the non-streaming Dataset out into external storage.
 *
 * @since EclairJS 0.7 Spark  1.6.0
 * @returns {module:eclairjs/sql.DatasetWriter}
 */
Dataset.prototype.write = function() {
  throw "not implemented by ElairJS";
// var DataFrameWriter = require('../sql/DataFrameWriter.js');
//   var args = {
//     target: this,
//     method: 'write',
//     returnType: DataFrameWriter
//
//   };
//
//   return Utils.generate(args);
};


/**
 * :: Experimental ::
 * Interface for saving the content of the streaming Dataset out into external storage.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {module:eclairjs/sql/streaming.DataStreamWriter}
 */
Dataset.prototype.writeStream = function() {
	 var DataStreamWriter = require('../sql/streaming/DataStreamWriter.js');
	   var args = {
	     target: this,
	     method: 'writeStream',
	     returnType: DataStreamWriter

	   };

	   return Utils.generate(args);
};

/**
 * Returns the content of the Dataset as a Dataset of JSON strings.
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {module:eclairjs/sql.Dataset}
 */
Dataset.prototype.toJSON = function() {
  var args = {
    target: this,
    method: 'toJSON',
    returnType: Dataset
  };

  return Utils.generate(args);
};

/**
 * Returns a best-effort snapshot of the files that compose this Dataset. This method simply
 * asks each constituent BaseRelation for its respective files and takes the union of all results.
 * Depending on the source relations, this may not find all input files. Duplicates are removed.
 *
 * @since EclairJS 0.7 Spark  2.0.0
 * @returns {Promise.<string[]>}
 */
Dataset.prototype.inputFiles = function() {
  var args = {
    target: this,
    method: 'inputFiles',
    stringify: true,
    returnType: [String]
  };

  return Utils.generate(args);
};

/**
 * @function
 * @name module:eclairjs/sql.Dataset#queryExecution
 * @returns {module:eclairjs/sql.SQLContextQueryExecution}
 */
Dataset.prototype.queryExecution = function() {
  var SQLContextQueryExecution = require('./SQLContextQueryExecution');

  var args = {
    target: this,
    method: 'queryExecution',
    returnType: SQLContextQueryExecution
  };

  return Utils.generate(args);
};

/**
 * Represents the content of the Dataset as an RDD of Rows.
 * @function
 * @name module:eclairjs/sql.Dataset#rdd
 * @returns {module:eclairjs.RDD}
 */
Dataset.prototype.rdd = function () {
  var RDD = require('../rdd/RDD.js');

  var args = {
    target: this,
    method: 'rdd',
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Represents the content of the Dataset as an RDD of Rows.
 * @function
 * @name module:eclairjs/sql.Dataset#rdd
 * @returns {module:eclairjs.RDD}
 */
Dataset.prototype.toRDD = function () {
  var RDD = require('../rdd/RDD.js');

  var args = {
    target: this,
    method: 'toRDD',
    returnType: RDD
  };

  return Utils.generate(args);
};

/**
 * Returns the first row.
 * @function
 * @name module:eclairjs/sql.Dataset#head
 * @param {number} [n]
 * @returns {module:eclairjs/sql.Row}
 */
Dataset.prototype.head = function () {
  var Row = require('./Row')();

  var args = {
    target: this,
    method: 'head',
    args: Utils.wrapArguments(arguments),
    returnType: String,
    stringify: true,
    resolver: _resolveRows.bind(this)
  };

  return Utils.generate(args);
};

/**
 * Returns SQLContext
 * @returns {module:eclairjs/sql.SQLContext}
 */
Dataset.prototype.sqlContext = function() {
  var Dataset = require('./SQLContext.js');

  // TODO: need a cleaner way
  return new SQLContext({context: this.kernelP});
};

Dataset.moduleLocation = '/sql/Dataset';
module.exports = Dataset;
//module.exports = function(kP) {
//  if (kP) gKernelP = kP;
//
//  return Dataset;
//};
