define(['underscore', 
		'backbone',
		'models/Message',
		'text!templates/message.html', 
		'text!templates/messageBroadCast.html',
		'text!templates/chatJoinMessage.html'], 
function (_, Backbone, Message, messageTemplate, messageBroadCastTemplate, joinMessageTemplate) {
'use strict';
	
	var MessageView = Backbone.View.extend({

		tagName: 'section',

		className: 'message',

		initialize: function () {

			this.model.on('change', this.render, this);
			this.model.on('destroy', this.removeMessageFromDom, this);
		},

		events: {
			// Set click event for delete icon
			'click .deleteIcon': 'deleteMessageModel',
			'click .editIcon': 'startEditMode',
			'blur .editing': 'closeEditMode'
		},

		render: function (e) {

			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		renderBroadCast: function () {

			this.$el.html(this.broadCastTemplate(this.model.toJSON()));
			return this;
		},

		renderJoinedChatMessage: function () {
			
			if (Backbone.history.fragment === 'Chat') { this.scrollDown(); };

			this.$el.html(this.joinTemplate(this.model.toJSON()));
			return this;
		},

		deleteMessageModel: function (e) {

			e.preventDefault();
			// Call function on model to delete/destroy instance (model is also removed from collection).
			// This view listens on destroy event from model. On destroy, this view will remove message from the dom.
			this.model.deleteMessage();
		},

		removeMessageFromDom: function () {

			this.$el.remove();
		},

		startEditMode: function (e) {

			e.preventDefault();
			console.log('Under construction!');

			// this.$('.edit').addClass('editing');
			// this.$('.text').addClass('edit');
		},

		closeEditMode: function (e) {

			e.preventDefault();
			console.log('Under construction!');
			// var value = this.$('.editing').val();

			// if (!value) {
			// 	this.deleteMessageModel();
			// }
			// else {
			// 	// call a mehtod on model!!
			// 	// this.model.save({text: value});
			// 	this.model.updateMessage(value);
			// 	this.$('.edit').removeClass('editing');
			// 	this.$('.text').removeClass('edit');
			// }
			// console.log(value);
		},

		scrollDown : function () {
			
			$("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
		},

		template: _.template(messageTemplate),

		broadCastTemplate: _.template(messageBroadCastTemplate),

		joinTemplate: _.template(joinMessageTemplate)

	});

	return MessageView;
})