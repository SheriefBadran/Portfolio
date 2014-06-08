define(['underscore',
		'backbone',
		'models/Message', 
		'views/MessageView',
		'text!templates/messagesView.html'], 
function (_, Backbone, Message, MessageView, messagesViewTemplate) {
'use strict';

	var server = Backbone.socket;
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
			// Listening to server.

			// BROADCAST SENT MESSAGE TO ALL CONNECTED CLIENTS.
			// Callback will have data emitted from the server.			
			server.on('create', function (messageObj) {

				var message = new Message({
					sender: messageObj.sender, 
					text: messageObj.text, 
					cid: messageObj.cid, 
					_id: messageObj._id
				});
				console.log(message);

				// Mark broadcasted message as not created on this client.
				message.thisClient = false;

				that.collection.add(message);
				that.addMessage(message);

				if (Backbone.history.fragment === 'Chat') {
					$("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
				};
			});

			// CREATE MESSAGE WRITTEN BY CLIENT.
			server.on('clientcreate', function (messageObj) {

				var message = new Message({
					sender: messageObj.sender, 
					text: messageObj.text, 
					serverId: messageObj.serverId, 
					date: messageObj.date
				});

				message.thisClient = true;

				that.collection.add(message);

				// Reset textarea.
				that.$(".messageView").val('');
				that.$(".messageView").focus();
				that.addMessage(message);
			});

			// CREATE MESSAGE TO NOTIFY WHO JOINED CHAT.
			server.on('joined', function (nickname) {
				
				var userJoinedMessage = nickname + ' joined the chat...';
				var message = new Message({text: userJoinedMessage});
				message.joinedChatMessage = true;
				that.addMessage(message);
			});

			// BROADCAST DELETE INSTRUCTION TO ALL CLIENTS
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

				if (message.joinedChatMessage) {
					
					this.$(".messagesArea").append(messageView.renderJoinedChatMessage().el);
				};
			}
			else {

				throw ({message: 'Error! Your message could not be posted to the chat. Reload the chat and try again.'});
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
			if (!this.$(".messageView").val() === '') { return; }

			this.submitMessage();

			// Prevent textarea to change row on enter.
			e.preventDefault();
		},

		submitMessage: function (e) {

			var sender;
			// If no message -> return
			if (!this.$(".messageView").val()) { return; }

			var messageText = _.escape(this.$(".messageView").val());

			if (window.localStorage && 'sender' in localStorage) {

				sender = _.escape(localStorage.getItem('sender'));
			}
			else {

				sender = 'Anonymous';
			}

			// Send a message object literal to server.
			server.emit('message:create', {'sender': sender, 'text': messageText, 'date': new Date()});
		}
	});

	return messagesView;
});