define([
	'underscore', 
	'backbone',
	'app/InitMenuBoard',
	'app/InitMessageWindow'
], 
function (_, Backbone, InitMenuBoard, InitMessageWindow) {
'use strict';
	
	// Private variables.
	// Document is cashed and retrieved once for each time the module is used.
	var doc = document;
	
	var PortfolioApp = new (Backbone.Router.extend({

		routes: {
			'': 'index',
			// 'rss': 'rssFeed',
			'chat': 'loadMessages'
		},

		initialize: function () {
			

		},

		start: function () {

			Backbone.history.start({pushState: true});
		},

		index: function () {

			var chat = doc.querySelector('.messageWindow');

			// If user returns to start page, remove the chat from dom.
			// Chat can only contain null or an element, null comparison ok.
			if (chat !== null) { chat.remove(); };

			// Retrieve rendered html for the menu board.
			var menuBoard = InitMenuBoard();

			// Set a timeout for timing with the css3 page loader.
			setTimeout(function () {

				// Inject the rendered HTML into the DOM.
				$('#menuBoard').html(menuBoard.HTML);
			}, 1600);
		},

		show: function () {

			console.log('show function');
		},

		loadMessages: function () {
			
			var messageWindow = InitMessageWindow();
			messageWindow.messages.fetch({reset: true});

			var chat = messageWindow.HTML.$el;

			chat.hide();
			$('body').append(chat);
			chat.slideDown(1000);

			// messageWindow.messages.fetch({reset: true});
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