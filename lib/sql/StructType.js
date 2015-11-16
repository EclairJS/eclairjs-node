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

/**
 * @classdesc For a StructType object, one or multiple StructFields can be extracted by names. If multiple StructFields are extracted, a StructType object will be returned. If a provided name does not have a matching field, it will be ignored.
 * @constructor
 */
function StructType(kernelP, refIdP, fields) {
  this.kernelP = kernelP;
  this.refIdP = refIdP;

  this.fields = fields;
};

module.exports = StructType;

