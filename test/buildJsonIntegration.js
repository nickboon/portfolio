var assert = require('assert');
var should = require('should');
var collectionAssembler = require('../build/collectionAssembler');
var imageAssembler = require('../build/imageAssembler');
var fetcher = require('../build/fetcher').create('../test/json/');	
var src = require('./json/collection.json');
var expected = require('./json/assembledCollections.json');

describe('Calling collectionAssembler.assemble with the appropriate processing pipe callbacks and fetcher ', function () { 
	it('should return a correctly assembled collection.', function() {
		function imageProcess(image, imageSet) {
			return imageAssembler.pipe(image)
			.withImageSet(imageSet)
			.withCaption()
			.withUndefinedThumbnailUrlSetToUrl()
			.output;
		}

		function process(collection, level) {
			return collectionAssembler.pipe(collection, level)
			.withImages(imageProcess, fetcher)
			.withCssIdentifiers()
			.withHtmlHeaders()
			.withUndefinedPropertiesInitialized()
			.withCollectionDelimiters()
			.output;				
		}

		var actual = collectionAssembler.assemble(src, process, fetcher); 
		should(actual).eql(expected);
	});
});
