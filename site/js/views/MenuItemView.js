define(['underscore', 'backbone', 'text!template/menuItem.html'], function (_, Backbone, menuItemTemplate) {
'use strict';
	
	var MenuItemView = Backbone.View.extend({

		tagName: 'li',

		initialize: function () {
			
			this.model.on('change', this.render, this);
		},

		render: function () {
			
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		template: _.(menuItemTemplate),

		events: {

		},

		navigateOnClick: function () {
			
		}
	});

	return MenuItemView;
});