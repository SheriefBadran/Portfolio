define(['underscore', 'backbone', 'models/Message'], function (_, Backbone, Message) {
'use strict';

	var Messages = Backbone.Collection.extend({

		url: '/messages',

		initialize: function () {

			//Empty
			this.on('destroy', this.verify);
		},

		// This collection is managing the Message model
		model: Message,

		verify: function () {
			
			// Veryfy that when model is destroyed, it's also removed from collection.
			console.log(this);
		}
	});

	return Messages;
});