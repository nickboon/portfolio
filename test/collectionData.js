var assert = require('assert');
var should = require('should');

describe('collectionData', function() {
	var collectionAssembler = require('../collectionData.js');

	describe('.assembled(data, assembler)', function() {
		var knownCollection = {
			title:  'Title',
			info: 'Some info about this collection',
			images: ['./test/json/image.json']
		};
		var assembledCollection = {
			title:  'Title',
			info: 'Some info about this collection',
			images: [{
				"author": "Nick Boon",
				"caption": "Title <em>Image 1</em>, Nick Boon.",
				"imageSet": "Title",
				"title": "Image 1"
			}]
		};

		it('should throw with no argument supplied.', function() {	
			assert.throws(function () {
				collectionAssembler.assembled();
			});						
		});
		it('should pass back an empty object.', function() {			
			var expected = {};
			var actual = collectionAssembler.assembled(expected);
			assert.equal(actual, expected);						
		});
		it('should return a correctly assembled collection.', function() {			
			var fetcher = require('../fetcher.js').create();			
			collectionAssembler.setFetcher(fetcher);
			
			var expected = assembledCollection;
			var actual = collectionAssembler.assembled(knownCollection);
			should(actual).eql(expected);
		});
		it('should be able to assemble nested collections.', function() {
			assembledCollection.collections = [{
				title: "Collection 4",
				images: [],
				info: "Info about Collection 4",
				collections: []
			}];
			knownCollection.images = ['./test/json/image.json'];			
			knownCollection.collections = ['./test/json/subsubcollection.json'];
			
			var expected = assembledCollection;
			var actual = collectionAssembler.assembled(knownCollection);
			should(actual).eql(expected);
		});
	});
});
