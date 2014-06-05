define(['underscore', 'backbone', 'text!templates/menuItem.html'], function (_, Backbone, menuItemTemplate) {
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

		template: _.template(menuItemTemplate),

		events: {
			'click a': 'navigateOnClick'
		},

		navigateOnClick: function (e) {
			
			e.preventDefault();

			var menuChoice = this.model.get('itemTitle');

			if (typeof menuChoice === 'string' && menuChoice === 'Contact Me') {

				Backbone.history.navigate("/contact", {trigger: true});
			}

			if (typeof menuChoice === 'string' && menuChoice === 'Home') {

				Backbone.history.navigate('', {trigger: true});
			};
		}
	});

	return MenuItemView;
});