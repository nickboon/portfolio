var assert = require('assert');
var should = require('should');

describe('fetcher', function() {
	var fetcherFactory = require('../js/jsonBuild/fetcher.js');
	var fetcher = fetcherFactory.create();
	var image = require('../js/jsonBuild/imageAssembler.js');
	var url = '../../test/json/image.json';
	describe('.idAdded', function (object, id) {
		it('should return a given object with an html5 css id selector added.', function () {
			var expected = {id: 'valid_html5_css_id_selector'};
			var actual = fetcher.idAdded({}, 'valid html5 css.id.selector');
			should(actual).eql(expected);	
		});
	});
	
	describe('.fetched(assembler, owner, url)', function () {
			it('should return an object form the given url.', function () {			
			var expected =  {
				author: 'Nick Boon',
				caption: '<em>Image 1</em>, Nick Boon.',
				title: 'Image 1',
				id: '__/__/test/json/image_json'
			};      
			var actual = fetcher.fetched(image, null, url);			
			should(actual).eql(expected);	
		});
		
		it('should return different objects when called twice.', function () {			
			var first = fetcher.fetched(image, null, url);
			var second = fetcher.fetched(image, null, url);
			assert.notEqual(first, second);			
		});
		
		it('should still return an object with no assembler suplied.', function () {			
			var expected =  {
				author: 'Nick Boon',
				title: 'Image 1',
				id: '__/__/test/json/image_json'
			};      
			var actual = fetcher.fetched(null, null, url);			
			should(actual).eql(expected);	
		});
		
		it('will use relative urls if a root has been set.', function () {			
			var rootFetcher = fetcherFactory.create('../../test/json/');
			var relativeUrl = 'image.json';
			var expected =  {
				author: 'Nick Boon',
				title: 'Image 1',
				id: '__/__/test/json/image_json'
			};      
			var actual = rootFetcher.fetched(null, null, relativeUrl);			
			should(actual).eql(expected);
		});
	});
	
	describe('.fetchedList(assembler, owner, urls)', function () {
		it('should return a list if objects form the given url list.', function () {			
			var urls = [
				url,
				url
			];
			var expected =  [
				{
					author: 'Nick Boon',
					title: 'Image 1',
					id: '__/__/test/json/image_json'
				},
				{
					author: 'Nick Boon',
					title: 'Image 1',
					id: '__/__/test/json/image_json'
				},			
			];			      
			var actual = fetcher.fetchedList(null, null, urls);			
			should(actual).eql(expected);	
		});
	});
});
