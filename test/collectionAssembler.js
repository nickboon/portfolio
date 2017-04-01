var assert = require('assert');
var should = require('should');
var assembler = require('../build/collectionAssembler.js');
var initialzedEmpty = {
	images: [],
	subcollections: [],
	links: [],
	title: '',
	info: ''
};

function freshPipe(collection) {
	return assembler.pipe(collection);	
}

describe('collectionAssembler', function() {

	describe('.pipe(collection)', function() {
		var expected;
		var actual;		
		
  		it('.withSubcollectionsAssembledBy(assembler, level) should add subcollection JSON.', function() {
			expected = {};
			actual = freshPipe()
				.withSubcollectionsAssembledBy(assembler, 0).output;
			should(actual).eql(expected);

			expected = {
				"subcollections": [
					{
						"end": "]",
						"htmlHeader": "h1",
						"htmlSubheader": "h2",
						"id": "___test_json___emptycollection_json",
						"images": [],
						"info": "",
						"level": 1,
						"links": [],
						"linksClass": "empty",
						"start": "[",
						"subcollections": [],
						"title": "",
					}
				]
			};
			actual = freshPipe({
				subcollections: ['./emptycollection.json']
			})
				.withSubcollectionsAssembledBy(assembler, 0).output;
			should(actual).eql(expected);
		});						

  		it('.withImages(assembler, level) should add subcollection JSON.', function() {
			expected = {};
			actual = freshPipe()
				.withImages(assembler, 0).output;
			should(actual).eql(expected);

			expected = {
				"images": [
					{
						"caption": "",
						"id": "___test_json___minimalimage_json",
						"thumbnailUrl": "test/url",
						"url": "test/url"
					}
				]
			};
			actual = freshPipe({
				images: ['./minimalimage.json']
			})
				.withImages(assembler, 0).output;
			should(actual).eql(expected);
		});						

		it('.withFetcherId(url) should add an ID from the given url.', function() {	
			assert.throws(function () {
				freshPipe().withFetcherId();
			});						

			expected = {id: 'path_to_json'};
			actual = freshPipe().withFetcherId('path.to.json').output;
			should(actual).eql(expected);
		});

		it('.withLevel(level) should add a level.', function() {
			var level = -1;	
			expected = {level: level};
			actual = freshPipe().withLevel(level).output;
			should(actual).eql(expected);
		});
  
  		it('.withHtmlHeaders(level) should add html headers.', function() {
			assert.throws(function () {
				freshPipe().withHtmlHeaders();
			});						

			assert.throws(function () {
				freshPipe().withHtmlHeaders('one');
			});						

			var level = -1;	
			expected = {htmlHeader: 'h1', htmlSubheader: 'h2'};
			actual = freshPipe().withHtmlHeaders(level).output;
			should(actual).eql(expected);

			level = 7;	
			expected = {htmlHeader: 'h6', htmlSubheader: 'h6'};
			actual = freshPipe().withHtmlHeaders(level).output;
			should(actual).eql(expected);
		});

  		it('.withCollectionDelimiters(delimiters) should add delimiters', function() {
			expected = {start: '[', end: ']'};
			actual = freshPipe().withCollectionDelimiters().output;
			should(actual).eql(expected);

			var delemeters = {start: '!', end: '!'};
			expected = delemeters;
			actual = freshPipe().withCollectionDelimiters(delemeters).output;
			should(actual).eql(expected);
		});

  		it('.withEmptyPropertiesIfUndefined() should add empty strings or arrays for each missing property', function() {
			expected = initialzedEmpty;
			actual = freshPipe().withEmptyPropertiesIfUndefined().output;
			should(actual).eql(expected);
		});

		it('.withEmptyLinksClass(level) should add a linksClass property with a vaue of empty if there are no lnks.', function() {
			expected = {linksClass: 'empty'};
			actual = freshPipe().withEmptyLinksClass().output;
			should(actual).eql(expected);

			expected = {links: ['www.link.com']};
			actual = freshPipe(expected).withEmptyLinksClass().output;
			should(actual).eql(expected);
		});
	});

	describe('.assembled(src, owner)', function() {
		//~ var knownCollection = {
			//~ title:  'Title',
			//~ info: 'Some info about this collection',
			//~ images: ['../test/json/image.json'],
		//~ };
		//~ var assembledCollection = {
			//~ title:  'Title',
			//~ htmlHeader: 'h1',
			//~ htmlSubheader: 'h2',
			//~ info: 'Some info about this collection',
			//~ level: 1,
			//~ links: [],
			//~ linksClass: 'empty',
			//~ images: [{
			//~ url: 'test/url',
				//~ thumbnailUrl: 'test/url', 
				//~ author: 'Nick Boon',
				//~ caption: 'Title: <em>Image 1</em>, Nick Boon.',
				//~ imageSet: 'Title',
				//~ title: 'Image 1',
				//~ id: '___test_json_image_json'
			//~ }],
			//~ subcollections: []
		//~ };

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
		
		//~ it('should return a correctly assembled collection.', function() {			
			//~ var fetcher = require('../build/fetcher.js').create();			
			//~ assembler.setFetcher(fetcher);
			//~ 
			//~ var expected = assembledCollection;
			//~ var actual = assembler.assembled(knownCollection);
			//~ should(actual).eql(expected);
		//~ });
		//~ 
		//~ it('should be able to assemble nested collections.', function() {
			//~ assembledCollection.subcollections = [{
				//~ title: "Collection 4",
				//~ links: [],
				//~ linksClass: 'empty',
				//~ htmlHeader: "h2",
				//~ htmlSubheader: "h3",
				//~ images: [],
				//~ id: "___test_json_subsubcollection_json",
				//~ info: "Info about Collection 4",
				//~ level: 2,
				//~ subcollections: []
			//~ }];
			//~ knownCollection.images = ['../test/json/image.json'];			
			//~ knownCollection.subcollections = ['../test/json/subsubcollection.json'];
			//~ 
			//~ var expected = assembledCollection;
			//~ var actual = assembler.assembled(knownCollection);
			//~ should(actual).eql(expected);
		//~ });
	});
});
