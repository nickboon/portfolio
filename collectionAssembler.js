var fetcher;
var ofImages = require('./imageAssembler.js');

function assembled(collection, owner) {
	if (!collection || typeof collection === 'string') throw 'No colection data to assemble.';		
	if (collection.collections)
		collection.collections = fetcher
			.fetchedList(this, null, collection.collections);
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

