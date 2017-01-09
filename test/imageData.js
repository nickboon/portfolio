var assert = require('assert');
var image = require('../imageData.js')

describe('imageData.js', function() {

	describe('.captionFrom(data)', function() {
		it('should return a correctly formatted caption.', function() {
			var expected = '';
			var actual = image.captionFrom({});			
			assert(actual === expected);

			var expected = '2003.';
			var actual = image.captionFrom({
				date: '2003'
			});			
			assert(actual === expected);

			var expected = '<em>Working Title</em>, 2003.';
			var actual = image.captionFrom({
				date: '2003',
				title: 'Working Title'
			});		
			assert(actual === expected);

			var expected = 'My Holidays <em>Working Title</em>, 2003.';
			var actual = image.captionFrom({
				date: '2003',
				title: 'Working Title',
				imageSet: 'My Holidays'
			});		
			assert(actual === expected);

			var expected = 'My Holidays, w/p.';
			var actual = image.captionFrom({
				edition: 'w/p',
				imageSet: 'My Holidays'
			});		
			assert(actual === expected);

			var expected = 'My Holidays.';
			var actual = image.captionFrom({
				imageSet: 'My Holidays'
			});		
			assert(actual === expected);
		});
	});
});
