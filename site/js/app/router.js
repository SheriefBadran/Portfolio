define(['underscore', 
		'backbone',
		'app/Factory',
		'app/InitCollectionView',
		'collectionviews/BoardItemListView',
		'collectionviews/MenuItemListView',
		'collections/Messages',
		'collectionviews/MessagesView',
		'models/ContactForm',
		'views/ContactFormView'
], 
function (_, Backbone, Factory, InitCollectionView, BoardItemListView, MenuItemListView, Messages, MessagesView, ContactForm, ContactFormView) {
'use strict';
	
	// Private variables.
	// Document is cashed and retrieved once for each time the module is used.
	var doc = document;
	
	var PortfolioApp = new (Backbone.Router.extend({

		routes: {
			'': 'index',
			// 'rss': 'rssFeed',
			'chat': 'loadMessages',
			'contact': 'loadContactForm'
		},

		initialize: function () {
			
		},

		start: function () {

			Backbone.history.start({pushState: true});
		},

		index: function () {

			var chat = doc.querySelector('.messageWindow');
			var menuWrapper = doc.querySelector('#menu');
			var contactFormWrapper = $('#contactForm');

			// If user returns to start page, remove the chat from dom...
			if (chat !== null) { chat.remove(); };

			// Or remove contactForm from dom...
			if (contactFormWrapper !== null) { 

				contactFormWrapper.fadeOut(200, function () {
					$(this).remove();
				});
			};

			// Retrieve an object literal with boardItem models and a boardItemList Collection.
			var boardCollectionSet = Factory.getBoardCollectionSet();

			try {

				// Retrieve rendered html for the menu board.
				var portfolioMenu = InitCollectionView(boardCollectionSet.boardItems, boardCollectionSet.boardItemList, BoardItemListView);
			}
			catch (e) {

				console.log(e.message);
			}

			// Set a timeout for timing with the css3 page loader.
			setTimeout(function () {

				// Inject the rendered HTML into the DOM.
				$('#portfolioMenu').html(portfolioMenu.HTML.el);
			}, 1600);

			// Render menu if it doesn't exit.
			if (menuWrapper === null) {
				// Retrieve rendered html for the general menu.
				var menuCollectionSet = Factory.getMenuCollectionSet();

				try {

					var menu = InitCollectionView(menuCollectionSet.menuItems, menuCollectionSet.menuItemList, MenuItemListView);
				}
				catch (e) {

					console.log(e.message);
				}

				console.log(menu.HTML.$el);

				setTimeout(function () {
					
					$('main').append(menu.HTML.$el);
				}, 1900);
			}
		},

		show: function () {

			console.log('show function');
		},

		loadMessages: function () {

			var wrapper = doc.querySelector('.messageWindow');

			// Render contactForm if it doesn't exit.
			if (wrapper === null) {

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

				console.log(chat);
				chat.hide();

				$('#portfolioAppsContent').append(chat);

				chat.fadeIn(1000);
			};
			// messageWindow.messages.fetch({reset: true});
		},

		loadContactForm: function () {

			var wrapper = doc.querySelector('#contactForm');

			if (wrapper === null) {

				var contactForm = new ContactForm({});
				var contactFormView = new ContactFormView({model: contactForm});

				var formHTML = contactFormView.render();
				console.log(formHTML.$el);
				
				formHTML.$el.hide();

				$('main').append(formHTML.$el);

				formHTML.$el.fadeIn(500);
			};
		},

		rssFeed: function () {

			console.log('RssFeed');
		}
	}));

	return PortfolioApp;
});