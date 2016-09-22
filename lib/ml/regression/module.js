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
 * ML regression module
 * @module eclairjs/ml/regression
 */
module.exports = function(kernelP) {
  return {
    AFTSurvivalRegression: require('./AFTSurvivalRegression.js')(kernelP),
    AFTSurvivalRegressionModel: require('./AFTSurvivalRegressionModel.js')(kernelP),
    DecisionTreeRegressionModel: require('./DecisionTreeRegressionModel.js')(kernelP),
    DecisionTreeRegressor: require('./DecisionTreeRegressor.js')(kernelP),
    GBTRegressionModel: require('./GBTRegressionModel.js')(kernelP),
    GBTRegressor: require('./GBTRegressor.js')(kernelP),
    GeneralizedLinearRegression: require('./GeneralizedLinearRegression.js')(kernelP),
    GeneralizedLinearRegressionModel: require('./GeneralizedLinearRegressionModel.js')(kernelP),
    GeneralizedLinearRegressionSummary: require('./GeneralizedLinearRegressionSummary.js')(kernelP),
    GeneralizedLinearRegressionTrainingSummary: require('./GeneralizedLinearRegressionTrainingSummary.js')(kernelP),
    LinearRegression: require('./LinearRegression.js')(kernelP),
    LinearRegressionModel: require('./LinearRegressionModel.js')(kernelP),
    LinearRegressionSummary: require('./LinearRegressionSummary.js')(kernelP),
    LinearRegressionTrainingSummary: require('./LinearRegressionTrainingSummary.js')(kernelP),
    RandomForestRegressionModel: require('./RandomForestRegressionModel.js')(kernelP),
    RandomForestRegressor: require('./RandomForestRegressor.js')(kernelP),
    RegressionModel: require('./RegressionModel.js')()
  };
};
