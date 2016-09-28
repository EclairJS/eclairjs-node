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
    var Utils = require('../../utils.js');

    var gKernelP = kernelP;

    /**
     * Compute gradient and loss for a multinomial logistic loss function, as used in multi-class classification (it is also used in binary logistic regression).
     * In The Elements of Statistical Learning: Data Mining, Inference, and Prediction, 2nd Edition by Trevor Hastie, Robert Tibshirani, and Jerome Friedman,
     * which can be downloaded from http://statweb.stanford.edu/~tibs/ElemStatLearn/ , Eq. (4.17) on page 119 gives the formula of multinomial
     * logistic regression model. A simple calculation shows that
     * @example
     * P(y=0|x, w) = 1 / (1 + \sum_i^{K-1} \exp(x w_i))
     * P(y=1|x, w) = exp(x w_1) / (1 + \sum_i^{K-1} \exp(x w_i))
     * ...
     * P(y=K-1|x, w) = exp(x w_{K-1}) / (1 + \sum_i^{K-1} \exp(x w_i))
     *
     * for K classes multiclass classification problem.
     * The model weights w = (w_1, w_2, ..., w_{K-1})^T becomes a matrix which has dimension of (K-1) * (N+1)
     * if the intercepts are added. If the intercepts are not added, the dimension will be (K-1) * N.
     * As a result, the loss of objective function for a single instance of data can be written as
     * @examples
     * l(w, x) = -log P(y|x, w) = -\alpha(y) log P(y=0|x, w) - (1-\alpha(y)) log P(y|x, w)
     * = log(1 + \sum_i^{K-1}\exp(x w_i)) - (1-\alpha(y)) x w_{y-1}
     * = log(1 + \sum_i^{K-1}\exp(margins_i)) - (1-\alpha(y)) margins_{y-1}
     *
     * where \alpha(i) = 1 if i != 0, and \alpha(i) = 0 if i == 0, margins_i = x w_i.
     * For optimization, we have to calculate the first derivative of the loss function, and a simple calculation shows that
     * @example
     * \frac{\partial l(w, x)}{\partial w_{ij}}
     * = (\exp(x w_i) / (1 + \sum_k^{K-1} \exp(x w_k)) - (1-\alpha(y)\delta_{y, i+1})) * x_j
     * = multiplier_i * x_j
     *
     * where \delta_{i, j} = 1 if i == j, \delta_{i, j} = 0 if i != j, and multiplier = \exp(margins_i) / (1 + \sum_k^{K-1} \exp(margins_i)) - (1-\alpha(y)\delta_{y, i+1})
     * If any of margins is larger than 709.78, the numerical computation of multiplier and loss function will be suffered from arithmetic overflow. This issue occurs when there are outliers in data which are far away from hyperplane, and this will cause the failing of training once infinity / infinity is introduced. Note that this is only a concern when max(margins) > 0.
     * Fortunately, when max(margins) = maxMargin > 0, the loss function and the multiplier can be easily rewritten into the following equivalent numerically stable formula.
     * @example
     * l(w, x) = log(1 + \sum_i^{K-1}\exp(margins_i)) - (1-\alpha(y)) margins_{y-1}
     * = log(\exp(-maxMargin) + \sum_i^{K-1}\exp(margins_i - maxMargin)) + maxMargin
     * - (1-\alpha(y)) margins_{y-1}
     * = log(1 + sum) + maxMargin - (1-\alpha(y)) margins_{y-1}
     *
     * where sum = \exp(-maxMargin) + \sum_i^{K-1}\exp(margins_i - maxMargin) - 1.
     * Note that each term, (margins_i - maxMargin) in \exp is smaller than zero; as a result, overflow will not happen with this formula.
     * For multiplier, similar trick can be applied as the following,
     * @example
     * multiplier = \exp(margins_i) / (1 + \sum_k^{K-1} \exp(margins_i)) - (1-\alpha(y)\delta_{y, i+1})
     * = \exp(margins_i - maxMargin) / (1 + sum) - (1-\alpha(y)\delta_{y, i+1})
     *
     * where each term in \exp is also smaller than zero, so overflow is not a concern.
     * For the detailed mathematical derivation, see the reference at http://www.slideshare.net/dbtsai/2014-0620-mlor-36132297
     *
     * @class
     * @memberof module:eclairjs/mllib/optimization
     * @constructor
     * @extends Gradient
     * @parm {integer} numClasses the number of possible outcomes for k classes classification problem in Multinomial
     * Logistic Regression. By default, it is binary logistic regression so numClasses will be set to 2.
     */
    function LogisticGradient() {
      Utils.handleConstructor(this, arguments, gKernelP);
    }

    LogisticGradient.moduleLocation = '/mllib/optimization/LogisticGradient';

    return LogisticGradient;
  })();
};