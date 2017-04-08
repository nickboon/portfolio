var copy = require('./copy');
var deployOffline = require('./offline');
var addDependencies = require('./depMin');
var deployToWeb = require('./online');
var deployment = process.argv[2]; 
var share = process.argv[3] || './';
var testLabel = 'test';

console.log('deploying to ' + deployment + '...');
copy('./js/portfolio.js', './dist/js/portfolio.js');
copy('./css', './dist/css');
copy('thumbnail', './dist/thumbnail');
copy(share + 'fonts', './dist/fonts');
copy(share + 'images/swallow.gif', './dist/swallow.gif');

switch (deployment) {
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
