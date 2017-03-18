var copy = require('./copy');
var addNormalizeCss = require('./normalizeCss');
var addDependencies = require('./depMin');

module.exports = exports = function () {
	copy('./offline', './dist');
	addNormalizeCss();
	addDependencies();
}; 
