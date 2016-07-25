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

var wordcount = require('./wordcount');
var express = require('express');
var app = express();

app.use(express.static('public'));

var wc = new wordcount();

app.get('/doWordCount', function (req, res) {
  wc.do(function(err, result) {
    if (err) {
      res.status(500).send({error: err.msg});
    } else {
      res.json({result: result});
    }
  });
});

var server = app.listen(3000, 'localhost', function () {
});

process.on('SIGINT', function() {
  if (wc) {
    wc.stop(function() {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
