var fetcherIdAdded = require('./fetcher').idAdded;
var fetcher;
var defaultDelimiters = {
	start : '[',
	end : ']'
};
var lists = [
	"images",
	"subcollections",
	"links"
];
var texts = [
	"title",
	"info"
];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function pipe(collection) {
	var c = collection || {};
		
	return {	
		withSubcollectionsAssembledBy: function  (ofCollections, level) {
			if (c.subcollections) c.subcollections = fetcher
				.fetchedList(ofCollections, level, c.subcollections);
			return this;			
		},
		
		withImages: function  () {
			var ofImages = require('./imageAssembler.js');
			if (c.images) c.images = fetcher
				.fetchedList(ofImages, c.title, c.images);
			return this;
		},
		
		withFetcherId: function (url) {
			if(!url || typeof url !== 'string' || !url.trim())
				throw "You must supply an URL to generate a fetcherId.";
			
			c = fetcherIdAdded(c, url);
			return this;
		},
			
		withLevel: function (level) {
			c.level = level;
			return this;
		},
		
		withHtmlHeaders: function  (level) {
			if (!level || typeof level !== 'number')
				throw 'No level suplied to withHtlHeaders.';
				
			if (level < 1) level = 1;
			c.htmlHeader = 'h' + ((level > 6) ? 6 : level);
			c.htmlSubheader = 'h' + ((level > 5) ? 6 : level + 1);
			return this;
		},
		
		withCollectionDelimiters: function (delimiters) {
			var d = delimiters || defaultDelimiters;
			c.start = d.start;
			c.end = d.end;
			return this;						
		},
		
		withEmptyPropertiesIfUndefined: function () {
			lists.forEach(function (list) {
				if (!c[list]) c[list] = []; 
			});
			texts.forEach(function (text) {
				if(!c[text]) c[text] = "";				
			});
			return this;			
		},
				
		withEmptyLinksClass: function () {
			if(!c.links || !c.links.length)
				c.linksClass = "empty";
			return this;			
		},
				
		output: c
	};
}

function assembled(src, owner, delimiters) {
	if (!src || typeof src !== 'object')
		throw 'No collection data to assemble.';	
		
	var level = owner ? owner + 1 : 1;
 			
	return pipe(src)
		.withSubcollectionsAssembledBy(this, level)
		.withImages()
		// for html templating  
		.withLevel(level)
		.withHtmlHeaders(level)
		.withCollectionDelimiters(delimiters)
		// for mustache
		.withEmptyPropertiesIfUndefined()
		.withEmptyLinksClass()
		.output;
}

module.exports = {
	setFetcher: function (f) {
		if (f) fetcher = f;
		return this;
	},
	
	pipe: pipe,
			
	assembledFromRootCollection: function (collection, url) {
		var collectionWithNoId = this.assembled(collection); 
		return pipe(collectionWithNoId)
			.withFetcherId(url)
			.output;
	},	
			
	assembled: assembled
};

