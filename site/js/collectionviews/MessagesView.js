define(['underscore', 'backbone', 'views/MessageView'], function (_, Backbone, MessageView) {
'use strict';

	var messagesView = Backbone.View.extend({

		className: 'messageWindow',

		initialize: function () {
			this.input = this.$("#messageView");
			this.initialRender();
			this.collection.on('add', this.addItem, this);
		},

		events: {
			'click #send': 'submitMessage',
			'keypress #messageView': 'submitOnEnter'
		},

		template: _.template('<textarea id="messageView"></textarea><input id="send" type="submit" />'),

		addMessage: function (message) {
			var messageView = new MessageView({model: message});
			this.$el.append(messageView.render().el);
		},

		render: function () {
			this.collection.forEach(this.addMessage, this);
			return this;
		},

		initialRender: function () {
			this.$el.html(this.template());
		},

		submitOnEnter: function (e) {
			// BUG!! Message is submit though textarea is empty.
			if (e.keyCode != 13) { return };
			this.submitMessage();
		},

		submitMessage: function (e) {

			// If no message -> return
			if (!this.$("#messageView").val()) { return; }

			// Retrieve nr of models in collection.
			var length = this.collection.length;

			// Create a message model and add it to this collection.
			this.collection.add({text: this.$("#messageView").val()});

			// Reset textarea.
			this.$("#messageView").val('');
			this.$("#messageView").focus();

			// Create a MessageView for the created model.
			var messageView = new MessageView({model: this.collection.at(length)});

			// Inject the rendered MessageView HTML into the DOM.
			this.$el.prepend(messageView.render().el);
		}
	});

	return messagesView;
});