var copy = require('./copy');
var deployOffline = require('./offline');
var addDependencies = require('./depMin');
var deployToWeb = require('./online');
var argument = process.argv[2]; 
var testLabel = 'test';

console.log('deploying to ' + argument + '...');
copy('./js/portfolio.js', './dist/js/portfolio.js');
copy('./css', './dist/css');
copy('./fonts', './dist/fonts');
copy('./swallow.gif', './dist/swallow.gif');

switch (argument) {
	case "offline":
		deployOffline();
		break;
	case "local":
		addDependencies();
		break;
	case "test":
		addDependencies();
		deployToWeb(testLabel);
		break;
}
