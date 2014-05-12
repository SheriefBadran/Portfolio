define(['underscore', 
		'backbone',
		'app/Factory',
		'app/InitCollectionView',
		'collectionviews/BoardItemListView',
		'app/InitMessageWindow',
		'collections/Messages',
		'collectionviews/MessagesView'
], 
function (_, Backbone, Factory, InitCollectionView, BoardItemListView, InitMessageWindow, Messages, MessagesView) {
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

			// Retrieve an object literal with boardItem models and a boardItemList Collection.
			var boardCollectionSet = Factory.getCollectionSet();

			try {
				// Retrieve rendered html for the menu board.
				var portfolioMenu = InitCollectionView(boardCollectionSet.boardItems, boardCollectionSet.boardItemList, BoardItemListView);
			}
			catch (e) {
				console.log(e.message);
			}

			// Retrieve rendered html for the general menu.

			// Set a timeout for timing with the css3 page loader.
			setTimeout(function () {

				// Inject the rendered HTML into the DOM.
				$('#portfolioMenu').html(portfolioMenu.HTML.el);
			}, 1600);
		},

		show: function () {

			console.log('show function');
		},

		loadMessages: function () {

			var messageModels = new Messages();
			var messages;

			try {
				var messageWindow = InitCollectionView([], messageModels, MessagesView);
			}
			catch (e) {
				console.log(e.message);
			}

			messages = messageWindow.collection;
			messages.fetch({reset: true});

			var chat = messageWindow.HTML.$el;

			chat.hide();

			$('#portfolioAppContent').append(chat);
			
			chat.fadeIn(1000);

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