var image = require('./imageData.js');
var collection = require('./collectionData.js');
var pathSeperator = require('path').sep;
var root = '.' + pathSeperator;

module.exports = {
	setRoot: function (r) {
		root = r;
		return this;
	},
		
	fetchImageSetFor: function (collection, urls) {
		return urls.map(function (url) {
			return image.fetchedFrom(root + url, collection);
		});
	},

	fetchCollectionSet: function (urls) {
		return urls.map(function (url) {
			return collection.fetchedFrom(root + url);
		});	
	}	
};
