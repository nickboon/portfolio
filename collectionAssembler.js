var fetcher;
var ofImages = require('./imageAssembler.js');

function assembled(collection, owner) {
	var ofCollections = this;
		
	if (!collection || typeof collection === 'string') throw 'No collection data to assemble.';		

	collection.level = owner ? owner + 1 : 1; 
	collection.htmlHeader = collection.level < 7 ? "h" + collection.level : "h6";
	collection.htmlSubheader = collection.level < 6 ? 
		"h" + (collection.level + 1) : "h6";
	
	if (collection.collections)
		collection.collections = fetcher
			.fetchedList(ofCollections, collection.level, collection.collections);
	else collection.collections = []; // recursive mustache partials will enter an endless loop if no empty array.
	
	if (collection.images)
		collection.images = fetcher
			.fetchedList(ofImages, collection.title, collection.images);
	
	if(collection.info === undefined)
		collection.info = ""; // to stop mustache displaying parent info 
	
	return collection;  		
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

