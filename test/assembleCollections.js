var assert = require('assert');
var should = require('should');
	
var expected = require('./json/assembledCollections.json');
var fetcher = require('../js/jsonBuild/fetcher').create('../../test/json/');
var collection = fetcher
	.fetched(null, null, 'collection.json');
var assembler = require('../js/jsonBuild/collectionAssembler')
	.setFetcher(fetcher);


describe('Assembling nested image colections.', function() {
	it('should return a correctly assembled collection.', function() {
		var actual = assembler.assembled(collection);
		should(actual).eql(expected);	
	});
});
