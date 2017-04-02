function captionAssembledFrom(image) {
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
}

function pipe(image) {
	return {
		withImageSet: function (title) {
			if (title) image.imageSet = title;
			return this;
		},

		withCaption: function () {
			image.caption = captionAssembledFrom(image);
			return this;
		},
		
		withUndefinedThumbnailUrlSetToUrl: function () {
			image.thumbnailUrl = image.thumbnailUrl || image.url;
			return this;
		},
		
		output: image
	};
}

module.exports = {
	pipe: pipe
};
