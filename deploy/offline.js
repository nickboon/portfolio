var fs = require('fs-extra');
function copy(src, out) {
	fs.copy(src, out, function (err) {
	  if (err) return console.error(err);
	});
}

module.exports = exports = function () {
	copy('./offline', './dist/');
	copy('./images', './dist/lib/images');
}; 
