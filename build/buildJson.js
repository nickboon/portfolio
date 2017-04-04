var pathSeperator = require('path').sep;
var pathToRoot = '..' + pathSeperator;
var workingDirectoryPath = '.' + pathSeperator;
var srcPath = pathToRoot + process.argv[2] || workingDirectoryPath + 'src.json'; 
var outPath = process.argv[3] || workingDirectoryPath + 'index.json';
var asssemblyRoot = srcPath.substr(0, srcPath.lastIndexOf(pathSeperator) + 1);
var collectionAssembler = require(workingDirectoryPath + 'collectionAssembler');
var imageAssembler = require(workingDirectoryPath + 'imageAssembler');
var fetcher = require(workingDirectoryPath + 'fetcher').create(asssemblyRoot);	
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
	.output;				
}

var json = collectionAssembler.assemble(src, collectionProcess, fetcher); 
write(outPath, JSON.stringify(json, null, 2));
