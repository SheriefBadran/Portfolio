define([
	'underscore', 
	'backbone',
	'app/InitMenuBoard'
], 
function (_, Backbone, InitMenuBoard) {
'use strict';
	
	var ResumeApp = new (Backbone.Router.extend({

		routes: {
			'': 'index'
		},

		initialize: function () {

			// Retrieve rendered html for the menu board.
			var menuBoard = InitMenuBoard();

			// Inject the rendered HTML into the DOM.
			$('#menuBoard').html(menuBoard.HTML);
		},

		start: function () {
			Backbone.history.start({pushState: true});
		},

		index: function () {
			console.log('index func is the place for initial fetch from server');
		},

		show: function () {
			console.log('show function');
		},

		chat: function () {
			console.log('Chat');
		},

		memoryGame: function () {
			console.log('MemoryGame');
		},

		rssFeed: function () {
			console.log('RssFeed');
		}
	}));

	return ResumeApp;
});