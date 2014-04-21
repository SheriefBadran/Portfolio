define(['underscore', 'backbone', 'models/Message'], function (_, Backbone, Message) {
'use strict';

	var Messages = Backbone.Collection.extend({

		initialize: function () {
			//Empty
		},

		// This collection is managing the Message model
		model: Message,

		shoutReset: function () {
			console.log('Messages is reset with models!');
		},

		shoutAdd: function () {
			console.log('Model added to Messages!');
		},

		shoutRemove: function () {
			console.log('Model removed from Messages');
		}
	});

	return Messages;
});