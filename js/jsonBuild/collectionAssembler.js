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
		
		withSubcollectionAssembledBy: function  (ofCollections) {
			if (collection.collections) collection.collections = fetcher
				.fetchedList(ofCollections, collection.level, collection.collections);
			return this;			
		},
		
		withEmptySubcollectionIfUndefined: function () {
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
		
		result: collection		
	};
}

function assembled(src, owner) {
	if (!src || typeof src === 'string')
		throw 'No collection data to assemble.';		
	return assembledFrom(src)
		.withLevel(owner)
		.withHtmlHeaders()
		.withSubcollectionAssembledBy(this)
		// recursive mustache partials will enter an endless loop if no empty array.
		.withEmptySubcollectionIfUndefined()
		.withImages()
		 // Stop mustache displaying parent info 
		.withEmptyInfoIfUndefined()
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

