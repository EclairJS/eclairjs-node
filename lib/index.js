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
        LogisticRegressionModel: require('./mllib/classification/LogisticRegressionModel.js')(kernelP),
        LogisticRegressionWithLBFGS: require('./mllib/classification/LogisticRegressionWithLBFGS.js')(kernelP),
        LogisticRegressionWithSGD: require('./mllib/classification/LogisticRegressionWithSGD.js')(kernelP),
        NaiveBayes: require('./mllib/classification/NaiveBayes.js')(kernelP),
        SVMWithSGD: require('./mllib/classification/SVMWithSGD.js')(kernelP)
      },

      clustering: {
        BisectingKMeans: require('./mllib/clustering/BisectingKMeans.js')(kernelP),
        KMeans: require('./mllib/clustering/KMeans.js')(kernelP),
        LDA: require('./mllib/clustering/LDA.js')(kernelP),
        PowerIterationClustering: require('./mllib/clustering/PowerIterationClustering.js')(kernelP)
      },

      evaluation: {
        BinaryClassificationMetrics: require('./mllib/evaluation/BinaryClassificationMetrics.js')(kernelP),
        MulticlassMetrics: require('./mllib/evaluation/MulticlassMetrics.js')(kernelP),
        RankingMetrics: require('./mllib/evaluation/RankingMetrics.js')(kernelP),
        RegressionMetrics: require('./mllib/evaluation/RegressionMetrics.js')(kernelP)
      },

      feature: {
        Word2Vec: require('./mllib/feature/Word2Vec.js')(kernelP)
      },

      fpm: {
        AssociationRules: require('./mllib/fpm/AssociationRules.js')(kernelP),
        FPGrowth: require('./mllib/fpm/FPGrowth.js')(kernelP),
        PrefixSpan: require('./mllib/fpm/PrefixSpan.js')(kernelP)
      },

      linalg: {
        distributed: {
          RowMatrix: require('./mllib/linalg/distributed/RowMatrix.js')(kernelP)
        },
        DenseVector: require('./mllib/linalg/DenseVector.js')(kernelP),
        Vectors: require('./mllib/linalg/Vectors.js')(kernelP)
      },

      optimization: {
        LBFGS: require('./mllib/optimization/LBFGS.js')(kernelP),
        LogisticGradient: require('./mllib/optimization/LogisticGradient.js')(kernelP),
        SquaredL2Updater: require('./mllib/optimization/SquaredL2Updater.js')(kernelP)
      },

      random: {
        RandomRDDs: require('./mllib/random/RandomRDDs.js')(kernelP)
      },

      recommendation: {
        ALS: require('./mllib/recommendation/ALS.js')(kernelP)
      },

      regression: {
        IsotonicRegression: require('./mllib/regression/IsotonicRegression.js')(kernelP),
        LabeledPoint: require('./mllib/regression/LabeledPoint.js')(kernelP),
        LinearRegressionWithSGD: require('./mllib/regression/LinearRegressionWithSGD.js')(kernelP)
      },

      tree: {
        configuration: {
          BoostingStrategy: require('./mllib/tree/configuration/BoostingStrategy.js')(kernelP)
        },
        DecisionTree: require('./mllib/tree/DecisionTree.js')(kernelP),
        GradientBoostedTrees: require('./mllib/tree/GradientBoostedTrees.js')(kernelP),
        RandomForest: require('./mllib/tree/RandomForest.js')(kernelP)
      },

      util: {
        MLUtils: require('./mllib/util/MLUtils.js')(kernelP)
      }
    },

    rdd: {
      FloatRDD: require('./rdd/FloatRDD.js'),
      PairRDD: require('./rdd/PairRDD.js')
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
      Duration: require('./streaming/Duration.js')(kernelP)
    },

    List: require('./List.js'),
    Tuple: require('./Tuple.js')(kernelP)
  }
}

module.exports = new EclairJS();