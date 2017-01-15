var srcPath = process.argv[2] || './src.json'; 
var outPath = process.argv[3] || './index.json';
var collection = require(srcPath);
var pathSeperator = require('path').sep;
var root = srcPath.substr(0, srcPath.lastIndexOf(pathSeperator) + 1);
var fetcher = require('./fetcher').create(root);
var assembler = require('./collectionAssembler').setFetcher(fetcher);

function write(path, content) {
	var fs = require('fs');
	fs.writeFileSync(path, content, {encoding:'utf8'});	
}
write(outPath, JSON.stringify(assembler.assembled(collection), null, 2));
