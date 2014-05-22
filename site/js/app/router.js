// Consider more to be handled within the views. If possible let views comunicate with
// separate modules to achieve the same things. Look at index and loadMessages and ask what
// can be done from within the views.
// Clean up this router!

define(['underscore', 
		'backbone',
		'app/Factory',
		'app/InitCollectionView',
		'collectionviews/BoardItemListView',
		'collectionviews/MenuItemListView',
		'collections/Messages',
		'collectionviews/MessagesView',
		'models/ContactForm',
		'views/ContactFormView',
		'app/RenderCoreHTML',
		'app/RenderHTML'
],
function (_, Backbone, Factory, InitCollectionView, BoardItemListView, MenuItemListView, Messages, MessagesView, ContactForm, ContactFormView, RenderCoreHTML, RenderHTML) {
'use strict';
	
	// Private variables.
	// Document is cashed and retrieved once for each time the module is used.
	var doc = document;
	
	var PortfolioApp = new (Backbone.Router.extend({

		routes: {
			'': 'index',
			'chat': 'loadMessages',
			'contact': 'loadContactForm'
		},

		initialize: function () {

			RenderCoreHTML.renderHeader();
			RenderCoreHTML.renderMain();
		},

		start: function () {

			Backbone.history.start({pushState: true});
		},

		index: function () {

			var chat = doc.querySelector('.messageWindow');
			var contactFormWrapper = $('#contactForm');

			// If user returns to start page, remove the chat from dom...
			if (chat !== null) { chat.remove(); };

			// Or remove contactForm from dom...
			if (contactFormWrapper !== null) { 

				contactFormWrapper.fadeOut(200, function () {
					$(this).remove();
				});
			};

			try {

				// Render the portfolio menu board.
				// TODO: Rename to HTMLRenderer
				RenderHTML.renderCollectionView('BoardItemListView', $('#portfolioMenu'));

				// Render the menu.
				// TODO: Rename to HTMLRenderer
				RenderHTML.renderCollectionView('MenuItemListView', $('#container'));
			}
			catch (e) {

				console.log(e.message);
			}
		},

		show: function () {

			// Maybe also hide() and remove() functions.
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
				var chat = messageWindow.HTML.$el;

				RenderHTML.renderChatLoader();

				messages.fetch({
					reset: true,
					success: function () {

						chat.hide();

						$('#portfolioAppsContent').html(chat);

						chat.fadeIn(1000);						
					}
				});
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

				$('#portfolioAppsContent').html(formHTML.$el);

				formHTML.$el.fadeIn(500);
			};
		},

		rssFeed: function () {

			console.log('RssFeed');
		}
	}));

	return PortfolioApp;
});