var assert = require('assert');
var should = require('should');
var fetcher = require('../build/fetcher.js').create();

describe('fetcher', function() {
	var expected;
	var actual;
	
	describe('.create()', function() {
		describe('.fetchedIfJson(object)', function() {
			it('should return external JSON if given a url to a JSON file.', function () {
				var url = '../test/json/minimalimage.json';
				expected = {url: 'test/url'};
				actual = fetcher.fetchedIfJson(url);
				should(actual).eql(expected);	
			});	

			it('otherwise pass back the object.', function () {
				expected = '';
				actual = fetcher.fetchedIfJson(expected);
				should(actual).eql(expected);	
				
				expected = {};
				actual = fetcher.fetchedIfJson(expected);
				should(actual).eql(expected);	

				expected = [];
				actual = fetcher.fetchedIfJson(expected);
				should(actual).eql(expected);	

				expected = 0;
				actual = fetcher.fetchedIfJson(expected);
				should(actual).eql(expected);	
			});	
		});	
	});	
});	
