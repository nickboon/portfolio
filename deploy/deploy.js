var fs = require('fs-extra');
var deployOffline = require('./offline');
var argument = process.argv[2]; 

function copy(src, out) {
	fs.copy(src, out, function (err) {
	  if (err) return console.error(err)
	});
}

// Todo: move json build to build dir and copy all of ./js/ here 
copy('./js/portfolio.js', './dist/js/portfolio.js');
copy('./css', './dist/css');
copy('./fonts', './dist/fonts/');
copy('./swallow.gif', './dist/swallow.gif');

switch (argument) {
	case "offline":
		deployOffline();
		break;
}
