var imageData = require('./imageData.js');
var collectionData = require('./collectionData.js');
var pathSeperator = require('path').sep;
var root = '.' + pathSeperator;

module.exports = {
	setRoot: function (r) {
		root = r;
		return this;
	},
		
	fetchImageSetFor: function (collection, urls) {
		return urls.map(function (url) {
			return imageData.fetchFrom(root + url, collection);
		});
	},

	fetchCollectionSet: function (urls) {
		return urls.map(function (url) {
			return collectionData.fetchFrom(root + url);
		});	
	}	
};
