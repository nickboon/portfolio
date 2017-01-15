var assert = require('assert');
var should = require('should');
var knownSrc = require('./json/collection.json');
var expected = require('./json/assembledCollections.json');
var fetcher = require('../fetcher').create('./test/json/');
var collectionAssembler = require('../collectionData').setFetcher(fetcher);


describe('Assembling nested image colections.', function() {
	it('should return a correctly assembled collection.', function() {
		console.log(fetcher);			
		var actual = collectionAssembler.assembled(knownSrc);
		should(actual).eql(expected);	
	});
});
