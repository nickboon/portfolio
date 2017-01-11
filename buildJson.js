var srcPath = process.argv[2] || './src.json'; 
var outPath = process.argv[3] || './index.json';
var pathSeperator = require('path').sep;
var src = require(srcPath);
var root = srcPath.substr(0, srcPath.lastIndexOf(pathSeperator) + 1);
var assembler = require('./dataAssembler').setRoot(root);
var collection = require('./collectionData');

function write(path, content) {
	var fs = require('fs');
	fs.writeFileSync(path, content, {encoding:'utf8'});	
}

write(outPath, JSON.stringify(collection.assembledFrom(src, assembler)));
