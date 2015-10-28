var wordcount = require('./wordcount');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/doWordCount', function (req, res) {
  new wordcount().do(function(err, result) {
    if (err) {
      res.status(500).send({error: err.msg});
    } else {
      res.json(result);
    }
  });
});

var server = app.listen(3000, 'localhost', function () {
});
