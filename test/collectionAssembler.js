var assert = require('assert');
var should = require('should');
var assembler = require('../build/collectionAssembler');
var imageAssembler = require('../build/imageAssembler');
var fetcher = require('../build/fetcher').create('../test/json/');

describe('collectionAssembler', function() {
	describe('assemble(collection, process, fetcher, level)', function () {
  		it('should recusively add subcollection JSON.', function() {		
			var actual = assembler.assemble(
				{
					subcollections: [
						'collectionWithSubcollection.json',
						{title: 'Another Collection'}
					]
				},
				function (collection) {
					return assembler.pipe(collection).output;				
				}, 
				fetcher
			); 
			var expected = {
				subcollections: [
					{
						subcollections: [
							{}
						]
					},
					{title: 'Another Collection'}
				]
			};
			should(actual).eql(expected);
		});
	});

	describe('.pipe(collection)', function () {
		var expected;
		var actual;		
		
		describe('.withImages(process, fetcher)', function () {
			it('.should add image JSON.', function() {
				function process(image, imageSet) {
					return imageAssembler.pipe(image)
					.withImageSet(imageSet)
					.withCaption()
					.withUndefinedThumbnailUrlSetToUrl()
					.output;
				}

				expected = {};
				actual = assembler.pipe()
				.withImages(process, fetcher).output;
				should(actual).eql(expected);

				expected = {
					"images": [
						{
							"caption": "",
							"thumbnailUrl": "test/url",
							"url": "test/url"
						}
					]
				};
				actual = assembler.pipe({
					images: ['./minimalimage.json']
				}).withImages(process, fetcher).output;
				should(actual).eql(expected);
			});						
		});
		
		describe('.withCssIdentifiers()', function () {
			it('.should add a value that can be used as a CSS ID.', function() {
				var firstCssId = assembler.pipe({})
				.withCssIdentifiers().output.cssIdentifier;

				var prefix = 'collection_';
				assert(firstCssId.startsWith(prefix));
				var suffix = firstCssId.replace(prefix, '');
				assert.notEqual(parseInt(suffix), NaN);
				
				var secondCssId = assembler.pipe({})
				.withCssIdentifiers().output.cssIdentifier;
				
				assert.notEqual(firstCssId, secondCssId);				
			});						
		});

		describe('.withHtmlHeaders(level)', function () {
			it('should add html headers.', function() {
				var level = -1;	
				expected = {htmlHeader: 'h1', htmlSubheader: 'h2'};
				actual = assembler.pipe({}, level)
				.withHtmlHeaders().output;
				should(actual).eql(expected);

				level = 7;	
				expected = {htmlHeader: 'h6', htmlSubheader: 'h6'};
				actual = assembler.pipe({}, level)
				.withHtmlHeaders().output;
				should(actual).eql(expected);
			});
		});

		describe('.withCollectionDelimiters(delimiters)', function () {
			var delemeters;
			
			it('should add delimiters', function() {
				expected = {start: '[', end: ']'};
				actual = assembler.pipe()
				.withCollectionDelimiters().output;
				should(actual).eql(expected);

				delemeters = {start: '!', end: '!'};
				expected = delemeters;
				actual = assembler.pipe()
				.withCollectionDelimiters(delemeters).output;
				should(actual).eql(expected);
			});

			it('should allow for no delimeters', function() {
				delemeters = {start: '', end: ''};
				expected = delemeters;
				actual = assembler.pipe()
				.withCollectionDelimiters(delemeters).output;
				should(actual).eql(expected);
			});
		});

		describe('.withUndefinedPropertiesInitialized()', function () {
			it('should add empty strings or arrays for each missing property', function() {
				var initialzedEmpty = {
					images: [],
					subcollections: [],
					links: [],
					title: '',
					info: ''
				};

				expected = initialzedEmpty;
				actual = assembler.pipe()
				.withUndefinedPropertiesInitialized().output;
				should(actual).eql(expected);
			});
		});

		describe('.withEmptyLinksClass(level)', function () {
			it('should add a linksClass property with a vaue of empty if there are no lnks.', function() {
				expected = {linksClass: 'empty'};
				actual = assembler.pipe().withEmptyLinksClass().output;
				should(actual).eql(expected);

				expected = {links: ['www.link.com']};
				actual = assembler.pipe(expected)
				.withEmptyLinksClass().output;
				should(actual).eql(expected);
			});
		});
	});
});
