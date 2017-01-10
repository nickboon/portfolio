function captionFrom(data) {
	if (!data || typeof data === 'string') throw 'No data supplied';
	var info = [
		(data.imageSet ? data.imageSet : '') +
		(data.imageSet && data.title ? ' ' : '') + 
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
	var _ = require('underscore');
	if (!data || typeof data === 'string') throw 'No data supplied';
    if (imageSet) data.imageSet = imageSet;
	if (!_.isEmpty(data)) data.caption = captionFrom(data);
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
