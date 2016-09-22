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

/**
 * ML classification module
 * @module eclairjs/ml/classification
 */
module.exports = function(kernelP) {
  return {
    DecisionTreeClassifier: require('./DecisionTreeClassifier')(kernelP),
    GBTClassifier: require('./GBTClassifier')(kernelP),
    LogisticRegression: require('./LogisticRegression')(kernelP),
    LogisticRegressionModel: require('./LogisticRegressionModel')(kernelP),
    LogisticRegressionTrainingSummary: require('./LogisticRegressionTrainingSummary')(kernelP),
    MultilayerPerceptronClassificationModel: require('./MultilayerPerceptronClassificationModel')(kernelP),
    MultilayerPerceptronClassifier: require('./MultilayerPerceptronClassifier')(kernelP),
    NaiveBayesModel: require('./NaiveBayesModel')(kernelP),
    NaiveBayes: require('./NaiveBayes')(kernelP),
    OneVsRest: require('./OneVsRest')(kernelP),
    OneVsRestModel: require('./OneVsRestModel')(kernelP),
    RandomForestClassificationModel: require('./RandomForestClassificationModel')(kernelP),
    RandomForestClassifier: require('./RandomForestClassifier')(kernelP)
  };
};
