var fetcher;

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
			if (collection.collections) collection.collections = fetcher
				.fetchedList(ofCollections, collection.level, collection.collections);
			return this;			
		},
		
		withEmptySubcollectionsIfUndefined: function () {
			if (!collection.collections) collection.collections = []; 
			return this;						
		},
				
		withImages: function  () {
			var ofImages = require('./imageAssembler.js');
			if (collection.images) collection.images = fetcher
				.fetchedList(ofImages, collection.title, collection.images);
			return this;
		},
		
		withEmptyInfoIfUndefined: function () {
			if(collection.info === undefined) collection.info = "";
			return this;			
		},
		
		withEmptyLinksIfUndefined: function () {
			if(collection.links === undefined) collection.links = [];
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
		// recursive mustache partials will enter an endless loop if no empty array.
		.withEmptySubcollectionsIfUndefined()
		.withEmptyLinksIfUndefined()
		.withImages()
		 // Stop mustache displaying parent info 
		.withEmptyInfoIfUndefined()
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

