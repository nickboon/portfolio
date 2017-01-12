var image = require('./imageData.js');
var collection = require('./collectionData.js');
var pathSeperator = require('path').sep;
var root = '.' + pathSeperator;

module.exports = {
	setRoot: function (r) {
		if (r) root = r;
		return this;
	},
		
	fetchImageSetFor: function (collection, urls) {
		if(!urls) throw 'No url list suppled to fetchImageSetFor';
		
		return urls.map(function (url) {
			return image.fetchedFrom(root + url, collection);
		});
	},

	fetchCollectionSet: function (urls) {
		if(!urls) throw 'No url list suppled to fetchCollectionSet';
		return urls.map(function (url) {
			return collection.fetchedFrom(root + url);
		});	
	}	
};
