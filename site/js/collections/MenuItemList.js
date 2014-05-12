define(['underscore', 'backbone', 'models/MenuItem'], function (_, Backbone, MenuItem) {
'use strict';
	
	var MenuItemList = Backbone.Collection.extend({

		model: MenuItem
	});

	return MenuItemList;
});