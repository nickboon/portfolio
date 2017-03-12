var fetcher;

function assembledFrom(collection) {	
	return {
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
		
		withSubcollection: function  (ofCollections) {
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
		
		collection: collection		
	};
}

function assembled(src, owner) {
	var ofCollections = this;
				
	if (!src || typeof src === 'string') throw 'No collection data to assemble.';		

	return assembledFrom(src)
		.withLevel(owner)
		.withHtmlHeaders()
		.withSubcollection(ofCollections)
		// recursive mustache partials will enter an endless loop if no empty array.
		.withEmptySubcollectionIfUndefined()
		.withImages()
		 // Stop mustache displaying parent info 
		.withEmptyInfoIfUndefined()
		.collection;
}

module.exports = {
	setFetcher: function (f) {
		if (f) fetcher = f;
		return this;
	},
			
	assembledFromRoot: function (collection, id) {
		return fetcher.addIdTo(this.assembled(collection), id);
	},	
			
	assembled: assembled
};

