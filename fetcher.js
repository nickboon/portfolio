var _ = require('underscore');
var html5IdInvalid = /\s|\./g;

function replaceInvalidCharactersIn(id) {
	return id.replace(html5IdInvalid, "_");
}

function addIdTo(object, id) {
	object.id = replaceInvalidCharactersIn(id);
	return object;
}

function fetchedObjectFrom(url, assembler, owner) {			
	var fetchedObject = _.clone(require(url));
	fetchedObject = addIdTo(fetchedObject, url);
	if(assembler) return assembler.assembled(fetchedObject, owner);
	return fetchedObject;
}

module.exports = {	
	create: function (r) {
		var root = (r === undefined) ? '' : r;
		
		return {
			fetched: function (assembler, owner, url) {
				if(!url) throw 'No url suppled to fetchedSingle';
				return fetchedObjectFrom(root + url, assembler, owner);
			},

			fetchedList: function (assembler, owner, urls) {
				if(!urls) throw 'No url list suppled to fetchedList';
				return urls.map(function (url) {
					return fetchedObjectFrom(root + url, assembler, owner);
				});
			},
			
			addIdTo: addIdTo
		};
	}
}; 


