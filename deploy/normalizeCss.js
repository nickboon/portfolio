var fs = require('fs-extra');
function copy(src, out) {
	fs.copy(src, out, function (err) {
	  if (err) return console.error(err);
	});
}

module.exports = exports = function () {
	copy('./node_modules/normalize.css/normalize.css', './dist/css/normalize.css');
}; 
