define([
	'underscore', 
	'backbone',
	'app/InitMenuBoard',
	'app/InitMessageWindow'
], 
function (_, Backbone, InitMenuBoard, InitMessageWindow) {
'use strict';
	
	var PortfolioApp = new (Backbone.Router.extend({

		routes: {
			'': 'index',
			// 'rss': 'rssFeed',
			'messages': 'loadMessages'
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

		loadMessages: function () {
			
			var messageWindow = InitMessageWindow();
			$('body').append(messageWindow.HTML);

			messageWindow.messages.fetch({reset: true});
		},

		memoryGame: function () {

			console.log('MemoryGame');
		},

		rssFeed: function () {
			
			console.log('RssFeed');
		}
	}));

	return PortfolioApp;
});