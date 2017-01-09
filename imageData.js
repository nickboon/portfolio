function captionFrom(data) {
	var info = [
		(data.collection ? data.collection + ' ' : '') + 
		(data.title ? '<em>' + data.title + '</em>' : ''), 
		data.medium,
		data.dimensions, 
		data.edition,
		data.author,
		data.date
	];
	var joined = info.filter(function (item) {
		return item; 
	}).join(', ');
	
	if (!joined) return '';
	else return joined[0].toUpperCase() + joined.slice(1) + '.';	
}

function assembleFrom(data, imageSet) {
	if (imageSet) data.imageSet = imageSet;
	data.caption = captionFrom(data);
	return data;	
}

module.exports = {
	captionFrom: captionFrom,
	assembleFrom: assembleFrom,

	fetchFrom: function (url, imageSet) {
		var data = require(url);	
		return assembleFrom(data, imageSet);
	}
};
