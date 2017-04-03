var pathToRoot = '../';
var srcPath = pathToRoot + process.argv[2] || './src.json'; 
var outPath = process.argv[3] || './index.json';
var pathSeperator = require('path').sep;
var asssemblyRoot = srcPath.substr(0, srcPath.lastIndexOf(pathSeperator) + 1);
var collectionAssembler = require('./collectionAssembler');
var imageAssembler = require('./imageAssembler');
var fetcher = require('./fetcher').create(asssemblyRoot);	
var src = require(srcPath);

function write(path, content) {
	var fs = require('fs');
	fs.writeFileSync(path, content, {encoding:'utf8'});	
}

function imageProcess(image, imageSet) {
	return imageAssembler.pipe(image)
	.withImageSet(imageSet)
	.withCaption()
	.withUndefinedThumbnailUrlSetToUrl()
	.output;
}

function collectionProcess(collection, level) {
	return collectionAssembler.pipe(collection, level)
	.withImages(imageProcess, fetcher)
	// Used in html templating
	.withCssIdentifiers()
	.withHtmlHeaders()
	.withCollectionDelimiters()
	// Required for mustache js templating
	.withUndefinedPropertiesInitialized()
	.withEmptyLinksClass()
	.output;				
}

var json = collectionAssembler.assemble(src, collectionProcess, fetcher); 
write(outPath, JSON.stringify(json, null, 2));
