var assert = require('assert');
var should = require('should');
var collection = require('../collectionData.js');
var assembler = require('../dataAssembler.js').setRoot('./test/json/');
var knownCollection = require('./json/collection.json');
var expected = require('./json/assembledCollections.json');

describe('Assembling nested image colections.', function() {
	it('should return a correctly assembled collection.', function() {			
		var actual = collection.assembledFrom(knownCollection, assembler);
		should(actual).eql(expected);	
	});
});
