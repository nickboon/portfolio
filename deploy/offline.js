var fs = require('fs-extra');

module.exports = exports = function () {
	fs.copy('./offline', './dist/', function (err) {
		if (err) return console.error(err)
	});
}; 
