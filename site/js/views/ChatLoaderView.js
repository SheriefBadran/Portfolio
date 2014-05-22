define(['underscore', 'backbone', 'text!templates/chatLoader.html'], function (_, Backbone, ChatLoaderTemplate) {
'use strict';

	var ChatLoaderView = Backbone.View.extend({

		id: 'noTrespassingOuterBarG',

		render: function () {
			
			this.$el.html(this.template());
			return this;
		},

		template: _.template(ChatLoaderTemplate)
	});

	return ChatLoaderView;
});