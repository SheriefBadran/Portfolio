define(['underscore', 'backbone', 'models/Message'], function (_, Backbone, Message) {
'use strict';

	var MessageView = Backbone.View.extend({

		tagName: 'section',

		className: 'message',

		initialize: function () {
			this.model.on('change', this.render, this);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		template: _.template('<div class="topBar"></div><div class="text"><%= text %></div><div class="bottomBar"></div>')

	});

	return MessageView;
})