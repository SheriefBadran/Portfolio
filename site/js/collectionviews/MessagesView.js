define(['underscore',
		'backbone',
		'models/Message', 
		'views/MessageView',
		'text!templates/messagesView.html'], 
function (_, Backbone, Message, MessageView, messagesViewTemplate) {
'use strict';

	var server = window.socket;
	var messagesView = Backbone.View.extend({

		className: 'messageWindow',

		initialize: function () {

			this.input = this.$(".messageView");

			this.initialRender();

			// this.collection.on('add', this.addItem, this);
			this.collection.on('reset', this.renderMessages, this);

			// Create a "global" context for the server listeners. 
			var that = this;

			// SOCKET.IO API
			// Listening for server create broadcast.
			// Callback will have data emitted from the server.			
			server.on('create', function (messageObj) {

				var message = new Message({text: messageObj.text, cid: messageObj.cid});

				// Mark broadcasted message as not created on this client.
				message.thisClient = false;

				that.collection.add(message);
				that.addMessage(message);
			});

			// Listening for server delete broadcast.
			server.on('delete', function (id) {

				var message = that.collection.get(id);
				message.trigger('destroy', message);				
			});
		},

		events: {
			'click .send': 'submitMessage',
			'keypress .messageView': 'submitOnEnter'
		},

		template: _.template(messagesViewTemplate),

		addMessage: function (message) {

			// Messages created on this client are designed different than broadcasted messages. See MessageView.

			if ('thisClient' in message && typeof message.thisClient === 'boolean') {

				var messageView = new MessageView({model: message});				

				if (message.thisClient) {

					this.$(".messagesArea").append(messageView.render().el);
				};

				if (!message.thisClient) {

					this.$(".messagesArea").append(messageView.renderBroadCast().el);					
				};
			}
			else {

				throw ({message: 'Error! Your message could not be posted to the chat.'});
			}
		},

		renderMessages: function () {

			this.collection.forEach(this.addMessage, this);
			return this;
		},

		insertIntoDOM: function (animation, renderedHTML, parentEl) {

			// If no animation, null is passed into first parameter animation.
			if (animation === null) {

				parentEl.html(renderedHTML);
			}
			else if (typeof animation === 'string' && animation === 'fadeIn') {

				renderedHTML.hide();

				parentEl.html(renderedHTML);

				renderedHTML.fadeIn(1000);
			}
			else {

				throw ({message: 'Error! Invalid parameter in function insertIntoDOM.'});
			}
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

			var messageText = _.escape(this.$(".messageView").val());

			var message = new Message({text: messageText});

			// Mark broadcasted message as created on this client.
			message.thisClient = true;

			this.collection.add(message);

			// Reset textarea.
			this.$(".messageView").val('');
			this.$(".messageView").focus();

			try {

				// Save message to server.
				message.saveMessage();	

				// Create a MessageView for the model and render it into the DOM.
				this.addMessage(message);
			}
			catch (err) {

				// TODO: Implement error response to the user.
				console.log(err.message);
			}
		}
	});

	return messagesView;
});