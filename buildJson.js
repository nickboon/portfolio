var srcPath = process.argv[2] || './src.json'; 
var outPath = process.argv[3] || './index.json';
var pathSeperator = require('path').sep;
var pathFromAssemblers = '../../';
var asssemblyRoot = pathFromAssemblers + srcPath.substr(0, srcPath.lastIndexOf(pathSeperator) + 1);
var collection = require(srcPath);
var fetcher = require('./js/jsonBuild/fetcher').create(asssemblyRoot);
var assembler = require('./js/jsonBuild/collectionAssembler').setFetcher(fetcher);
var json = assembler.assembledFromRootCollection(collection, srcPath);                                         

function write(path, content) {
	var fs = require('fs');
	fs.writeFileSync(path, content, {encoding:'utf8'});	
}

write(outPath, JSON.stringify(json, null, 2));
