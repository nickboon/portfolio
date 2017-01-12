var assert = require('assert');
var should = require('should');
var collection = require('../collectionData.js');
var assembler = require('../dataAssembler.js');
var validCollection = {
	title:  'Title',
	info: 'Some info about this collection',
	images: ['path/to/image.json'],
	collections: ['path/to/subCollection.json']
};
var image = {title: 'Image!'};
var validSubCollection = {
	title: 'Sub Collection',
	info: 'This is a part of the main collection',
	images: [image]
};
var mockAssembler = {
	fetchImageSetFor: function (collection, urls) {
		return [image];
	},

	fetchCollectionSet: function (urls) {
		return [validSubCollection];
	}	
};
var assembledValidCollection = {
	title:  'Title',
	info: 'Some info about this collection',
	images: [image],
	collections: [validSubCollection]	
};

describe('collectionData', function() {
	describe('.assembledFrom(data, assembler)', function() {
		it('should throw with no argument supplied.', function() {
			assert.throws(function () {
				collection.assembledFrom();
			});						
		});
			
		it('should throw with no assembler set.', function() {
			assert.throws(function (validCollection) {
				collection.assembledFrom(validCollection);
			});						
		});
				
		
		it('should pass back an empty object.', function() {			
			var expected = {};
			var actual = collection.assembledFrom(expected, assembler);
			assert.equal(actual, expected);						
		});

		it('should not need to be supplied an assembler once one is set.', function() {			
			var expected = {};
			var actual = collection.assembledFrom(expected);
			assert.equal(actual, expected);						
		});

		it('should return a correctly assembled collection.', function() {			
			var expected = assembledValidCollection;
			var actual = collection.assembledFrom(validCollection, mockAssembler);
			should(actual).eql(expected);
		});
	});
});
