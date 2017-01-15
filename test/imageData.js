var assert = require('assert');
var should = require('should');

describe('imageData', function() {
	var image = require('../imageData.js');
	
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
	describe('.assembled(data, owner)', function() {
		var imageAssembled = function (knownData) {
			knownData.caption = image.captionFrom(knownData);
			return knownData;
		}; 

		it('should throw with no argument supplied.', function() {						
			assert.throws(function () {
				image.assembled();
			});			
			
			assert.throws(function () {
				image.assembled("boo");
			});
		});			
		it('should pass back an empty object.', function() {			
			var expected = {};
			var actual = image.assembled(expected);
			assert.equal(actual, expected);						
		});
		it('should return a correctly assembled image object.', function() {			
			var knownImage = {author: 'me'};
			var expected = imageAssembled(knownImage);
			var actual = image.assembled(knownImage);

			should(actual).eql(expected);
		});
		it('should return an image object with an image set if owner suplied.', function() {			
			var owningColection = 'My Holidays';
			var knownImage = {author: 'me'};
		
			expected = imageAssembled({author:'me', imageSet: owningColection});
			actual = image.assembled(knownImage, owningColection);
			should(actual).eql(expected);
		});
	});
});
