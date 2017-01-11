var assert = require('assert');
var should = require('should');
var image = require('../imageData.js')

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
			should(actual).eql(expected);
		
			var knownSet = 'My Holidays';
			var expected = imageAssembledFrom({author:'me', imageSet: knownSet});
			var actual = image.assembledFrom(knownImage, knownSet);
			should(actual).eql(expected);
		});
	});
});
