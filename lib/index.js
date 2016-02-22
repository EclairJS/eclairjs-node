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

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
global.WebSocket = require('ws');

function EclairJS() {
  // SparkContext handles our Toree connection, so it returns an array of [ToreeKernelPromise, SparkContextClass]
  var result = require('./SparkContext.js')();

  var kernelP = result[0];

  return {
    SparkContext: result[1],

    AccumulableParam: require('./AccumulableParam.js')(kernelP),

    mllib: {
      classification: {
        LogisticRegressionWithLBFGS: require('./mllib/classification/LogisticRegressionWithLBFGS.js')(kernelP)
      },

      clustering: {
        BisectingKMeans: require('./mllib/clustering/BisectingKMeans.js')(kernelP)
      },

      evaluation: {
        BinaryClassificationMetrics: require('./mllib/evaluation/BinaryClassificationMetrics.js')(kernelP),
        RegressionMetrics: require('./mllib/evaluation/RegressionMetrics.js')(kernelP)
      },

      feature: {
        Word2Vec: require('./mllib/feature/Word2Vec.js')(kernelP)
      },

      fpm: {
        AssociationRules: require('./mllib/fpm/AssociationRules.js')(kernelP),
        FPGrowth: require('./mllib/fpm/FPGrowth.js')(kernelP)
      },

      linalg: {
        Vectors: require('./mllib/linalg/Vectors.js')(kernelP)
      },

      recommendation: {
        ALS: require('./mllib/recommendation/ALS.js')(kernelP)
      },

      regression: {
        LinearRegressionWithSGD: require('./mllib/regression/LinearRegressionWithSGD.js')(kernelP)
      },

      utils: {
        MLUtils: require('./mllib/util/MLUtils.js')(kernelP)
      }
    },

    SQLContext: require('./sql/SQLContext.js'),
    sql: {
      functions: require('./sql/functions.js')(kernelP)
    },

    storage: {
      StorageLevel: require('./storage/StorageLevel.js')(kernelP)
    },

    StreamingContext: require('./streaming/StreamingContext.js'),
    streaming: {
      KafkaUtils: require('./streaming/KafkaUtils.js'),
      Duration: require('./streaming/Duration.js')
    }
  }
}

module.exports = new EclairJS();