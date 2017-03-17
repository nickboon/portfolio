var fs = require('fs-extra');
var deployOffline = require('./offline');
var addDependencies = require('./depMin');
var argument = process.argv[2]; 

function copy(src, out) {
	fs.copy(src, out, function (err) {
	  if (err) return console.error(err);
	});
}

copy('./js/portfolio.js', './dist/js/portfolio.js');
copy('./css', './dist/css');
copy('./fonts', './dist/fonts');

switch (argument) {
	case "offline":
		deployOffline();
		break;
	case "local":
		addDependencies();
		break;
}
