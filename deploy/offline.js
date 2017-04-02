var copy = require('./copy');
var addNormalizeCss = require('./addNormalizeCss');
var addDependencies = require('./depMin');

module.exports = exports = function () {
	copy('./offline', './dist');
	addNormalizeCss();
	addDependencies();
}; 
