define(['underscore', 'backbone', 'models/Message'], function (_, Backbone, Message) {
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

		render: function () {

			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		renderBroadCast: function () {

			this.$el.html(this.broadCastTemplate(this.model.toJSON()));
			return this;
		},

		deleteMessageModel: function () {
			
			// Call function on model to delete/destroy instance (model is also removed from collection).
			// This view listens on destroy event from model. On destroy, this view will remove message from the dom.
			this.model.deleteMessage();
		},

		removeMessageFromDom: function () {

			this.$el.remove();
		},

		startEditMode: function () {

			this.$('.edit').addClass('editing');
			this.$('.text').addClass('edit');
		},

		closeEditMode: function () {

			var value = this.$('.editing').val();

			if (!value) {
				this.deleteMessageModel();
			}
			else {
				// call a mehtod on model!!
				// this.model.save({text: value});
				this.model.updateMessage(value);
				this.$('.edit').removeClass('editing');
				this.$('.text').removeClass('edit');
			}
			console.log(value);
		},

		template: _.template(
			'<div class="topBar"><p class="topbarContainer"><span class="deleteIcon"><img src="css/imgs/delete32.png" height=20 width=20 /></span><span class="editIcon"><img src="css/imgs/edit32.png" height=20 width=20 /></span></p></div><div class="text"><%= text %></div><textarea class="edit"><%= text %></textarea><div class="bottomBar"><hr class="carved" /></div>'),

		broadCastTemplate: _.template(
			'<div class="topBar"><p class="topbarContainer"></p></div><div class="text"><%= text %></div><textarea class="edit"><%= text %></textarea><div class="bottomBar"><hr class="carved" /></div>')

	});

	return MessageView;
})