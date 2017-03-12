var srcPath = process.argv[2] || './src.json'; 
var outPath = process.argv[3] || './index.json';
var pathSeperator = require('path').sep;
var root = srcPath.substr(0, srcPath.lastIndexOf(pathSeperator) + 1);
var collection = require(srcPath);
var fetcher = require('./fetcher').create(root);
var assembler = require('./collectionAssembler').setFetcher(fetcher);
var json = assembler.assembledFromRoot(collection, srcPath);                                         

function write(path, content) {
	var fs = require('fs');
	fs.writeFileSync(path, content, {encoding:'utf8'});	
}

write(outPath, JSON.stringify(json, null, 2));
