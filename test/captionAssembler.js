//~ var assert = require('assert');
//~ var should = require('should');
//~ var assembleCaptionFrom = require('../build/captionAssembler.js');
//~ 
//~ describe('captionAssembler(image)', function() {
	//~ it('should throw with no argument supplied.', function() {						
		//~ assert.throws(function () {
			//~ assembleCaptionFrom();
		//~ });		
	//~ });
	//~ 
	//~ it('should return a correctly formatted caption.', function() {
		//~ var expected = '';
		//~ var actual = assembleCaptionFrom({});			
		//~ assert.equal(actual, expected);			
//~ 
		//~ expected = '2003.';
		//~ actual = assembleCaptionFrom({
			//~ date: '2003'
		//~ });			
		//~ assert.equal(actual, expected);			
//~ 
		//~ expected = '<em>Working Title</em>, 2003.';
		//~ actual = assembleCaptionFrom({
			//~ date: '2003',
			//~ title: 'Working Title'
		//~ });		
		//~ assert.equal(actual, expected);			
//~ 
		//~ expected = 'My Holidays: <em>Working Title</em>, 2003.';
		//~ actual = assembleCaptionFrom({
			//~ date: '2003',
			//~ title: 'Working Title',
			//~ imageSet: 'My Holidays'
		//~ });		
		//~ assert.equal(actual, expected);			
//~ 
		//~ expected = 'My Holidays, w/p.';
		//~ actual = assembleCaptionFrom({
			//~ edition: 'w/p',
			//~ imageSet: 'My Holidays'
		//~ });		
		//~ assert.equal(actual, expected);			
//~ 
		//~ expected = 'My Holidays.';
		//~ actual = assembleCaptionFrom({
			//~ imageSet: 'My Holidays'
		//~ });		
		//~ assert.equal(actual, expected);			
	//~ });
//~ });
