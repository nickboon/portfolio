$(function () {	
	var $closed = $(".closed");
	$closed.addClass('clickable');
	$closed.click(function () {
		var $this = $(this);
		var id = $this.attr('id');
		$("." + id + "_content").toggle();		
		$this.toggleClass('closed');		
	});
	
	// invoke masonry
	setInterval(function () {
		$('.images').masonry({
			itemSelector: '.masonry_item'
		}).masonry('layout');		
	}, 100);

	// open top levels
	$("h1 span").click();
	$("h2 span").click();
});
