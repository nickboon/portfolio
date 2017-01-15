var _ = require('underscore');

function captionAssembledFrom(image) {
	if (!image || typeof image === 'string') throw 'No image data to caption.';
	var info = [
		(image.imageSet ? image.imageSet : '') +
		(image.imageSet && image.title ? ' ' : '') + 
		(image.title ? '<em>' + image.title + '</em>' : ''), 
		image.medium,
		image.dimensions, 
		image.edition,
		image.author,
		image.date
	];
	var joined = info.filter(function (item) {
		return item; 
	}).join(', ');
	
	if (!joined) return '';
	else return joined[0].toUpperCase() + joined.slice(1) + '.';	
}

function assembled(image, owner) {
	if (!image || typeof image === 'string') throw 'No image data to assemble.';
    if (owner) image.imageSet = owner;
	if (!_.isEmpty(image)) image.caption = captionAssembledFrom(image);
	return image;	
}

module.exports = {
	captionAssembledFrom: captionAssembledFrom,
	assembled: assembled
};
