var fs = require('fs-extra');
var addNormalizeCss = require('./normalizeCss');
var addDependencies = require('./depMin');

function copy(src, out) {
	fs.copy(src, out, function (err) {
	  if (err) return console.error(err);
	});
}

module.exports = exports = function () {
	copy('./offline', './dist/');
	addNormalizeCss();
	addDependencies();
}; 
