var assert = require('assert');
var should = require('should');
var assembler = require('../build/imageAssembler.js');

describe('imageAssembler', function() {	
	describe('.assembled(src, owner)', function() {
		var knownUnassembledImage = {
			url: 'test/url',
			author: 'Nick Boon',
			title: 'Image 1',
			id: '___test_json_image_json'
		};      
		var knownAssembledImage = {
			url: 'test/url',
			thumbnailUrl: 'test/url', 
			author: 'Nick Boon',
			caption: '<em>Image 1</em>, Nick Boon.',
			title: 'Image 1',
			id: '___test_json_image_json'
		};      

		it('should throw with no argument supplied.', function() {						
			assert.throws(function () {
				assembler.assembled();
			});			
			
			assert.throws(function () {
				assembler.assembled("boo");
			});
		});	
				
		it('should throw if empty object supplied (needs at least a url).', function() {			
			assert.throws(function () {
				assembler.assembled({});
			});
		});
		
		it('should return a correctly assembled image object.', function() {			
			var expected = knownAssembledImage;
			var actual = assembler.assembled(knownUnassembledImage);

			should(actual).eql(expected);
		});
		
		it('should return an image object with an image set if owner suplied.', function() {			
			var owningColection = 'My Holidays';
			knownAssembledImage.imageSet = owningColection;
			knownAssembledImage.caption = 'My Holidays: <em>Image 1</em>, Nick Boon.';
			expected = knownAssembledImage;
			actual = assembler.assembled(knownUnassembledImage, owningColection);
			should(actual).eql(expected);
		});
	});
});
