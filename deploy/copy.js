var fs = require('fs-extra');

module.exports = exports = function (src, out) {
	try {
	  fs.copySync(src, out);
	  console.log(src + " copied to " + out);
	} catch (err) {
	  console.error(err);
	}
};  
