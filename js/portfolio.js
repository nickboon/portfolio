$(function () {	
	var initialLevel = 1;
	var refreshMasonryDelayMs = 100;

	function initJqueryJs() {
		var $closed = $(".closed");
		$closed.addClass('clickable');
		$closed.click(function () {
			var $this = $(this);
			var id = $this.attr('id');
			$("." + id + "_content").toggle();		
			$this.toggleClass('closed');		
		});
	}
	
	function initMasonryJs(delay) {
		setInterval(function () {
			$('.images').masonry({
				itemSelector: '.masonry_item'
			}).masonry('layout');		
		}, delay);
	}
	
	function openLevel(level) {
		if(!level) return;
		if(level > 6) level = 6;
		while(level > 0) {
			$('h' + level + ' span').click();
			level = level -1;					
		}		
	}

 	initJqueryJs();
	initMasonryJs(refreshMasonryDelayMs);
	openLevel(initialLevel);
});
