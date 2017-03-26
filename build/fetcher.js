var _ = require('underscore');
var invalid = /[^a-zA-Z0-9\-_]/g;

function replaceInvalidCharactersIn(id) {
	return id.replace(invalid, "_");
}

function idAdded(object, id) {
	object.id = replaceInvalidCharactersIn(id);
	return object;
}

function isJsonUrl(object) {
	return typeof object === 'string' && object
		.toLowerCase().endsWith('.json' );
}

function fetchedObjectFrom(url, assembler, owner) {
	var fetchedObject = _.clone(require(url));
	fetchedObject = idAdded(fetchedObject, url);
	if(assembler) return assembler.assembled(fetchedObject, owner);
	return fetchedObject;
}

module.exports = {	
	create: function (r) {
		var root = (r === undefined) ? '' : r;
		
		return {
			fetched: function (assembler, owner, object) {
				if(!object) throw 'No object supplied to be fetched.';
				if(!isJsonUrl(object)) return object;
				return fetchedObjectFrom(root + object, assembler, owner);
			},

			fetchedList: function (assembler, owner, list) {
				if(!list) throw 'No list supplied to fetchedList';
				return list.map(function (object) {
					if(!isJsonUrl) return object;
					return fetchedObjectFrom(root + object, assembler, owner);
				});
			},
			
			idAdded: idAdded
		};
	}
}; 


