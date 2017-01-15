var assert = require('assert');
var should = require('should');
	
var expected = require('./json/assembledCollections.json');
var fetcher = require('../fetcher').create('./test/json/');
var collection = fetcher
	.fetched(null, null, 'collection.json');
var assembler = require('../collectionAssembler')
	.setFetcher(fetcher);


describe('Assembling nested image colections.', function() {
	it('should return a correctly assembled collection.', function() {
		var actual = assembler.assembled(collection);
		should(actual).eql(expected);	
	});
});
