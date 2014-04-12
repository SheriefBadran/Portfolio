'use strict';
require.config({
	paths: {

		// folder paths

		// file paths
		'underscore': 'libs/underscore',
		'backbone': 'libs/backbone',
		'jquery': 'libs/jquery'
	},

	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require (['app/router'], function(PortfolioApp) {
'use strict';

	PortfolioApp.start();

});