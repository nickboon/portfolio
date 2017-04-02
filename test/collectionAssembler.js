var assert = require('assert');
var should = require('should');
var assembler = require('../build/collectionAssembler');
var fetcher = require('../build/simpleFetcher').create('../test/json/');

var initialzedEmpty = {
	images: [],
	subcollections: [],
	links: [],
	title: '',
	info: ''
};

function freshPipe(collection, level) {
	return assembler.pipe(collection, level);	
}

describe('collectionAssembler', function() {
	describe('assemble(collection, process, fetcher, level)', function () {
  		it('should recusively add subcollection JSON.', function() {		
			var actual = assembler.assemble(
				{
					subcollections: ['collectionWithSubcollection.json']
				},
				function (collection) {
					return freshPipe(collection)
						.output;				
				}, 
				fetcher
			); 
			var expected = {
				subcollections: [
					{
						subcollections: [
							{}
						]
					}
				]
			};
			should(actual).eql(expected);
		});
	});

	describe('.pipe(collection)', function () {
		var expected;
		var actual;		
		
  		//~ it('.withImages(assembler, level) should add subcollection JSON.', function() {
			//~ expected = {};
			//~ actual = freshPipe()
				//~ .withImages(assembler, 0).output;
			//~ should(actual).eql(expected);
//~ 
			//~ expected = {
				//~ "images": [
					//~ {
						//~ "caption": "",
						//~ "id": "___test_json___minimalimage_json",
						//~ "thumbnailUrl": "test/url",
						//~ "url": "test/url"
					//~ }
				//~ ]
			//~ };
			//~ actual = freshPipe({
				//~ images: ['./minimalimage.json']
			//~ })
				//~ .withImages(assembler, 0).output;
			//~ should(actual).eql(expected);
		//~ });						
//~ 
		//~ it('.withFetcherId(url) should add an ID from the given url.', function() {	
			//~ assert.throws(function () {
				//~ freshPipe().withFetcherId();
			//~ });						
//~ 
			//~ expected = {id: 'path_to_json'};
			//~ actual = freshPipe().withFetcherId('path.to.json').output;
			//~ should(actual).eql(expected);
		//~ });
//~ 
  		it('.withHtmlHeaders(level) should add html headers.', function() {
			var level = -1;	
			expected = {htmlHeader: 'h1', htmlSubheader: 'h2'};
			actual = freshPipe({}, level).withHtmlHeaders().output;
			should(actual).eql(expected);

			level = 7;	
			expected = {htmlHeader: 'h6', htmlSubheader: 'h6'};
			actual = freshPipe({}, level).withHtmlHeaders().output;
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

  		//~ it('.withEmptyPropertiesIfUndefined() should add empty strings or arrays for each missing property', function() {
			//~ expected = initialzedEmpty;
			//~ actual = freshPipe().withEmptyPropertiesIfUndefined().output;
			//~ should(actual).eql(expected);
		//~ });
//~ 
		it('.withEmptyLinksClass(level) should add a linksClass property with a vaue of empty if there are no lnks.', function() {
			expected = {linksClass: 'empty'};
			actual = freshPipe().withEmptyLinksClass().output;
			should(actual).eql(expected);

			expected = {links: ['www.link.com']};
			actual = freshPipe(expected).withEmptyLinksClass().output;
			should(actual).eql(expected);
		});
	});
});
