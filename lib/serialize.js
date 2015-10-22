var bs = require('browserify-string');

function serializeFunction(func, opts) {
  /*
  return new Promise(function(resolve, reject) {
    var funcStr = "EXPORTEDFUNCTION=" + func.toString();

    var bsOpts = {};

    if (opts && opts.baseDir) {
      bsOpts.basedir = opts.baseDir;
    }

    bs(funcStr, bsOpts).bundle(function(err, src) {
      if (err) {
        reject(err);
      } else {
        var finalStr = src + '';
        resolve(JSON.stringify(finalStr));
      }
    });
  });
  */
  return Promise.resolve(func.toString());
};

module.exports.serializeFunction = serializeFunction
