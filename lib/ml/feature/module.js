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
 * ML feature module
 * @module eclairjs/ml/feature
 */
module.exports = function(kernelP) {
  return {
    Binarizer: require('./Binarizer')(kernelP),
    Bucketizer: require('./Bucketizer')(kernelP),
    ChiSqSelector: require('./ChiSqSelector')(kernelP),
    ChiSqSelectorModel: require('./ChiSqSelectorModel')(kernelP),
    CountVectorizer: require('./CountVectorizer')(kernelP),
    CountVectorizerModel: require('./CountVectorizerModel')(kernelP),
    DCT: require('./DCT')(kernelP),
    ElementwiseProduct: require('./ElementwiseProduct')(kernelP),
    IndexToString: require('./IndexToString')(kernelP),
    StringIndexer: require('./StringIndexer')(kernelP),
    StringIndexerModel: require('./StringIndexerModel')(kernelP),
    VectorIndexer: require('./VectorIndexer')(kernelP),
    VectorIndexerModel: require('./VectorIndexerModel')(kernelP)
  };
};