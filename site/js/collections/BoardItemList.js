define(['underscore', 'backbone', 'models/Board'], function (_, Backbone, BoardItem) {
'use strict';

	var BoardItemList = Backbone.Collection.extend({

		initialize: function () {
			this.on('reset', this.shoutReset);
			this.on('add', this.shoutAdd);
			this.on('remove', this.shoutRemove);
		},

		// This collection is managing the BoardItem model
		model: BoardItem,

		shoutReset: function () {
			console.log('BoardItemList is reset with models!');
		},

		shoutAdd: function () {
			console.log('Model added to BoardItemList!');
		},

		shoutRemove: function () {
			console.log('Model removed from BoardItemList');
		}
	});

	return BoardItemList;
});