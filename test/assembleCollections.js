var assert = require('assert');
var should = require('should');
	
var expected = require('./json/assembledCollections.json');
var fetcher = require('../fetcher').create('./test/json/');
var collection = fetcher
	.fetched(null, null, 'collection.json');
var collectionAssembler = require('../collectionData')
	.setFetcher(fetcher);


describe('Assembling nested image colections.', function() {
	it('should return a correctly assembled collection.', function() {
		var actual = collectionAssembler.assembled(collection);
		should(actual).eql(expected);	
	});
});
