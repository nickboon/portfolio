var fetcher;
var collectionArrays = [
	"images",
	"links",
	"subcollections"
];
var collectionStrings = [
	"title",
	"info"
];


function assembledFrom(collection) {	
	return {	
		withFetcherId: function (url) {
			collection = fetcher.idAdded(collection, url);
			return this;
		},
			
		withLevel: function (owner) {
			collection.level = owner ? owner + 1 : 1; 
			return this;
		},
		
		withHtmlHeaders: function  () {
			collection.htmlHeader = collection.level < 7 ? "h" + collection.level : "h6";
			collection.htmlSubheader = collection.level < 6 ? 
				"h" + (collection.level + 1) : "h6";
			return this;
		},
		
		withSubcollectionsAssembledBy: function  (ofCollections) {
			if (collection.subcollections) collection.subcollections = fetcher
				.fetchedList(ofCollections, collection.level, collection.subcollections);
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
		
		result: collection		
	};
}

function assembled(src, owner) {
	if (!src || typeof src === 'string')
		throw 'No collection data to assemble.';		
	return assembledFrom(src)
		.withLevel(owner)
		.withHtmlHeaders()
		.withSubcollectionsAssembledBy(this)
		.withImages()
		// recursive mustache partials will enter an endless loop if no empty array.
		.withEmptyPropertiesIfUndefined()
		.withEmptyLinksClass()
		.result;
}

module.exports = {
	setFetcher: function (f) {
		if (f) fetcher = f;
		return this;
	},
			
	assembledFromRootCollection: function (collection, url) {
		var collectionWithNoId = this.assembled(collection); 
		return assembledFrom(collectionWithNoId)
			.withFetcherId(url)
			.result;
	},	
			
	assembled: assembled
};

