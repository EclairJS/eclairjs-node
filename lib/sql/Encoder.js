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

module.exports = function(kernelP) {
  return (function() {
    var Utils = require('../utils.js');

    var gKernelP = kernelP;

    /**
     * @classdesc
     * :: Experimental ::
     * Used to convert a JVM object of type `T` to and from the internal Spark SQL representation.
     *
     * == Scala ==
     * Encoders are generally created automatically through implicits from a `SparkSession`, or can be
     * explicitly created by calling static methods on {@link Encoders}.
     *
     * @example
     *   import spark.implicits._
     *
     *   val ds = Seq(1, 2, 3).toDS() // implicitly provided (spark.implicits.newIntEncoder)
     *
     *
     * == Java ==
     * Encoders are specified by calling static methods on {@link Encoders}.
     *
     * @example
     *   List<String> data = Arrays.asList("abc", "abc", "xyz");
     *   Dataset<String> ds = context.createDataset(data, Encoders.STRING());
     *
     *
     * Encoders can be composed into tuples:
     *
     * @example
     *   Encoder<Tuple2<Integer, String>> encoder2 = Encoders.tuple(Encoders.INT(), Encoders.STRING());
     *   List<Tuple2<Integer, String>> data2 = Arrays.asList(new scala.Tuple2(1, "a");
     *   Dataset<Tuple2<Integer, String>> ds2 = context.createDataset(data2, encoder2);
     *
     *
     * Or constructed from Java Beans:
     *
     * @example
     *   Encoders.bean(MyClass.class);
     *
     *
     * == Implementation ==
     *  - Encoders are not required to be thread-safe and thus they do not need to use locks to guard
     *    against concurrent access if they reuse internal buffers to improve performance.
     *
     * @since EclairJS 0.7 Spark  1.6.0
     * @class
     * @memberof module:eclairjs/sql
     */

    function Encoder() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    /**
     *  Returns the schema of encoding this type of object as a Row.
     * @returns {StructType}
     */
    Encoder.prototype.schema = function() {
      var StructType = require('types/StructType');

      var args = {
        target: this,
        method: 'schema',
        returnType: StructType
      };

      return Utils.generate(args);
    };

    /**
     *  A ClassTag that can be used to construct and Array to contain a collection of `T`.
     * @returns {ClassTag}
     */
    Encoder.prototype.clsTag = function() {
      throw "not implemented by ElairJS";
    };

    return Encoder;
  })();
};