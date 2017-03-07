var assert = require('assert');
var should = require('should');

describe('collectionData', function() {
	var assembler = require('../collectionAssembler.js');

	describe('.assembled(data, assembler)', function() {
		var knownCollection = {
			title:  'Title',
			info: 'Some info about this collection',
			level: 1,
			images: ['./test/json/image.json'],
			collections: []
		};
		var assembledCollection = {
			title:  'Title',
			info: 'Some info about this collection',
			level: 1,
			images: [{
				"author": "Nick Boon",
				"caption": "Title <em>Image 1</em>, Nick Boon.",
				"imageSet": "Title",
				"title": "Image 1"
			}],
			collections: []
		};

		it('should throw with no argument supplied.', function() {	
			assert.throws(function () {
				assembler.assembled();
			});						
		});
		it('should pass back an empty object.', function() {			
			var expected = {};
			var actual = assembler.assembled(expected);
			assert.equal(actual, expected);						
		});
		it('should return a correctly assembled collection.', function() {			
			var fetcher = require('../fetcher.js').create();			
			assembler.setFetcher(fetcher);
			
			var expected = assembledCollection;
			var actual = assembler.assembled(knownCollection);
			should(actual).eql(expected);
		});
		it('should be able to assemble nested collections.', function() {
			assembledCollection.collections = [{
				title: "Collection 4",
				images: [],
				info: "Info about Collection 4",
				level: 2,
				collections: []
			}];
			knownCollection.images = ['./test/json/image.json'];			
			knownCollection.collections = ['./test/json/subsubcollection.json'];
			
			var expected = assembledCollection;
			var actual = assembler.assembled(knownCollection);
			should(actual).eql(expected);
		});
	});
});
