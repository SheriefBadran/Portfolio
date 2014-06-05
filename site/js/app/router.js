// Consider more to be handled within the views. If possible let views comunicate with
// separate modules to achieve the same things. Look at index and loadMessages and ask what
// can be done from within the views.
// Clean up this router!

define(['underscore', 
		'backbone',
		'app/InitCollectionView',
		'collectionviews/BoardItemListView',
		'collections/Messages',
		'collectionviews/MessagesView',
		'models/ContactForm',
		'views/ContactFormView',
		'views/MyWorkView',
		'app/RenderCoreHTML',
		'app/RenderHTML'
],
function (_, Backbone, InitCollectionView, BoardItemListView, Messages, MessagesView, ContactForm, ContactFormView, MyWorkView, RenderCoreHTML, RenderHTML) {
'use strict';
	
	// Private variables.
	// Document is cashed and retrieved once for each time the module is used.
	var doc = document,
	container = $('#container'),
	chatMessagesFetch,
	server = Backbone.socket;
	
	var PortfolioApp = new (Backbone.Router.extend({

		routes: {
			'': 'index',
			'chat': 'loadMessages',
			'contact': 'loadContactForm',
			'My-Work': 'loadMyWork'
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

			var chatLoader = $('#noTrespassingOuterBarG'),
			chat = $('.messageWindow'),
			menuWrapper = doc.querySelector('#menuBoard'),
			portfolioMenuUl = doc.querySelector('.boardThumb'),
			contactFormWrapper = $('#contactForm'),
			myWorkWrapper = $('#myWork');

			// If chatloader is still running, remove it from dom.
			if (chatLoader.hasOwnProperty('selector') && chatLoader.length > 0) { 

				chatLoader.remove(); 
			};
			

			if (chat.hasOwnProperty('selector') && chat.length > 0) {
				
				chat.fadeOut(50, function() {
					
					$(this).remove();
				});
			};

			// Or remove contactForm from dom...
			// TODO: Destroy the contact form model.
			if (contactFormWrapper.hasOwnProperty('selector') && contactFormWrapper.length > 0) { 

				contactFormWrapper.fadeOut(50, function () {

					$(this).remove();
				});
			};

			if (myWorkWrapper.hasOwnProperty('selector') && myWorkWrapper.length > 0) {

				myWorkWrapper.fadeOut(50, function () {
					
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
			// this.index();
			var menuWrapper = doc.querySelector('#menuBoard'),
			portfolioMenuUl = doc.querySelector('.boardThumb');

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

			require(['app/AskForNickname'], function (AskForNickname) {
				
				console.log(AskForNickname);
				console.log(server);
				var nickname = AskForNickname();
				server.emit('message:join', nickname);
			});

			var wrapper = $('.messageWindow'),
			collectionView;

			// Render chat if it doesn't exit.
			if (wrapper.hasOwnProperty('selector') && wrapper.length === 0) {

				var messageModels = new Messages();
				var messages;

				try {

					var messageWindow = InitCollectionView([], messageModels, MessagesView);
				}
				catch (e) {

					console.log(e.message);
				}

				messages = messageWindow.collection;
				var chatView = messageWindow.View;

				RenderHTML.renderChatLoader();

				chatMessagesFetch = messages.fetch({
					reset: true,
					success: function () {

						// TODO: Surround code within success functin with a try-catch block.
						// If no animation, pass null instead of 'fadeIn' in first parameter.
						chatView.insertIntoDOM('fadeIn', chatView.$el, $('#portfolioAppsContent'));
					}
				});
			};
			// messageWindow.messages.fetch({reset: true});
		},

		loadContactForm: function () {

			// Render portfolioBoardMenu and menu if user start application with url: /contact
			// this.index();
			var menuWrapper = doc.querySelector('#menuBoard'),
			portfolioMenuUl = doc.querySelector('.boardThumb');

			// Abort get-request if user returns to contact form before chat messages are fetched/laoded.
			if (chatMessagesFetch !== undefined && chatMessagesFetch.readyState > 0 && chatMessagesFetch.readyState < 4) {

				chatMessagesFetch.abort();
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

			var wrapper = $('#contactForm');

			if (wrapper.hasOwnProperty('selector') && wrapper.length === 0) {

				var contactForm = new ContactForm({});
				var contactFormView = new ContactFormView({model: contactForm});

				var formHTML = contactFormView.render();

				contactFormView.insertIntoDOM('fadeIn', formHTML.$el, $('#portfolioAppsContent'));
			};
		},

		loadMyWork: function () {
			
			var myWorkView,
			menuWrapper = doc.querySelector('#menuBoard'),
			portfolioMenuUl = doc.querySelector('.boardThumb');

			// Abort get-request if user returns to My-Work page before chat messages are fetched/laoded.
			if (chatMessagesFetch !== undefined && chatMessagesFetch.readyState > 0 && chatMessagesFetch.readyState < 4) {

				chatMessagesFetch.abort();
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

			var wrapper = $('#myWork');

			if (wrapper.hasOwnProperty('selector') && wrapper.length === 0) {

				myWorkView = new MyWorkView({});
				var myWorkHTML = myWorkView.render().$el;

				myWorkView.insertIntoDOM('fadeIn', myWorkHTML, $('#portfolioAppsContent'));
			};
		}
	}));

	return PortfolioApp;
});