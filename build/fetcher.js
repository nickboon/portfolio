var _ = require('underscore');

function isJsonUrl(object) {
	return typeof object === 'string' && object
		.toLowerCase().endsWith('.json' );
}

function fetched(url) {
	return _.clone(require(url));
}

module.exports = {
	create: function (r) {
		var root = r || '';
		
		return {
			fetchedIfJson: function (object) {
				return isJsonUrl(object) ? fetched(root + object) : object;
			}
		};
	}
};
