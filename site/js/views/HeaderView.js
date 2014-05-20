define(['underscore',
		'backbone',
		'collectionviews/MenuItemListView',
		'text!templates/header.html'], 
function (_, Backbone, MenuItemListView, HeaderTemplate) {
'use strict';

	var menuItemListView = new MenuItemListView();

	var HeaderView = Backbone.View.extend({

		tagName: 'section',

		id: 'appHeader',

		events: {
			'click #menuIcon': 'toggleMenu'
		},

		template: _.template(HeaderTemplate),

		render: function () {

			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		toggleMenu: function (e) {

			e.preventDefault();
			menuItemListView.toggleMenu($('#menuBoard'));
		}
	});

	return HeaderView;
});