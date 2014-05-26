define(['underscore',
		'backbone',
		'views/MenuItemView',
		'text!templates/menu.html'], 
function (_, Backbone, MenuItemView, MenuTemplate) {
'use strict';

	var MenuItemListView = Backbone.View.extend({

		tagName: 'section',

		id: 'menuBoard',

		initialize: function () {
			// this.collection.on('add', this.addItem, this);
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

		insertIntoDOM: function (renderedHTML, parentEl) {
			
			parentEl.append(renderedHTML);
		},

		toggleMenu: function (menuBoard) {

			if (typeof menuBoard === 'object' && menuBoard.length && menuBoard instanceof jQuery) {

				if (menuBoard.hasClass('toggleDown')) {

					menuBoard.removeClass('toggleDown')
					menuBoard.addClass('toggleUp');
					menuBoard.removeClass('keepDown');
				}
				else {

					menuBoard.removeClass('toggleUp');
					menuBoard.addClass('toggleDown');
					menuBoard.addClass('keepDown');
				}
			};
		}
	});

	return MenuItemListView;
});