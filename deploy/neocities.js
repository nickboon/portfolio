/* https://github.com/neocities/neocities-node */ 
var NeoCities = require('neocities');

function addTargets(distDir, files, site) {
	return files.map(function (path) {
		return {
			name: path.replace(distDir, site + '/'),
			path: path
		};
	});
}

module.exports = exports = function (distDir, files, username, password, site) {
	var api = new NeoCities(username, password);
	
	files = addTargets(distDir, files, site);	
	console.log('Deploying the following files to ' + username + 
		'.neocities.org/' + site + ': ');
	console.log(files);
	api.upload(files, function(response) {
		console.log(response);
		process.exit();			
	});
	
	api.info(function(response) {
		console.log(response);
	});
};
 

 
