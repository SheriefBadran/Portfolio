define(['underscore', 'backbone', 'views/MenuItemView'], function (_, Backbone, MenuItemView) {
'use strict';

	var MenuItemListView = Backbone.View.extend({

		tagName: 'ul',

		initialize: function () {
			this.collection.on('add', this.addItem, this)
		},

		addItem: function (menuItem) {

			var menuItemView = new MenuItemView({model: menuItem});
			this.$el.append(menuItemView.render().el);
		},

		render: function () {
			
			this.collection.forEach(this.addItem, this);
			return this;
		}
	});

	return MenuItemListView;
});