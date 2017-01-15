var fetcher;
var ofImages = require('./imageData.js');

function assembled(data, owner) {
	if (!data || typeof data === 'string') throw 'No colection data to assemble.';
	if (data.collections)
		data.collections = fetcher
			.fetchedList(this, null, data.collections);
	if (data.images)
		data.images = fetcher
			.fetchedList(ofImages, data.title, data.images);
	return data;  		
}

module.exports = {
	setFetcher: function (f) {
		if (f) fetcher = f;
		return this;
	},
		
	assembled: assembled
};

