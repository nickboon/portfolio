/* https://github.com/neocities/neocities-node */

function prompt(request, callback) {
    var stdin = process.stdin;
    var stdout = process.stdout;

    stdin.resume();
    stdout.write(request);
    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

function deploy(password) {
	var NeoCities = require('neocities');
	var api = new NeoCities('nickboon', password);

	api.upload([
			{name: 'test/test.html', path: 'dist/index.html'},
			{name: 'test/css/normalize.css', path: 'dist/css/normalize.css'},
			{name: 'test/css/style.css', path: 'dist/css/style.css'},
			{name: 'test/swalow.gif', path: 'dist/swallow.gif'}
		], function(response) {
			console.log(response);
			process.exit();			
		}
	);
}

prompt('Please enter password: ', function (input) {
    deploy(input);
});


