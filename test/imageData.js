var assert = require('assert');
var should = require('should');
var image = require('../imageData.js');

function imageAssembledFrom(knownData) {
		knownData.caption = image.captionFrom(knownData);
		return knownData;
} 

describe('imageData', function() {

	describe('.captionFrom(data)', function() {
		it('should throw with no argument supplied.', function() {						
			assert.throws(function () {
				image.captionFrom();
			});			
		});
		
		it('should return a correctly formatted caption.', function() {
			var expected = '';
			var actual = image.captionFrom({});			
			assert.equal(actual, expected);			

			expected = '2003.';
			actual = image.captionFrom({
				date: '2003'
			});			
			assert.equal(actual, expected);			

			expected = '<em>Working Title</em>, 2003.';
			actual = image.captionFrom({
				date: '2003',
				title: 'Working Title'
			});		
			assert.equal(actual, expected);			

			expected = 'My Holidays <em>Working Title</em>, 2003.';
			actual = image.captionFrom({
				date: '2003',
				title: 'Working Title',
				imageSet: 'My Holidays'
			});		
			assert.equal(actual, expected);			

			expected = 'My Holidays, w/p.';
			actual = image.captionFrom({
				edition: 'w/p',
				imageSet: 'My Holidays'
			});		
			assert.equal(actual, expected);			

			expected = 'My Holidays.';
			actual = image.captionFrom({
				imageSet: 'My Holidays'
			});		
			assert.equal(actual, expected);			
		});
	});

	describe('.assembledFrom(data, imageSet)', function() {
		it('should throw with no argument supplied.', function() {						
			assert.throws(function () {
				image.assembledFrom();
			});			
			
			assert.throws(function () {
				image.assembledFrom("boo");
			});
		});
			
		it('should pass back an empty object.', function() {			
			var expected = {};
			var actual = image.assembledFrom(expected);
			assert.equal(actual, expected);						
		});

		it('should return a correctly assembled image object.', function() {			
			var knownImage = {author: 'me'};
			var expected = imageAssembledFrom(knownImage);
			var actual = image.assembledFrom(knownImage);
			var knownSet = 'My Holidays';

			should(actual).eql(expected);
		
			expected = imageAssembledFrom({author:'me', imageSet: knownSet});
			actual = image.assembledFrom(knownImage, knownSet);
			should(actual).eql(expected);
		});
	});
});
