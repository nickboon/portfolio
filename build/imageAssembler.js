var captionAssembledFrom = require('./captionAssembler'); 

function assemblyPipe(image) {
	return {
		withImageSet: function (title) {
			if (title) image.imageSet = title;
			return this;
		},

		withCaption: function () {
			image.caption = captionAssembledFrom(image);
			return this;
		},
		
		withEmptyThumbnailUrlToUrl: function () {
			image.thumbnailUrl = image.thumbnailUrl || image.url;
			return this;
		},
		
		output: image
	};
}

function assembled(src, owner) {
	if (!src || typeof src !== 'object') throw 'No image data to assemble.';
	if (!src.url) throw 'Image has no URL.';
	return assemblyPipe(src)
		.withImageSet(owner)
		.withCaption()
		.withEmptyThumbnailUrlToUrl()
		.output;	
}

module.exports = {
	assembled: assembled
};
