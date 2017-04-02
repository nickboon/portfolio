var copy = require('./copy');

module.exports = exports = function () {
	copy('./node_modules/normalize.css/normalize.css', './dist/css/normalize.css');
}; 
