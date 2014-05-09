require.config({

	paths: {
		// folder paths
		// libs: '../libs',
		tests: '../tests',
		app: '../app',
		models: '../models',
		views: '../views',

		// file paths
		'socketio': '../../../node_modules/socket.io/lib/socket.io',
		'underscore': '../libs/underscore',
		'backbone': '../libs/backbone',
		'jquery': '../libs/jquery'
	},

	shim: {
		'../../../node_modules/socket.io/lib/socket.io': {
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

var tests = [
	'tests/models/Message',
	'tests/views/MessageView'
];

require (tests, function(Message, MessageView) {

	// Execute tests!
	Message.test();
	MessageView.test();

	if (window.mochaPhantomJS) {
		mochaPhantomJS.run();
	}
	else {
		mocha.run();
	}
});