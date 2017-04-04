var id = 0; 
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

function getId() {
	id = id + 1;
	return id;
}

function initializeIfUndefinedString(stringProperty) {
	if(!stringProperty) {
		return '';
	}
	return stringProperty;
}

function initializeIfUndefinedArray(arrayProperty) {
	if(!arrayProperty) {
		return [];
	}
	return arrayProperty;
}

function pipe(collection, level) {
	
	var c = collection || {};
	var l = level || 1;	
				
	return {	
		withImages: function  (process, fetcher) {
			if (c.images) c.images = c.images.map(function (image) {					
				return process(fetcher.fetchedIfJson(image), c.title);
			}); 
			return this;
		},

		withCssIdentifiers: function () {
			c.cssIdentifier = 'collection_' + getId();
			return this;
		},
		
		withHtmlHeaders: function  () {				
			if (!l) l = 1;
			if (l < 1) l = 1;
			c.htmlHeader = 'h' + ((l > 6) ? 6 : l);
			c.htmlSubheader = 'h' + ((l > 5) ? 6 : l + 1);
			return this;
		},
		
		withCollectionDelimiters: function (delimiters) {
			var d = delimiters || defaultDelimiters;
			c.start = d.start;
			c.end = d.end;
			return this;						
		},
		
		withUndefinedPropertiesInitialized: function () {
			lists.forEach(function (list) {
				if (!c[list]) c[list] = []; 
			});
			texts.forEach(function (text) {
				if(!c[text]) c[text] = "";				
			});
			return this;			
		},
				
		output: c
	};
}

module.exports = {
	pipe: pipe,
			
	assemble:	function assemble(collection, process, fetcher, level) {
		if (!collection) throw 'No collection supplied.';
		if (!process) throw 'No processing call back supplied.';
		if (!fetcher) throw 'No fetcher supplied.';
		if (!level) level = 1;
		if (level === 1) collection = process(collection, level);		
		if(collection.subcollections) {
			level = level + 1;
			collection.subcollections = collection.subcollections
			.map(function (subcollection) {
				return assemble(
					process(fetcher.fetchedIfJson(subcollection), level),
					process,
					fetcher,
					level
				);
			});	
		}
		return collection;			
	}
};

