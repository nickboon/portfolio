var assert = require('assert');
var should = require('should');

describe('collectionAssembler', function() {
	var assembler = require('../build/collectionAssembler.js');

	describe('.assembled(src, owner)', function() {
		var knownCollection = {
			title:  'Title',
			info: 'Some info about this collection',
			images: ['../test/json/image.json'],
		};
		var assembledCollection = {
			title:  'Title',
			htmlHeader: 'h1',
			htmlSubheader: 'h2',
			info: 'Some info about this collection',
			level: 1,
			links: [],
			linksClass: 'empty',
			images: [{
			url: 'test/url',
				thumbnailUrl: 'test/url', 
				author: 'Nick Boon',
				caption: 'Title: <em>Image 1</em>, Nick Boon.',
				imageSet: 'Title',
				title: 'Image 1',
				id: '___test_json_image_json'
			}],
			subcollections: []
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
			var fetcher = require('../build/fetcher.js').create();			
			assembler.setFetcher(fetcher);
			
			var expected = assembledCollection;
			var actual = assembler.assembled(knownCollection);
			should(actual).eql(expected);
		});
		
		it('should be able to assemble nested collections.', function() {
			assembledCollection.subcollections = [{
				title: "Collection 4",
				links: [],
				linksClass: 'empty',
				htmlHeader: "h2",
				htmlSubheader: "h3",
				images: [],
				id: "___test_json_subsubcollection_json",
				info: "Info about Collection 4",
				level: 2,
				subcollections: []
			}];
			knownCollection.images = ['../test/json/image.json'];			
			knownCollection.subcollections = ['../test/json/subsubcollection.json'];
			
			var expected = assembledCollection;
			var actual = assembler.assembled(knownCollection);
			should(actual).eql(expected);
		});
	});
});
