var srcPath = process.argv[2] || './src.json'; 
var outPath = process.argv[3] || './index.json';
var pathSeperator = require('path').sep;
var root = srcPath.substr(0, srcPath.lastIndexOf(pathSeperator) + 1);
var src = require(srcPath);

function buildLightboxCaption(image) {
	return "" + 
		(image.collection ? image.collection + " " : "") + 
		(image.title ? '<em>' + image.title + '</em>' : '') + 
		(image.medium ? ', ' + image.medium : '') + 
		(image.dimensions ? ', ' + image.dimensions : '') + 
		(image.edition ? ', ' + image.edition : '') + 
		(image.author ? ', ' + image.author : '') + 
		(image.date ? ', ' + image.date : '') + 
		".";
}

function fetchImages(urls, collection) {
	return urls.map(function (url) {
		var image = require(root + url);
		image.collection = collection;
		image.lightboxCaption = buildLightboxCaption(image);
		return image;
	});
}

function fetchCollections(urls) {
	return urls.map(function (url) {
		var collection = require(root + url);
		collection.images = fetchImages(collection.images, collection.title);
		return collection;  
	});	
}

function write(name, content) {
	var fs = require('fs');
	fs.writeFileSync(name, content, {encoding:'utf8'});	
}

src.images = fetchImages(src.images);
src.collections = fetchCollections(src.collections);
write(outPath, JSON.stringify(src));
