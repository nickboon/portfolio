module.exports = exports = function (image) {
	if(image === undefined) throw 'No image data supplied.';
	
	var info = [
		(image.imageSet ? image.imageSet : '') +
		(image.imageSet && image.title ? ': ' : '') + 
		(image.title ? '<em>' + image.title + '</em>' : ''), 
		image.medium,
		image.dimensions, 
		image.edition,
		image.author,
		image.date,
		image.credit,
		(image.link ? '<a href="' + image.link + '">' + image.link + '</a>' : '')
	];
	var joined = info.filter(function (item) {
		return item; 
	}).join(', ');
	
	if (!joined) return '';
	else return joined[0].toUpperCase() + joined.slice(1) + '.';	
};

