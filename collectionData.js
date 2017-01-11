var assembler;

function assembledFrom(data, a) {
		if (!data) throw 'No collection data to assemble.';
		if (a) assembler = a;
		if (!assembler) throw 'No data assembler set.';		
		if (data.collections) 
			data.collections = assembler.fetchCollectionSet(data.collections);
		if (data.images)
			data.images = assembler.fetchImageSetFor(data.title, data.images);
		return data;  		
}

function fetchedFrom(url) {
		var data = require(url);
		return assembledFrom(data);
}	

module.exports = {
	assembledFrom: assembledFrom,
	fetchedFrom: fetchedFrom
};

