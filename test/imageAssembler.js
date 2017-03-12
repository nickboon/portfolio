var assert = require('assert');
var should = require('should');

describe('imageData', function() {
	var assembler = require('../js/jsonBuild/imageAssembler.js');
	
	describe('.captionAssembledFrom(image)', function() {
		it('should throw with no argument supplied.', function() {						
			assert.throws(function () {
				assembler.captionAssembledFrom();
			});			
		});
		
		it('should return a correctly formatted caption.', function() {
			var expected = '';
			var actual = assembler.captionAssembledFrom({});			
			assert.equal(actual, expected);			

			expected = '2003.';
			actual = assembler.captionAssembledFrom({
				date: '2003'
			});			
			assert.equal(actual, expected);			

			expected = '<em>Working Title</em>, 2003.';
			actual = assembler.captionAssembledFrom({
				date: '2003',
				title: 'Working Title'
			});		
			assert.equal(actual, expected);			

			expected = 'My Holidays <em>Working Title</em>, 2003.';
			actual = assembler.captionAssembledFrom({
				date: '2003',
				title: 'Working Title',
				imageSet: 'My Holidays'
			});		
			assert.equal(actual, expected);			

			expected = 'My Holidays, w/p.';
			actual = assembler.captionAssembledFrom({
				edition: 'w/p',
				imageSet: 'My Holidays'
			});		
			assert.equal(actual, expected);			

			expected = 'My Holidays.';
			actual = assembler.captionAssembledFrom({
				imageSet: 'My Holidays'
			});		
			assert.equal(actual, expected);			
		});
	});
	describe('.assembled(src, owner)', function() {
		var imageAssembled = function (knownData) {
			knownData.caption = assembler.captionAssembledFrom(knownData);
			return knownData;
		}; 

		it('should throw with no argument supplied.', function() {						
			assert.throws(function () {
				assembler.assembled();
			});			
			
			assert.throws(function () {
				assembler.assembled("boo");
			});
		});	
				
		it('should pass back an empty object.', function() {			
			var expected = {};
			var actual = assembler.assembled(expected);
			assert.equal(actual, expected);						
		});
		
		it('should return a correctly assembled image object.', function() {			
			var knownImage = {author: 'me'};
			var expected = imageAssembled(knownImage);
			var actual = assembler.assembled(knownImage);

			should(actual).eql(expected);
		});
		
		it('should return an image object with an image set if owner suplied.', function() {			
			var owningColection = 'My Holidays';
			var knownImage = {author: 'me'};
		
			expected = imageAssembled({author:'me', imageSet: owningColection});
			actual = assembler.assembled(knownImage, owningColection);
			should(actual).eql(expected);
		});
	});
});
