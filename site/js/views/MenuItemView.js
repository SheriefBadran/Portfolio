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

		// Click event without selector fires on the view parent element (this.el$).
		events: {
			'click': 'navigateOnClick'
		},

		navigateOnClick: function (e) {
			
			e.preventDefault();

			$('#menuBoard').addClass('hideMenu');
			$('#menuBoard').height(0);

			var menuChoice = this.model.get('itemTitle');

			if (typeof menuChoice === 'string' && menuChoice === 'Contact Me') {

				Backbone.history.navigate("/Contact-Me", {trigger: true});
			}

			if (typeof menuChoice === 'string' && menuChoice === 'Home') {

				Backbone.history.navigate('', {trigger: true});
			};

			if (typeof menuChoice === 'string' && menuChoice === 'My Work') {

				Backbone.history.navigate("/My-Work", {trigger: true});
			};
		}
	});

	return MenuItemView;
});