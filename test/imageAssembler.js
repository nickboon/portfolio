var assert = require('assert');
var should = require('should');
var assembler = require('../build/imageAssembler.js');

describe('imageAssembler', function() {
	var expected;	
	var actual;
	
	describe('.pipe(image)', function() {	
		describe('.withImageSet(title)', function() {	
			it('should add an imageSet value.', function() {
				var title = "title";
				expected = {imageSet: title};
				actual = assembler.pipe({}).withImageSet(title).output;
				should(actual).eql(expected);	
			});
		});
		
		describe('.withUndefinedThumbnailUrlSetToUrl()', function() {	
			it('should set the thumbnailUrl value to the url value if not present.', function() {		
				var url = "image/url.jpg";
				expected = {url: url, thumbnailUrl: url};
				actual = assembler.pipe({url: url})
				.withUndefinedThumbnailUrlSetToUrl().output;
				should(actual).eql(expected);	
			});

		});
		
		describe('.withCaption()', function() {
			it('should throw with no argument supplied.', function() {						
				assert.throws(function () {
					assembler.pipe().withCaption();
				});		
			});
							
			it('should add a caption based on the image properties.', function() {
			expected = '';
			actual = assembler.pipe({}).withCaption().output.caption;		
			assert.equal(actual, expected);			

			expected = '2003.';
			actual = assembler.pipe({
				date: '2003'
			}).withCaption().output.caption;			
			assert.equal(actual, expected);			

			expected = '<em>Working Title</em>, 2003.';
			actual = assembler.pipe({
				date: '2003',
				title: 'Working Title'
			}).withCaption().output.caption;			
			assert.equal(actual, expected);			

			expected = 'My Holidays: <em>Working Title</em>, 2003.';
			actual = assembler.pipe({
				date: '2003',
				title: 'Working Title',
				imageSet: 'My Holidays'
			}).withCaption().output.caption;			
			assert.equal(actual, expected);			

			expected = 'My Holidays, w/p.';
			actual = assembler.pipe({
				edition: 'w/p',
				imageSet: 'My Holidays'
			}).withCaption().output.caption;			
			assert.equal(actual, expected);			

			expected = 'My Holidays.';
			actual = assembler.pipe({
				imageSet: 'My Holidays'
			}).withCaption().output.caption;			
			assert.equal(actual, expected);			
			});
		});
	});
});
