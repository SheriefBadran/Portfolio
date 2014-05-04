define(['underscore', 'backbone', 'models/Message', 'views/MessageView'], function (_, Backbone, Message, MessageView) {
'use strict';

	var server = window.socket;

	var messagesView = Backbone.View.extend({

		className: 'messageWindow',

		initialize: function () {

			this.input = this.$(".messageView");
			this.initialRender();
			// this.collection.on('add', this.addItem, this);
			this.collection.on('reset', this.renderMessages, this);

			// Create a "global" context for the server listener. 
			var that = this;

			// Callback will have data emitted from the server.			
			server.on('create', function (data) {
				console.log(data);
				// Listen for messages events.
				// that.broadcastMessage(data);
				var message = new Message({text: data.text, cid: data.cid});
				that.collection.add(message);
				that.addMessage(message);
			});

			server.on('delete', function (data) {

				console.log(that);
				var messageModel = that.collection.get(data);
				messageModel.trigger('destroy', messageModel);				
			});
		},

		events: {
			'click .send': 'submitMessage',
			'keypress .messageView': 'submitOnEnter'
		},

		template: _.template('<div class="messagesArea"></div><textarea class="messageView" placeholder="Type a message"></textarea><input class="send" type="submit" />'),

		addMessage: function (message) {

			var messageView = new MessageView({model: message});
			this.$(".messagesArea").append(messageView.render().el);
		},

		renderMessages: function () {

			this.collection.forEach(this.addMessage, this);
			return this;
		},

		initialRender: function () {

			this.$el.html(this.template());
		},

		submitOnEnter: function (e) {

			// BUG!! Message is submit though textarea is empty.
			if (e.keyCode != 13) { return; }
			if (!this.$(".messageView").val()) { return; }

			this.submitMessage();

			// Prevent textarea to change row on enter.
			e.preventDefault();
		},

		submitMessage: function (e) {

			// If no message -> return
			if (!this.$(".messageView").val()) { return; }

			var message = new Message({text: this.$(".messageView").val()});

			// Save message to server.
			message.saveMessage();

			this.collection.add(message);

			// Reset textarea.
			this.$(".messageView").val('');
			this.$(".messageView").focus();

			// Create a MessageView for the model and render it into the DOM.
			this.addMessage(message);
		}
	});

	return messagesView;
});