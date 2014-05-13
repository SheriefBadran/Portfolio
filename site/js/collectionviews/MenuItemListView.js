define(['underscore', 'backbone', 'views/MenuItemView', 'text!templates/menu.html'], function (_, Backbone, MenuItemView, MenuTemplate) {
'use strict';

	var MenuItemListView = Backbone.View.extend({

		tagName: 'section',

		id: 'menuBoard',

		events: {
			'click p': 'menuToggle'
		},

		initialize: function () {
			this.collection.on('add', this.addItem, this);
			this.$el.html(this.template());
		},

		template: _.template(MenuTemplate),

		addItem: function (menuItem) {

			var menuItemView = new MenuItemView({model: menuItem});
			var ul = this.$el.find('ul');
			ul.append(menuItemView.render().el);
		},

		render: function () {
			
			this.collection.forEach(this.addItem, this);
			return this;
		},

		menuToggle: function () {

			var menu = this.$el.find('#menu');
			menu.animate({
				height:'toggle'
			});
		}
	});

	return MenuItemListView;
});