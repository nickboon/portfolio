var fs = require('fs');
var path = process.argv[2];
var filename = process.argv[3];
var image = require(path);

image.thumbnailUrl = "thumbnail/" + filename;
fs.writeFileSync(
	path,
	JSON.stringify(image, null, 2),
	{encoding:'utf8'}
);

