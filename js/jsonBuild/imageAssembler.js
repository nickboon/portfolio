function captionAssembledFrom(image) {
	if (!image || typeof image === 'string') throw 'No image data to caption.';
	var info = [
		(image.imageSet ? image.imageSet : '') +
		(image.imageSet && image.title ? ': ' : '') + 
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

function assembledFrom(image) {
	return {
		withImageSet: function (title) {
			if (title) image.imageSet = title;
			return this;
		},

		withCaption: function () {
			var _ = require('underscore');
			if (!_.isEmpty(image)) image.caption = captionAssembledFrom(image);
			return this;
		},
		
		result: image
	};
}

function assembled(src, owner) {
	if (!src || typeof src === 'string') throw 'No image data to assemble.';
	return assembledFrom(src)
		.withImageSet(owner)
		.withCaption()
		.result;	
}

module.exports = {
	captionAssembledFrom: captionAssembledFrom,
	assembled: assembled
};
