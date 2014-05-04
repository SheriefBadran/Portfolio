'use strict';
require.config({
	paths: {

		// folder paths

		// file paths
		'socketio': '../socket.io/socket.io',
		'underscore': 'libs/underscore',
		'backbone': 'libs/backbone',
		'jquery': 'libs/jquery'
	},

	shim: {
		'socketio': {
			exports: 'io'
		},
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