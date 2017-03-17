var fs = require('fs-extra');
function copy(src, out) {
	fs.copy(src, out, function (err) {
	  if (err) return console.error(err);
	});
}

module.exports = exports = function () {
	copy('./node_modules/jquery/dist/jquery.min.js', './dist/js/jquery.min.js');
	copy('./node_modules/masonry-layout/dist/masonry.pkgd.min.js', './dist/js/masonry.pkgd.min.js');
	copy('./node_modules/lightbox2/dist/css/lightbox.min.css', './dist/css/lightbox.min.css');
	copy('./node_modules/lightbox2/dist/js/lightbox.min.js', './dist/js/lightbox.min.js');
	copy('./node_modules/lightbox2/dist/js/lightbox.min.map', './dist/js/lightbox.min.map');
	copy('./node_modules/lightbox2/dist/images', './dist/images');

}; 
