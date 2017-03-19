var readlineSync = require('readline-sync');
var glob = require("glob");
var distDir = './dist/';
var distGlob = distDir + '**/*';  
var options = {
	'nodir': true,
	'ignore': distGlob + '.min.map' 
};
var deploy = require('./neocities');

module.exports = exports = function (label) {
	if(!label)
		throw 'No label submitted for deployment.';
 	
	var username = readlineSync.question('Please enter username: ');
	var password = readlineSync.question('Please enter password: ', {
		hideEchoBack: true 
	});

	glob(distGlob, options, function (err, files) {
		if (err) return console.error(err);
		deploy(distDir, files, username, password, label);
	});	
}; 
