var fetcher;

/* Assembleable types. */
var ofImages = require('./imageData.js');
var ofCollections = require('./collectionData.js');

module.exports = {	
	setFetcher: function (f) {
		if (f) fetcher = f;
		return this;
	},

	assemble: {	
		collectionsFrom: function (urls) {
			return fetcher.fetchedList(ofCollections, null, urls);
		},
		
		imagesFrom: function (owner, urls) {
			return fetcher.fetchedList(ofImages, owner, urls);
		}
	}
};
