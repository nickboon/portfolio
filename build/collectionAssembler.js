var fetcher;
var collectionArrays = [
	"images",
	"subcollections",
	"links"
];
var collectionStrings = [
	"title",
	"info"
];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function assemblyPipe(collection) {	
	return {	
		withFetcherId: function (url) {
			collection = fetcher.idAdded(collection, url);
			return this;
		},
			
		withLevel: function (level) {
			collection.level = level;
			return this;
		},
		
		withHtmlHeaders: function  (level) {
			if (!level) throw 'No level suplied to withHtlHeaders.';
			collection.htmlHeader = 'h' + ((level > 6) ? 6 : level);
			collection.htmlSubheader = 'h' + ((level > 5) ? 6 : level + 1);
			return this;
		},
		
		withSubcollectionsAssembledBy: function  (ofCollections, level) {
			if (collection.subcollections) collection.subcollections = fetcher
				.fetchedList(ofCollections, level, collection.subcollections);
			return this;			
		},
		
		withImages: function  () {
			var ofImages = require('./imageAssembler.js');
			if (collection.images) collection.images = fetcher
				.fetchedList(ofImages, collection.title, collection.images);
			return this;
		},
		
		withEmptyPropertiesIfUndefined: function () {
			collectionArrays.forEach(function (collectionArray) {
				if (!collection[collectionArray]) collection[collectionArray] = []; 
			});
			collectionStrings.forEach(function (collectionString) {
				if(collection[collectionString] === undefined) collection[collectionString] = "";				
			});
			return this;			
		},
				
		withEmptyLinksClass: function () {
			if(collection.links && collection.links.length < 1) collection.linksClass = "empty";
			return this;			
		},
				
		output: collection
	};
}

function assembled(src, owner, d) {
	if (!src || typeof src === 'string')
		throw 'No collection data to assemble.';	
		
	var level = owner ? owner + 1 : 1;
	var delimiters = d || {
		start : '[',
		end : ']'
	};
 			
	return assemblyPipe(src)
		.withSubcollectionsAssembledBy(this, level)
		.withImages()
		// for html templating  
		.withLevel(level)
		.withHtmlHeaders(level)
		// for mustache
		.withEmptyPropertiesIfUndefined()
		.withEmptyLinksClass()
		.output;
}

module.exports = {
	setFetcher: function (f) {
		if (f) fetcher = f;
		return this;
	},
	
	createAssemblyPipe: assemblyPipe,
			
	assembledFromRootCollection: function (collection, url) {
		var collectionWithNoId = this.assembled(collection); 
		return assemblyPipe(collectionWithNoId)
			.withFetcherId(url)
			.output;
	},	
			
	assembled: assembled
};

