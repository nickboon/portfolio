var fetcher;
var ofImages = require('./imageAssembler.js');

function assembled(collection, owner) {
	var ofCollections = this;
		
	if (!collection || typeof collection === 'string') throw 'No collection data to assemble.';		

	collection.level = owner ? owner + 1 : 1; 

	if (collection.collections)
		collection.collections = fetcher
			.fetchedList(ofCollections, collection.level, collection.collections);
	else collection.collections = []; //recursive mustache partials will enter an endless loop if no empty array.
	
	if (collection.images)
		collection.images = fetcher
			.fetchedList(ofImages, collection.title, collection.images);
	
	return collection;  		
}

module.exports = {
	setFetcher: function (f) {
		if (f) fetcher = f;
		return this;
	},
		
	assembled: assembled
};

