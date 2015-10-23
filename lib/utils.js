var Utils = {};

Utils.processTemplate = function(templateStr, replacements) {
  //return templateStr.replace(/\$[a-zA-Z0-9]*/g, function(match) {
  return templateStr.replace(/\{\{[a-zA-Z0-9]*\}\}/g, function(match) {
    var replacementId = match.substr(2, match.length-4)
    return replacements[replacementId];
  })
};

module.exports = Utils;