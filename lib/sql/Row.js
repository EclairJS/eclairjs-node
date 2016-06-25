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

/*
 * NOTE: the following have not been implemented as they do not make sense for JavaScript
 *
 * <K,V> java.util.Map<K,V>    getJavaMap(int i)
 * Returns the value at position i of array type as a Map.
 * <T> java.util.List<T>   getList(int i)
 * Returns the value at position i of array type as List.
 * <K,V> scala.collection.Map<K,V> getMap(int i)
 * Returns the value at position i of map type as a Scala Map.
 * <T> scala.collection.Seq<T> getSeq(int i)
 * Returns the value at position i of array type as a Scala Seq.
 * <T> scala.collection.immutable.Map<java.lang.String,T>  getValuesMap(scala.collection.Seq<java.lang.String> fieldNames)
 * Returns a Map(name -> value) for the requested fieldNames
 * scala.collection.Seq<java.lang.Object>  toSeq()
 * Return a Scala Seq representing the row.
 *
 * NOTE: the following are being ignored as they also don't make sense for JavaScript (see ./types/DataTypes.js)
 *
 * byte getByte(int i)
 * decimal getDecimal(int i)
 * long getLong(int i)
 * short getShort(int i)
 */

// Local resolve functions to parse results of various types
function _resolveBool(result, resolve, reject) {
  // parse stringified result here
  resolve(JSON.parse(result));
}

function _resolveFloat(result, resolve, reject) {
  resolve(parseFloat(result));
}

function _resolveInt(result, resolve, reject) {
  resolve(parseInt(result));
}

function _resolveObj(result, resolve, reject) {
  // have to parse if number or bool
  resolve(isFinite(result) ? new Number(result).valueOf() : isBool(result) ? JSON.parse(result) : result);
}

function isBool (val) {
  return val === 'true' || val === 'false';
}

function deepEquals(obj1, obj2) {
  var isEqual = false;

  if (typeof(obj1) === typeof(obj2)) {
    if (Array.isArray(obj1)) {
      if (obj1.length == obj2.length) {
        isEqual = obj1.some(function(val, index) {
          return val === obj2[index];
        });
      }
    } else if (obj1 !== null && typeof(obj1) === 'object') {
      var keys1 = [], keys2 = [], values1 = [], values2 = [];

      for (var key in obj1) {
        keys1.push(key);
        values1.push(obj1[key]);
      }

      for (var key in obj2) {
        keys2.push(key);
        values2.push(obj2[key]);
      }

      if (deepEquals(keys1, keys2) && deepEquals(values1, values2)) {
        isEqual = true;
      }
    } else {
      isEqual = (obj1 === obj2);
    }
  }

  return isEqual;
}

function areTwoRowsEqual(row1, row2) {
  var isEqual = row1 instanceof Row && row2 instanceof Row && deepEquals(row1._schema, row2._schema) && deepEquals(row1._values, row2._values);

  return isEqual;
}

/**
 * @constructor
 * @memberof module:eclairjs/sql
 * @classdesc Represents one row of output from a relational operator. Allows both generic access by ordinal, which will incur boxing overhead for primitives, as well as native primitive access.
 * It is invalid to use the native primitive interface to retrieve a value that is null, instead a user must check isNullAt before attempting to retrieve a value that might be null.
 * To create a new Row, use RowFactory.create()
 */
function Row() {
  if (arguments && arguments.length == 2 && arguments[0] instanceof Promise && arguments[1] instanceof Promise) {
    this.kernelP = arguments[0];
    this.refIdP = arguments[1];
  } else {
    // local copy of data
    this._values = arguments[0];
    this._schema = arguments[1];
  }
}

/**
 * Returns true if there are any NULL values in this row.
 * @returns {Promise.<boolean>}
 */
Row.prototype.anyNull = function() {
  if (this._values) {
    var anyNull = this._values.some(function(item) {
      return item === null;
    });

    return Promise.resolve(anyNull);
  } else {
    var args = {
      target: this,
      method: 'anyNull',
      returnType: Boolean
    };

    return Utils.generate(args);
  }
};

/**
 * Returns the value at position index.
 * @param index
 * @returns {object}
 */
Row.prototype.apply = function(index) {
  if (this._values) {
    // TODO: index check
    return Promise.resolve(this._values[index]);
  } else {
    var args = {
      target: this,
      method: 'apply',
      args: Utils.wrapArguments(arguments),
      returnType: Object,
      resolver: _resolveObj
    };

    return Utils.generate(args);
  }
};

/**
 * Make a copy of the current Row object
 * @returns {module:eclairjs/sql.Row}
 */
Row.prototype.copy = function() {
  if (this._values) {
    return new Row(this._values, this._schema);
  } else {
    var args = {
      target: this,
      method: 'copy',
      returnType: Row
    };

    return Utils.generate(args);
  }
};

/**
 * compares object obj to this Row object
 * @param {object} obj
 * @returns {boolean}
 */
Row.prototype.equals = function(obj) {
  if (this._values) {
    return Promise.resolve(areTwoRowsEqual(this, obj));
  } else {
    var args = {
      target: this,
      method: 'equals',
      args: Utils.wrapArguments(arguments),
      returnType: Boolean
    };

    return Utils.generate(args);
  }
};

Row.prototype._fieldIndex = function(name) {
  var index = -1;

  this._schema.fields.some(function(field, i) {
    if (field.name === name) {
      index = i;
      return true;
    } else {
      return false;
    }
  });

  if (index >= 0) {
    return index;
  } else {
    throw new Error('field "'+name+'" does not exist');
  }
};

/**
 * Returns the index of a given field name.
 * @param {string} name
 * @returns {integer}
 */
Row.prototype.fieldIndex = function(name) {
  if (this._values) {
    if (this._schema) {
      var index = this._fieldIndex(name);
      return Promise.resolve(index);
    } else {
      throw new Error('fieldIndex on a Row without a schema is undefined');
    }
  } else {
    var args = {
      target: this,
      method: 'fieldIndex',
      args: Utils.wrapArguments(arguments),
      returnType: Number
    };

    return Utils.generate(args);
  }
};

/**
 * Returns the value at position index.
 * @param {integer} index
 * @returns {object}
 */
Row.prototype.get = function(index) {
  if (this._values) {
    if (this._values.length > index) {
      return Promise.resolve(this._values[index]);
    } else {
      throw new Error('index is out of bounds');
    }
  } else {
    var args = {
      target: this,
      method: 'get',
      args: Utils.wrapArguments(arguments),
      returnType: Object,
      resolver: _resolveObj
    };

    return Utils.generate(args);
  }
};

/**
 * Returns the value at position index as a primitive boolean.
 * @param {integer} index
 * @returns {boolean}
 */
Row.prototype.getBoolean = function(index) {
  if (this._values) {
    if (this._values.length > index) {
      var type = this._schema.fields[index];
      if (type.dataType === 'boolean') {
        return Promise.resolve(this._values[index]);
      } else {
        throw new Error('the type for index '+index+' is not a Boolean');
      }
    } else {
      throw new Error('index is out of bounds');
    }
  } else {
    var args = {
      target: this,
      method: 'getBoolean',
      args: Utils.wrapArguments(arguments),
      returnType: Boolean
    };

    return Utils.generate(args);
  }
};

/**
 * Returns the value at position idex as a primitive byte.
 * @param {integer} index
 * @returns {byte}
 * @ignore
 */
/* Not applicable to JavaScript
Row.prototype.getByte = function(index) {

  throw {name:'NotImplementedException', message:'The method is not implemented for JavaScript'};
};
*/

/**
 * Returns the value at position index of type as Date.
 * @param {integer} index
 * @returns {module:eclairjs/sql.SqlDate}
 */
Row.prototype.getDate = function(index) {
  var SqlDate = require('./SqlDate.js')(this.kernelP);

  if (this._values) {
    if (this._values.length > index) {
      var type = this._schema.fields[index];
      if (type.dataType === 'date') {
        return new SqlDate(this._values[index]);
      } else {
        throw new Error('the type for index '+index+' is not a Date');
      }
    } else {
      throw new Error('index is out of bounds');
    }
  } else {
    var args = {
      target: this,
      method: 'getDate',
      args: Utils.wrapArguments(arguments),
      returnType: SqlDate
    };

    return Utils.generate(args);
  }
};

/**
 * Returns the value at position index of type as decimal.
 * @param {integer} index
 * @returns {decimal}
 * @ignore
 */
/* Not applicable to JavaScript
Row.prototype.getDecimal = function(index) {

  throw {name:'NotImplementedException', message:'The method is not implemented for JavaScript'};
};
*/

/**
 * Returns the value at position index of type as double.
 * @param {integer} index
 * @returns {double}
 */
Row.prototype.getDouble = function(index) {
  if (this._values) {
    if (this._values.length > index) {
      var type = this._schema.fields[index];
      if (type.dataType === 'double') {
        return Promise.resolve(this._values[index]);
      } else {
        throw new Error('the type for index ' + index + ' is not a Double');
      }
    } else {
      throw new Error('index is out of bounds');
    }
  } else {
    var args = {
      target: this,
      method: 'getDouble',
      args: Utils.wrapArguments(arguments),
      returnType: Number
    };

    return Utils.generate(args);
  }
};

/**
 * Returns the value at position index of type as float.
 * @param {integer} index
 * @returns {float}
 */
Row.prototype.getFloat = function(index) {
  // Double is float
  if (this._values) {
    if (this._values.length > index) {
      var type = this._schema.fields[index];
      if (type.dataType === 'double') {
        return Promise.resolve(this._values[index]);
      } else {
        throw new Error('the type for index ' + index + ' is not a Double');
      }
    } else {
      throw new Error('index is out of bounds');
    }
  } else {
    var args = {
      target: this,
      method: 'getFloat',
      args: Utils.wrapArguments(arguments),
      returnType: Number
    };

    return Utils.generate(args);
  }
};

/**
 * Returns the value at position index of type as integer.
 * @param {integer} index
 * @returns {integer}
 */
Row.prototype.getInt = function(index) {
  if (this._values) {
    if (this._values.length > index) {
      var type = this._schema.fields[index];
      if (type.dataType === 'integer') {
        return Promise.resolve(this._values[index]);
      } else {
        throw new Error('the type for index ' + index + ' is not a Integer');
      }
    } else {
      throw new Error('index is out of bounds');
    }
  } else {
    var args = {
      target: this,
      method: 'getInt',
      args: Utils.wrapArguments(arguments),
      returnType: Number
    };

    return Utils.generate(args);
  }
};

/**
 * Returns the value at position index of type as long.
 * @param {integer} index
 * @returns {long}
 * @ignore
 */
/* Not applicable to JavaScript
Row.prototype.getLong = function(index) {

  throw {name:'NotImplementedException', message:'The method is not implemented for JavaScript'};
};
*/

/**
 * Returns the value at position index of type as short.
 * @param {integer} index
 * @returns {short}
 * @ignore
 */
/* Not applicable to JavaScript
Row.prototype.getShort = function(index) {

  throw {name:'NotImplementedException', message:'The method is not implemented for JavaScript'};
};
*/

/**
 * Returns the value at position index of type as String.
 * @param {integer} index
 * @returns {String}
 */
Row.prototype.getString = function(index) {
  if (this._values) {
    if (this._values.length > index) {
      var type = this._schema.fields[index];
      if (type.dataType === 'string') {
        return Promise.resolve(this._values[index]);
      } else {
        throw new Error('the type for index ' + index + ' is not a String');
      }
    } else {
      throw new Error('index is out of bounds');
    }
  } else {
    var args = {
      target: this,
      method: 'getString',
      args: Utils.wrapArguments(arguments),
      returnType: String
    };

    return Utils.generate(args);
  }
};

/**
 * Returns the value at position index of struct type as a Row object.
 * @param {integer} index
 * @returns {module:eclairjs/sql.Row}
 */
Row.prototype.getStruct = function(index) {
  throw "not implemented by ElairJS";
/*
  var args = {
    target: this,
    method: 'getStruct',
    args: Utils.wrapArguments(arguments),
    returnType: Row
  };

  return Utils.generate(args);
*/
};

/**
 * Returns the value at position index of date type as Date.
 * @param {integer} index
 * @returns {module:eclairjs/sql.SqlTimestamp}
 */
Row.prototype.getTimestamp = function(index) {
  var SqlTimestamp = require('./SqlTimestamp.js')(this.kernelP);

  if (this._values) {
    if (this._values.length > index) {
      var type = this._schema.fields[index];
      if (type.dataType === 'timestamp') {
        return new SqlTimestamp(this._values[index]);
      } else {
        throw new Error('the type for index ' + index + ' is not a Timestamp');
      }
    } else {
      throw new Error('index is out of bounds');
    }
  } else {
    var args = {
      target: this,
      method: 'getTimestamp',
      args: Utils.wrapArguments(arguments),
      returnType: SqlTimestamp
    };

    return Utils.generate(args);
  }
};

/**
 * Returns hash code
 * @returns {int}
 */
Row.prototype.hashCode = function() {
  if (this._values) {
    var hashCode = 0;

    // TODO: I think this is correct?  Needs to be verified
    this._values.forEach(function(value) {
      var hash = 0;
      var s = value.toString();

      for (var i = 0; i < s.length; i++) {
        hash = (((hash << 5) - hash) + s.charCodeAt(i)) & 0xFFFFFFFF;
      }

      hashCode += hash;
    });

    return Promise.resolve(hashCode);
  } else {
    var args = {
      target: this,
      method: 'hashCode',
      returnType: Number
    };

    return Utils.generate(args);
  }
};

/**
 * Checks whether the value at position index is null.
 * @param {integer} index
 * @returns {boolean}
 */
Row.prototype.isNullAt = function(index) {
  if (this._values) {
    return Promise.resolve(this._values[index] === null);
  } else {
    var args = {
      target: this,
      method: 'isNullAt',
      args: Utils.wrapArguments(arguments),
      returnType: Boolean
    };

    return Utils.generate(args);
  }
};

/**
 * Number of elements in the Row.
 * @returns {integer}
 */
Row.prototype.length = function() {
  if (this._values) {
    return Promise.resolve(this._values.length);
  } else {
    var args = {
      target: this,
      method: 'length',
      returnType: Number
    };

    return Utils.generate(args);
  }
};

/**
 * Displays all elements of this traversable or iterator in a string using start, end, and separator strings.
 * @param {string} [separator]
 * @param {string} [start] start will be ignored if end parameter is not specified
 * @param {string} [end] Required if start specified
 * @returns {string}
 */
Row.prototype.mkString = function() {
  if (this._values) {
    var str = '';
    var args = arguments;

    if (args.length == 3) {
      str += args[0];
    }

    this._values.forEach(function(value, i, values) {
      str += value;

      if (i < values.length-1) {
        if (args.length == 1) {
          str += args[0];
        } else if (args.length == 3) {
          str += args[1];
        }
      }
    });

    if (args.length == 3) {
      str += arguments[2];
    }

    return Promise.resolve(str);
  } else {
    var args = {
      target: this,
      method: 'mkString',
      args: Utils.wrapArguments(arguments),
      returnType: String
    };

    return Utils.generate(args);
  }
};

/**
 * Schema for the row.
 * @returns {module:eclairjs/sql/types.StructType}
 */
Row.prototype.schema = function() {
  var StructType = require('./types/StructType.js')(this.kernelP);

  if (this._values) {
    var StructField = require('./types/StructField.js')(this.kernelP);
    var Metadata = require('./types/Metadata.js')(this.kernelP);
    var DataTypes = require('./types/DataTypes.js')(this.kernelP);

    var fields = [];

    this._schema.fields.forEach(function(field) {
      var dt;

      // TODO: make this easier, perhaps a method in datatypes?
      switch(field.dataType) {
        case 'boolean':
          dt = DataTypes.BooleanType;
          break;

        case 'date':
          dt = DataTypes.DateType;
          break;

        case 'double':
          dt = DataTypes.DoubleType;
          break;

        case 'float':
          dt = DataTypes.FloatType;
          break;

        case 'integer':
          dt = DataTypes.IntegerType;
          break;

        case 'timestamp':
          dt = DataTypes.TimestampType;
          break;

        case 'string':
          dt = DataTypes.StringType;
          break;
      }

      fields.push(new StructField(field.name, dt, field.nullable, Metadata.empty()));
    });

    return new StructType(fields);
  } else {
    var args = {
      target: this,
      method: 'schema',
      returnType: StructType
    };

    return Utils.generate(args);
  }
};

/**
 * Number of elements in the Row.
 * @returns {integer}
 */
Row.prototype.size = function() {
  if (this._values) {
    return Promise.resolve(this._values.length);
  } else {
    var args = {
      target: this,
      method: 'size',
      returnType: Number
    };

    return Utils.generate(args);
  }
};

Row.moduleLocation = '/sql/Row';

module.exports = Row;