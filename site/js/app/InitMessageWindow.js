define(['collections/Messages', 
		'collectionviews/MessagesView',
		'views/MessageView'
], 
function (Messages, MessagesView, MessageView) {
'use strict';

	function InitMessageWindow () {

		// Instantiate backbone collection class. The collection manages Message models only.
		var messages = new Messages();

		// Instantiate backbone collection view - class. The collectionview manages all collection's models and views.
		var messagesView = new MessagesView({collection: messages});

		// Every model in the collection has a view. Render the view for each model.
		messagesView.render();

		return {
			HTML: messagesView,
			messages: messages
		};
	};

	return InitMessageWindow;
});