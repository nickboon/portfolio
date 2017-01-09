var assembler;

function assembleFrom(data, a) {
		if (a) assembler = a;
		if (!assembler) throw 'No data assembler set.';		
		if (data.collections) 
			data.collections = assembler.fetchCollectionSet(data.collections);
		if (data.images)
			data.images = assembler.fetchImageSetFor(data.title, data.images);
		return data;  		
}

function fetchFrom(url) {
		var data = require(url);
		return assembleFrom(data);
}	

module.exports = {
	assembleFrom: assembleFrom,
	fetchFrom: fetchFrom
};

