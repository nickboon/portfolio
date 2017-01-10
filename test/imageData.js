var assert = require('assert');
var should = require('should');
var image = require('../imageData.js')

function imageAssembledFrom(knownData) {
		knownData.caption = image.captionFrom(knownData);
		return knownData;
} 

describe('imageData.js', function() {

	describe('.captionFrom(data)', function() {
		it('should throw with no object passed in.', function() {
			function testNoArg() {
				image.captionFrom();
			};			
			assert.throws(testNoArg);			
		});
		
		it('should return a correctly formatted caption.', function() {
			var expected = '';
			var actual = image.captionFrom({});			
			assert.equal(actual, expected);			

			var expected = '2003.';
			var actual = image.captionFrom({
				date: '2003'
			});			
			assert.equal(actual, expected);			

			var expected = '<em>Working Title</em>, 2003.';
			var actual = image.captionFrom({
				date: '2003',
				title: 'Working Title'
			});		
			assert.equal(actual, expected);			

			var expected = 'My Holidays <em>Working Title</em>, 2003.';
			var actual = image.captionFrom({
				date: '2003',
				title: 'Working Title',
				imageSet: 'My Holidays'
			});		
			assert.equal(actual, expected);			

			var expected = 'My Holidays, w/p.';
			var actual = image.captionFrom({
				edition: 'w/p',
				imageSet: 'My Holidays'
			});		
			assert.equal(actual, expected);			

			var expected = 'My Holidays.';
			var actual = image.captionFrom({
				imageSet: 'My Holidays'
			});		
			assert.equal(actual, expected);			
		});
	});

	describe('assembleFrom(data, imageSet)', function() {
		it('should throw with no object passed in.', function() {
			function testNoArg() {
				image.assembleFrom();
			};			

			assert.throws(testNoArg);			
			
			function testStringArg() {
				image.assembleFrom("boo");
			};			
			assert.throws(testStringArg);
		});
			
		it('should pass back an empty object.', function() {			
			var expected = {};
			var actual = image.assembleFrom(expected);
			assert.equal(actual, expected);			
			
		});

		it('should return a correctly assembled object.', function() {			
			var knownImage = {author: 'me'};
			var expected = imageAssembledFrom(knownImage);
			var actual = image.assembleFrom(knownImage);
			should(actual).eql(expected);
		
			var knownSet = 'My Holidays';
			var expected = imageAssembledFrom({author:'me', imageSet: knownSet});
			var actual = image.assembleFrom(knownImage, knownSet);
			should(actual).eql(expected);
		});
	});
});
