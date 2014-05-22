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
	var doc = document,
	container = $('#container'),
	chatMessagesFetch;
	
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

			// Abort get-request if user returns to index (start page) before chat messages are fetched/laoded.
			if (chatMessagesFetch !== undefined && chatMessagesFetch.readyState > 0 && chatMessagesFetch.readyState < 4) {

				chatMessagesFetch.abort();
			};

			var chatLoader = doc.querySelector('#noTrespassingOuterBarG'),
			chat = doc.querySelector('.messageWindow'),
			menuWrapper = doc.querySelector('#menuBoard'),
			portfolioMenuUl = doc.querySelector('.boardThumb'),
			contactFormWrapper = $('#contactForm');

			// If chatloader is still running, remove it from dom.
			if (chatLoader !== null) { chatLoader.remove(); };

			// If user returns to start page, remove the chat from dom...
			// TODO: Destroy all the message models in the collection.
			if (chat !== null) { chat.remove(); };

			// Or remove contactForm from dom...
			// TODO: Destroy the contact form model.
			if (contactFormWrapper !== null) { 

				contactFormWrapper.fadeOut(200, function () {

					$(this).remove();
				});
			};

			try {

				// Render the portfolio menu board if not already rendered.
				// TODO: Rename to HTMLRenderer
				if (portfolioMenuUl === null) {

					RenderHTML.renderCollectionView('BoardItemListView', $('#portfolioMenu'));
				};

				// Render the menu if not already rendered.
				// TODO: Rename to HTMLRenderer
				if (menuWrapper === null) {

					RenderHTML.renderCollectionView('MenuItemListView', container);
				};
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

			// Render portfolioBoardMenu and menu if user start application with url: /chat
			this.index();			

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

				chatMessagesFetch = messages.fetch({
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

			// Render portfolioBoardMenu and menu if user start application with url: /contact
			this.index();

			var wrapper = doc.querySelector('#contactForm');

			// Abort get-request if user returns to index (start page) before chat messages are fetched/laoded.
			if (chatMessagesFetch !== undefined && chatMessagesFetch.readyState > 0 && chatMessagesFetch.readyState < 4) {

				chatMessagesFetch.abort();
			};

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